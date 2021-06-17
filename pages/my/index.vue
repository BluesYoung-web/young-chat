<template>
	<view class="content">
		<u-navbar
			title="我的"
			:background="background"
			:title-color="title_color"
			:border-bottom="false"
			back-icon-name=""
			:custom-back="() => null"
		>
			<div slot="right">
				<u-icon name="setting" :color="title_color" size="36" style="margin-right: 10px;" @tap="goSetting" />
			</div>
		</u-navbar>
		<div class="user-card py-32 w-full flex items-center justify-center">
			<u-image class="shadow-xl" shape="circle" :src="user_info.avatar" width="420" height="420" />
		</div>
		<div class="info text-white text-center">
			<div class="nick text-xl">
				{{ user_info.nick }}
			</div>
			<div class="uid">
				账号：{{ user_info.uid }}
			</div>
			<div class="motto">
				{{ user_info.motto || '这个用户很懒，什么都没留下' }}
			</div>
		</div>
		<div class="btn my-8">
			<u-button @tap="edit">编辑资料</u-button>
		</div>
		<div class="w-full h-full px-20 flex justify-between text-white">
			<p class="flex flex-col text-center">
				<span>发表</span>
				<span>{{ user_info.send }}</span>
			</p>
			<p class="flex flex-col text-center">
				<span>点赞</span>
				<span>{{ user_info.like }}</span>
			</p>
			<p class="flex flex-col text-center">
				<span>评论</span>
				<span>{{ user_info.comment }}</span>
			</p>
		</div>
	</view>
</template>

<script>
import color from '@/uni.scss';
export default {
	data() {
		return {
			background: { backgroundColor: color.young_bg },
			title_color: color.young_title,
			user_info: {
				avatar: '/static/img/my/avatar.jpg',
				nick: '我是昵称',
				uid: '754433271',
				motto: '米龙传说-刀截剑-金色天际线',
				send: 123,
				like: 456,
				comment: 789
			}
		}
	},
	onLoad() {

	},
	methods: {
		goSetting() {
			console.log('设置');
		},
		edit() {
			console.log('编辑个人信息');
		}
	}
}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		height: calc(100vh - 80upx);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}
</style>
