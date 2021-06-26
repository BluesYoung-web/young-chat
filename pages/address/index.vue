<template>
	<view class="content">
		<u-navbar
			title="好友"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name=""
			:custom-back="() => null"
		>
			<div slot="right">
				<u-icon name="plus" :color="title_color" size="36" style="margin-right: 10px;" @click="goSearch" />
			</div>
		</u-navbar>
		<div class="w-full h-full">
			<u-search class="px-2 py-2" :show-action="false" placeholder="请输入昵称" @change="localSearch" />
			<u-cell-group class="px-2">
				<u-cell-item icon="man-add-fill" :icon-style="{ color: wx_green }" title="新的朋友" :arrow="false" @click="goApply">
					<span slot="right-icon">
						<u-badge v-show="hasNewApply" :is-dot="true" />
						<u-icon name="arrow-right" />
					</span>
				</u-cell-item>
				<u-cell-item icon="chat-fill" :icon-style="{ color: '#007aff' }" title="我的群聊" :arrow="false" @click="goRoom">
					<span slot="right-icon">
						<u-icon name="arrow-right" />
					</span>
				</u-cell-item>
			</u-cell-group>
			<div v-if="friend_list.length > 0">
				<user-item :user_list="friend_list" />
			</div>
			<div v-else class="mt-10">
				<u-empty mode="list" text="暂无好友,快去添加好友吧" />
			</div>
		</div>
	</view>
</template>

<script>
import useAdress from './mixins/useAddress.js';
import UserItem from '@/components/user-item/index.vue';
export default {
	mixins: [useAdress],
	components: { UserItem },
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

<style lang="scss" scoped>
	.list {
		margin-top: 40upx 0;
		height: calc(100vh - 80upx);
	}
	.content {
		background-color: $uni-bg-color;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
