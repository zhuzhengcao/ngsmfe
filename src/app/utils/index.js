export {$get,$post,$put,$delete,$download} from './api';
let appRouter = null;
export const setAppRouter = (router)=>{
    appRouter = router;
}
export const getAppRouter = ()=>{
    return appRouter;
}
export const distinct = (arr)=>{
    return Array.from(new Set(arr))
}
export const isMobile = ()=>{
    return 'ontouchstart' in window;
}
export const getPlatform = ()=>{
    let ua = navigator.userAgent;
    let platform = '';
    if (ua.match('DingTalk')) {
        if (ua.match('AliApp')) {
            platform = "DingTalk";
        } else {
            platform = "DingTalk_Desktop";
        }
    }else{
        if('ontouchstart' in window){
            platform = "Phone";
        }else{
            platform = "Desktop";
        }
    }
    return platform;
}

export const qs = (search)=>{
    let obj = {};
    if(search){
        let str = ''
        if(search.indexOf('?') == 0){
            str = search.slice(1);
        }
        let paramsArr = str.split('&');
        paramsArr.map((item)=>{
            let arr = item.split('=');
            let key = arr[0],value = arr[1];
            obj[key] = obj[key] ? obj[key] = [].concat(obj[key],value) : value;
        })
    }
    return obj;
}

export const dateFormat = (date, mask) => {
    var d = typeof date == 'string' ? new Date(date) : date;
    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < ( length - value.length ); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return d.getDate();
            case 'dd':
                return zeroize(d.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
            case 'M':
                return d.getMonth() + 1;
            case 'MM':
                return zeroize(d.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
            case 'yy':
                return String(d.getFullYear()).substr(2);
            case 'yyyy':
                return d.getFullYear();
            case 'h':
                return d.getHours() % 12 || 12;
            case 'hh':
                return zeroize(d.getHours() % 12 || 12);
            case 'H':
                return d.getHours();
            case 'HH':
                return zeroize(d.getHours());
            case 'm':
                return d.getMinutes();
            case 'mm':
                return zeroize(d.getMinutes());
            case 's':
                return d.getSeconds();
            case 'ss':
                return zeroize(d.getSeconds());
            case 'l':
                return zeroize(d.getMilliseconds(), 3);
            case 'L':
                var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return zeroize(m);
            case 'tt':
                return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z':
                return d.toUTCString().match(/[A-Z]+$/);
            // Return quoted strings with the surrounding quotes removed
            default:
                return $0.substr(1, $0.length - 2);
        }
    });
};

export const changeTitle = (title)=>{
    document.title = 'OP ' + title;
}

export const getBarTitle = (pathString, userInfo) => {
    let pathReg = /^\/.*\/(.*)\/?/;
    let menuOption = pathString.replace(pathReg, '$1');
    return loopMenu(menuOption, userInfo);

    function loopMenu(pathString, userMenu){
        let resultArr = [];
        let menuArr = userMenu.toJS();
        menuArr.forEach((level1)=>{
            if(level1.children){
                level1.children.forEach((level2)=>{
                    if(level2.children){
                        level2.children.forEach((level3)=>{
                            if(level3._id && level3._id == pathString){
                                resultArr[0] = level1.name;
                                resultArr[1] = level2.name;
                                resultArr[2] = level3.name;
                            }
                        })
                    } else{
                        if(level2.key == pathString){
                            resultArr[0] = level1.name;
                            resultArr[1] = level2.name;
                        }
                    }
                })
            }
        })
        return resultArr;
    }
}