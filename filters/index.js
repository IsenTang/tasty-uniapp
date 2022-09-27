import Vue from 'vue';

Vue.filter('currencyUSD', (v) => {
	return `$${(v/100).toFixed(2)}`;
});
