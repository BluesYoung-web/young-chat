const sleep = async (time) => {
	return new Promise((resolve) => {
		setTimeout(resolve, time * 1000);
	});
};

export {
	sleep
};