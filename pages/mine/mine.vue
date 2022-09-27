<template>
	<view class='mine-container'>
		<button class='setting-button' @click='toLanguage'>{{$t('mine.language')}}</button>
		<button class='setting-button' @click='loginOrOut'>{{ isLogin ? $t('mine.logout') : $t('mine.login')}}</button>
	</view>
</template>

<script>
	import {
		userLogin
	} from '@/api/user.js'
	import mixinTitle from '@/pages/mixin/title.vue'
	import {
		mapMutations,
		mapGetters,
		mapActions
	} from 'vuex';
	export default {
		mixins: [mixinTitle],
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(['isLogin'])
		},
		methods: {
			...mapActions(['logout']),
			...mapMutations(['saveUser']),
			toLanguage() {
				uni.navigateTo({
					url: '/pages/language/language'
				})
			},
			loginOrOut() {
				const that = this;
				if (this.isLogin) {
					// 如果已经登陆了，则登出
					this.logout();
				} else {
					uni.getUserProfile({
						desc: '登陆',
						success(data) {
							uni.login({
								provider: 'weixin',
								success: async function(loginRes) {
									// * 获取临时码后，登陆
									const user = await userLogin({
										code: loginRes.code
									});
									that.saveUser({
										user
									});
									uni.setStorageSync('user', user)
									uni.showToast({
										title: '登陆成功'
									})
								}
							});
						},
						fail(err) {
							console.log(err);
						}
					})
				}

			}
		}
	}
</script>

<style lang='scss' scoped>
	.mine-container {
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
</style>
