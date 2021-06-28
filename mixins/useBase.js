import color from '@/uni.scss';
import { getLoginInfo } from '@/store/login.js';
import { getCurrentUserInfo } from '@/store/login.js';
import { sleep } from '@/util/sleep.js';
import { base_http } from '@/config.js';
import { getThisUserInfo } from '@/api/user.js';
import moment from 'moment';
moment.locale('zh-cn');
export default {
	data() {
		return {
			background_conf: { backgroundColor: color.young_bg },
			title_color: color.young_title,
			wx_green: color.young_wx_green,
			sleep
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
		await getThisUserInfo();
		this.user_info = await getCurrentUserInfo();
	},
	methods: {
		getImgUrl(src) {
			if (src) {
				return (src.indexOf('/static') === 0 || src.indexOf('blob') === 0) ? src : `${base_http}${src}`;
			}
			return '/static/img/my/avatar.jpg';
		},
		previewImg(e) {
			uni.previewImage({
				urls: [e]
			});
		},
		useTimeAgo(time) {
			const show_time = moment.duration(moment(time).diff(moment.now())).humanize(true);
			return show_time || '日期不合法';
		},
		useTimeFormat(timestamp) {
			return moment(timestamp).format('lll') || '时间不合法';
		},
		hasPermission(uid) {
			return this.user_info.uid === uid;
		}
	}
}