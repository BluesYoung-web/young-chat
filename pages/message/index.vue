<template>
	<view>
		<view class="content">
			<u-navbar
				title="消息"
				:background="background"
				:title-color="title_color"
				back-icon-name=""
				:custom-back="() => null"
			>
				<div slot="right">
					<u-icon name="list" :color="title_color" size="36" style="margin-right: 10px;" @click="showMenu=true" />
				</div>
			</u-navbar>
			<u-action-sheet v-model="showMenu" :list="menus" @click="clickMenu" />
			<scroll-view scroll-y="true" class="list">
				<msg-list
					v-if="chatRooms.length > 0"
					:chat-rooms="chatRooms"
					@open-change="openChange"
					@click-menu="listOperate"
					@click-into="clickInto"
				/>
				<u-empty v-else mode="history" />
			</scroll-view>
		</view>
		<u-no-network />
	</view>
</template>

<script>
import MsgList from '@/components/msg-list/index.vue';
import useBase from '@/mixins/useBase.js';
import useList from './mixins/useList.js';
import { sleep } from '@/util/sleep.js';
export default {
	name: 'Message',
	components: { MsgList },
	mixins: [useBase, useList],
	data() {
		return {
			
		}
	},
	async onPullDownRefresh() {
		console.log('下拉了');
		await sleep(3);
		uni.stopPullDownRefresh();
	},
	onTabItemTap() {
		uni.startPullDownRefresh();
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
	.list {
		margin-top: 40upx 0;
		height: calc(100vh - 80upx);
	}
	.content {
		background-color: $uni-bg-color;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
