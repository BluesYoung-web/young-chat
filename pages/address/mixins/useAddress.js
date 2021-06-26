import { getFriendsList } from '@/api/user.js';
import { event } from '@/core/net.js';
import { structor } from '@/config.js';
import { getApplyStatus, setApplyStatus } from '@/store/status.js';
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
		uni.hideTabBarRedDot({
			index: 1
		});
		const { flag } = await getApplyStatus();
		this.hasNewApply = flag;
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
		async goApply() {
			this.hasNewApply = false;
			await setApplyStatus({ flag: false });
			uni.navigateTo({
				url: '/pages/address/subPage/apply'
			});
		},
		goRoom() {
			this.$u.toast('群列表')
		}
	}
}