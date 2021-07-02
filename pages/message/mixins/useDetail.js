import { structor } from '@/config.js';
import { event } from '@/core/net.js';
import { getRoomDetail, modRoomInfo, quitRoom } from '@/api/room.js';
import { uploadImg } from '@/api/upload.js';
import { createRoom, updateRoom, clearRecord, delRoom } from '@/store/room.js';
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
			/**
			 * 获取聊天室详情
			 */
			event.on(structor.get_room_detail, async ({ cbk, data, extra }) => {
				if (cbk === structor.get_room_detail) {
					this.room_info = data;
				}
			});
			/**
			 * 图片上传成功
			 */
			event.on(structor.upload_success, async ({ cbk, data, extra }) => {
				if (cbk === structor.upload_success) {
					this.room_info.cover = data.url;
					await this.changeRoomInfo();
				}
			});
			/**
			 * 聊天室信息修改成功
			 */
			event.on(structor.mod_room_info, async ({ cbk, data, extra }) => {
				if (cbk === structor.mod_room_info) {
					this.room_info = data;
					const room = createRoom({ ...data, content: '', send_time: Date.now() })
					await updateRoom(room, this.user_info.uid);
					this.$u.toast('修改成功！');
				}
			});
			/**
			 * 退出聊天室
			 */
			event.on(structor.quit_room, async ({ cbk, data, extra }) => {
				if (cbk === structor.quit_room) {
					this.$u.toast(data.msg);
					await this.sleep(0.8);
					await delRoom(this.room_info);
					if (extra === structor.success) {
						await clearRecord(this.room_id);
					}
					uni.reLaunch({
						url: '/pages/message/index'
					});
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
		event.off(structor.quit_room, '*');
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
		},
		clearRecord() {
			uni.showModal({
				content: '删除之后将无法恢复',
				success: async ({ confirm }) => {
					if (confirm) {
						const room = createRoom({ ...this.room_info, content: '', send_time: Date.now() })
						await updateRoom(room, this.user_info.uid);
						await clearRecord(this.room_id);
						this.$u.toast('已删除聊天记录')
						await this.sleep(0.5);
						uni.reLaunch({
							url: '/pages/message/index'
						});
					}
				}
			})
		},
		quitRoom() {
			uni.showModal({
				title: '确认退出群聊',
				content: this.user_info.uid === this.room_info.owner ? '你是群主，退出即解散群聊' : '',
				success: async ({ confirm }) => {
					if (confirm) {
						await quitRoom({ room_id: this.room_id });
					}
				}
			});
		}
	}
}