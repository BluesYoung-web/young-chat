import { getUserInfo } from '@/store/login.js';
import { sendFriendApply, delFriend } from '@/api/user.js';
import { createRoom } from '@/api/room.js';
import { event } from '@/core/net.js';
import { structor } from '@/config.js';
import { createRoom as cr, updateRoom as ur } from '@/store/room.js';
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
			content: '',
			isVoice: false
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
		
		event.on(structor.create_room, async ({ cbk, data, extra }) => {
			if (cbk === structor.create_room) {
				const room = cr({
					autoid: data.autoid,
					name: this.temp_info.nick,
					cover: this.temp_info.avatar,
					content: '[草稿]',
					send_time: Date.now()
				});
				await ur(room, this.user_info.uid);
				uni.navigateTo({
					url: `/pages/message/subPage/chatRoom?room_id=${data.autoid}&title=${this.temp_info.nick}&is_voice=${this.isVoice}`
				});
			}
		});
	},
	onUnload() {
		event.off(structor.create_room, '*');
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
		async sendMsg(type) {
			if (type === 0) {
				this.isVoice = true;
			} else {
				this.isVoice = false;
			}
			await createRoom({ uids: [this.temp_info.uid] });
		},
		async sendAdd() {
			await sendFriendApply({ to: this.temp_info.uid, msg: this.content });
			this.showPopup = false;
			this.content = '';
		}
	}
}