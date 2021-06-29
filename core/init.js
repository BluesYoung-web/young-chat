/*
 * @Author: zhangyang
 * @Date: 2021-04-13 17:25:36
 * @LastEditTime: 2021-04-13 17:34:32
 * @Description: 系统初始化
 */
import { getLoginInfo, setUserInfo, getUserInfo } from '@/store/login.js';
import { addNewMsgToRoom } from '@/store/room.js';
import { setCircleStatus, setApplyStatus } from '@/store/status.js';
import net, { event } from '@/core/net.js';
import { structor } from '@/config.js';
import { sleep } from '@/util/sleep.js';
/**
 * socket 消息处理成功
 */
event.on(structor.success, async ({ cbk, data, extra }) => {
	/**
	 * 主动推送当前用户信息
	 */
	if (extra === structor.get_this_user_info) {
		await setUserInfo(data);
		return;
	}
	/**
	 * 有新的动态
	 */
	if (extra === structor.has_new_circle) {
		uni.showTabBarRedDot({
			index: 2
		});
		await setCircleStatus({ flag: true });
		return;
	}
	/**
	 * 有新的好友申请
	 */
	if (extra === structor.has_new_apply) {
		uni.showTabBarRedDot({
			index: 1
		});
		await setApplyStatus({ flag: true });
		return;
	}
	/**
	 * 常规操作成功
	 */
	data.msg && uni.showToast({
		icon: 'none',
		title: data.msg
	});
	/**
	 * 修改用户信息成功
	 */
	if (extra === structor.set_this_user_info) {
		await setUserInfo(data.data);
	}
});

/**
 * socket 消息处理失败
 */
event.on(structor.fail, async ({ cbk, data, extra }) => {
	/**
	 * 超过最大重连次数
	 */
	if (extra === structor.socket_reconnect_fail) {
		uni.showModal({
			showCancel: false,
			title: '您当前的网络可能存在问题，请确保网络正常再使用',
			success: () => {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			}
		});
		return;
	}
	/**
	 * 常规操作失败
	 */
	data.msg && uni.showToast({
		icon: 'none',
		title: data.msg
	});
	/**
	 * 签名无效 | 异地登录
	 */
	if (extra === structor.sign_no_use || extra === structor.login_on_another) {
	  await sleep(0.5);
		net.close();
		await sleep(0.8);
		uni.reLaunch({
			url: '/pages/login/index'
		});
	}
	/**
	 * websocket 意外断开
	 */
	if (extra === structor.socket_close_error) {
		net.auto_reconnect();
	}
});

/**
 * 聊天室消息
 */
event.on(structor.room_msg, async ({ cbk, data, extra }) => {
	if (cbk === structor.room_msg) {
		console.log('---收到聊天室的消息---');
		console.log(data);
		console.log('---消息结束---');
		await addNewMsgToRoom(data);
		uni.$emit(`new_message_${data.autoid}`);
	}
});
export default async () => {
  const { sign, uid } = await getLoginInfo() || {};
  net.init(sign, uid);
};