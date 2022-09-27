<template>
	<view class='dish-img-container'>
		<image src='../../../static/dark-dish.png' class='dish-image'></image>
		<image :src='image' class='food-img'></image>
	</view>
</template>

<script>
	export default {
		props: {
			image: {
				type: String,
				default: ''
			},
		}
	}
</script>

<style scoped>
	.dish-img-container {
		position: relative;
		width: 90%;
		height: 100%;
		margin: 0 auto;
	}

	.dish-image {
		width: 100%;
		height: 100%;
	}

	.food-img {
		position: absolute;
		width: 100%;
		left: 0;
		/* top: 10px; */
		z-index: 2;
	}
</style>
