/*
 * @Author: zhangyang
 * @Date: 2021-05-15 15:34:21
 * @LastEditTime: 2021-05-15 18:02:57
 * @Description: 
 */
export default {
	data() {
		return {
			title: '聊天室',
			plusMenu: [
				{ op: 'chooseImg', src: '/static/img/conversation/album.png' },
				{ op: 'takePhoto', src: '/static/img/conversation/photo.png' }
			],
			isVoice: false,
			showEmoji: false,
			showPlus: false,
			inputMsg: '',
			bottom: 0
		}
	},
	onLoad(params) {
		const room_id = params.room_id;
		if (room_id) {
			this.getRoomDetail(room_id);
		} else {
			this.$u.toast('非法进入');
		}
	},
	methods: {
		goBack() {
			uni.switchTab({
				url: '/pages/message/index'
			});
		},
		getRoomDetail(room_id) {
			console.log(room_id);
			console.log('欢迎光临');
		},
		/**
		 * 点击输入框/空白处隐藏表情键盘
		 */
		takeBack(){
			this.showEmoji = false;
			this.showPlus = false;
			this.bottom = 0;
		},
		inputChange(){
			this.isVoice = !this.isVoice;
			this.showEmoji = false;
			this.showPlus = false;
			this.bottom = 0;
		},
		getContent(str) {
			this.inputMsg = str;
		},
		showEmojiBoard() {
			this.isVoice = false;
			this.showPlus = false;
			this.showEmoji = true;
			this.bottom = 600;
		},
		showPlusBoard() {
			this.isVoice = false;
			this.showEmoji = false;
			this.showPlus = true;
			this.bottom = 600;
		},
		sendText() {
			console.log('发送文本');
		},
		sendImg() {
			console.log('发送图片');
		},
		sendVoice() {
			console.log('发送语音');
		}
	}
}