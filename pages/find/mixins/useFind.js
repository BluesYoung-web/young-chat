export default {
	data() {
		return {
			hasNewCircle: false
		}
	},
	methods: {
		goCircle() {
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