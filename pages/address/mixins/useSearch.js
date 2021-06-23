import { search } from '@/api/user.js';
import { structor, base_http } from '@/config.js';
import { event } from '@/core/net.js';
import { setUserInfo } from '@/store/login.js';
export default {
	data() {
		return {
			id: '',
			base_http,
			user_list: []
		}
	},
	onLoad() {
		event.on(structor.search_user, async ({ cbk, data, extra }) => {
			if (cbk === structor.search_user) {
				if (data.length === 0) {
					this.$u.toast('查无此人');
				} else {
					this.user_list = data;
				}
			}
		});
	},
	onUnload() {
		event.off(structor.search_user, '*');
	},
	methods: {
		search() {
			search({ id: this.id });
		},
		async goUserInfo(e) {
			const { uid } = e;
			if (uid === this.user_info.uid) {
				uni.reLaunch({
					url: `/pages/my/index`
				});
			} else {
				await setUserInfo(e);
				uni.navigateTo({
					url: `/pages/address/subPage/user?uid=${e.uid}`
				});
			}
		}
	}
}