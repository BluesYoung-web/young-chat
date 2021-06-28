import { structor } from '@/config.js';
import baseSend from './_base.js';

const sendMsg = async (params) => {
	await baseSend(structor.send_msg_in_room, params);
};

export {
	sendMsg
};
