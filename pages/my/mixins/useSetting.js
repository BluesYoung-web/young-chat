import { sleep } from '@/util/sleep.js';
export default {
	data() {
		return {}
	},
	methods: {
		changeTel() {
			uni.showModal({
				showCancel: false,
				title: '请邮件联系管理员',
				content: 'bluesyoung_web@163.com'
			})
		},
		about() {
			this.$u.toast('欢迎使用');
		},
		rmAllChat() {
			uni.showModal({
				content: '确认清空聊天记录？',
				success: async ({ confirm }) => {
					if (confirm) {
						this.$u.toast('敬请期待！');
					}
				}
			});
		},
		delCache() {
			uni.showModal({
				content: '确认删除缓存？',
				success: async ({ confirm }) => {
					if (confirm) {
						this.$u.toast('敬请期待！');
					}
				}
			});
		},
		async loginOut() {
			uni.showModal({
				content: '确认退出登录？',
				success: async ({ confirm }) => {
					if (confirm) {
						await this.$api.loginOut();
						this.$u.toast('已退出登录');
						await sleep(0.8);
						uni.reLaunch({
							url: '/pages/login/index'
						});
					}
				}
			});
		}
	}
};
