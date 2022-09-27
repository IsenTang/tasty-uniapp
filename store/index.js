import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


// 模块
import language from '@/store/language.js';
import cart from '@/store/cart.js';
import user from '@/store/user.js';

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		language,
		cart,
		user
	}
});
export default store;
