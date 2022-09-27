export default {
	state: {
		user: uni.getStorageSync('user') ? uni.getStorageSync('user') : {},
	},
	mutations: {
		saveUser(state, {
			user
		}) {
			state.user = user;
		}
	},
	actions: {
		logout({
			commit
		}) {
			commit('saveUser', {
				user: {}
			});
			uni.setStorageSync('user', {});
		}
	},
	getters: {
		isLogin(state) {
			if (state.user.token) {
				return true;
			} else {
				return false;
			}
		}
	},
};
