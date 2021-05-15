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
			@content-click="$emit('click-into', item.room_id)"
		>
			<view class="item u-border-bottom">
				<image mode="aspectFill" :src="item.img" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.title }}</text>
					<text class="msg u-line-2">{{ item.msg }}</text>
				</view>
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
