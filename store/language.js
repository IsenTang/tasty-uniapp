import i18n from '@/locale/index.js';

export default {
	state: {
		lang: uni.getStorageSync('locale') ? uni.getStorageSync('locale') : 'zh-CN',
	},
	mutations: {
		changeLang(state, {
			lang
		}) {
			state.lang = lang;
		}
	},
	actions: {
		changeLang({
			commit
		}, {
			lang
		}) {
			uni.setStorageSync('locale', lang);
			i18n.locale = lang;
			commit('changeLang', {
				lang
			});

			// 修改bar信息
			uni.setNavigationBarTitle({
				title: i18n.t('language.title')
			});
			uni.$emit('changeLang');
		}
	}
};
