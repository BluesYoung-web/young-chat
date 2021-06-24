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
			<user-item :user_list="user_list" :hide_status="true" />
		</view>
	</view>
</template>

<script>
import useSearch from '../mixins/useSearch.js';
import UserItem from '@/components/user-item/index.vue';
export default {
	name: 'Search',
	components: { UserItem },
	mixins: [useSearch],
	data() {
		return {
			
		}
	}
}
</script>
<style>
.content {
	justify-content: start;
}
</style>