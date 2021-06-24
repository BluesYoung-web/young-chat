import color from '@/uni.scss';
import { getLoginInfo } from '@/store/login.js';
import { getCurrentUserInfo } from '@/store/login.js';
import { sleep } from '@/util/sleep.js';
import { base_http } from '@/config.js';
export default {
	data() {
		return {
			background_conf: { backgroundColor: color.young_bg },
			title_color: color.young_title,
			wx_green: color.young_wx_green
		}
	},
	async onLoad() {
		const info = await getLoginInfo().catch(async () => {
			this.$u.toast('请先去登录');
			await sleep(0.8)
			this.$u.route({
				url: '/pages/login/index',
				type: 'reLaunch'
			});
		});
		if (!!info) {
			const { uid, token } = info;
		}
	},
	async onShow() {
		this.user_info = await getCurrentUserInfo();
	},
	methods: {
		getImgUrl(src) {
			if (src) {
				return src.indexOf('/static') === 0 ? src : `${base_http}${src}`;
			}
			return '/static/img/my/avatar.jpg'
		}
	}
}