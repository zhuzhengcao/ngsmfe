/*!
 * date.js v1.0.2
 * (c) 2017 CoderJ
 * Released under the MIT License.
 */
Date.chooseDefaultTimeZone = function(timezone) {
    if (!timezone && window && localStorage && localStorage.getItem("localTimeZone")) {
        timezone = localStorage.getItem("localTimeZone")
    }
    if (!timezone && global && global.localTimeZone) {
        timezone = global.localTimeZone;
    }
    if (!timezone) {
        var offset = 0 - new Date().getTimezoneOffset();
        timezone = '';
        if (offset >= 0) {
            timezone += '+';
        } else {
            timezone += '-';
        }
        var hour = Math.floor(offset / 60);
        var minute = Math.floor(offset % 60);
        timezone += (hour < 10 ? "0" : "") + hour;
        timezone += (minute < 10 ? "0" : "") + minute;
    }
    return timezone;
}
Date.prototype.Format = function(fmt, timezone) {
    if (!fmt) {
        console.error("Date Format must be have a format!");
        fmt = "";
    }
    timezone = Date.chooseDefaultTimeZone(timezone);
    var timezoneOffset = 0 - parseInt(parseInt(timezone) / 100) * 60 - parseInt(parseInt(timezone) % 100);
    timezoneOffset = timezoneOffset - this.getTimezoneOffset();
    var theDate = new Date(this - timezoneOffset * 60 * 1000);
    var o = {
        "M+": theDate.getMonth() + 1, //月份
        "d+": theDate.getDate(), //日
        "h+": theDate.getHours(), //小时
        "m+": theDate.getMinutes(), //分
        "s+": theDate.getSeconds(), //秒
        "q+": Math.floor((theDate.getMonth() + 3) / 3), //季度
        "z": timezone,
        "S": theDate.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (theDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
Date.prototype.getTheMonth = function(i, timezone) {
    timezone = Date.chooseDefaultTimeZone(timezone);
    var add12 = function(){
        var sum = 0;
        for (var i = 0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return [Math.floor(sum / 12), sum % 12];
    }
    var thisMonth = parseInt(this.Format('MM', timezone));
    var thisMonthYear = parseInt(this.Format('yyyy', timezone));
    var theNewMonth = (add12(thisMonth - 1, i)[1] + 12) % 12 + 1;
    var theNewYear = add12(thisMonth - 1, i)[0] + thisMonthYear;
    return new Date(theNewYear + "/" + (theNewMonth < 10 ? 0 : "") + theNewMonth + "/01 00:00:00 " + timezone);
};
Date.prototype.getTheDay = function(i, timezone) {
    timezone = Date.chooseDefaultTimeZone(timezone);
    return new Date(new Date(this.getTime() - (24 * 60 * 60 * 1000 * (0 - i))).Format('yyyy/MM/dd 00:00:00 '+timezone));
};
Date.prototype.getTheHour = function(i, timezone) {
    timezone = Date.chooseDefaultTimeZone(timezone);
    return new Date(new Date(this.getTime() - (60 * 60 * 1000 * (0 - i))).Format('yyyy/MM/dd hh:00:00 '+timezone));
};

Number.prototype.toThousands = function() {
    var num = (this || 0).toString(),
        result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}