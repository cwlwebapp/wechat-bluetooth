//app.js
App({
  // 4c000c0e00b54d408ed638d6efe73c04155e
  buf2hex: function (buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
  },
  buf2string: function (buffer) {
    var arr = Array.prototype.map.call(new Uint8Array(buffer), x => x)
    var str = ''
    for (var i = 0; i < arr.length; i++) {
      // 	将 Unicode 转换为字符串
      str += String.fromCharCode(arr[i])
    }
    return str
  },
  onLaunch: function () {
    this.globalData.SystemInfo = wx.getSystemInfoSync()
  },
  globalData: {
    SystemInfo: {}
  }
})