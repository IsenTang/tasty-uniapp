<template>
	<view>
		<view class='all-restaurant-container'>
			<singleRestaurant v-for='restaurant in restaurants' :restaurant='restaurant' :key='restaurant._id' />
		</view>
	</view>
</template>

<script>
	import _ from 'lodash';
	import {
		getRestaurants
	} from '@/api/restaurant.js';
	// 混入
	import mixinRestaurant from '@/pages/mixin/restaurant.vue';
	import mixinTitle from '@/pages/mixin/title.vue'
	// 组件
	import singleRestaurant from '@/pages/restaurant/components/singleRestaurant.vue';

	export default {
		mixins: [mixinRestaurant, mixinTitle],
		name: 'restaurant',
		components: {
			singleRestaurant
		},
		data() {
			return {
				restaurants: []
			}
		},
		methods: {
			async loadRestaurant() {
				const restaurants = await getRestaurants();
				this.sortRestaurant(restaurants)
			},
			sortRestaurant(restaurants) {
				restaurants = _.orderBy(restaurants, ['featured', 'zscore'], ['desc', 'desc']);
				const openArray = [];
				const closeArray = [];
				restaurants.forEach((item) => {
					if (this.checkRestaurantClose(item)) {
						closeArray.push(item);
					} else {
						openArray.push(item);
					}
				})
				this.restaurants = openArray.concat(closeArray)
			}
		},
		onLoad() {
			this.loadRestaurant();
		}
	}
</script>

<style lang='scss' scoped>
	.all-restaurant-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
