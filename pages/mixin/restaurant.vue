<template>
</template>

<script>
	import moment from 'moment-timezone';
	import _ from 'lodash';

	export default {
		methods: {
			// 检查是否关门，true为关门,fasle为没有关门
			checkRestaurantClose(restaurant) {
				const closed = _.get(restaurant, 'closed', null);

				if (closed !== null) {
					return true;
				}

				const timezone = _.get(restaurant, 'timezone');

				/* 获取当地时间 */
				const localTime = moment().tz(timezone).hours() *
					60 + moment().tz(timezone).minutes();

				const dayOfWeek = moment().tz(timezone).isoWeekday();

				const index = dayOfWeek - 1;

				const restaurantTime = _.get(restaurant, `hours[${index}]`);

				/* 开始时间，没有就是0 */
				const start = _.get(restaurantTime, 'start', 0);

				/* 结束时间，没有就是0 */
				const end = _.get(restaurantTime, 'end', 0);

				/* 如果当地时间比结束时间晚，或者当地时间比开始时间早，意味着关门 */
				return localTime > end || localTime < start;
			}
		}
	}
</script>

<style>
</style>
