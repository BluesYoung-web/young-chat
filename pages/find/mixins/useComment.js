import { event } from '@/core/net.js';
import { structor } from '@/config.js';
import { getComments, putComments, delComments } from '@/api/circle.js';
export default {
	data() {
		return {
			showPopup: false,
			comments_list: [],
			content: '',
			reply_id: 0,
			autoid: 0,
			owner_id: 0,
			user_info: {}
		}
	},
	async onLoad({ autoid, owner_id }) {
		if (autoid) {
			this.autoid = +autoid;
			this.owner_id = +owner_id;
		} else {
			this.$u.toast('非法进入！');
			await this.sleep(0.8);
			uni.redirectTo({
				url: '/pages/find/subPage/circle'
			});
		}
		
		event.on(structor.get_comments, async ({ cbk, data, extra }) => {
			if (cbk === structor.get_comments) {
				this.comments_list = data;
			}
		});
	},
	onUnload() {
		event.off(structor.get_comments, '*');
	},
	async onShow() {
		await this.getList();
	},
	methods: {
		async getList() {
			await getComments({ autoid: this.autoid });
		},
		async sendComment() {
			await putComments({ autoid: this.autoid, reply_id: this.reply_id, content: this.content });
			this.showPopup = false;
			await this.sleep(0.5);
			await this.getList();
		},
		reply({ user_id }) {
			this.reply_id = user_id;
			this.showPopup = true;
		},
		async delComment(item) {
			uni.showModal({
				title: '确认删除该评论？',
				success: async ({ confirm }) => {
					if (confirm) {
						await delComments(item);
						await this.sleep(0.5);
						await this.getList();
					}
				}
			})
		}
	}
}