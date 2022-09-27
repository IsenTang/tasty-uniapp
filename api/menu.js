import request from '../common/request';

// * 分页获取menu
export async function getMenu({
	id
}) {
	const result = await request({
		url: `/menu/restaurantId/${id}`,
	});
	return result;
}
