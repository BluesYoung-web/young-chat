import { editInfo } from '@/api/user.js';
import { uploadImg } from '@/api/upload.js';
import net, { event } from '@/core/net.js';
import { structor, base_http } from '@/config.js';
import { sleep } from '@/util/sleep.js';
export default {
	data() {
		return {
			base_http,
			user_info: {
				avatar: '',
				nick: '',
				uid: '',
				motto: ''
			},
			temp_url: '',
			uploaded_url: '',
			edit_nick: false,
			edit_motto: false
		}
	},
	onLoad() {
		event.on(structor.upload_success, async ({ cbk, data, extra }) => {
			if (cbk === structor.upload_success) {
				this.uploaded_url = data.url;
				await this.changeUserInfo();
				this.user_info.avatar = this.uploaded_url;
				this.temp_url = '';
			}
		});
	},
	onUnload() {
		event.off(structor.upload_success, '*');
	},
	methods: {
		chooseImg() {
			uni.chooseImage({
				count: 1,
				success: (_temp) => {
					this.temp_url = _temp.tempFilePaths[0];
				},
				fail: () => {
					this.$u.toast('图片获取失败');
				}
			})
		},
		async changeAvatar({ url }) {
			// #ifdef H5
			function base64ToBlob ({b64data = '', contentType = '', sliceSize = 512} = {}) {
			  return new Promise((resolve, reject) => {
			    // 使用 atob() 方法将数据解码
					let byteCharacters = atob(b64data);
			    let byteArrays = [];
			    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			      let slice = byteCharacters.slice(offset, offset + sliceSize);
			      let byteNumbers = [];
			      for (let i = 0; i < slice.length; i++) {
							byteNumbers.push(slice.charCodeAt(i));
			      }
			      // 8 位无符号整数值的类型化数组。内容将初始化为 0。
			      // 如果无法分配请求数目的字节，则将引发异常。
			      byteArrays.push(new Uint8Array(byteNumbers));
			    }
			    let result = new Blob(byteArrays, {
			      type: contentType
			    });
			    resolve(result);
			  });
			}
			url = await base64ToBlob({b64data: url.split(',')[1], contentType: 'image/png'});
			// #endif
			await uploadImg({ fileName: Date.now() + '.png', blob: url });
		},
		cancelAvatar() {
			this.$u.toast('取消修改头像');
			this.temp_url = '';
		},
		async mod_nick() {
			const nick = this.user_info.nick;
			if (nick.length === 0) {
				this.$u.toast('昵称不得为空');
				return;
			}
			await this.changeUserInfo();
			this.edit_nick = false;
		},
		async mod_motto() {
			const motto = this.user_info.motto;
			if (motto.length === 0) {
				this.$u.toast('签名不得为空');
				return;
			}
			await this.changeUserInfo();
			this.edit_motto = false;
		},
		async changeUserInfo() {
			await editInfo({
				avatar: this.uploaded_url,
				nick: this.user_info.nick,
				motto: this.user_info.motto
			});
			this.$u.toast('修改成功！');
		},
		async copy() {
			// #ifdef H5
			if (window.navigator.clipboard) {
				window.navigator.clipboard.readText().then(() => {
					window.navigator.clipboard.writeText(this.user_info.uid).then(() => {
						this.$u.toast('账号已复制到剪切板');
					}).catch(() => this.$u.toast('权限不足'));
				});
			} else {
				this.$u.toast('暂不支持复制');
			}
			// #endif
			// #ifndef H5
			uni.setClipboardData({
				data: this.user_info.uid,
				success: () => {
					this.$u.toast('账号已复制到剪切板');
				}
			});
			// #endif
		}
	}
}