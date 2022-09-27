<template>
	<view class="food-item" @tap='add'>
		<view class='food-name'>
			<view>{{ food.name[lang] }}</view>
			<view>{{ food.price | currencyUSD }}</view>
		</view>

		<view v-if='food.count !== 0' class='food-price'>
			<view class='sub-btn' @click.stop='sub'>-</view>
			<view class='count'>{{ food.count }}</view>
			<view class='add-btn' @click.stop='add'>+</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import _ from 'lodash';
	export default {
		props: {
			food: {
				type: Object,
				default: () => ({})
			}
		},
		computed: {
			...mapState({
				lang: (state) => state.language.lang
			}),
		},
		methods: {
			...mapMutations(['addFood', 'subFood']),
			add() {
				this.$emit('add', this.food);
				this.addFood({
					food: this.food
				})
			},
			sub() {
				this.$emit('sub', this.food);
				this.subFood({
					food: this.food
				})
			}
		}
	}
</script>

<style scoped>
	.food-item {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}


	.food-name {
		flex: 1;
	}

	.food-price {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.sub-btn {
		width: 40rpx;
		height: 50rpx;
		background-color: black;
		border-bottom-left-radius: 20rpx;
		border-top-left-radius: 20rpx;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.add-btn {
		width: 40rpx;
		height: 50rpx;
		background-color: black;
		border-bottom-right-radius: 20rpx;
		border-top-right-radius: 20rpx;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.count {
		width: 40px;
		height: 50rpx;
		background-color: black;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
