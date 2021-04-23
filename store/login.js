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

export {
	setLoginInfo,
	getLoginInfo,
	setUserInfo,
	getUserInfo
}