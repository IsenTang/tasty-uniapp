<template>
</template>

<script>
	import _ from 'lodash';

	export default {
		methods: {
			// 获取餐馆tag 字符串
			getTags(restaurant) {
				const tags = _.get(restaurant, 'tags', []);
				let str = '';
				tags.forEach((tag) => {
					str += this.$i18n.t(`tags.${tag}`) + ' ';
				})
				return str;
			}
		}
	}
</script>

<style>
</style>
