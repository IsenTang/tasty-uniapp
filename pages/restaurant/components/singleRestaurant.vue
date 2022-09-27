<template>
	<view :class="['restaurant-container',{ expand : isExpand }]" @touchstart="expand(true)" @touchend="expand(false)"
		@tap="toMenu">
		<view class='restaurant-name'>
			{{ restaurant.name[lang] }}
		</view>
		<view class='tag-container'>{{ getTags(restaurant) }}</view>
		<view class='imgs-container'>
			<dishFood :image="defaultItems[0].image" />
		</view>
	</view>
</template>

<script>
	import _ from 'lodash';
	import {
		mapState
	} from 'vuex';

	// * mixin
	import minxiDefaultItems from '@/pages/mixin/defaultItem.vue';
	import mixinTags from '@/pages/mixin/tags.vue';

	// * components
	import dishFood from '@/pages/restaurant/components/dishFood.vue'

	export default {
		mixins: [mixinTags, minxiDefaultItems],
		components: {
			dishFood
		},
		props: {
			restaurant: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				isExpand: false
			}
		},
		computed: {
			...mapState({
				lang: (state) => state.language.lang
			})
		},
		methods: {
			expand(v) {
				this.isExpand = v;
			},
			toMenu() {
				uni.navigateTo({
					url: `/pages/menu/menu?id=${this.restaurant._id}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	.restaurant-container {
		width: 650rpx;
		height: 100%;
		height: 400px;
		padding: 20rpx;
		margin-bottom: 40rpx;
	}

	.restaurant-name {
		height: 50px;
		width: 100%;
		font-size: 20px;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tag-container {
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.expand {
		border-radius: 40rpx;
		box-shadow: 0 10rpx 20rpx 0 rgba(208, 208, 208, 0.5);
	}

	.imgs-container {
		width: 100%;
		margin-top: 20px;
		height: calc(400px - 50px - 30px);
		box-sizing: border-box;
	}
</style>
