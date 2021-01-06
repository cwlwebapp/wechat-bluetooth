var code = "";
//判断登录状态
var onLogin = function() {
  wx.login({
    success: res => {
      code = res.code;
      // console.log(code)
      // 获取用户信息
      wx.getSetting({
        success: res => {
          // console.log(res);
          if (res["authSetting"]['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: data => {
                // console.log(data);
                getUserInfo(data.encryptedData, data.iv, "");
              }
            })
          } else {
            wx.navigateTo({
              url: "/pages/me/authorized/authorized"
            });
          }
        }
      })
    }
  })
}
//获取用户信息
function getUserInfo(encryptedData, iv, type) {
  // 发送 res.code 到后台换取 openId, sessionKey, unionId
  // global.$ajax("open/v1/login", {
  //   wxSmallCode: code,
  //   encryptedData: encryptedData,
  //   iv: iv
  // }, {
  //     type: "POST"
  //   }).then(data => {
  //     console.log("登录", data);
  //     global.zSetData('userInfo', data, true);
  //     if (data.thirdLoginSuccess) {
  //       wx.showToast({
  //         title: '登录成功',
  //         icon: "none"
  //       })
  //       if (type == "authorized") {
  //         wx.navigateBack();
  //         // wx.navigateTo({
  //         //   url: "/pages/home/login/login?wxSmallOpenId=" + data.wxSmallOpenId,
  //         // })
  //       }
  //     } else {
  //       wx.navigateTo({
  //         url: "/pages/home/login/login?wxSmallOpenId=" + data.wxSmallOpenId,
  //       })
  //     }
  //   });
}

//登录成功回调
let userInfoState = true;
global.checkLogin = function(callback) {
  if (global.state.userInfo.token) {
    userInfoState = false;
    callback();
  } else if (userInfoState) {
    onLogin();
    var userInfo = {};
    Object.defineProperty(global.state, 'userInfo', {
      get: function(val) {
        return userInfo;
      },
      set: function(newVal) {
        userInfo = newVal;
        if (newVal.token && userInfoState) {
          userInfoState = false;
          callback();
        }
      }
    })
  }
}
//支付
global.getPay = function (orderNo, successCallback, failureCallback) {
  if (typeof (orderNo) != "string") {
    console.log('不是字符串')
    return
  }
  console.log(orderNo)
  global.$ajax("pay/v1/virtual_pay_callback_wx", {
    orderNo: orderNo
  }, {
    type: "GET"
  }).then(data => {
    console.log(data)
    successCallback(data)
    // wx.requestPayment({
    //   timeStamp: data.timeStamp,
    //   nonceStr: data.nonceStr,
    //   package: data.package,
    //   signType: "MD5",
    //   paySign: data.sign,
    //   'success': function(res) {
    //     console.log(res);
    //     var prepayId = data.package.replace("prepay_id=", '');
    //     // global.$ajax("c/order/send_template", {
    //     //   orderNo: orderNo,
    //     //   prepayId: prepayId
    //     // }, { type: "POST" }).then(data => {
    //     wx.showModal({
    //       title: '操作',
    //       content: '支付成功！',
    //       showCancel: false,
    //       success: res => {
    //         if (successCallback) {
    //           successCallback();
    //         } else {
    //           wx.redirectTo({
    //             url: "/pages/my/myOrder/myOrder"
    //           });
    //         }
    //       }
    //     })
    //     // })
    //   },
    //   'fail': function(res) {
    //     if (failureCallback) {
    //       failureCallback(res);
    //     }
    //   }
    // })
  }).catch(res => {
    if (failureCallback) {
      failureCallback(res);
    }
  });
}
module.exports = {
  onLogin,
  getUserInfo
}