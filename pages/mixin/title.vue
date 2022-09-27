<template>
</template>

<script>
	import _ from 'lodash';
	export default {
		onShow() {
			this.setNavigationBarTitle()
		},
		methods: {
			setNavigationBarTitle() {
				const page = _.last(this.$mp.page.$vm.__route__.split('/'));
				uni.setNavigationBarTitle({
					title: this.$i18n.t(`${page}.title`)
				})
			}
		}
	}
</script>

<style>
</style>
