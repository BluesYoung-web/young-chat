<!--
 * @Author: zhangyang
 * @Date: 2021-06-21 11:59:06
 * @LastEditTime: 2021-06-21 11:59:47
 * @Description: 编辑个人资料
-->
<template>
	<view class="content">
		<u-navbar
			title="编辑资料"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		/>
		<div class="main w-full h-full">
			<u-cell-group>
				<u-cell-item icon="none" title="用户头像" @click="chooseImg">
					<u-image slot="right-icon" :src="getImgUrl(user_info.avatar)" shape="circle" width="100" height="100" />
				</u-cell-item>
				<u-cell-item icon="none" title="昵称" @click="edit_nick = true">
					<span slot="right-icon">{{ user_info.nick }}</span>
				</u-cell-item>
				<u-cell-item icon="none" title="账号" :arrow="false" @click="copy">
					<span slot="right-icon">{{ user_info.uid }}</span>
				</u-cell-item>
				<u-cell-item icon="none" title="个性签名" @click="edit_motto=true">
					<span slot="right-icon">{{ user_info.motto }}</span>
				</u-cell-item>
			</u-cell-group>
		</div>
		<clip
			v-show="temp_url"
			:image-url="temp_url"
			:quality="0.75"
			@success="changeAvatar"
			@cancel="cancelAvatar"
		/>
		<!-- 修改昵称 -->
		<u-modal
			v-model="edit_nick"
			title="修改昵称"
			confirm-text="保存"
			:show-cancel-button="true"
			@confirm="mod_nick"
		>
			<view class="px-5">
				<u-input v-model="user_info.nick" placeholder="请输入昵称(不超过10个字)" :trim="true" :maxlength="10" />
			</view>
		</u-modal>
		<!-- 修改签名 -->
		<u-modal
			v-model="edit_motto"
			title="修改签名"
			confirm-text="保存"
			:show-cancel-button="true"
			@confirm="mod_motto"
		>
			<view class="px-5">
				<u-input v-model="user_info.motto" type="textarea" placeholder="请输入签名(不超过20个字)" :trim="true" :maxlength="20" />
			</view>
		</u-modal>
	</view>
</template>

<script>
import useEdit from '../mixins/useEidt.js';
import Clip from '@/uni_modules/lime-clipper/components/lime-clipper/';
export default {
	name: 'Edit',
	mixins: [useEdit],
	components: { Clip },
	data() {
		return {
			
		}
	}
}
</script>

<style>
</style>
