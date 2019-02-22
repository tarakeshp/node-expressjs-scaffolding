var moment = require('moment-timezone');

var DateTimeUtil = {

    get_now_formatted: function () {
        var d = new Date();
        return [d.getFullYear(), "-", ((d.getMonth() + 1) < 10 ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1)), "-" + (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()), " ", (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours()) + ":" + (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? ("0" + d.getSeconds()) : d.getSeconds())].join('');
    },

    get_utc_now_formatted: function (value) {
        var d = value || new Date();
        return [d.getUTCFullYear(), "-", ((d.getUTCMonth() + 1) < 10 ? ("0" + (d.getUTCMonth() + 1)) : (d.getUTCMonth() + 1)), "-" + (d.getUTCDate() < 10 ? ("0" + d.getUTCDate()) : d.getUTCDate()), " ", (d.getUTCHours() < 10 ? ("0" + d.getUTCHours()) : d.getUTCHours()) + ":" + (d.getUTCMinutes() < 10 ? ("0" + d.getUTCMinutes()) : d.getUTCMinutes()) + ":" + (d.getUTCSeconds() < 10 ? ("0" + d.getUTCSeconds()) : d.getUTCSeconds())].join('');
    },

    get_expiry_formatted: function (mins) {
        var d = new Date();
        d.setTime(currentDate.getTime() + mins * 60 * 1000);
        return [d.getFullYear(), "-", ((d.getMonth() + 1) < 10 ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1)), "-" + (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()), " ", (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours()) + ":" + (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? ("0" + d.getSeconds()) : d.getSeconds())].join('');
    },

    get_expiry_formatted: function (mins) {
        var d = new Date();
        d.setTime(currentDate.getTime() + mins * 60 * 1000);
        return [d.getUTCFullYear(), "-", ((d.getUTCMonth() + 1) < 10 ? ("0" + (d.getUTCMonth() + 1)) : (d.getUTCMonth() + 1)), "-" + (d.getUTCDate() < 10 ? ("0" + d.getUTCDate()) : d.getUTCDate()), " ", (d.getUTCHours() < 10 ? ("0" + d.getUTCHours()) : d.getUTCHours()) + ":" + (d.getUTCMinutes() < 10 ? ("0" + d.getUTCMinutes()) : d.getUTCMinutes()) + ":" + (d.getUTCSeconds() < 10 ? ("0" + d.getUTCSeconds()) : d.getUTCSeconds())].join('');
    },
    get_formatted: function (value) {
        var d = new Date(value);
        return [d.getFullYear(), "-", ((d.getMonth() + 1) < 10 ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1)), "-" + (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()), " ", (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours()) + ":" + (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes()) + ":" + (d.getSeconds() < 10 ? ("0" + d.getSeconds()) : d.getSeconds())].join('');
    },
    get_timezones: function () {
        return moment.tz.names();
    },
    get_current_week_start_end_dates: function (put_time = false) {
        const monday = moment().startOf("isoWeek").toDate();
        const sunday = moment().endOf("isoWeek").toDate();
        const result = {
            start_date: DateTimeUtil.get_formatted(monday),
            end_date: DateTimeUtil.get_formatted(sunday)
        };
        if (put_time) {
            return result;
        } else {
            return {
                start_date: result.start_date.split(' ')[0],
                end_date: result.end_date.split(' ')[0]
            }
        }
    },
    get_current_month_start_end_dates: function (put_time = false) {
        const firstDay = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
        const lastDay = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')

        const result = {
            start_date: DateTimeUtil.get_formatted(firstDay),
            end_date: DateTimeUtil.get_formatted(lastDay)
        };

        if (put_time) {
            return result;
        } else {
            return {
                start_date: result.start_date.split(' ')[0],
                end_date: result.end_date.split(' ')[0]
            }
        }
    },
    get_nth_month_start_dates: function (n) {
        var date = new Date();
        var n_month_start_date = new Date(date.getFullYear(), date.getMonth() - n, 1);
        var current_month_end_date = new Date();
        return {
            start_date: DateTimeUtil.get_formatted(n_month_start_date),
            end_date: DateTimeUtil.get_formatted(current_month_end_date)
        };
    },
    get_differnce_minutes: function (startDate, endDate) {
        endDate = (endDate === undefined) ? new Date() : new Date(endDate);
        startDate = new Date(startDate);
        var diff = endDate.getTime() - startDate.getTime();
        return (diff / 60000);
    },
    get_random_by_range: function (minimum = 1, maximum = 10000) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    },
    add_minutes: function (date, mins) {
        var _d = new Date(date);
        return DateTimeUtil.get_formatted(_d.setMinutes(parseInt(mins)));
    },
    to_utc_by_tz: function (tz, date) {
        return moment.tz(date, 'YYYY-MM-DD HH:mm:ss', (tz || "UTC")).utc().format('YYYY-MM-DD HH:mm:ss');
    },
    to_tz_by_utc: function (tz, date) {
        return moment(date).tz(tz).format("YYYY-MM-DD HH:mm:ss")
    }
}

module.exports = DateTimeUtil;