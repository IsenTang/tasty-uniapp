import request from '../common/request';


export async function getRestaurants() {
	const result = await request({
		url: '/restaurant/location/-74.0059413,40.7127837',
	});
	return result;
}

export async function getRestaurant(id) {
	const result = await request({
		url: `/restaurant/${id}`,
	});
	return result;
}
