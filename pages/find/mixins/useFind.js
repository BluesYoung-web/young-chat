import { event } from '@/core/net.js';
import { structor } from '@/config.js';
import { getCircleStatus, setCircleStatus } from '@/store/status.js';
export default {
	data() {
		return {
			hasNewCircle: false
		}
	},
	async onShow() {
		const { flag } = await getCircleStatus();
		this.hasNewCircle = flag;
		uni.hideTabBarRedDot({
			index: 2
		});
	},
	methods: {
		async goCircle() {
			this.hasNewCircle = false;
			await setCircleStatus({ flag: false });
			uni.navigateTo({
				url: '/pages/find/subPage/circle'
			});
		},
		goBBBUG() {
			this.$u.toast('敬请期待')
		},
		goIOT() {
			this.$u.toast('敬请期待')
		}
	}
}