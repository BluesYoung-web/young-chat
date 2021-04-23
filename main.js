import Vue from 'vue';
import App from './App';

import uview from 'uview-ui';
import httpInterceptor from './common/http.interceptor';

Vue.config.productionTip = false;

App.mpType = 'app';

Vue.use(uview);

const app = new Vue({
	...App
});
// 需要使用 this 实例，所以要放在 APP 创建之后
Vue.use(httpInterceptor, app);
app.$mount();
