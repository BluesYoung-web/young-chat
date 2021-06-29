<template>
	<view class="w-full h-full">
		<div v-for="(item, index) in MsgList" :key="index + '_msg_'">
			<p class="bg-gray-500 shadow rounded mx-24 my-2 text-gray-400 bg-opacity-10 text-center">{{ showTime(item, index) }}</p>
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
					<u-image :src="getImgUrl(item.send_avatar)" width="72" height="72" shape="circle" />
					<span class="msg rounded p-2 shadow" :class="isMe(+item.send_id) ? 'bg-blue-100 mr-2 triangle-me' : 'bg-green-100 ml-2 triangle-other' ">{{ item.content }}</span>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
import { getCurrentUserInfo } from '@/store/login.js';
export default {
	name: 'ChatRecord',
	props: {
		MsgList: { type: Array, default: () => [] }
	},
	async mounted() {
		this.user_info = await getCurrentUserInfo();
	},
	data() {
		return {
			user_info: {
				uid: 0,
				avatar: ''
			}			
		}
	},
	methods: {
		isMe(uid) {
			return this.user_info.uid === +uid;
		},
		showTime({ send_time }, index) {
			let diff = 0;
			
			if (index > 0) {
				diff = send_time - this.MsgList[index - 1].send_time;
			} else {
				diff = Date.now() - send_time;
			}
			
			if (diff < 1000 * 60 * 3) {
				// 三分钟内，不显示
				return '';
			} else if (diff < 1000 * 60 * 60 * 24 * 3) {
				// 三天内显示相对时间
				return this.useTimeAgo(send_time);
			}
			// 其他情况，显示完整时间
			return this.useTimeFormat(send_time);
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
