export default {
	data() {
		return {
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