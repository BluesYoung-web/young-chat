<template>
	<view class="content">
		<h1>我的</h1>
	</view>
</template>

<script>
	import color from '@/uni.scss';
	export default {
		data() {
			return {
				background: { backgroundColor: color.young_bg },
				title_color: color.young_title
			}
		},
		onLoad() {

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
