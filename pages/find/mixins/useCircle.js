import { uploadImg } from '@/api/upload.js';
import { event } from '@/core/net.js';
import { structor } from '@/config.js';
import { sendCircle, getCircle, delCircle, clickLike } from '@/api/circle.js';
export default {
	data() {
		return {
			showPopup: false,
			circle_list: [],
			temp_url: '',
			content: '',
			blob: null,
			load_status: 'loadmore',
			load_text: {
				loadmore: '点击加载更多',
				loading: '努力加载中',
				nomore: '我是有底线的'
			},
			query: { page: 1, limit: 10 }
		}
	},
	async mounted() {
		await getCircle(this.query);
	},
	onLoad() {
		/**
		 * 图片上传成功
		 */
		event.on(structor.upload_success, async ({ cbk, data, extra }) => {
			if (cbk === structor.upload_success) {
				await this.realSend(this.content, data.url);
			}
		});
		/**
		 * 动态获取成功
		 */
		event.on(structor.get_circle, async ({ cbk, data, extra }) => {
			if (cbk === structor.get_circle) {
				if (data.length > 0) {
					this.circle_list.push(...data);
					this.load_status = 'loadmore';
				} else {
					this.load_status = 'nomore';
				}
			}
		});
	},
	onUnload() {
		event.off(structor.upload_success, '*');
		event.off(structor.get_circle, '*');
	},
	methods: {
		async getList() {
			this.load_status = 'loading';
			this.query.page++;
			await await getCircle(this.query);
		},
		async clear() {
			this.showPopup = false;
			this.temp_url = '';
			this.content = '';
			this.blob = null;
			
			this.circle_list = [];
			this.query.page = 1;
			await this.sleep(0.8);
			await getCircle(this.query);
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
		},
		async delCircle(item) {
			uni.showModal({
				title: '确认删除该动态？',
				success: async ({ confirm }) => {
					if (confirm) {
						await delCircle(item);
						this.clear();
					}
				}
			});
		},
		async clickLike(item) {
			await clickLike(item);
			if (item.has_like) {
				item.has_like = false;
				item.likes_num = +item.likes_num - 1;
			} else {
				item.has_like = true;
				item.likes_num = +item.likes_num + 1
			}
		}
	}
}