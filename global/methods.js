export function getBoundingClientRect(selector) {
	const query = uni.createSelectorQuery().in(this);
	return new Promise((resolve, reject) => {
		query.select(selector).boundingClientRect(data => {
			resolve(data);
		}).exec();
	});
}
