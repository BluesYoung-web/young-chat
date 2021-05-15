<template>
	<view>
		<!-- 表情键盘组件 -->
		<view class="facesBox" v-show="showEmoji">
			<!-- 表情类型 -->
			<view class="facesHead" >
				<view
					v-for="(item,index) in emojiData"
					:key="index"
					class="type flex flex-vc flex-jc"
					@tap="active = index"
				>
					<image class="type-img" :class="index === active ? 'bg' : ''" :src="item.src" />
				</view>
				<!-- 删除按钮 -->
				<view class="backspace flex flex-vc flex-jc" @tap="$emit('delete')">
					<image class="backspace-img" :src="delImg" />
				</view>
			</view>
			<!-- 表情内容 -->
			<view class="facesContent">
				<scroll-view scroll-y="true" style="height: 500upx;">
					<view class="emoji" v-for="(item, index) in emojiData" :key="index">
						<view v-show="index === active">
							<view
								v-for="(tp,id) in item.emojiList"
								:key="id"
								class="face"
								@tap="$emit('showFaces', tp)"
							>
								{{ tp }}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
const emoji = require('@/static/emojis/emoji.json');
const food = require('@/static/emojis/food.json');
const emojiData = [];
emojiData.push({
	src: '/static/img/emoji/face.png',
	emojiList: Object.values(emoji).map((item) => item.char)
});
emojiData.push({
	src: '/static/img/emoji/food.png',
	emojiList: Object.values(food).map((item) => item.char)
});
export default {
	name:'Emoji',
	props:{
		showEmoji: { type: Boolean,	default: false },
		delImg: { type: String, default: '/static/img/conversation/backspace.png' }
	},
	data() {
		return {
			active: 0,
			emojiData
		};
	}
}
</script>

<style>
.facesContent{
	height: 520upx;
}
.emoji{
	width: 750upx;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.face{
	width: 80upx;
	height: 80upx;
	text-align: center;
	line-height: 80upx;
	display: inline-block;
}
.backspace{
	width: 80upx;
	height: 80upx;
	float: right;
}
.backspace-img{
	width: 60upx;
	height: 60upx;
}
.flex {
	display: box; /* OLD - Android 4.4- */
	display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
	display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
	display: -ms-flexbox; /* TWEENER - IE 10 */
	display: -webkit-flex; /* NEW - Chrome */
	display: flex;

}
/* 垂直居中 */
.flex-vc {
	/* 09版 */
	-webkit-box-align: center;
	/* 12版 */
	-webkit-align-items: center;
	-moz-align-items: center;
	-ms-align-items: center;
	-o-align-items: center;
	align-items: center;
}

.flex-jc { 
	justify-content: center;
}
.type{
	width: 80upx;
	height: 80upx;
	float: left;
}
.type-img{
	width: 50upx;
	height: 50upx;
	border-radius: 50%;
}
.bg{
	background-color: #344955;
}
.facesBox{
	width: 100%;
	height: 600upx;
	background-color: #edf0f2;
	position: fixed;
	bottom: 0;
}
.facesHead{
	height: 80upx;
	background-color: #ffffff;
}
.emojiData{
	border-top:1px solid #CED2D5;
	position: absolute;
	bottom: 0;
	height: 100upx;
	width: 100%;
	display: flex;
	flex-direction: row;
}
</style>
