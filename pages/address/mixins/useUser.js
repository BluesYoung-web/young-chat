import { getUserInfo } from '@/store/login.js';
import { sleep } from '@/util/sleep.js';
export default {
	data() {
		return {
			temp_info: {
				avatar: '',
				nick: '',
				uid: '',
				motto: ''
			}
		}
	},
	async onLoad({ uid }) {
		if (!uid) {
			this.$u.toast('非法进入');
			await sleep(0.8);
			uni.reLaunch({
				url: '/pages/message/index'
			});
			return;
		}
		this.temp_info = await getUserInfo(uid);
		console.log(this.temp_info);
	},
	methods: {
		del() {
			uni.showModal({
				title: '确认删除该好友？',
				confirmColor: '#d00',
				success: ({ confirm }) => {
					if (confirm) {
						this.$u.toast('删除');
					} else {
						this.$u.toast('取消');
					}
				}
			});
		},
		sendMsg(type) {
			this.$u.toast('发送消息' + type);
		},
		sendAdd() {
			this.$u.toast('已发送好友申请！');
		}
	}
}