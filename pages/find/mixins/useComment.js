import { event } from '@/core/net.js';
import { structor } from '@/config.js';
// import { sendCircle, getComment, delCircle, clickLike } from '@/api/circle.js';
export default {
	data() {
		return {
			showPopup: false,
			comments_list: [],
			content: ''
		}
	},
	async mounted() {
		// await getComment(this.query);
	},
	onLoad() {
		
	},
	onUnload() {
		
	},
	methods: {
		async getList() {
			
		},
		async sendComment() {
			console.log('发布');
		}
	}
}