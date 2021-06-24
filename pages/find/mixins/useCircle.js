import { uploadImg } from '@/api/upload.js';
import { event } from '@/core/net.js';
import { structor } from '@/config.js';
import { sleep } from '@/util/sleep.js';
import { sendCircle } from '@/api/circle.js';
export default {
	data() {
		return {
			showPopup: false,
			circle_list: [],
			temp_url: '',
			content: '',
			blob: null
		}
	},
	onLoad() {
		event.on(structor.upload_success, async ({ cbk, data, extra }) => {
			if (cbk === structor.upload_success) {
				await this.realSend(this.content, data.url);
			}
		});
	},
	onUnload() {
		event.off(structor.upload_success, '*');
	},
	methods: {
		clear() {
			this.showPopup = false;
			this.temp_url = '';
			this.content = '';
			this.blob = null;
		},
		chooseImg() {
			uni.chooseImage({
				count: 1,
				success: (_temp) => {
					this.blob = _temp.tempFiles[0];
					this.temp_url = _temp.tempFilePaths[0];
					this.showPopup = true;
				},
				fail: () => {
					this.$u.toast('图片获取失败');
				}
			});
		},
		clickCamera() {
			uni.showActionSheet({
				itemList: ['图片 + 文字', '仅文字'],
				success: ({ tapIndex }) => {
					if (tapIndex === 0) {
						this.chooseImg();
						return;
					} else {
						this.showPopup = true;
					}
				}
			});
		},
		async sendCircle() {
			if (this.blob) {
				await uploadImg({ fileName: Date.now() + '.png', blob: this.blob });
			} else {
				await this.realSend(this.content, '');
			}
		},
		async realSend(content, url) {
			await sendCircle({ url, content });
			this.clear();
		}
	}
}