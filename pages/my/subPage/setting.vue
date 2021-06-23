<!--
 * @Author: zhangyang
 * @Date: 2021-06-21 12:01:06
 * @LastEditTime: 2021-06-21 12:01:26
 * @Description: 设置
-->
<template>
	<view class="content">
		<u-navbar
			title="设置"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		/>
		<div class="main w-full h-full">
			<u-cell-group>
				<u-cell-item icon="none" title="更换手机号" @click="changeTel" />
				<u-cell-item icon="none" title="关于" @click="about" />
			</u-cell-group>
			<div class="m-3 text-center">
				<u-button type="error" plain @click="rmAllChat">清空聊天记录</u-button>
			</div>
			<div class="m-3 text-center">
				<u-button type="success" plain @click="delCache">删除动态缓存</u-button>
			</div>
			<div class="m-3 text-center">
				<u-button type="warning" plain @click="loginOut">退出登录</u-button>
			</div>
		</div>
	</view>
</template>

<script>
import useSetting from '../mixins/useSetting.js';
export default {
	mixins: [useSetting],
	data() {
		return {
			customStyle: {
				border: 'none !important'
			}
		}
	}
}
</script>

<style>

</style>
