//深拷贝
function copyData(obj: any, cache: Array<object> = []): object {
  // 如果obj是不可变值，就返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 如果obj被击中，则为圆形结构
  const hit: any = cache.find((c: any) => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy: any = Array.isArray(obj) ? [] : {};
  // 先把副本放到缓存里
  // 因为我们想在copyData递归中引用它
  cache.push({
    original: obj,
    copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = copyData(obj[key], cache);
  });

  return copy;
}

//校准UTC时间为东八区的时间
function formatUTCTime(utc_datetime: string, simple_time = true): string {
  let timestamp: any
  if (!simple_time) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var new_datetime = utc_datetime.split("T")[0] + " " + utc_datetime.split("T")[1].split(".")[0]
    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
  } else {
    // 处理成为时间戳
    timestamp = new Date(Date.parse(utc_datetime))
  }
  timestamp = timestamp.getTime();
  timestamp = timestamp / 1000;
  // 增加8个小时，北京时间比utc时间多八个时区
  timestamp = timestamp + 8 * 60 * 60;
  // 时间戳转为时间
  var n = parseInt(timestamp) * 1000;
  var D = new Date(n);
  var year: string | number = D.getFullYear(); //四位数年份
  var month: string | number = D.getMonth() + 1; //月份(0-11),0为一月份
  month = month < 10 ? ('0' + month) : month;
  var day: string | number = D.getDate(); //月的某一天(1-31)
  day = day < 10 ? ('0' + day) : day;
  var hours: string | number = D.getHours(); //小时(0-23)
  hours = hours < 10 ? ('0' + hours) : hours;
  var minutes: string | number = D.getMinutes(); //分钟(0-59)
  minutes = minutes < 10 ? ('0' + minutes) : minutes;
  var seconds: string | number = D.getSeconds(); //秒(0-59)
  seconds = seconds < 10 ? ('0' + seconds) : seconds;
  var beijing_datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  return beijing_datetime; // 2020-10-11 15:32:06
}

// unix时间戳处理'刚刚、分钟前、小时前、天前'
function getDateDiff(timespan: number): string {
  const dateTime: Date = new Date(timespan);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1 < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1;
  const day = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate();
  const hour = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours();
  const minute = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes();
  const seconds = dateTime.getSeconds() < 10 ? `0${dateTime.getSeconds()}` : dateTime.getSeconds();
  const now = new Date();
  const nowNew = now.getTime();
  let milliseconds = 0;
  let timeSpanStr;
  milliseconds = nowNew - timespan;

  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = `${Math.round(milliseconds / (1000 * 60))}分钟前`;
  } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = `${Math.round(milliseconds / (1000 * 60 * 60))}小时前`;
  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 3) {
    timeSpanStr = `${Math.round(milliseconds / (1000 * 60 * 60 * 24))}天前`;
  } else if (milliseconds > 1000 * 60 * 60 * 24 * 3 && year === now.getFullYear()) {
    timeSpanStr = `${month}-${day} ${hour}:${minute}:${seconds}`;
  } else {
    timeSpanStr = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
  }
  return timeSpanStr;
}

//Unix时间戳转化日期时间 (format 日期分隔符，空字符则为中文, showTime 是否显示时间, showYear 是否显示年份, showSecond 是否显示秒)
function unixDate(
  targetTime: number | null = null,
  {
    format = '', showTime = false, showYear = true, showSecond = false
  } = {}
): string {
  let time;
  const date = [
    '0', // 年
    '0', // 月
    '0', // 日
    '0', // 时
    '0' // 分
  ];
  if (targetTime === null) {
    time = new Date();
  } else {
    time = new Date(+targetTime * 1000);
  }

  date[0] = `${time.getFullYear()}`.padStart(2, '0');
  date[1] = `${time.getMonth() + 1}`.padStart(2, '0');
  date[2] = `${time.getDate()}`.padStart(2, '0');
  date[3] = `${time.getHours()}`.padStart(2, '0');
  date[4] = `${time.getMinutes()}`.padStart(2, '0');
  date[5] = `${time.getSeconds()}`.padStart(2, '0');

  let result = '';
  if (showYear) {
    result += date[0] + (format === '' ? '年' : format);
  }
  if (format === '') {
    result += `${date[1]}月${date[2]}日`;
  } else {
    result += [date[1], date[2]].join(format);
  }
  if (showTime && !showSecond) {
    result += ` ${[date[3], date[4]].join(':')}`;
  } else if (showTime && showSecond) {
    result += ` ${[date[3], date[4], date[5]].join(':')}`;
  }
  return result;
}

//数组，字符串去重
function unique(params: Array<any> | string): Array<any> | string | undefined {
  if (toString.call(params) === '[object Array]') {
    return [...new Set(params)];
  }
  if (toString.call(params) === '[object String]') {
    const obj: any = {};
    let str = '';
    for (let i = 0, len = params.length; i < len; i++) {
      if (obj[params[i]]) {
        str += params[i];
        obj[params[i]] = true;
      }
    }
    return str;
  }
  return
}

//手机号校验
function mobileCheck(mobile: number): boolean {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  return reg.test(String(mobile));
}

//事件绑定支持IE、chromium、事件委托 (element绑定dom, event事件类型, listener方法)
function addEvent(element: any, event: string, listener: Function, capture = false): void {
  if (element.addEventListener) {
    element.addEventListener(event, listener, capture);
  } else if (element.attachEvent) {
    element.attachEvent(`on${event}`, listener);
  } else {
    element[`on${event}`] = listener;
  }
}


export default {
  copyData,
  unixDate,
  formatUTCTime,
  getDateDiff,
  unique,
  mobileCheck,
  addEvent
}
