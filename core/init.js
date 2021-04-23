/*
 * @Author: zhangyang
 * @Date: 2021-04-13 17:25:36
 * @LastEditTime: 2021-04-13 17:34:32
 * @Description: 系统初始化
 */
import { getLoginInfo, setUserInfo, getUserInfo } from '@/store/login.js';
import net, { event } from '@/core/net.js';
import { structor } from '@/config.js';

event.on(structor.sign_no_use, ({ cbk, data, extra }) => {
	if (cbk === structor.sign_no_use || cbk === structor.login_on_another) {
		uni.showToast({
			title: data,
			icon: 'none'
		});
		setTimeout(() => {
			uni.reLaunch({
				url: '/pages/login/index'
			});
		}, 800);
	}
});

event.on(structor.get_this_user_info, async ({ cbk, data, extra }) => {
	if (cbk === structor.get_this_user_info) {
		await setUserInfo(data);
		console.log(await getUserInfo(data.uid));
	}
});

export default async () => {
  const { sign, uid } = await getLoginInfo();
  net.init(sign, uid);
};