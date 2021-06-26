<template>
	<view>
		<u-navbar
			title="好友申请列表"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		/>
		<view class="content p-2">
			<u-section title="待处理的申请" :right="false" font-size="32" color="#555" />
			<div
				class="bg-blue-100 flex items-center p-1 w-full justify-around rounded shadow mt-3"
				v-for="(item, index) in to_me"
				:key="index + 'l1'"
			>
				<div class="flex flex-col items-center">
					<u-image :src="getImgUrl(item.from_avatar)" width="80" height="80" shape="circle" />
					<p class="text-xs mt-1">{{ item.from_nick }}</p>
				</div>
				<p class="mx-2 w-1/2 text-gray-500">{{ item.msg }}</p>
				<div v-if="item.state === 0">
					<u-button type="success" size="mini" @click="operateApply(item, true)">同意</u-button>
					<u-button class="mx-2" type="error" size="mini" @click="operateApply(item, false)">拒绝</u-button>
				</div>
				<div v-else>
					{{ item.state === 1 ? '已同意': '已拒绝' }}
				</div>
			</div>
			<u-section class="my-3" title="我发出的申请" :right="false" font-size="32" color="#555" />
			<div
				class="bg-blue-100 flex items-center p-1 w-full rounded shadow mt-3"
				v-for="(item, index) in i_send"
				:key="index + 'l2'"
			>
				<div class="flex flex-col items-center">
					<u-image :src="getImgUrl(item.to_avatar)" width="80" height="80" shape="circle" />
					<p class="text-xs mt-1">{{ item.to_nick }}</p>
				</div>
				<p class="ml-4 w-1/2 text-gray-500">{{ item.msg }}</p>
			</div>
		</view>
	</view>
</template>

<script>
import useApply from '../mixins/useApply.js';
export default {
	mixins: [useApply]
}
</script>

<style>
.content {
	justify-content: start;
	align-items: flex-start;
}
</style>
