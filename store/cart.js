import _ from 'lodash';

export default {
	state: {
		cart: []
	},
	mutations: {
		addFood(state, {
			food
		}) {
			state.cart.push(food);
		},
		subFood(state, {
			food
		}) {
			const index = _.findLastIndex(state.cart, (item) => {
				return item._id === food._id;
			});
			state.cart.splice(index, 1);
		}
	},
	actions: {

	},
	getters: {
		total(state) {
			let sum = 0;
			state.cart.forEach((item) => {
				sum += item.price;
			});
			return sum;
		}
	}
};
