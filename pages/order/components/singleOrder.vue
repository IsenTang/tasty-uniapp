<template>
	<view class='single-order-container'>
		<view class='restaurant-name'>{{ order.restaurant.name[lang]}} </view>
		<view class='order-time'>{{ order.createdAt | formatTime }}</view>
		<view class='cart-container'>
			<view v-for='(v,key) in cart' :key='key' class='cart-item'>
				<view>{{ v[0].name[lang] }}x{{ v.length }}</view>
				<view>{{v[0].price * v.length | currencyUSD }}</view>
			</view>
		</view>

		<view class='payment-container'>
			<view>
				支付方式:
			</view>
			<view>
				{{ payment }}
			</view>
		</view>
		<view class='total-container'>
			<view>总价:</view>
			<view>{{ total | currencyUSD }}</view>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash';
	import moment from 'moment';
	import {
		mapState
	} from 'vuex';

	export default {
		props: {
			order: {
				type: Object,
				default: () => ({})
			}
		},
		computed: {
			...mapState({
				lang: (state) => state.language.lang
			}),
			cart() {
				return _.groupBy(this.order.cart, '_id');
			},
			total() {
				let sum = 0;
				_.forEach(this.order.cart, (item) => {
					sum += item.price
				});
				return sum;
			},
			payment() {
				switch (this.order.payment) {
					case 'wechat':
						return '微信支付'
						break;
					case 'aliPay':
						return '支付宝'
					default:
						return '未知'
						break;
				}
			}
		},
		filters: {
			formatTime(v) {
				return moment(v).format('YYYY-MM-DD HH:mm:ss')
			}
		}
	}
</script>

<style scoped>
	.single-order-container {
		width: 100%;
		height: 300px;
		margin-top: 30rpx;
		border-radius: 40rpx;
		box-shadow: 0 10rpx 20rpx 0 rgba(208, 208, 208, 0.5);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.restaurant-name {
		width: 100%;
		display: flex;
		height: 30px;
		align-items: center;
		justify-content: center;
	}

	.order-time {
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid darkgray;
	}

	.payment-container {
		display: flex;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		height: 30px;
		justify-content: space-between;
		align-items: center;
	}

	.cart-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		height: calc(300px - 30px - 30px - 30px - 50px);
		overflow: auto;
	}

	.cart-item {
		display: flex;
		height: 30px;
		justify-content: space-between;
		align-items: center;
	}

	.total-container {
		width: 100%;
		height: 50px;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
