import { structor } from '@/config.js';
import baseSend from './_base.js';
const sendCircle = async (params) => {
	await baseSend(structor.send_circle, params);
};

const getCircle = async (params) => {
	await baseSend(structor.get_circle, params);
};

const delCircle = async (params) => {
	await baseSend(structor.del_circle, params);
};

const clickLike = async (params) => {
	await baseSend(structor.click_like, params);
};

export {
	sendCircle,
	getCircle,
	delCircle,
	clickLike
}