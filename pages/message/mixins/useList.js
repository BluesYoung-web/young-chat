import { getRoomList, updateRoom, delRoom } from '@/store/room.js';
export default {
	data() {
		return {
			menus: [
				{ text: '发起群聊' },
				{ text: '添加朋友' },
				{ text: '帮助与反馈' }
			],
			showMenu: false,
			chatRooms: []
		}
	},
	async onShow() {
		await this.getList();
	},
	async onLoad() {
		uni.$on('clear_msg_num', async (id) => {
			const room = this.chatRooms.find((item) => +item.room_id === +id);
			room.msg_num = 0;
			room.show = false;
			await updateRoom(room, this.user_info.uid);
		});
	},
	async onUnload() {
		uni.$off('clear_msg_num');
	},
	watch: {
		chatRooms: {
			handler: function(val) {
				let n = val.map((item) => item.msg_num);
				if (Array.isArray(n) && n.length > 0) {
					n = n.reduce((pre, curr) => pre + curr);
				} else {
					n = 0;
				}
				if (n > 1) {
					uni.showTabBarRedDot({
						index: 0
					});
				} else {
					uni.hideTabBarRedDot({
						index: 0
					});
				}
			},
			deep: true
		}
	},
	methods: {
		async getList() {
			this.chatRooms = await getRoomList();
		},
		clickMenu(index) {
			switch (index){
				case 0:
					this.$u.toast('发起群聊');
					break;
				case 1:
					uni.navigateTo({
						url: '/pages/address/subPage/search'
					});
					break;
				default:
					this.$u.toast(`请发送邮件至:\n bluesyoung-web@163.com`);
					break;
			}
		},
		openChange(index) {
			this.chatRooms.forEach((item) => item.show = false);
			this.chatRooms[index].show = true;
		},
		async listOperate(index, did) {
			const room = this.chatRooms[index];
			switch (did){
				case 0:
					// 已读
					room.msg_num = 0;
					room.show = false;
					await updateRoom(room, this.user_info.uid);
					break;
				case 1:
					await delRoom(room);
					break;
				default:
					break;
			}
		},
		async clickInto(item) {
			item.msg_num = 0;
			item.show = false;
			await updateRoom(item, this.user_info.uid);
			uni.navigateTo({
				url: `/pages/message/subPage/chatRoom?room_id=${item.room_id}&title=${item.title}`
			});
		}
	}
}