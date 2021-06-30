<template>
	<view class="ct">
		<!-- 语音/文字输入 -->
		<view class="voice" @tap="$emit('input-change')">
			<image v-if="isVoice" class="voice-img" src="/static/img/conversation/keyboard.png" />
			<image v-else class="voice-img" src="/static/img/conversation/voice.png" />
		</view>
		<!-- 消息输入框 -->
		<view class="keyboardInput">
			<!-- 语音输入 -->
			<button
				v-if="isVoice"
				type="default"
				class="keyboardInput-button"
				@longpress="startRecord"
				@touchstart="cancelVoice"
				@touchend="endRecord"
			>按住 说话</button>
			<!-- 文字输入 -->
			<textarea
				v-else
				:auto-focus="!isVoice"
				:focus="!isVoice"
				class="keyboardInput-textarea"
				v-model="ct"
				auto-height="true"
				type="text"
				@tap="$emit('input-focus')" 
				@input="$emit('input', $event.target.value)"
			/>
		</view>
		<!-- 取消语音弹框 -->
		<view class="cancelVoice" v-show="pressActive">
			<view class="flex flex-jc flex-vc" style="width: 100%;height: 200upx;">
				<image class="cancelVoice-image" src="/static/img/conversation/cancelVoice.png" />
			</view>	
			<view class="flex flex-jc" style="width: 100%;height: 50upx;">
				<text>向上滑动，取消发送</text>
			</view>		
		</view>
		<!-- 表情键盘按钮 -->
		<view class="faces">
			<image class="voice-img" src="/static/img/conversation/face.png" @tap="$emit('show-emoji')" />
		</view>
		<!-- 消息发送按钮/加号 -->
		<view class="messageSend" v-if="ct.length > 0">
			<image src="/static/img/conversation/send.png" @tap="$emit('send')" class=" messageSend-image" />
		</view>
		<view class="plus" v-else>
			<image src="/static/img/conversation/plus.png" @tap="$emit('plus')" class="plus-img" />
		</view>
	</view>
</template>

<script>
//获取录音权限相关
const recorderManager = uni.getRecorderManager();
export default {
	name: 'KeyBoard',
	props: {
		isVoice: { type: Boolean, default: false },
		content: { type: String, default: '' }
	},
	data(){
		return {
			ct: '',
			voicePath: '',
			swiper: '',
			pressActive: false
		}
	},
	onLoad() {
		// 注册录音结束的回调函数
		recorderManager.onStop((res)=>{
			this.voicePath = res.tempFilePath;
			if(this.swiper === true){
				// 录音结束，上传，自动发送
				console.log(res.tempFilePath);
			}else {
				console.log('取消发送');
			}
		});
	},
	watch: {
		content(newValue, oldValue) {
			this.ct = newValue;
		}
	},
	methods:{
		/**
		 * 长按开始录音，取消录音提示框出现
		 */
		startRecord() {
			// #ifdef H5
			uni.showToast({
				icon: 'none',
				title: '浏览器暂不支持发送语音'
			});
			// #endif
			// #ifdef APP-PLUS
			this.timer = setInterval(() => {
				this.intervalTime += 0.5;
				if (this.intervalTime >= 0.5 && !this.pressActive) {
					// 如果用户录制的时间太短,就不会去开启录音
					console.log("开始录音");
					this.pressActive = true;
					this.intervalTime = 0;
					recorderManager.start({
						format: 'mp3'
					});
				}
			}, 500);
			// #endif
		},
		/**
		 * 可能要取消发送语音
		 */
		cancelVoice(e){
			console.log('开始滑动');
			this.swiper = e.changedTouches[0].clientY;
		},
		/**
		 * 松开手指，录音结束/上滑取消发送，取消录音提示框消失
		 */
		endRecord(e) {
			// #ifdef APP-PLUS
			let end = e.changedTouches[0].clientY;
			this.pressActive = false;
			clearInterval(this.timer);
			recorderManager.stop();
			console.log('录音结束');
			if(this.swiper - end > 80){
				// 取消发送
				this.swiper = false;
			}else {
				// 正常发送
				this.swiper = true;
			}
			// #endif
		},
	}
}
</script>

<style>
	.ct{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.voice{
		width: 120upx;
		display: flex;
		justify-content: center;
	}
	.voice-img{
		width: 70upx;
		height: 70upx;
	}
	.cancelVoice{
		width: 250upx;
		height: 250upx;
		color: #ffffff;
		font-size: 25upx;
		background-color: #edf0f2;
		position: fixed;
		bottom: 500upx;
		left: 250upx;
		z-index: 5;
	}
	.cancelVoice-image{
		width: 200upx;
		height: 200upx;
	}
	.keyboardInput{
		background-color: #FFFFFF;
		border: 1upx solid $young-bg-bot;
		width: 400upx;
		border-radius: 15upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.keyboardInput-textarea{
		width: 400upx;
		min-height: 40upx;
		max-height: 200upx;
		font-size: 32upx;
		line-height: 40upx;
		padding: 10upx;
	}
	.keyboardInput-button{
		width: 400upx;
		height: 65upx;
		line-height: 65upx;
	}
	.faces{
		width: 100upx;
		margin-left: 10upx;
		display: flex;
		justify-content: center;
	}
	.messageSend{
		margin-left: 20upx;
		height: 70upx;
		width: 70upx;
		border: 1upx solid $young-bg-bot;
		border-radius: 50%;
		background-color: #F9AA33;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.messageSend-image{		
		height: 35upx;
		width: 35upx;
	}
	.plus{
		margin-left: 20upx;
		margin-bottom: -10upx;
	}
	.plus-img{
		width: 65upx;
		height: 65upx;
	}
	.flex {
		display: box; /* OLD - Android 4.4- */
		display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
		display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
		display: -ms-flexbox; /* TWEENER - IE 10 */
		display: -webkit-flex; /* NEW - Chrome */
		display: flex;

	}
	/* 垂直居中 */
	.flex-vc {
		/* 09版 */
		-webkit-box-align: center;
		/* 12版 */
		-webkit-align-items: center;
		-moz-align-items: center;
		-ms-align-items: center;
		-o-align-items: center;
		align-items: center;
	}

	.flex-jc { 
		justify-content: center;
	}
</style>
