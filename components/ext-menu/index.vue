<template>
	<view>
		<!-- 扩展面板 -->
		<view class="picBox" v-show="showPlus">
			<view class="menu" v-for="(item, index) in plusMenu" :key="index">
				<view @click="$emit('click-item', item)" class="border">
					<image class="menu-item" :src="item.src" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ExtMenu',
	props: {
		showPlus: { type: Boolean, default: false },
		plusMenu: { type: Array, default: () => [] }
	},
}
</script>

<style>
.picBox{
	border-top: 1px solid #CED2D5;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 600upx;
	background-color: #FFFFFF;
	overflow: auto;
}
.menu{
	display: inline-flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.border{
	margin-top: 30upx;
	margin-left: 40upx;
	padding: 20upx 20upx;
	border:1px solid #666666;
	width: 140upx;
	height: 140upx;
	line-height: 140upx;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border-radius: 10upx;
}
.menu-item{
	width: 80upx;
	height: 80upx;
}
</style>

