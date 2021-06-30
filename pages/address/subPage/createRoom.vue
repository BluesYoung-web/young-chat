<template>
	<view class="content">
		<u-navbar
			title="创建群聊"
			:background="background_conf"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		>
			<div slot="right">
				<u-button type="success" size="mini" class="mr-2" @click="showPopup=true">创建</u-button>
			</div>
		</u-navbar>
		<div class="w-full h-full">
			<div v-if="friend_list.length > 0">
				<user-item :user_list="friend_list" :hide_status="true" :is_check="true" />
			</div>
			<div v-else class="mt-10">
				<u-empty mode="list" text="暂无好友,快去添加好友吧" />
			</div>
		</div>
		<!-- 确认创建 -->
		<u-popup
			v-model="showPopup"
			mode="center"
			width="80%"
			height="22%"
			border-radius="16"
			:closeable="true"
			:mask-close-able="false"
		>
			<view class="w-full h-full flex justify-center items-end">
				<div class="w-full px-3">
					<u-input v-model="content" class="px-2 mt-3" border :auto-height="false" placeholder="请输入群聊名称" />
					<u-button type="success" class="my-3" plain @click="create">确认创建</u-button>
				</div>
			</view>
		</u-popup>
	</view>
</template>

<script>
import useAddress from '../mixins/useAddress.js';
import UserItem from '@/components/user-item/index.vue';
import { createRoom } from '@/api/room.js';
import { event } from '@/core/net.js';
import { structor } from '@/config.js';
import { createRoom as cr, updateRoom as ur } from '@/store/room.js';
export default {
	mixins: [useAddress],
	components: { UserItem },
	data() {
		return {
			showPopup: false,
			content: ''
		}
	},
	async onLoad() {
		event.on(structor.create_room, async ({ cbk, data, extra }) => {
			if (cbk === structor.create_room) {
				this.$u.toast('聊天室创建成功');
				await this.sleep(0.5);
				uni.reLaunch({
					url: '/pages/message/index'
				});
			}
		});
	},
	onUnload() {
		event.off(structor.create_room, '*');
	},
	methods: {
		async create() {
			if (this.content === '') {
				this.$u.toast('群聊名称不得为空！');
				return;
			}
			const uids = this.friend_list.filter((user) => user.select).map((user) => user.uid);
			if (uids.length < 2) {
				this.$u.toast('请至少选择两个人！');
				return;
			}
			await createRoom({ uids, name: this.content });
			this.showPopup = false;
			this.content = '';
		}
	}
}
</script>

<style>
</style>
