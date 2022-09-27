<template>
	<view :class="['cart-container',{ 'cart-container-expand': isExpand }]" @click.self.stop='expand(false)'>
		<view :class="['main-container',{ '.main-container-expand': isExpand },{ 'not-active': !isActive }]"
			@click.stop="">
			<view class="page-body" v-if='isExpand'>
				<view class="page-section page-section-gap">
					<map style="width: 100%; height: 200px;" :latitude="latitude" :longitude="longitude"
						:markers="covers" :scale='13'>
					</map>
				</view>
			</view>

			<view class='picker-container' v-if='isExpand'>
				<picker @change="onPickerChange" :value="paymentIndex" :range="payments" class="pick-input">
					{{payments[paymentIndex]}}
				</picker>
			</view>

			<scroll-view v-if='isExpand' class='cart-item-container' :scroll-y="true">
				<view v-for='foods in grounpCart' :key='foods[0]._id' class='cart-food-item'>
					<view>{{ foods[0].name[lang]}} x {{ foods.length }}</view>
					<view>{{ foods[0].price | currencyUSD }}</view>
				</view>
			</scroll-view>
			<view class='checkout-container' @tap.stop='expand(true)'>
				<view>{{ $t('menu.total') }}</view>
				<view>{{ total | currencyUSD }}</view>
			</view>
			<button class='checkout-btn' hover-class="checkout-btn-hover" v-if='isExpand' @click='checkout'>
				{{ $t('menu.place-order') }}
			</button>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from 'vuex'
	import _ from 'lodash';
	import {
		placeOrder
	} from '@/api/order.js'

	export default {
		props: {
			restaurantId: {
				type: String,
				default: () => ''
			}
		},
		data() {
			return {
				isExpand: false,
				latitude: 0,
				longitude: 0,
				covers: [],
				paymentIndex: 1,
				payments: ['微信', '支付宝']
			}
		},
		methods: {
			expand(v) {
				if (this.cart.length) {
					// * 获取当前地址
					if (v) {
						this.getLocation();
					}
					this.isExpand = v;
				}
			},
			onPickerChange(e) {
				this.paymentIndex = e.detail.value;
			},
			getLocation() {
				const that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() {
						uni.getLocation({
							success(data) {
								that.latitude = data.latitude;
								that.longitude = data.longitude;
								that.covers = [{
									id: 0,
									width: 20,
									height: 20,
									latitude: data.latitude,
									longitude: data.longitude,
									iconPath: '../../../static/location.png'
								}]
							},
							fail(err) {
								console.log(err)
							}
						})
					},
					fail(error) {
						console.log('error', error);
					}
				})
			},
			// * 下单
			async checkout(v) {
				// * 先检查是否登陆
				if (!this.isLogin) {
					uni.showModal({
						content: this.$i18n.t('error.need-login'),
						showCancel: true,
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/mine/mine'
								})
							}
						},
					})
				} else {
					const payment = this.payments[this.paymentIndex] ? 'wechat' : 'aliPay';
					// * 付款
					await placeOrder({
						payment,
						cart: this.cart,
						userId: this.user._id,
						restaurantId: this.restaurantId
					})
					uni.switchTab({
						url: '/pages/order/order'
					})
				}
			}
		},
		computed: {
			...mapGetters(['total', 'isLogin']),
			...mapState({
				user: (state) => state.user.user,
				lang: (state) => state.language.lang,
				cart: (state) => state.cart.cart
			}),
			grounpCart() {
				return _.groupBy(this.cart, '_id')
			},
			isActive() {
				return this.cart.length !== 0
			}
		},
	}
</script>

<style scoped>
	.cart-container {
		position: fixed;
		bottom: 50rpx;
		left: 0;
		height: 80rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cart-container-expand {
		bottom: 0;
		height: 100vh;
		align-items: flex-end;
		background-color: rgba(1, 1, 1, 0.3);
	}

	.main-container {
		width: 90%;
		height: 80rpx;
		background-color: black;
		border-radius: 35rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.main-container-expand {
		height: 60%;
		margin-bottom: 20rpx;
		transition: height 1s;
		flex-direction: column;
		padding: 20rpx;
		background-color: aliceblue;
		color: black;
	}

	.picker-container {
		height: 50rpx;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-radius: 25rpx;
		box-shadow: 0 10rpx 20rpx 0 rgba(208, 208, 208, 0.5);
		margin-top: 20rpx;
	}

	.pick-input {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		padding: 0 20rpx;
	}

	.cart-item-container {
		height: calc(100% - 80rpx - 200px - 80rpx -50rpx - 20rpx);
		box-sizing: border-box;
		padding: 20rpx;
		display: flex;
		width: 100%;
		flex-direction: column;
		color: black;
		overflow: auto;
	}

	.cart-food-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.checkout-container {
		display: flex;
		height: 80rpx;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		transition: background-color 1s;
	}

	.not-active {
		background-color: grey;
	}

	.checkout-btn {
		height: 80rpx;
		width: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: black;
		color: white;
		border-radius: 35rpx;
	}

	.checkout-btn-hover {
		background-color: #29cc8c;
	}

	.page-body {
		width: 100%;
	}
</style>
