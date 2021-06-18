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
			<u-image class="shadow-xl" shape="circle" :src="user_info.avatar || '/static/img/my/avatar.jpg'" width="420" height="420" />
		</div>
		<div class="info text-white text-center">
			<div class="nick text-xl">
				{{ user_info.nick || '用户' + user_info.uid }}
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
</template>

<script>
import color from '@/uni.scss';
import { getCurrentUserInfo } from '@/store/login.js';
import { editInfo } from '@/api/user.js';
export default {
	data() {
		return {
			background: { backgroundColor: color.young_bg },
			title_color: color.young_title,
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
	async onLoad() {
		this.user_info = await getCurrentUserInfo();
	},
	methods: {
		goSetting() {
			console.log('设置');
		},
		edit() {
			console.log('编辑个人信息');
			editInfo({ 
				avatar: '3rugfkjdasjahdksfjhalsd',
				nick: 'fdsafasdfa',
				motto: 'fsdfadsfase232423423',
				tel: 32243423432423
			})
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
