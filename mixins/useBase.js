import color from '@/uni.scss';
import { getLoginInfo } from '@/store/login.js';
import { getCurrentUserInfo } from '@/store/login.js';
export default {
	data() {
		return {
			background: { backgroundColor: color.young_bg },
			title_color: color.young_title,
			menus: [
				{ text: '发起群聊' },
				{ text: '添加朋友' },
				{ text: '帮助与反馈' }
			],
			showMenu: false,
		}
	},
	async onLoad() {
		const info = await getLoginInfo().catch(() => {
			this.$u.toast('请先去登录');
			setTimeout(() => {
				this.$u.route({
					url: '/pages/login/index',
					type: 'reLaunch'
				});
			}, 800);
		});
		if (!!info) {
			const { uid, token } = info;
		}
	},
	async onShow() {
		this.user_info = await getCurrentUserInfo();
	},
	methods: {
		clickMenu(index) {
			switch (index){
				case 0:
					this.$u.toast('发起群聊');
					break;
				case 1:
					this.$u.toast('添加朋友');
					break;
				default:
					this.$u.toast(`请发送邮件至:\n bluesyoung-web@163.com`);
					break;
			}
		},
	}
}