<template>
	<view class='language-container'>
		<button :class="['setting-button',{ active : lang === 'zh-CN'} ]"
			@click="changeLang({lang:'zh-CN'})">中文</button>
		<button :class="['setting-button',{ active : lang === 'en-US'} ]"
			@click="changeLang({lang:'en-US'})">English</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	// 混入
	import mixinTitle from '@/pages/mixin/title.vue'

	export default {
		mixins: [mixinTitle],
		data() {
			return {

			}
		},
		methods: {
			...mapActions(['changeLang'])
		},
		computed: {
			...mapState({
				lang: (state) => state.language.lang
			})
		}
	}
</script>

<style lang='scss' scoped>
	.language-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.setting-button {
		width: 250rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 60rpx;
		border-radius: 15rpx;
	}

	.active {
		background-color: black;
		color: white;
	}
</style>
