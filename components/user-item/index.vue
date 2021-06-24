<template>
	<view class="w-full">
		<scroll-view scroll-y="true" class="p-2 u-border-bottom">
			<view
				v-for="(item, index) in user_list"
				class="item u-border-top"
				:key="index"
				@click="goUserInfo(item)"
			>
				<image mode="aspectFill" :src="getImgUrl(item.avatar)" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.nick || '用户' + item.uid }}</text>
					<text class="msg u-line-2">{{ item.motto || '' }}</text>
				</view>
				<div v-if="!hide_status" class="is_online m-auto">
					<span v-if="item.is_online" class="text-green-400">---在线---</span>
					<span v-else class="text-gray-400">---离线---</span>
				</div>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { setUserInfo, getLoginInfo } from '@/store/login.js';
export default {
	name: 'UserItem',
	props: {
		user_list: { type: Array, default: () => [] },
		hide_status: { type: Boolean, default: false },
	},
	data() {
		return {
			uid: 0
		}
	},
	async mounted() {
		const { uid } = await getLoginInfo();
		this.uid = uid;
	},
	methods: {
		async goUserInfo(e) {
			const { uid } = e;
			if (uid === this.uid) {
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
</script>

<style lang="scss" scoped>
	.content {
		justify-content: start;
	}
	.item {
		display: flex;
		padding: 20rpx;
	}
	
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 50%;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
	
	.msg {
		text-align: right;
		font-size: 20rpx;
		color: #999;
		margin-top: 20rpx;
	}
</style>
