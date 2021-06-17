<template>
	<view class="content">
		<u-navbar
			title="聊天室"
			:background="background"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
			:custom-back="goBack"
		>
			<div slot="right">
				<u-icon name="more-dot-fill" :color="title_color" size="36" style="margin-right: 10px;" @click="showMenu=true" />
			</div>
		</u-navbar>
		<div class="key-bord" :style="{ bottom: bottom + 'upx' }">
			<key-board
				:is-voice="isVoice"
				:content="inputMsg"
				@input-change="inputChange"
				@input-focus="takeBack"
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
import useBase from '../mixins/useBase.js';
import useRoom from '../mixins/useRoom.js';
import KeyBoard from '@/components/key-board/index.vue';
import Emoji from '@/components/emoji/index.vue';
import ExtMenu from '@/components/ext-menu/index.vue';
export default {
	name: 'ChatRoom',
	components: { KeyBoard, Emoji, ExtMenu },
	mixins: [useBase, useRoom],
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
</style>
