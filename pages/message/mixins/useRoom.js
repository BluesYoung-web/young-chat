/*
 * @Author: zhangyang
 * @Date: 2021-05-15 15:34:21
 * @LastEditTime: 2021-05-18 11:48:25
 * @Description: 
 */
import net from '@/core/net.js';
import { getMessages } from '@/store/room.js';
import { sendMsg } from '@/api/room.js';
export default {
	data() {
		return {
			room_id: 0,
			title: '聊天室',
			plusMenu: [
				{ op: 'chooseImg', src: '/static/img/conversation/album.png' },
				{ op: 'takePhoto', src: '/static/img/conversation/photo.png' },
				{ op: 'chooseMusic', src: '/static/img/conversation/music.png' }
			],
			msg_list: [],
			isVoice: false,
			showEmoji: false,
			showPlus: false,
			inputMsg: '',
			bottom: 0,
			scrollTop: 0
		}
	},
	async onLoad({ room_id, title, is_voice = false }) {
		if (room_id) {
			this.room_id = room_id;
			this.title = title;
			this.isVoice = is_voice === 'true';
			await this.getRoomDetail();
			this.scrollBottom();
			// 监听新消息
			uni.$on(`new_message_${room_id}`, this.scrollBottom);
		} else {
			this.$u.toast('非法进入');
			await this.sleep(0.8);
			uni.reLaunch({
				url: '/pages/message/index'
			});
		}
	},
	onUnload() {
		uni.$off(`new_message_${this.room_id}`);
	},
	methods: {
		/**
		 * 滚动到消息底部
		 */
		scrollBottom() {
			console.log('滚动');
			this.$nextTick(() => {
				this.scrollTop = this.msg_list.length * 100;
			});
		},
		goBack() {
			uni.$emit(`clear_msg_num`, this.room_id);
			uni.switchTab({
				url: '/pages/message/index'
			});
		},
		async getRoomDetail() {
			this.msg_list = await getMessages(this.room_id);
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
		addEmoji(e) {
			this.inputMsg += e;
		},
		deleteMsg() {
			const str = [...this.inputMsg];
			str.pop();
			this.inputMsg = str.join('');
		},
		chooseMusic() {
			uni.chooseFile({
				count: 0,
				type: 'audio',
				success: (res) => {
					console.log(res);
				}
			});
		},
		clickItem(item){
			let src = '';
			switch (item.op) {
				case 'chooseImg':
					src = 'album';
					break;
				case 'takePhoto':
					src = 'camera';
					break;
				default:
					this[item.op]();
					return;
			}
			const config={
				count: 1,
				sourceType: [src],
				sizeType: ['compressed'],
				success: (res) => {
					console.log(res);
					const img_data = res.tempFiles[0];
					net.upload({
						msg: { com: 999, task: 1, extra: { fileName: Date.now() + '.' + img_data.name.split('.')[1] } },
						blob: img_data,
						success: console.log,
						fail: console.error
					})
				},
				fail: (_) => {
					uni.showToast({
						title:"取消或加载超时",
						icon:"none"
					});
				},
			}
			uni.chooseImage(config);
		},
		async sendText() {
			const params = { autoid: this.room_id, msg_type: 1, content: this.inputMsg };
			await sendMsg(params);
			await this.sleep(0.2);
			await this.getRoomDetail();
			this.clear();
		},
		sendImg() {
			console.log('发送图片');
		},
		sendVoice() {
			console.log('发送语音');
		},
		clear() {
			this.inputMsg = '';
			this.showEmoji = false;
			this.showPlus = false;
			this.bottom = 0;
		}
	}
}