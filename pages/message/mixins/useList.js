import { getRoomList } from '@/store/room.js';
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
		this.chatRooms = await getRoomList();
	},
	methods: {
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
		listOperate(index, did) {
			switch (did){
				case 0:
					// 已读
					console.log('已读');
					break;
				case 1:
					console.log('删除');
					this.chatRooms.splice(index, 1);
					break;
				default:
					break;
			}
		},
		clickInto(item) {
			uni.navigateTo({
				url: `/pages/message/subPage/chatRoom?room_id=${item.room_id}&title=${item.title}`
			});
		}
	}
}