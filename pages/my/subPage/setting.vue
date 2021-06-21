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
			:background="background"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		/>
	</view>
</template>

<script>
import useBase from '@/mixins/useBase.js';
export default {
	mixins: [useBase]
}
</script>

<style>
</style>
