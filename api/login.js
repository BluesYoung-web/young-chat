/*
 * @Author: zhangyang
 * @Date: 2021-04-12 10:05:49
 * @LastEditTime: 2021-04-12 10:27:28
 * @Description: 登录相关的接口
 * 注意，由于需要使用 this 上的方法，所以所有的接口方法都不得为箭头函数
 */
import { setLoginInfo } from '@/store/login.js';
import { md5 } from "uview-ui/libs/function/md5";
import net from '@/core/net.js';

const getCaptcha = async function() {
	const res = await this.$u.get('/login/getCaptcha');
	return res;
}
const login = async function(params) {
	const res = await this.$u.post('/login', params);
	const { uid, token } = res;
	const sign = md5(uid + token);
	res.sign = sign;
	await setLoginInfo(res);
	net.init(sign, uid);
	return res;
}

export default {
	login,
	getCaptcha
}