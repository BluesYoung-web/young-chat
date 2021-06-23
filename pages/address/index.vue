<template>
	<view class="content">
		<h1>联系人</h1>
		<u-button @click="getFriendsList">获取好友列表</u-button>
	</view>
</template>

<script>
import { getFriendsList } from '@/api/user.js';
export default {
	data() {
		return {
		}
	},
	onLoad() {

	},
	methods: {
		async getFriendsList() {
			await getFriendsList();
		}
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
