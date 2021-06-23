<template>
	<view>
		<u-navbar
			title="我的"
			:background="background_conf"
			:title-color="title_color"
			:border-bottom="false"
			back-icon-name=""
			:custom-back="() => null"
		>
			<div slot="right">
				<u-icon name="setting" :color="title_color" size="36" style="margin-right: 10px;" @tap="goSetting" />
			</div>
		</u-navbar>
		<view class="content">
			<div class="py-12 w-full">
				<u-image class="shadow-xl mx-auto" shape="circle" :src="getImgUrl(user_info.avatar)" width="420" height="420" />
			</div>
			<div class="info text-white text-center">
				<div class="nick text-xl mb-1">
					{{ user_info.nick || '用户' + user_info.uid }}
				</div>
				<div class="uid mb-1">
					账号：{{ user_info.uid }}
				</div>
				<div class="motto">
					{{ user_info.motto || '这个用户很懒，什么都没留下' }}
				</div>
			</div>
			<div class="btn mt-6 mb-10">
				<u-button @tap="edit">编辑资料</u-button>
			</div>
			<div class="w-full h-full px-20 flex justify-between text-white">
				<p class="flex flex-col text-center">
					<span>发表</span>
					<span>{{ user_info.send || 0 }}</span>
				</p>
				<p class="flex flex-col text-center">
					<span>点赞</span>
					<span>{{ user_info.like || 0 }}</span>
				</p>
				<p class="flex flex-col text-center">
					<span>评论</span>
					<span>{{ user_info.comment || 0 }}</span>
				</p>
			</div>
		</view>
	</view>
</template>

<script>
export default {
	name: 'My',
	data() {
		return {
			user_info: {
				avatar: '',
				nick: '',
				uid: '',
				motto: '',
				send: 0,
				like: 0,
				comment: 0
			}
		}
	},
	methods: {
		goSetting() {
			uni.navigateTo({
				url: './subPage/setting'
			});
		},
		edit() {
			uni.navigateTo({
				url: './subPage/edit'
			});
		}
	}
}
</script>

<style scoped lang="scss">
	.content {
		background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}
</style>
