export default {
	data() {
		return {
			menus: [
				{ text: '发起群聊' },
				{ text: '添加朋友' },
				{ text: '帮助与反馈' }
			],
			showMenu: false,
			chatRooms: [
				{
					img: '/static/img/tips/出价成功图标.png',
					title: '房间名称',
					msg: '当前收到的消息',
					room_id: '2512931',
					show: false
				},
				{
					img: '/static/img/tips/出价成功图标.png',
					title: '房间名称',
					msg: '当前收到的消息',
					room_id: '2512932',
					show: false
				},
				{
					img: '/static/img/tips/出价成功图标.png',
					title: '房间名称',
					msg: '当前收到的消息',
					room_id: '2512933',
					show: false
				},
				{
					img: '/static/img/tips/出价成功图标.png',
					title: '房间名称',
					msg: '当前收到的消息',
					room_id: '2512934',
					show: false
				},
				{
					img: '/static/img/tips/出价成功图标.png',
					title: '房间名称',
					msg: '当前收到的消息',
					room_id: '2512935',
					show: false
				},
				{
					img: '/static/img/tips/出价成功图标.png',
					title: '房间名称',
					msg: '当前收到的消息',
					room_id: '2512936',
					show: false
				},
				{
					img: '/static/img/tips/出价成功图标.png',
					title: '房间名称',
					msg: '当前收到的消息',
					room_id: '2512937',
					show: false
				},
				{
					img: '/static/img/tips/出价成功图标.png',
					title: '房间名称',
					msg: '当前收到的消息',
					room_id: '2512938',
					show: false
				},
				{
					img: '/static/img/tips/出价成功图标.png',
					title: '房间名称',
					msg: '当前收到的消息',
					room_id: '2512939',
					show: false
				},
				{
					img: '/static/img/tips/出价成功图标.png',
					title: '房间名称',
					msg: '当前收到的消息',
					room_id: '25129310',
					show: false
				}
			]
		}
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
		clickInto(room_id) {
			uni.navigateTo({
				url: `/pages/message/subPage/chatRoom?room_id=${room_id}`
			});
		}
	}
}