/*
 * @Author: zhangyang
 * @Date: 2021-06-18 15:44:42
 * @LastEditTime: 2021-06-18 15:51:51
 * @Description: 当前用户相关的操作
 */
import { structor } from '@/config.js';
import baseSend from './_base.js';
const editInfo = async (params) => {
	await baseSend(structor.set_this_user_info, params);
};

const search = async (params) => {
	await baseSend(structor.search_user, params);
};

const getFriendsList = async (params) => {
	await baseSend(structor.get_friend_list, params);
};

const getThisUserInfo = async (params) => {
	await baseSend(structor.get_this_user_info, params);
};

const sendFriendApply = async (params) => {
	await baseSend(structor.send_friend_apply, params);
};

const getFriendApplyList = async (params) => {
	await baseSend(structor.get_friend_apply_list, params);
};

const operateFriendApply = async (params) => {
	await baseSend(structor.operate_friend_apply, params);
};

const delFriend = async (params) => {
	await baseSend(structor.del_friend, params);
};

export {
	editInfo,
	search,
	getFriendsList,
	getThisUserInfo,
	sendFriendApply,
	getFriendApplyList,
	operateFriendApply,
	delFriend
};