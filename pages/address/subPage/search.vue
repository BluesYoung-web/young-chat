<template>
	<view>
		<u-navbar
			title="搜索"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		/>
		<view class="content">
			<div class="w-full py-5 px-2">
				<u-search v-model="id" placeholder="请输入uid | 手机号 | 昵称" @search="search" @custom="search" />
			</div>
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
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import useSearch from '../mixins/useSearch.js';
export default {
	name: 'Search',
	mixins: [useSearch],
	data() {
		return {
			
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
