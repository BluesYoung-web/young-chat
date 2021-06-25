<template>
	<view>
		<u-navbar
			title="评论列表"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		/>
		<view v-if="comments_list.length > 0">
			<scroll-view scroll-y="true"  class="content">
				<view class="">
					<div
						v-for="(item, index) in comments_list"
						:key="index"
						class="w-full h-full px-2 py-3"
					>
						<div class="bg-blue-100 shadow rounded p-2">
							<div class="flex justify-between">
								<div class="flex  items-center">
									<u-image :src="getImgUrl(item.user_avatar)" width="66" height="66" shape="circle" />
									<span class="text-gray-600 ml-2">{{ item.user_nick }}</span>
									<span class="text-gray-400 ml-2">发表于：{{ useTimeAgo(item.time) }}</span>
								</div>
								<div class="flex items-start" @click="delCircle(item)">
									<u-icon v-if="hasPermission(item.user_id)" name="trash" color="red" size="32" />
								</div>
							</div>
							<div class="p-2">
								<p>{{ item.content }}</p>
							</div>
						</div>
					</div>
				</view>
			</scroll-view>
		</view>
		<view v-else class="content">
			<u-empty mode="history" />
		</view>
		<!-- 发表动态弹出层 -->
		<u-popup
			v-model="showPopup"
			mode="center"
			width="80%"
			height="38%"
			border-radius="16"
			:closeable="true"
			:mask-close-able="false"
		>
			<view class="w-full h-full flex justify-center items-end">
				<div class="w-full px-3">
					<u-input v-model="content" class="px-2 mt-3" border :auto-height="false" type="textarea" placeholder="说点什么吧(请勿输入emoji!!!)" />
					<u-button type="success" class="my-3" plain @click="sendComment">发布</u-button>
				</div>
			</view>
		</u-popup>
	</view>
</template>

<script>
import useComment from '../mixins/useComment.js';
export default {
	mixins: [useComment],
	data() {
		return {
			
		}
	}
}
</script>

<style>
</style>
