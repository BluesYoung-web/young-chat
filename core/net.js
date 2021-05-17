/*
 * @Author: zhangyang
 * @Date: 2021-04-13 16:22:14
 * @LastEditTime: 2021-04-13 16:22:41
 * @Description: 网络模块
 */
import Socket from '@/lib/Socket.js';
import Event from '@/lib/Event.js';
import { base_ws, structor } from '@/config.js';

// 全局 socket 对象
let socket = null;
// 全局事件对象
export const event = new Event();

const onOpen = () => console.log('websocket 连接正常');
const onClose = () => {
	console.log('websocket 连接已断开');
	if (socket.doClose) {
		console.log('主动断开');
	} else{
		event.emit(structor.socket_close_error, {
			cbk: structor.socket_close_error,
			data: '连接已断开',
			extra: null
		});
	}
};
const onDisconnect = () => {
	console.log('连无法连接到网络，请检查网络连接后重试');
	event.emit(structor.socket_reconnect_fail, {
		cbk: structor.socket_reconnect_fail,
		data: '超过最大重连次数',
		extra: null
	});
};
const onMessage = ({ data = {}, cbk = null, extra = null }) => {
	if (cbk) {
		event.emit(cbk, { data, extra, cbk });
	} else {
		event.broadcast({ data, extra, cbk });
	}
};
const onError = () => console.log('连接出错');
const init = (sign, uid) => {
	const url = `${base_ws}?sign=${sign}&uid=${uid}`;
	socket = new Socket({
		url,
		onOpen,
		onClose,
		onMessage,
		onError,
		onDisconnect
	});
	socket.init();
};

const sendMsg = async ({ cbk = null, data = {}, extra = null }, fail = console.error) => {
	await socket.send({ msg: { cbk, data, extra }, fail });
};

export default {
	init,
	sendMsg,
	close: () => socket.close(),
	auto_reconnect: () => socket.reConnect(),
	upload: (args) => socket.upload(args)
};
