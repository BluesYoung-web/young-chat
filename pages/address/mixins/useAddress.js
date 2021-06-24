import { getFriendsList } from '@/api/user.js';
import { event } from '@/core/net.js';
import { structor } from '@/config.js';
export default {
	data() {
		return {
			hasNewApply: false,
			friend_list: [],
			friend_list_all: []
		}
	},
	onLoad() {
		event.on(structor.get_friend_list, async ({ cbk, data, extra }) => {
			if (cbk === structor.get_friend_list) {
				this.friend_list = data;
				this.friend_list_all = data;
			}
		});
	},
	onUnload() {
		event.off(structor.get_friend_list, '*');
	},
	async onShow() {
		await getFriendsList();
	},
	methods: {
		goSearch() {
			uni.navigateTo({
				url: '/pages/address/subPage/search'
			});
		},
		localSearch(e) {
			e = e.trim();
			if (e) {
				this.friend_list = this.friend_list_all.filter((item) => item.nick.includes(e));
			} else {
				this.friend_list = this.friend_list_all.slice();
			}
		},
		goApply() {
			this.$u.toast('好友申请列表')
		},
		goRoom() {
			this.$u.toast('群列表')
		}
	}
}