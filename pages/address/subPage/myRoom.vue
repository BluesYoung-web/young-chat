<template>
	<view class="content">
		<u-navbar
			title="我的群聊"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		/>
		<scroll-view v-if="room_list.length > 0" scroll-y="true">
			<div class="w-full h-full">
				<div
					v-for="(item, index) in room_list"
					:key="index + 'sfawea3'"
					class="p-2 m-1 rounded shadow bg-blue-100 flex items-center"
					@click="goRoom(item)"
				>
					<u-image class="shadow" :src="getImgUrl(item.cover)" width="100" height="100" shape="circle" />
					<span class="ml-2 text-gray-700">{{ item.name }}</span>
				</div>
				
			</div>
		</scroll-view>
		<div v-else class="w-full h-full">
			<u-empty mode="data" text="快去建群聊天吧" />
		</div>
	</view>
</template>

<script>
import { getRoomList } from '@/api/room.js';
import { event } from '@/core/net.js';
import { structor } from '@/config.js';
import { updateRoom, createRoom } from '@/store/room.js';
export default {
	data() {
		return {
			room_list: []
		}
	},
	async onLoad() {
		event.on(structor.get_room_list, async ({ cbk, data, extra }) => {
			if (cbk === structor.get_room_list) {
				this.room_list = data;
			}
		});
	},
	onUnload() {
		event.off(structor.get_room_list, '*');
	},
	async onShow() {
		await getRoomList();
	},
	methods: {
		async goRoom(room) {
			const r = await createRoom({ ...room, content: '[草稿]', send_time: Date.now() });
			await updateRoom(r);
			uni.navigateTo({
				url: `/pages/message/subPage/chatRoom?room_id=${room.autoid}&title=${room.name}&owner=${room.owner}`
			});
		}
	}
}
</script>

<style>
.content {
	justify-content: flex-start;
}
</style>
