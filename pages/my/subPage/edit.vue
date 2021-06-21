<!--
 * @Author: zhangyang
 * @Date: 2021-06-21 11:59:06
 * @LastEditTime: 2021-06-21 11:59:47
 * @Description: 编辑个人资料
-->
<template>
	<view class="content">
		<u-navbar
			title="编辑资料"
			:background="background"
			:title-color="title_color"
			back-icon-name="arrow-left"
			:back-icon-color="title_color"
			:back-icon-size="34"
		/>
		<div class="main w-full h-full">
			<u-cell-group>
				<u-cell-item icon="none" title="用户头像" @click="chooseImg">
					<u-image slot="right-icon" :src="user_info.avatar.indexOf('/static') === 0 ? user_info.avatar : `${base_http}${user_info.avatar}`" shape="circle" width="100" height="100" />
				</u-cell-item>
				<u-cell-item icon="none" title="昵称">
					<span slot="right-icon">{{ user_info.nick }}</span>
				</u-cell-item>
				<u-cell-item icon="none" title="账号" :arrow="false">
					<span slot="right-icon">{{ user_info.uid }}</span>
				</u-cell-item>
				<u-cell-item icon="none" title="个性签名">
					<span slot="right-icon">{{ user_info.motto }}</span>
				</u-cell-item>
			</u-cell-group>
		</div>
		<clip
			v-show="temp_url"
			:image-url="temp_url"
			:quality="0.75"
			@success="changeAvatar"
			@cancel="cancelAvatar"
		/>
	</view>
</template>

<script>
import useBase from '@/mixins/useBase.js';
import { editInfo } from '@/api/user.js';
import { uploadImg } from '@/api/upload.js';
import Clip from '@/uni_modules/lime-clipper/components/lime-clipper/';
import net, { event } from '@/core/net.js';
import { structor, base_http } from '@/config.js';

export default {
	name: 'Edit',
	mixins: [useBase],
	components: { Clip },
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
			uploaded_url: ''
		}
	},
	onLoad() {
		event.on(structor.upload_success, async ({ cbk, data, extra }) => {
			if (cbk === structor.upload_success) {
				this.uploaded_url = data.url;
				this.changeUserInfo();
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
			// #ifdef APP-PLUS
			console.log(url);
			return;
			// #endif
			await uploadImg({ fileName: Date.now() + '.png', blob: url });
		},
		cancelAvatar() {
			this.$u.toast('取消修改头像');
			this.temp_url = '';
		},
		async changeUserInfo() {
			await editInfo({
				avatar: this.uploaded_url,
				nick: this.user_info.nick,
				motto: this.user_info.motto
			});
			this.user_info.avatar = `${base_http}${this.uploaded_url}`;
			this.temp_url = '';
		}
	}
}
</script>

<style>
</style>
