/*
 * @Author: zhangyang
 * @Date: 2021-06-21 14:31:45
 * @LastEditTime: 2021-06-21 14:32:05
 * @Description: 上传文件
 */
import net from '@/core/net.js';
import { structor } from '@/config.js';
const uploadImg = async ({ fileName, blob }) => {
	const [com, task] = structor.upload_img.split('-').map((item) => +item);
	await net.upload({
		msg: {
			data: {	com, task },
			extra: { fileName }
		},
		blob
	});
};

const uploadAudio = async ({ fileName, blob }) => {
	const [com, task] = structor.upload_audio.split('-').map((item) => +item);
	await net.upload({
		msg: {
			data: {	com, task },
			extra: { fileName }
		},
		blob
	});
};

export {
	uploadImg,
	uploadAudio
};