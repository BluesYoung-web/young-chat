<template>
	<view class="content">
		<h1>消息</h1>
	</view>
</template>

<script>
	import color from '@/uni.scss';
	import { getLoginInfo } from '@/store/login.js';
	export default {
		data() {
			return {
				background: { backgroundColor: color.young_bg },
				title_color: color.young_title
			}
		},
		async onLoad() {
			const info = await getLoginInfo().catch(() => {
				this.$u.toast('请先去登录');
				setTimeout(() => {
					this.$u.route({
						url: '/pages/login/index',
						type: 'reLaunch'
					});
				}, 800);
			});
			if (!!info) {
				const { uid, token } = info;
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		background-color: $young-bg;
		width: 100vw;
		height: 100vh;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
