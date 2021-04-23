/*
 * @Author: zhangyang
 * @Date: 2021-04-13 16:24:03
 * @LastEditTime: 2021-04-13 17:33:36
 * @Description: 基础配置
 */
const structor = {
	sign_no_use: '100-0-0',
	login_on_another: '100-0-1',
	socket_close_error: '100-4001-0',
	socket_reconnect_fail: '100-4002-0',
	
	get_this_user_info: '200-0-0'
};
const base_http = 'http://localhost:1443';
const base_ws = 'ws://localhost:9527';
export {
	base_http,
	base_ws,
	structor
}