/*
 * @Author: zhangyang
 * @Date: 2021-04-13 17:25:36
 * @LastEditTime: 2021-04-13 17:34:32
 * @Description: 系统初始化
 */
import { getLoginInfo, setUserInfo, getUserInfo } from '@/store/login.js';
import net, { event } from '@/core/net.js';
import { structor } from '@/config.js';
/**
 * 签名无效 | 异地登录
 */
event.on(structor.sign_no_use, ({ cbk, data, extra }) => {
	if (cbk === structor.sign_no_use || cbk === structor.login_on_another) {
		uni.showToast({
			title: data,
			icon: 'none'
		});
		net.close();
		setTimeout(() => {
			uni.reLaunch({
				url: '/pages/login/index'
			});
		}, 800);
	}
});
/**
 * 主动推送当前用户信息
 */
event.on(structor.get_this_user_info, async ({ cbk, data, extra }) => {
	if (cbk === structor.get_this_user_info) {
		await setUserInfo(data);
	}
});
/**
 * websocket 意外断开
 */
event.on(structor.socket_close_error, ({ cbk, data, extra }) => {
	if (cbk === structor.socket_close_error) {
		net.auto_reconnect();
	}
});
/**
 * 超过最大重连次数
 */
event.on(structor.socket_close_error, ({ cbk, data, extra }) => {
	if (cbk === structor.socket_reconnect_fail) {
		uni.showModal({
			showCancel: false,
			title: '您当前的网络可能存在问题，请确保网络正常再使用'
		});
	}
});
export default async () => {
  const { sign, uid } = await getLoginInfo() || {};
  net.init(sign, uid);
};