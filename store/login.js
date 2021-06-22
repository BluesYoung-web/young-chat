import Cache from '@/lib/Cache.js';

const state = new Cache('common_data', 'user');

const setLoginInfo = async (obj) => {
	return await state.set('login_info', obj);
};

const getLoginInfo = async () => {
	return await state.get('login_info');
};

const setUserInfo = async (user) => {
	return await state.set(`user_info_${user.uid}`, user);
};

const getUserInfo = async (uid) => {
	return await state.get(`user_info_${uid}`);
};

/**
 * 获取当前用户的信息
 */
const getCurrentUserInfo = async () => {
	const { uid } = await getLoginInfo() || {};
	const info = await getUserInfo(uid);
	return info || {};
};

export {
	setLoginInfo,
	getLoginInfo,
	setUserInfo,
	getUserInfo,
	getCurrentUserInfo
}