<template>
	<view>
		<u-navbar
			:title="temp_info.nick"
			:background="background_conf"
			:title-color="title_color"
			:border-bottom="false"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		>
			<div v-if="temp_info.is_friend" slot="right">
				<u-icon name="trash" color="#d00" size="36" style="margin-right: 10px;" @tap="del" />
			</div>
		</u-navbar>
		<view class="content">
			<div class="py-12 w-full">
				<u-image class="shadow-xl mx-auto" shape="circle" :src="getImgUrl(temp_info.avatar)" width="420" height="420" />
			</div>
			<div class="info text-white text-center">
				<div class="nick text-xl mb-3">
					{{ temp_info.nick || '用户' + temp_info.uid }}
				</div>
				<div class="uid mb-2">
					账号：{{ temp_info.uid }}
				</div>
				<div class="motto mb-2">
					{{ temp_info.motto || '这个用户很懒，什么都没留下' }}
				</div>
			</div>
			<div class="w-full mt-20 px-5">
				<div v-if="!temp_info.is_friend" class="add">
					<u-button plain @click="sendAdd"><u-icon name="man-add" class="mr-1" />加好友</u-button>
				</div>
				<div v-else class="flex justify-around">
					<u-button class="w-2/5" type="success" @click="sendMsg(0)">发语音</u-button>
					<u-button class="w-2/5" type="warning" @click="sendMsg(1)">发消息</u-button>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
import useUser from '../mixins/useUser.js';
export default {
	mixins: [useUser],
	data() {
		return {
			temp_info: {
				avatar: '',
				nick: '',
				uid: '',
				motto: '',
				send: 0,
				like: 0,
				comment: 0
			}
		}
	}
}
</script>

<style scoped lang="scss">
	.content {
		background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		justify-content: start;
		align-items: center;
	}
</style>