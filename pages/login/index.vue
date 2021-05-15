<template>
	<view class="content">
		<div class="logo">
			<u-image width="500rpx" height="500rpx" src="@/static/img/login/logo.png" />
		</div>
		<div class="form">
			<u-form :model="form" :error-type="['message','border-bottom']" ref="uForm" >
				<u-form-item prop="tel">
					<u-input v-model.trim="form.tel" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item prop="passwd">
					<u-input v-model.trim="form.passwd" placeholder="请输入密码" type="password" />
				</u-form-item>
				<u-form-item prop="code">
					<u-input v-model.trim="form.code" placeholder="请输入验证码" />
					<div v-html="code_src" @click="getCaptcha" />
				</u-form-item>
			</u-form>
		</div>
		<div class="button">
			<u-button @click="login">登 录</u-button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			const telValidator = (rule, value, cbk) => {
				return this.$u.test.mobile(value);
			};
			const codeValidator = async (rule, value, cbk) => {
				if (this.real_code.toLowerCase() === this.form.code.toLowerCase()) {
					cbk();
				} else {
					await this.getCaptcha();
					cbk(new Error('验证码错误，请重新输入'));
				}
			};
			return {
				code_src: '',
				real_code: '',
				form: {
					tel: '',
					passwd: '',
					code: ''
				},
				rules: {
					tel: [
						{ required: true, message: '请输入手机号', trigger: 'blur'},
						{ message: '请输入合法手机号', trigger: 'blur', validator: telValidator }
					],
					passwd: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 8, message: '长度在6~8个字符之间', trigger: 'blur' },
					],
					code: [
						{ required: true, message: '请输入验证码', trigger: 'blur' },
						{ trigger: 'blur', asyncValidator: codeValidator }
					]
				}
			}
		},
		async onShow() {
			await this.getCaptcha();
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			async getCaptcha() {
				const { text, data } = await this.$api.getCaptcha();
				this.real_code = text;
				this.code_src = data;
			},
			login() {
				this.$refs.uForm.validate(async (valid) => {
					if (valid) {
						const res = await this.$api.login({
							tel: this.form.tel,
							passwd: this.form.passwd
						});
						this.$u.toast('登录成功');
						setTimeout(() => {
							this.$u.route({
								url: '/pages/message/index',
								type: 'reLaunch'
							});
						}, 800);
					}
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-image: url(@/static/img/login/bg.jpg);
		width: 100vw;
		height: 100vh;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.form {
		width: 70%;
		height: 500upx;
		/deep/.uni-input-input {
			color: $young-title !important;
		}
	}
	.button {
		width: 70%;
	}
</style>
