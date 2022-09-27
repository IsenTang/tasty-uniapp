import request from '../common/request';

// * 分页获取menu
export async function userLogin({
	code
}) {
	const result = await request({
		url: '/user/wxlogin',
		method: 'post',
		data: {
			code
		}
	});
	return result;
}
