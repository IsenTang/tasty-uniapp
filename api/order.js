import request from '../common/request';


/* 登录 */
export async function placeOrder(data) {

	const result = await request({
		url: '/order',
		method: 'put',
		data
	});

	return result;
}

/* 获取个人order信息 分页 */
export async function getOrders({
	userId,
	page,
	limit
}) {

	const result = await request({
		url: `/order/${userId}/page/${page}/limit/${limit}`,
		method: 'get'
	});

	return result;
}
