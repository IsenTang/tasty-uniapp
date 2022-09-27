import App from './App';



// #ifndef VUE3
import Vue from 'vue';
Vue.config.productionTip = false;
App.mpType = 'app';

import store from '@/store/index';
import i18n from '@/locale/index';
import '@/global/index';
import '@/filters/index';

const app = new Vue({
	...App,
	store,
	i18n
});
app.$mount();
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue';
export function createApp() {
	const app = createSSRApp(App);
	return {
		app
	};
}
// #endif
