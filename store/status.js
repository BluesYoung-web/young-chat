import Cache from '@/lib/Cache.js';

const state = new Cache('common_data', 'status');

const setCircleStatus = async (flag) => {
	return await state.set('circle', flag);
};

const getCircleStatus = async () => {
	return await state.get('circle') || {};
};

const setApplyStatus = async (flag) => {
	return await state.set('friend_apply', flag);
};

const getApplyStatus = async () => {
	return await state.get('friend_apply') || {};
};

export {
	setCircleStatus,
	getCircleStatus,
	setApplyStatus,
	getApplyStatus
};