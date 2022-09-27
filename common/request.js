// * 请求封装
import config from './config';

export default function reqeust({
	url,
	method = 'get',
	data,
	header = {},
	baseUrl = config.baseUrl,
}) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中',
			mask: true,
		});

		const {
			token
		} = uni.getStorageSync('user');

		if (token) {
			header.authorization = token;
		}
		uni.request({
			url: baseUrl + url,
			method,
			data,
			header,
			success: (res) => {
				if (res.data.code === 'auth-failed') {
					uni.showModal({
						title: '你需要先登陆',
						success({
							confirm
						}) {
							if (confirm) {
								uni.switchTab({
									url: '/pages/mine/mine'
								});
							}
						}
					});
				} else {
					resolve(res.data);
				}
			},
			fail: (error) => {
				uni.showToast({
					title: error.errMsg
				});
			},
			complete: () => {
				uni.hideLoading();
			},
		});
	});
}
