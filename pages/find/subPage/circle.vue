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
		<view v-if="circle_list.length > 0" class="content">
			123
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
					<u-input v-model="content" class="px-2 mt-3" border :auto-height="false" type="textarea" placeholder="说点什么吧" />
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
