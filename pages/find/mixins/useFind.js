export default {
	data() {
		return {
			hasNewCircle: false
		}
	},
	methods: {
		goCircle() {
			this.$u.toast('进入动态');
		},
		goBBBUG() {
			this.$u.toast('敬请期待')
		},
		goIOT() {
			this.$u.toast('敬请期待')
		}
	}
}