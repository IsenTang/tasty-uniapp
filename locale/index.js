import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zh from '@/locale/zh-CN.json';
import en from '@/locale/en-US.json';

Vue.use(VueI18n);
export default new VueI18n({
	locale: uni.getStorageSync('locale') ? uni.getStorageSync('locale') : 'zh-CN',
	messages: {
		'zh-CN': zh,
		'en-US': en
	}
});
