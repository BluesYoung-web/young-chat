import { structor } from '@/config.js';
import baseSend from './_base.js';

const sendMsg = async (params) => {
	await baseSend(structor.send_msg_in_room, params);
};

const createRoom = async (params) => {
	await baseSend(structor.create_room, params);
};

const getRoomList = async (params) => {
	await baseSend(structor.get_room_list, params);
};

const getRoomDetail = async (params) => {
	await baseSend(structor.get_room_detail, params);
};

const modRoomInfo = async (params) => {
	await baseSend(structor.mod_room_info, params);
};

const quitRoom = async (params) => {
	await baseSend(structor.quit_room, params);
};

export {
	sendMsg,
	createRoom,
	getRoomList,
	getRoomDetail,
	modRoomInfo,
	quitRoom
};
