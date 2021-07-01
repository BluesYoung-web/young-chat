<template>
	<view class="content">
		<u-navbar
			:title="title"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
			:custom-back="goBack"
		>
			<div v-if="+owner !== 0" slot="right">
				<u-icon name="more-dot-fill" :color="title_color" size="36" style="margin-right: 10px;" @click="goDetail" />
			</div>
		</u-navbar>
		<div class="record w-full">
			<scroll-view
				scroll-y="true"
				class="w-full h-full"
				:scroll-with-animation="true"
				:scroll-top="scrollTop"
				id="sc"
			>
				<chat-record :msg-list="msg_list" />
			</scroll-view>
		</div>
		<div class="key-bord" :style="{ bottom: bottom + 'upx' }">
			<key-board
				:is-voice="isVoice"
				:content="inputMsg"
				@input-change="inputChange"
				@input-focus="clear"
				@input="getContent"
				@show-emoji="showEmojiBoard"
				@send="sendText"
				@plus="showPlusBoard"
			/>
			<emoji :show-emoji="showEmoji" @add-emoji="addEmoji" @delete="deleteMsg" />
			<ext-menu :show-plus="showPlus" :plus-menu="plusMenu" @click-item="clickItem" />
		</div>
	</view>
</template>

<script>
import useRoom from '../mixins/useRoom.js';
import KeyBoard from '@/components/key-board/index.vue';
import Emoji from '@/components/emoji/index.vue';
import ExtMenu from '@/components/ext-menu/index.vue';
import ChatRecord from '@/components/chat-record/index.vue';
export default {
	name: 'ChatRoom',
	components: { KeyBoard, Emoji, ExtMenu, ChatRecord },
	mixins: [useRoom],
	data() {
		return {
			
		}
	}
}
</script>

<style lang="scss" scoped>
.key-bord{
	position: fixed;
	width: 100%;
	background-color: $young-bg-bot;
	padding-top: 10upx;
	padding-bottom: 20upx;
}
.record {
	height: calc(100vh - 180upx);
	margin-top: 80upx;
	margin-bottom: 100upx;
}
</style>
