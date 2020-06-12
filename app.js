//app.js

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  },

  http: {
     server: 'https://yun.raisesky.cn/',
    // server: 'http://localhost:8080/',
    api: {
      selectSqlAction: 'DBCtrl.select.do',
      executeSqlAction: 'DBCtrl.execute.do'
    },
    post: function (url, data, success, fail = function (e) {
      //console.error('fail:')
      //console.error(e)
    }, complete) {
      var self = this;
      wx.request({
        url: self.server + url,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: data,
        dataType: 'json',
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header 默认是application/json
        success: success,
        fail: fail,
        complete: complete || function (e) {
          //console.info(e)
        }
      });
    },
    postSelectSql: function (data, success, fail, complete) {
      this.post(this.api.selectSqlAction, data, success, fail, complete)
    },
    postExecuteSql: function (data, success, fail, complete) {
      this.post(this.api.executeSqlAction, data, success, fail, complete)
    }
  },
  arrayToBase64String: function (a) {
    return btoa(String.fromCharCode(...a));
  },

  base64StringToArray: function (s) {
    let asciiString = atob(s);
    return new Uint8Array([...asciiString].map(char => char.charCodeAt(0)));
  },
  ArrayBufferToString: function (buffer) {
    return this.BinaryToString(String.fromCharCode.apply(null, Array.prototype.slice.apply(new Uint8Array(buffer))));
  },

  StringToArrayBuffer: function (string) {
    return this.StringToUint8Array(string).buffer;
  },

  BinaryToString: function (binary) {
    var error;

    try {
      return decodeURIComponent(escape(binary));
    } catch (_error) {
      error = _error;
      if (error instanceof URIError) {
        return binary;
      } else {
        throw error;
      }
    }
  }
  ,
  StringToBinary: function (string) {
    var chars, code, i, isUCS2, len, _i;

    len = string.length;
    chars = [];
    isUCS2 = false;
    for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
      code = String.prototype.charCodeAt.call(string, i);
      if (code > 255) {
        isUCS2 = true;
        chars = null;
        break;
      } else {
        chars.push(code);
      }
    }
    if (isUCS2 === true) {
      return unescape(encodeURIComponent(string));
    } else {
      return String.fromCharCode.apply(null, Array.prototype.slice.apply(chars));
    }
  }
  ,
  StringToUint8Array: function (string) {
    var binary, binLen, buffer, chars, i, _i;
    binary = this.StringToBinary(string);
    binLen = binary.length;
    buffer = new ArrayBuffer(binLen);
    chars = new Uint8Array(buffer);
    for (i = _i = 0; 0 <= binLen ? _i < binLen : _i > binLen; i = 0 <= binLen ? ++_i : --_i) {
      chars[i] = String.prototype.charCodeAt.call(binary, i);
    }
    return chars;
  },
  arrayBufferToString: function (buffer, encoding, callback) {
    var r = this.ArrayBufferToString(buffer)
    callback(r)

    // var encodedString = String.fromCharCode.apply(null, buffer),
    //     decodedString = decodeURIComponent(escape(atob(encodedString)));
    // callback(decodedString)


    // var s =  String.fromCharCode.apply(null, new Uint8Array(buffer));
    // callback(s)

    // var bufView = new Uint16Array(buffer);
    // var length = bufView.length;
    // var result = '';
    // var addition = Math.pow(2,16)-1;
    //
    // for(var i = 0;i<length;i+=addition){
    //
    //     if(i + addition > length){
    //         addition = length - i;
    //     }
    //     result += String.fromCharCode.apply(null, bufView.subarray(i,i+addition));
    // }
    // callback(result)
    // return result;

    // var blob = new Blob([buffer], { type: 'text/plain' });
    // var reader = new FileReader();
    // reader.onload = function (evt) { callback(evt.target.result); };
    // reader.readAsText(blob, encoding);
  }
})
