global.state = {
  //用户信息
  userInfo: {},
  rpx: 0.5,
  //测试环境
  // baseUrl: "https://dev.kemean.net/cityUser/api/",
  // logo

  //正式环境
  baseUrl: "https://kemean.com/cityUser/api/",
  // webViewUrl: "https://dev.kemean.net/chat/index.html",
  // 授权logo
  logo: "http://qn.sghappy.com/upload/201901/02/63114ed56edd450085eeb46285578182"

}
//缓存浏览器的数据名称
const cacheNameList = ['userInfo'];
// setCacheData(0);
function setCacheData(i) {
  var item = cacheNameList[i];
  wx.getStorage({
    key: item,
    success: function(res) {
      if (res.data) {
        global.state[item] = JSON.parse(res.data);
      }
      if (cacheNameList.length - 1 < i) {
        setCacheData(i++);
      }
    }
  })
}
//获取屏幕宽度
wx.getSystemInfo({
  success: function(res) {
    global.state['rpx'] = 750 / res.windowWidth;
  }
})
// json数据去重合并
global.heavyJson = (oldValue, json, storage = false) => {
  var oldJson = global.state[oldValue];
  if (!json && !oldJson) return;
  if (typeof json !== "object") {
    json = JSON.parse(json);
  }
  if (typeof oldJson !== "object") {
    oldJson = JSON.parse(oldJson);
  }
  var jsonData = {};
  for (var i in oldJson) {
    jsonData[i] = oldJson[i];
  }
  for (var j in json) {
    jsonData[j] = json[j];
  }
  global.state[oldValue] = jsonData;
  if (storage) {
    wx.setStorage({
      key: oldValue,
      data: JSON.stringify(jsonData)
    })
  }
}
// 数据赋值
global.zSetData = (oldValue, json, storage = false) => {
  if (oldValue) {
    global.state[oldValue] = json;
    if (storage) {
      wx.setStorage({
        key: oldValue,
        data: JSON.stringify(json)
      })
    }
  }
}
// 分享
global.shareConfig = function(title, path, imageUrl) {
  var title = title || "蓝牙锁";
  var path = path || "pages/me/me/me";
  var imageUrl = imageUrl || global.state.userInfo.headImg || "";
  return {
    title: title,
    path: path,
    imageUrl: imageUrl
  }
};
// 高德
// const amapFile = require('../utils/amap-wx.js')
// global.myAmapFun = new amapFile.AMapWX({
//   // key: 'c290b7e016c85e8f279b2f80018c6fbf'
//   key: '4eacaa356309c777cc76cd679c321fee'
// });