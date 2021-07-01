/*
 * @Author: zhangyang
 * @Date: 2021-05-15 15:34:21
 * @LastEditTime: 2021-05-18 11:48:25
 * @Description: 
 */
import { event } from '@/core/net.js';
import { structor } from '@/config.js';
import { getMessages } from '@/store/room.js';
import { sendMsg } from '@/api/room.js';
import { uploadImg, uploadAudio } from '@/api/upload.js';
export default {
	data() {
		return {
			room_id: 0,
			owner: 0,
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
			scrollTop: 0,
			
			temp_url: '',
			blob: null
		}
	},
	async onLoad({ room_id, title, is_voice = false, owner = 0 }) {
		if (room_id) {
			this.room_id = room_id;
			this.owner = owner;
			this.title = title;
			this.isVoice = is_voice === 'true';
			await this.getRoomDetail();
			this.scrollBottom();
			// 监听新消息
			uni.$on(`new_message_${room_id}`, this.scrollBottom);
			/**
			 * 图片 | 音频 上传成功
			 */
			event.on(structor.upload_success, async ({ cbk, data, extra }) => {
				if (cbk === structor.upload_success) {
					if (extra === structor.upload_img) {
						// 图片上传成功
						this.sendImg(data.url);
					} else if (extra === structor.upload_audio) {
						// 音频上传成功
						this.sendVoice(data.url);
					}
				}
			});
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
		event.off(structor.upload_success, '*');
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
				success: async (res) => {
					const ext = res.tempFiles[0].name.match(/(\..*)/img)[0] || '.mp3';
					const blob = res.tempFiles[0];
					await uploadAudio({ fileName: Date.now() + ext, blob });
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
			uni.chooseImage({
				count: 1,
				sourceType: [src],
				sizeType: ['compressed'],
				success: async (res) => {
					const blob = res.tempFiles[0];
					await uploadImg({ fileName: Date.now() + '.png', blob });
				},
				fail: (_) => {
					uni.showToast({
						title:"取消或加载超时",
						icon:"none"
					});
				},
			});
		},
		async sendText() {
			const params = { autoid: this.room_id, msg_type: 1, content: this.inputMsg };
			await sendMsg(params);
			await this.sleep(0.2);
			await this.getRoomDetail();
			this.inputMsg = '';
			this.clear();
		},
		async sendImg(url) {
			const params = { autoid: this.room_id, msg_type: 2, content: url };
			await sendMsg(params);
			await this.sleep(0.2);
			await this.getRoomDetail();
			this.clear();
		},
		async sendVoice(url) {
			const params = { autoid: this.room_id, msg_type: 3, content: url };
			await sendMsg(params);
			await this.sleep(0.2);
			await this.getRoomDetail();
			this.clear();
		},
		clear() {
			this.showEmoji = false;
			this.showPlus = false;
			this.bottom = 0;
		},
		goDetail() {
			uni.navigateTo({
				url: `/pages/message/subPage/roomDetail?room_id=${this.room_id}`
			});
		}
	}
}