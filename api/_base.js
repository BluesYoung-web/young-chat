import net from '@/core/net.js';
export default async (cbk, params) => {
	const [com, task, id] = cbk.split('-').map((item) => +item);
	await net.sendMsg({ cbk, data: { com, task, id, params } });
};