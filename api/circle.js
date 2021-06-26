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

const getComments = async (params) => {
	await baseSend(structor.get_comments, params);
};

const putComments = async (params) => {
	await baseSend(structor.put_comments, params);
};

const delComments = async (params) => {
	await baseSend(structor.del_comments, params);
};

export {
	sendCircle,
	getCircle,
	delCircle,
	clickLike,
	getComments,
	putComments,
	delComments
}