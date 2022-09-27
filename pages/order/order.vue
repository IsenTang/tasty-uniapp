<template>
	<view class='order-container'>
		<view v-if='isLogin' class='orders-containers'>
			<singleOrder v-for='order in orders' :key='order._id' :order='order' />
		</view>
		<view v-else>
			{{ $t('error.need-login') }}
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from 'vuex';
	import {
		getOrders
	} from '@/api/order.js';
	// * mixin 混合
	import mixinTitle from '@/pages/mixin/title.vue';

	// * 组件
	import singleOrder from '@/pages/order/components/singleOrder.vue';


	export default {
		mixins: [mixinTitle],
		components: {
			singleOrder
		},
		data() {
			return {
				orders: [],
				limit: 4,
				page: 1,
				total: 0
			}
		},
		methods: {
			async loadOrders() {
				const {
					total,
					list
				} = await getOrders({
					userId: this.user._id,
					page: this.page,
					limit: this.limit
				})
				this.total = total;
				this.orders.push(...list);
			}
		},
		computed: {
			...mapGetters(['isLogin']),
			...mapState({
				user: (state) => state.user.user
			})
		},
		watch: {
			// ? 当用户登陆后，自动加载orders
			isLogin(newVal) {
				if (newVal) {
					this.page = 1;
					this.orders = [];
					this.loadOrders()
				}
			}
		},
		onLoad() {
			console.log('onLoad ===>');
			this.page = 1;
			this.orders = [];
			// * 登陆再发送请求
			if (this.isLogin) {
				this.loadOrders()
			}
		},
		onReachBottom() {
			if (this.orders.length >= this.total) {
				return;
			}
			this.page++;
			this.loadOrders()
		},
		async onPullDownRefresh() {
			this.page = 1;
			this.orders = [];
			console.log('onPullDownRefresh')
			await this.loadOrders();
			uni.stopPullDownRefresh();
		},
	}
</script>

<style scoped>
	.order-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.orders-containers {
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx;
	}
</style>
