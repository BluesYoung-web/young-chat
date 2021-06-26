import { getUserInfo } from '@/store/login.js';
import { sendFriendApply, delFriend } from '@/api/user.js';
export default {
	data() {
		return {
			temp_info: {
				avatar: '',
				nick: '',
				uid: '',
				motto: ''
			},
			showPopup: false,
			content: ''
		}
	},
	async onLoad({ uid }) {
		if (!uid) {
			this.$u.toast('非法进入');
			await this.sleep(0.8);
			uni.reLaunch({
				url: '/pages/message/index'
			});
			return;
		}
		this.temp_info = await getUserInfo(uid);
	},
	methods: {
		del() {
			uni.showModal({
				title: '确认删除该好友？',
				confirmColor: '#d00',
				success: async ({ confirm }) => {
					if (confirm) {
						await delFriend({ fid: this.temp_info.uid })
						await this.sleep(0.5);
						uni.reLaunch({
							url: '/pages/address/index'
						});
					}
				}
			});
		},
		sendMsg(type) {
			this.$u.toast('发送消息' + type);
		},
		async sendAdd() {
			await sendFriendApply({ to: this.temp_info.uid, msg: this.content });
			this.showPopup = false;
			this.content = '';
		}
	}
}