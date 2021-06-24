import { structor } from '@/config.js';
import baseSend from './_base.js';
const sendCircle = async (params) => {
	await baseSend(structor.send_circle, params);
};

export {
	sendCircle
}