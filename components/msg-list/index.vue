<template>
	<view>
		<u-swipe-action
			v-for="(item, index) in chatRooms"
			:key="item.room_id"
			:show="item.show"
			:index="index"
			:options="options"
			@click="click"
			@open="open"
			@content-click="$emit('click-into', item)"
		>
			<view class="item u-border-bottom">
				<image mode="aspectFill" :src="getImgUrl(item.img)" />
				<u-badge :count="item.msg_num" :offset="[100, 20]" />
				<div class="flex w-full flex-col justify-around">
					<div class="flex justify-between items-center">
						<text class="text-gray-900">{{ item.title }}</text>
						<text class="text-gray-400 text-xs">{{ useTimeAgo(item.show_time) }}</text>
					</div>
					<text class="msg text-xs text-gray-400 one-line-ellipsis">{{ item.msg }}</text>
				</div>
			</view>
		</u-swipe-action>
	</view>
</template>

<script>
export default {
	name: 'MsgList',
	props: {
		chatRooms: { type: Array, default: () => [],
		},
		options: {
			type: Array, default: () => [
				{
					text: '已读',
					style: {
						backgroundColor: 'rgb(254, 156, 1)'
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}
			]
		},
	},
	data() {
		return {
			
		};
	},
	methods: {
		click(index, did) {
			this.$emit('click-menu', index, did);
		},
		// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
		open(index) {
			this.$emit('open-change', index);
		}
	}
}
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		padding: 20rpx;
	}
	
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	.msg {
		width: 480upx;
	}
</style>
