<script>
import init from '@/core/init.js';
export default {
	onLaunch: function() {
		console.log('App Launch');
		// 初始化，连接 WebSocket
		init();

	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "static/css/common.css";
	@import "static/css/tailwind.min.css";
	uni-tabbar {
		.uni-tabbar { // tab背景
			.uni-tabbar-border { // tabBar上边框
				display: none;
			}
		}
	}
</style>
