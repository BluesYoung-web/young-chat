/*
 * @Author: zhangyang
 * @Date: 2021-06-18 15:44:42
 * @LastEditTime: 2021-06-18 15:51:51
 * @Description: 当前用户相关的操作
 */
import net from '@/core/net.js';
import { structor } from '@/config.js';
const editInfo = async (params) => {
	const [com, task, id] = structor.set_this_user_info.split('-').map((item) => +item);
  await net.sendMsg({ cbk: structor.get_this_user_info, data: { com, task, id, params } });
};

export {
	editInfo
};