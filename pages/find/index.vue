<template>
	<view class="content">
		<u-navbar
			title="发现"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name=""
			:custom-back="() => null"
		>
			<!-- <div slot="right">
				<u-icon name="plus" :color="title_color" size="36" style="margin-right: 10px;" />
			</div> -->
		</u-navbar>
		<div class="w-full h-full">
			<u-cell-group class="px-2">
				<u-cell-item icon="moments" :icon-style="{ color: wx_green }" title="动态" :arrow="false" @click="goCircle">
					<span slot="right-icon">
						<u-badge v-show="hasNewCircle" :is-dot="true" />
						<u-icon name="arrow-right" />
					</span>
				</u-cell-item>
				<u-cell-item icon="server-fill" :icon-style="{ color: '#007aff' }" title="BBBUG 点歌聊天室" :arrow="false" @click="goBBBUG">
					<span slot="right-icon">
						<u-icon name="arrow-right" />
					</span>
				</u-cell-item>
				<u-cell-item icon="home" :icon-style="{ color: '#f29100' }" title="我的智能家居" :arrow="false" @click="goIOT">
					<span slot="right-icon">
						<u-icon name="arrow-right" />
					</span>
				</u-cell-item>
			</u-cell-group>
		</div>
	</view>
</template>

<script>
import useFind from './mixins/useFind.js';
export default {
	mixins: [useFind],
	data() {
		return {
		}
	},
	onLoad() {

	},
	methods: {

	}
}
</script>

<style lang="scss">
	.content {
		justify-content: start;
	}
</style>
