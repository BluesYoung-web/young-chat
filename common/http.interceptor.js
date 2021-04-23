/*
 * @Author: zhangyang
 * @Date: 2021-04-12 09:39:07
 * @LastEditTime: 2021-04-12 14:24:23
 * @Description: 请求拦截器
 */
import { base_http } from '@/config.js';
const install = (Vue, vm) => {
  // vm ==> app -> this
  Vue.prototype.$u.http.setConfig({
    baseUrl: base_http,
    // loadingText: '努力加载中...',
    // loadingTime: 1000,

  });
  /**
   * 请求拦截器
   */
  Vue.prototype.$u.http.interceptor.request = (req) => {
    // console.log(req);
    req.header['Content-Type'] = 'application/x-www-form-urlencoded';
    return req;
  }
  /**
   * 响应拦截器
   */
  Vue.prototype.$u.http.interceptor.response = (res) => {
    const { status, data } = res;
		if (status === 0) {
			return data;
		} else{
			vm.$u.toast(data);
		}
  }
	
	/**
	 * 批量引入所有接口
	 */
	let apis = {};
	
	const paths = require.context('../api/', true, /\.js$/)
	paths.keys().forEach((path) => {
		const name = path.substr(2);
		const fns = require(`../api/${name}`).default;
		apis = {
			...apis,
			...fns
		};
	});
	
	// 挂载框架的工具方法
	apis.$u = vm.$u;
	
	// 挂载所有接口
	Vue.prototype.$api = apis;
}

export default {
  install
}