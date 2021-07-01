<template>
	<view class="content">
		<u-navbar
			title="群聊详情"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		/>
		<div class="w-full flex justify-center bg-gray-100">
			<u-image
				class="my-5"
				:src="getImgUrl(room_info.cover)"
				width="180"
				height="180"
				shape="circle"
				@click="changeAvatar"
			/>
		</div>
		<div class="w-full flex justify-start items-start bg-gray-100">
			<div class="flex m-1" v-for="(item, index) in room_info.users" :key="index + 'sdsaase'">
				<u-image :src="getImgUrl(item.metadata.avatar)" width="65" height="65" shape="circle" />
			</div>
		</div>
		<u-cell-group>
			<u-cell-item icon="none" title="群名称" @click="edit_name=true">
				<span slot="right-icon">{{ room_info.name }}</span>
			</u-cell-item>
		</u-cell-group>
		<!-- 修改群名 -->
		<u-modal
			v-model="edit_name"
			title="修改昵称"
			confirm-text="保存"
			:show-cancel-button="true"
			@confirm="changeRoomInfo"
		>
			<view class="px-5">
				<u-input v-model="room_info.name" placeholder="请输入群聊名称(不超过10个字)" :trim="true" :maxlength="10" />
			</view>
		</u-modal>
	</view>
</template>

<script>
import useRoom from '../mixins/useDetail.js';
export default {
	mixins: [useRoom]
}
</script>

<style>
.content {
	justify-content: flex-start;
}
</style>
