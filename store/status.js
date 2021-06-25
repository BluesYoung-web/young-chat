import Cache from '@/lib/Cache.js';

const state = new Cache('common_data', 'status');

const setCircleStatus = async (flag) => {
	return await state.set('circle', flag);
};

const getCircleStatus = async () => {
	return await state.get('circle');
};

export {
	setCircleStatus,
	getCircleStatus
};