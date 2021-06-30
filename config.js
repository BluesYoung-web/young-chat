/*
 * @Author: zhangyang
 * @Date: 2021-04-13 16:24:03
 * @LastEditTime: 2021-04-13 17:33:36
 * @Description: 基础配置
 */
const structor = {
	success: '0-0-0',
	fail: '0-0-1',

	sign_no_use: '100-0-0',
	login_on_another: '100-0-1',
	socket_close_error: '100-4001-0',
	socket_reconnect_fail: '100-4002-0',
	
	get_this_user_info: '200-0-0',
	set_this_user_info: '200-0-1',
	search_user: '200-0-2',
	get_friend_list: '200-0-3',
	send_friend_apply: '200-0-4',
	get_friend_apply_list: '200-0-5',
	operate_friend_apply: '200-0-6',
	del_friend: '200-0-7',
	send_msg_in_room: '200-0-8',
	create_room: '200-0-9',
	get_room_list: '200-0-10',
	
	has_new_apply: '200-1-0',
	room_msg: '200-1-1',
	
	send_circle: '300-0-0',
	get_circle: '300-0-1',
	del_circle: '300-0-2',
	click_like: '300-0-3',
	get_comments: '300-0-4',
	put_comments: '300-0-5',
	del_comments: '300-0-6',
	
	has_new_circle: '300-1-0',
	
	server_error: '500-0-0',
	
	upload_img: '999-1',
	upload_audio: '999-2',
	upload_success: '999-999-999'
};
const base_http = 'http://192.168.20.201:1443';
const base_ws = 'ws://192.168.20.201:9527';
export {
	base_http,
	base_ws,
	structor
}