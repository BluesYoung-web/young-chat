import Cache from '@/lib/Cache.js';
import { getLoginInfo } from './login.js';
const state = new Cache('chat', 'room');

const createRoom = ({ autoid, name, cover, content, send_time }) => {
	return {
		img: cover,
		title: name,
		msg: content,
		room_id: autoid,
		show: false,
		show_time: send_time,
		msg_num: 0
	};
}

const getRoomList = async () => {
	const { uid } = await getLoginInfo() || {};
	return await state.get(`room_list_${uid}`) || [];
};
const addRoom = async (room) => {
	const { uid } = await getLoginInfo() || {};
	const roomList = await getRoomList();
	roomList.push(room);
	return await state.set(`room_list_${uid}`, roomList);
};
const delRoom = async (room) => {
	const { uid } = await getLoginInfo() || {};
	const roomList = await getRoomList();
	const index = roomList.findIndex((item) => item.autoid === room.autoid);
	roomList.splice(index, 1);
	return await state.set(`room_list_${uid}`, roomList);
};
const updateRoom = async (room, uid) => {
	const roomList = await getRoomList();
	const index = roomList.findIndex((item) => item.autoid === room.autoid);
	if (index === -1) {
		return await addRoom(room);
	} else {
		return await state.set(`room_list_${uid}`, roomList);;
	}
};


const addNewMsgToList = async ({ autoid, owner, msg_type, content, send_id, send_time, extra }) => {
	const { uid } = await getLoginInfo() || {};
	const MsgType = ['[系统消息]', '文本消息', '[语音]', '[图片]', '[其他]'];
	let room;
	if (owner === 0) {
		// 私聊
		const { nick, avatar } = extra[uid];
		if(msg_type !== 1) {
			content = MsgType[msg_type] + content;
		}
		room = createRoom({ autoid, name: nick, cover: avatar, content, send_time });
	} else {
		// 群聊
		const { name, avatar } = extra;
		room = createRoom({ autoid, name, cover, content, send_time });
	}
	return await updateRoom(room, uid);
};

const getMessages = async (autoid) => {
	return await state.get(`message_list_${autoid}`) || [];
};
const setMessages = async (autoid, messages) => {
	return await state.set(`message_list_${autoid}`, messages);
};
const addMessages = async (autoid, msg) => {
	const messgaes = await getMessages(autoid);
	messgaes.push(msg);
	return await setMessages(autoid, messgaes);
};

const addNewMsgToRoom = async (args) => {
	// 先改变消息列表的
	await addNewMsgToList(args);
	// 把消息存入聊天记录
	return await addMessages(args.autoid, args);
};

export {
	createRoom,
	getRoomList,
	addNewMsgToList,
	addNewMsgToRoom,
	getMessages
};