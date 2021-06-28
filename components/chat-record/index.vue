<template>
	<view class="w-full h-full">
		<div v-for="(item, index) in MsgList" :key="index + '_msg_'">
			<p class="bg-gray-500 shadow rounded mx-24 my-2 text-gray-400 bg-opacity-10 text-center">{{ useTimeFormat(item.show_time) }}</p>
			<!-- 系统消息 -->
			<div v-if="item.msg_type === 0">
				<p class="text-center text-gray-400 text-xs">
					系统消息：{{ item.content }}
				</p>
			</div>
			<!-- 文本消息 -->
			<div v-if="item.msg_type === 1">
				<!-- 当前用户发的靠右，其余的靠左 -->
				<!-- <div v-if=""> -->
				<div class="flex" :class="isMe(+item.send_id) ? 'flex-row-reverse justify-start mr-1' : 'ml-1'">
					<u-image :src="getImgUrl(item.extra[item.send_id].avatar)" width="72" height="72" shape="circle" />
					<span class="msg rounded p-2 shadow" :class="isMe(+item.send_id) ? 'bg-blue-100 mr-2 triangle-me' : 'bg-green-100 ml-2 triangle-other' ">{{ item.content }}</span>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
import { getLoginInfo } from '@/store/login.js';
export default {
	name: 'ChatRecord',
	props: {
		MsgList: { type: Array, default: () => [] }
	},
	async mounted() {
		const { uid } = await getLoginInfo() || 0;
		this.uid = uid;
	},
	data() {
		return {
			uid: 0
		}
	},
	methods: {
		isMe(uid) {
			return this.uid === +uid;
		}
	}
}
</script>

<style>
.msg {
	max-width: 550upx;
}
.triangle-me, .triangle-other {
	position: relative;
}
.triangle-me::after {
	content: '';
	width: 0;
	height: 0;
	position: absolute;
	right: -25upx;
	top: 20upx;
	border-top: 15upx solid transparent;
	border-right: 15upx solid transparent;
	border-bottom: 15upx solid transparent;
	border-left: 15upx solid rgb(219, 234, 254);
}
.triangle-other::before {
	content: '';
	width: 0;
	height: 0;
	position: absolute;
	left: -25upx;
	top: 20upx;
	border-top: 15upx solid transparent;
	border-left: 15upx solid transparent;
	border-bottom: 15upx solid transparent;
	border-right: 15upx solid rgb(209, 250, 229);
}

</style>
