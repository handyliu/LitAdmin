/**
 * Created by jerry on 2017/4/14.
 */
var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd'
function padding (s, len) {
  let l = len - (s + '').length
  for (var i = 0; i < l; i++) { s = '0' + s }
  return s
};


var storage = (function() {
  var isSupport = function(storageType) {
    var testKey = 'test'
    var storage = window[storageType]
    try {
      storage.setItem(testKey, '1')
      storage.removeItem(testKey)
      return storageType in window && window[storageType]
    } catch (e) {
      return false
    }
  }
  var storages = ['localStorage', 'sessionStorage']
  for (var i = 0, len = storages.length; i < len; i++) {
    if (isSupport(storages[i])) return window[storages[i]]
  }
  return null
})();

function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) === '[object ' + type + ']'
  }
}

/* 获取 Cookie 值
 */
function getCookie(name) {
  var c = document.cookie
  if (c.length > 0) {
    var s = c.indexOf(name + '=')
    if (s !== -1) {
      s = s + name.length + 1
      var e = c.indexOf('', s)
      return unescape(c.substring(s, e))
    }
  }
  return ''
}

/* 保存 Cookie 值
 */
function setCookie(name, value, expiredays) {
  var exdate = new Date()
  if (value !== null && value !== '' && value !== 'null') {
    exdate.setDate(exdate.getDate() + expiredays)
  } else {
    exdate.setDate(exdate.getDate() - 1)
  }
  document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : 'expires=' + exdate.toGMTString())
}

/* 删除 Cookie
 */
function removeCookie(name) {
  setCookie(name, '', -1)
}

const _buffer = {
  nonMark: false,
  sessionData: {
  }
}

/**
 * 保存会话数据，临时数据存储使用
 * @param key
 * @return {*}
 */
function setSession(key, val) {
  if (sessionStorage.setItem) {
    try {
      sessionStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      _buffer.nonMark = true;
      _buffer.sessionData[key] = val;
    }
  } else {
    _buffer.nonMark = true;
    _buffer.sessionData[key] = val;
  }
};

/**
 * 获取会话数据，临时数据存储使用
 * @param key
 * @return {*}
 */
function getSession(key) {
  if (sessionStorage.getItem && !_buffer.nonMark) {
    var val = sessionStorage.getItem(key);
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  } else {
    return _buffer.sessionData[key];
  }
};

export default {
  storage: storage,
  getQueryStringByName: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    var context = ''
    if (r != null) { context = r[2] }
    reg = null
    r = null
    return context === null || context === '' || context === 'undefined' ? '' : context
  },
  formatDate: {

    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y': return padding(date.getFullYear(), $0.length)
          case 'M': return padding(date.getMonth() + 1, $0.length)
          case 'd': return padding(date.getDate(), $0.length)
          case 'w': return date.getDay() + 1
          case 'h': return padding(date.getHours(), $0.length)
          case 'm': return padding(date.getMinutes(), $0.length)
          case 's': return padding(date.getSeconds(), $0.length)
        }
      })
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP)
      var matchs2 = dateString.match(/(\d)+/g)
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y': _date.setFullYear(_int); break
            case 'M': _date.setMonth(_int - 1); break
            case 'd': _date.setDate(_int); break
            case 'h': _date.setHours(_int); break
            case 'm': _date.setMinutes(_int); break
            case 's': _date.setSeconds(_int); break
          }
        }
        return _date
      }
      return null
    }

  },

  getName: function(arr, key, value, name) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (!this.isObject(arr[i])) return -1
      for (var k in arr[i]) {
        if (k === key && arr[i][k] === value) return arr[i][name]
      }
    }
    return ""
  },
  /* 判断 obj 是否为 null
     Usage:
       var obj = null
       helper.isNull(obj) // 输出 true
  */
  isNull: function(obj) {
    return obj === null || obj === undefined || obj === "" || obj !== obj;
  },

  /* 判断 obj 是否为 function
     Usage:
       var obj = 'abc'
       helper.isFunction(obj) // 输出 false
  */
  isFunction: isType('Function'),

  /* 判断 obj 是否为 object
     Usage:
       var obj = {}
       helper.isObject(obj) // 输出 true
  */
  isObject: isType('Object'),

  /* 判断 obj 是否为 array
     Usage:
       var obj = ['abc']
       helper.isArray(obj) // 输出 true
  */
  isArray: window.isArray || isType('Array'),

  /* 判断 obj 是否为 string
     Usage:
       var obj = 'abc'
       helper.isString(obj) // 输出 true
  */
  isString: isType('String'),

  /* 判断 obj 是否为 undefined
     Usage:
       var obj = 'abc'
       helper.isUndefined(obj) // 输出 false
  */
  isNumber: isType('Number'),
  /* 判断 obj 是否为 Number
     Usage:
       var obj = 123
       helper.isUndefined(obj) // 输出 true
  */
  isUndefined: isType('Undefined'),
  // 获取 Cookie
  getCookie: getCookie,
  // 设置 Cookie
  setCookie: setCookie,
  // 移除 Cookie
  removeCookie: removeCookie,
  // 获取 Session
  getSession: getSession,
  // 设置 Session
  setSession: setSession,
  // 将数字转化为千分位，三位以逗号隔开
  formatNum:function(num){
    if(num){
      return parseFloat(num).toLocaleString();
    }
    return num;
  },
  /*
   资金格式化插件
   @value 金额(單位分)
   */
  moneyFormart: function(value) {
    var data,
      decimals,
      integer,
      length;
    var m = [];
    var isBack = false;
    if(value<0){
      isBack = true;
      value = -value;
    }
    if(value == 0 || value == null){
      return 0;
    }
    if(isNaN(Number(value))){
      return value;
    }
    value = Number(value).toFixed(2);
    //获取小数部分
    decimals = value.match(/\.[0-9]*/g);
    //获取整数部分
    integer = parseInt(value).toString();
    var temp = integer.split("");
    length = temp.length;
    if(isBack){
      return length > 3 ? '-'+formart() : '-'+value;
    }else{
      return length > 3 ? formart() : value;
    }
    //添加","分隔符
    function formart() {
      var result;
      var count = 0;
      for (var n = length; n > 0; n--, count++) {
        if (count && count % 3 == 0) {
          m.unshift(",");
          count = 0;
        }
        m.unshift(temp.pop());
      }
      result = m.join("");
      return decimals ? result.concat(decimals) : result;
    }
  },
  /**
   * [moneyFormart_toFixed4 description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  moneyFormart_toFixed4: function(value) {
    var data,
      decimals,
      integer,
      length;
    var m = [];
    var isBack = false;
    if(value<0){
      isBack = true;
      value = -value;
    }
    if(value == 0 || value == null){
      return 0;
    }
    if(isNaN(Number(value))){
      return value;
    }
    value = Number(value).toFixed(4);
    //获取小数部分
    decimals = value.match(/\.[0-9]*/g);
    //获取整数部分
    integer = parseInt(value).toString();
    var temp = integer.split("");
    length = temp.length;
    if(isBack){
      return length > 3 ? '-'+formart() : '-'+value;
    }else{
      return length > 3 ? formart() : value;
    }
    //添加","分隔符
    function formart() {
      var result;
      var count = 0;
      for (var n = length; n > 0; n--, count++) {
        if (count && count % 3 == 0) {
          m.unshift(",");
          count = 0;
        }
        m.unshift(temp.pop());
      }
      result = m.join("");
      return decimals ? result.concat(decimals) : result;
    }
  }
}
