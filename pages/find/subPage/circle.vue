<template>
	<view>
		<u-navbar
			title="动态"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		>
			<div slot="right">
				<u-icon name="camera" :color="title_color" size="36" style="margin-right: 10px;" @click="clickCamera" />
			</div>
		</u-navbar>
		<view v-if="circle_list.length > 0">
			<scroll-view scroll-y="true"  class="content">
				<view class="">
					<div
						v-for="(item, index) in circle_list"
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
							<div v-if="item.url" class="flex justify-center rounded my-3">
								<u-image :src="getImgUrl(item.url)" width="620" height="620" border-radius="15" @click="previewImg(getImgUrl(item.url))" />
							</div>
							<div class="flex justify-around">
								<p @click="clickLike(item)">
									<u-icon v-if="!item.has_like" name="heart" size="34" />
									<u-icon v-else name="heart-fill" size="34" color="red" />
									<span class="ml-1">{{ item.likes_num }}</span>
								</p>
								<p>
									<u-icon name="chat" size="34" />
									<span class="ml-1">{{ item.comments_num }}</span>
								</p>
							</div>
						</div>
					</div>
					
					<u-loadmore :status="load_status" :load-text="load_text" @loadmore="getList" />
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
			:height="temp_url === '' ? '38%' : '82%'"
			border-radius="16"
			:closeable="true"
			:mask-close-able="false"
		>
			<view class="w-full h-full flex justify-center items-end">
				<div class="w-full px-3">
					<u-image v-show="temp_url" class="m-auto" border-radius="15" :src="getImgUrl(temp_url)" width="550" height="550" />
					<u-input v-model="content" class="px-2 mt-3" border :auto-height="false" type="textarea" placeholder="说点什么吧(请勿输入emoji!!!)" />
					<u-button type="success" class="my-3" plain @click="sendCircle">发布</u-button>
				</div>
			</view>
		</u-popup>
	</view>
</template>

<script>
import useCircle from '../mixins/useCircle.js';
export default {
	mixins: [useCircle],
	data() {
		return {
			
		}
	}
}
</script>

<style>
</style>
