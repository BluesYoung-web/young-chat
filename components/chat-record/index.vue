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
				<div class="flex" :class="isMe(+item.send_id) ? 'flex-row-reverse justify-start mr-1' : 'ml-1'">
					<u-image :src="getImgUrl(item.send_avatar)" width="72" height="72" shape="circle" />
					<span class="msg rounded p-2 shadow" :class="isMe(+item.send_id) ? 'bg-blue-100 mr-2 triangle-me' : 'bg-green-100 ml-2 triangle-other' ">{{ item.content }}</span>
				</div>
			</div>
			<!-- 图片消息 -->
			<div v-if="item.msg_type === 2">
				<!-- 当前用户发的靠右，其余的靠左 -->
				<div class="flex" :class="isMe(+item.send_id) ? 'flex-row-reverse justify-start mr-1' : 'ml-1'">
					<u-image :src="getImgUrl(item.send_avatar)" width="72" height="72" shape="circle" />
					<span class="msg rounded p-2 shadow" :class="isMe(+item.send_id) ? 'bg-blue-100 mr-2 triangle-me' : 'bg-green-100 ml-2 triangle-other' ">
						<u-image :src="getImgUrl(item.content)" width="300" height="300" border-radius="8" @click="previewImg(getImgUrl(item.content))" />
					</span>
				</div>
			</div>
			<!-- 语音/音频 消息 -->
			<div v-if="item.msg_type === 3">
				<!-- 当前用户发的靠右，其余的靠左 -->
				<div class="flex" :class="isMe(+item.send_id) ? 'flex-row-reverse justify-start mr-1' : 'ml-1'">
					<u-image :src="getImgUrl(item.send_avatar)" width="72" height="72" shape="circle" />
					<span class="msg rounded p-2 shadow" :class="isMe(+item.send_id) ? 'bg-blue-100 mr-2 triangle-me' : 'bg-green-100 ml-2 triangle-other' ">
						<u-image :class="isMe(+item.send_id) ? 'transform rotate-180' : ''" src="/static/img/conversation/voice.png" width="50" height="50" shape="circle" @click="playAudio(item.content)" />
					</span>
				</div>
			</div>
			<!-- 其他消息，暂无 -->
			<div v-if="item.msg_type === 4">
				<!-- 当前用户发的靠右，其余的靠左 -->
				<div class="flex" :class="isMe(+item.send_id) ? 'flex-row-reverse justify-start mr-1' : 'ml-1'">
					<u-image :src="getImgUrl(item.send_avatar)" width="72" height="72" shape="circle" />
					<span class="msg rounded p-2 shadow" :class="isMe(+item.send_id) ? 'bg-blue-100 mr-2 triangle-me' : 'bg-green-100 ml-2 triangle-other' ">
						{{ item.content }}
					</span>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
import { getCurrentUserInfo } from '@/store/login.js';
const mp3 = uni.createInnerAudioContext();
mp3.autoplay = true;
mp3.onCanplay(() => {
	mp3.play();
  console.log('开始播放');
});
mp3.onError((res) => {
  uni.showToast({
  	icon: 'none',
		title: '播放出错'
  });
});
export default {
	name: 'ChatRecord',
	props: {
		MsgList: { type: Array, default: () => [] }
	},
	async mounted() {
		this.user_info = await getCurrentUserInfo();
	},
	beforeDestroy() {
		mp3.stop();
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
		},
		playAudio(url) {
			const realUrl = this.getImgUrl(url);
			uni.downloadFile({
				url: realUrl,
				success: (res) => {
					console.log(res);
					mp3.src = res.tempFilePath;
				}
			})
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
