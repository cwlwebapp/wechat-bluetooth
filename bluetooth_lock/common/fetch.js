import {
  onLogin
} from "./login.js"
var ajaxNum = 0;
global.$ajax = function(url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    var method = options.type || "GET";
    var prompt = options.prompt || true;
    if (ajaxNum <= 0) {
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      wx.showNavigationBarLoading();
    }
    ajaxNum++;
    let user_token = global.state.userInfo.token ? global.state.userInfo.token : '';
    wx.request({
      url: global.state.baseUrl + url,
      data: data,
      method: method,
      header: {
        "project_token": '18121101',
        'user_token': user_token
      },
      success: data => {
        if (data.data.success) {
          resolve(data.data.data);
        } else if (parseInt(data.data.code) == 1000 || parseInt(data.data.code) == 1001) {  
          onLogin();
        } else if (prompt) {
          reject(data.data.info);
          setTimeout(() => {
            wx.showToast({
              title: data.data.info,
              icon: "none"
            });
          }, 500);
        }
      },
      fail: err => {
        reject(err);
        wx.showModal({
          title: '提示',
          content: err,
          showCancel: false
        });
      },
      complete: () => {
        ajaxNum = ajaxNum - 1;
        if (ajaxNum <= 0) {
          wx.hideLoading();
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
        }
      }
    });
  })
}