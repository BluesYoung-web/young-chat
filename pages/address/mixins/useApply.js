import { getFriendApplyList, operateFriendApply } from '@/api/user.js';
import { event } from '@/core/net.js';
import { structor } from '@/config.js';
export default {
	data() {
		return {
			i_send: [],
			to_me: []
		}
	},
	onLoad() {
		event.on(structor.get_friend_apply_list, async ({ cbk, data, extra }) => {
			if (cbk === structor.get_friend_apply_list) {
				const { from = [], to = [] } = data;
				this.i_send = from;
				this.to_me = to;
				console.log(data)
			}
		});
	},
	onUnload() {
		event.off(structor.get_friend_apply_list, '*');
	},
	async onShow() {
		await this.getList();
	},
	methods: {
		async getList() {
			await getFriendApplyList();
		},
		async operateApply(item, is_agree) {
			const params = { autoid: item.autoid, from: item.from, is_agree };
			await operateFriendApply(params);
			await this.sleep(0.5);
			await this.getList();
		}
	}
}