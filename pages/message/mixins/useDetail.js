import { structor } from '@/config.js';
import { event } from '@/core/net.js';
import { getRoomDetail, modRoomInfo } from '@/api/room.js';
import { uploadImg } from '@/api/upload.js';
import { createRoom, updateRoom } from '@/store/room.js';
export default {
	data() {
		return {
			room_id: 0,
			edit_name: false,
			room_info: {
				autoid: 0,
				cover: '',
				name: '',
				owner: 0,
				users: [
					{ uid: 0, metadata: { nick: '', avatar: '' } }
				]
			}
		}
	},
	async onLoad({ room_id }) {
		if (room_id) {
			this.room_id = room_id;
			event.on(structor.get_room_detail, async ({ cbk, data, extra }) => {
				if (cbk === structor.get_room_detail) {
					this.room_info = data;
				}
			});
			event.on(structor.upload_success, async ({ cbk, data, extra }) => {
				if (cbk === structor.upload_success) {
					this.room_info.cover = data.url;
					await this.changeRoomInfo();
				}
			});
			event.on(structor.mod_room_info, async ({ cbk, data, extra }) => {
				if (cbk === structor.mod_room_info) {
					this.room_info = data;
					const room = createRoom({ ...data, content: '', send_time: Date.now() })
					await updateRoom(room, this.user_info.uid);
					this.$u.toast('修改成功！');
				}
			});
		} else {
			this.$u.toast('非法进入！');
			await this.sleep(0.5);
			uni.reLaunch({
				url: '/pages/message/index'
			});
		}
	},
	onUnload() {
		event.off(structor.get_room_detail, '*');
		event.off(structor.upload_success, '*');
		event.off(structor.mod_room_info, '*');
	},
	async onShow() {
		await this.getDetail();
	},
	methods: {
		async getDetail() {
			await getRoomDetail({ room_id: this.room_id });
		},
		async changeAvatar() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				success: async (res) => {
					const blob = res.tempFiles[0];
					await uploadImg({ fileName: Date.now() + '.png', blob });
				},
				fail: (_) => {
					uni.showToast({
						title:"取消或加载超时",
						icon:"none"
					});
				},
			});
		},
		async changeRoomInfo() {
			const params = {
				cover: this.room_info.cover,
				name: this.room_info.name,
				room_id: this.room_id,
			};
			await modRoomInfo(params);
		}
	}
}