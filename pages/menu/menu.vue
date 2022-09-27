<template>
	<view>
		<view class='restaurant-container'>
			<view class='restaurant-name'>
				{{ restaurant.name[lang] }}
			</view>
			<view>
				{{ getTags(restaurant) }}
			</view>
		</view>
		<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="2000" :duration="1000">
			<swiper-item>
				<img src="../../static/tasty1.jpeg" alt="" class='swiper-img'>
			</swiper-item>
			<swiper-item>
				<img src="../../static/tasty2.jpeg" alt="" class='swiper-img'>
			</swiper-item>
			<swiper-item>
				<img src="../../static/tasty3.jpeg" alt="" class='swiper-img'>
			</swiper-item>
		</swiper>
		<view class='menu-container'>
			<scroll-view class='category-bar'>
				<view v-for='category in categories' :key='category._id'
					:class="['category-item',{ active : category._id === focusId }]" @click='goTargetFood(category)'>
					{{ category.name[lang]}}
				</view>
			</scroll-view>
			<scroll-view class='foods-container' :scroll-y='true' @scroll='onScroll' :scroll-top="scrollTop"
				:scroll-into-view="foodIntoViewId" :scroll-with-animation='true'>
				<view v-for='(item,index) in categoryFoods' :key='item._id'>
					<view class='category-name' :id="'id' + item._id">
						{{ item.name[lang]}}
					</view>
					<foodItem v-for='food in item.foods' :key='food._id' :food='food' @add='addHandler'
						@sub='subHandler'></foodItem>
				</view>
			</scroll-view>
		</view>
		<cart :restaurantId='restaurant._id' />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import _ from 'lodash';
	import {
		getMenu
	} from '@/api/menu.js';
	import {
		getRestaurant
	} from '@/api/restaurant.js'
	// 混入
	import mixinTitle from '@/pages/mixin/title.vue';
	import mixinTags from '@/pages/mixin/tags.vue'
	// 组件
	import foodItem from '@/pages/menu/components/foodItem.vue';
	import cart from '@/pages/menu/components/cart.vue'

	export default {
		mixins: [mixinTitle, mixinTags],
		components: {
			foodItem,
			cart
		},
		data() {
			return {
				id: '',
				categories: [],
				categoryFoods: [],
				focusId: '',
				foodIntoViewId: '',
				containerOffsetTop: 0,
				restaurant: {},
				distance: 0
			}
		},
		// 先分类
		// scroll的时候，根据分类的rect数据，判断到底到没到该分类
		methods: {
			async loadMenu() {
				const {
					categories,
					foods
				} = await getMenu({
					id: this.id,
					page: this.page,
					limit: this.limit
				});
				// * 分类
				this.categoryFoods = this.sortFoods(categories, foods)
				this.categories = categories;
				this.focusId = _.get(this.categories, '[0]._id', '')
			},
			async loadRestaurant() {
				this.restaurant = await getRestaurant(this.id);
			},
			// * 食物排序
			sortFoods(categories, foods) {
				const result = categories.map((category) => {
					let array = [];
					foods.forEach((food) => {
						if (category._id === food.category._id) {
							this.$set(food, 'count', 0)
							array.push(food)
						}
					})
					// * 根据available排序
					array = _.sortBy(array, ['available']);
					category.foods = array;
					return category;
				})
				return result;
			},
			onScroll: _.debounce(async function(e) {
				const array = [];
				// * 获取每一个 category 的离上方的高度
				this.categories.forEach(async (category) => {
					array.push(this.$getBoundingClientRect(`#id${category._id}`));
				})

				const result = await Promise.all(array);
				// * 假定最小值
				let min = Math.abs(Math.abs(result[0].bottom - this.containerOffsetTop) - this.distance);
				// * 初始化下标
				let index = 0;
				result.forEach((item, i) => {
					// * 获取每一个分类的下部到视口上部的距离
					const bottom = Math.abs(item.bottom - this.containerOffsetTop);
					// * 获取差值
					const diff = Math.abs(bottom - this.distance);
					// * 比较最小差值
					if (min >= diff) {
						min = diff;
						index = i
					}
				})
				this.focusId = this.categories[index]._id;

			}, 100),
			goTargetFood(category) {
				this.focusId = category._id;
				this.foodIntoViewId = `id${category._id}`;
			},
			// * 初始化获取food容器高度
			async getContainerOffsetTop() {
				const result = await this.$getBoundingClientRect('.foods-container');
				console.log(result);
				this.containerOffsetTop = result.top;
			},
			// * 添加食物
			addHandler(food) {
				const categoryIndex = this.categoryFoods.findIndex((item) => {
					return item._id === food.category._id
				});

				const index = this.categoryFoods[categoryIndex].foods.findIndex((item) => {
					return item._id === food._id;
				})
				this.categoryFoods[categoryIndex].foods[index].count++;
			},
			subHandler(food) {
				const categoryIndex = this.categoryFoods.findIndex((item) => {
					return item._id === food.category._id
				});

				const index = this.categoryFoods[categoryIndex].foods.findIndex((item) => {
					return item._id === food._id;
				})

				this.categoryFoods[categoryIndex].foods[index].count--;
			}
		},
		computed: {
			...mapState({
				lang: (state) => state.language.lang
			})
		},
		onLoad(options) {
			this.id = options.id
			this.loadMenu()
			this.loadRestaurant();
		},
		onReady() {
			// * 获取menu scroll-view 的高度偏移量
			this.getContainerOffsetTop();
		}
	}
</script>

<style>
	.restaurant-container {
		height: 120rpx;
		padding: 10rpx 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.restaurant-name {
		font-size: 20px;
	}

	.swiper {
		height: 300rpx;
		width: 100%;
	}

	.swiper-img {
		width: 100%;
		height: 100%;
	}

	.category-name {
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
	}

	.food-item {
		height: 200rpx;
		width: 100%;
	}

	.menu-container {
		display: flex;
	}

	.category-bar {
		flex: 1;
		height: calc(100vh - var(--status-bar-height) - 140rpx - 300rpx - 100rpx);
	}


	.category-item {
		margin-top: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 30px;
		padding: 20rpx;
		opacity: 0.6;
		font-size: 15px;
	}

	.active {
		opacity: 1;
		background-color: antiquewhite;
	}

	.foods-container {
		flex: 3;
		height: calc(100vh - var(--status-bar-height) - 140rpx - 300rpx - 100rpx);
		border-left: 2px seashell solid;
		padding: 20rpx;
		box-sizing: border-box;
	}

	scroll-view ::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}
</style>
