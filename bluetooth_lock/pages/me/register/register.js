// pages/person/changePassword/changePassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yan1: false,
    yan2: false,
    codeText: '获取验证码!',
    ispassword1: true,
    ispassword2: true,
    type: null


  },
  static: {
    readonlys: false,
    code: null,
    password1: null,
    password2: null,
    phone: null
  },
  // 电话号码
  bindblurphone(e) {
    console.log(e.detail.value)
    // if (!(/^1[34578]\d{9}$/.test(e.detail.value)) && e.detail.value != "") {
    //   wx.showToast({
    //     title: '手机号码有误，请重填!',
    //     icon: "none"
    //   })
    //   return;
    // }
    this.static.phone = e.detail.value
  },
  //获取验证码
  getCode() {
    if (this.static.readonlys) {
      wx.showToast({
        title: "验证码已发送",
        icon: "none"
      });
      return
    }
    this.getCodeState()
  },

  //验证码倒计时
  getCodeState() {
    this.static.readonlys = true;
    const _this = this;
    this.setData({
      codeText: "60S后获取"
    })
    var s = 60;
    var clear = setInterval(() => {
      s--;
      _this.setData({
        codeText: s + "S后获取"
      })
      if (s <= 0) {
        clearInterval(clear);
        _this.setData({
          readonlys: false,
          codeText: "重新获取"
        })
      }
    }, 1000);
  },
  //验证码
  bindblurcode(e) {
    console.log(e.detail.value)
    // if (e.detail.value <= 999 || e.detail.value >= 9999) {
    //   wx.showToast({
    //     title: '请正确输入验证码!',
    //     icon: 'none'
    //   })
    //   return;
    // }
    this.static.code = e.detail.value
  },
  // 密码
  bindblurPassword(e) {
    // if (e.detail.value.length == 0) {
    //   return;
    // } else if (e.detail.value.length < 6 || e.detail.value.length > 16) {
    //   wx.showToast({
    //     title: '密码长度6-16位,数字 字母 数字!',
    //     icon: 'none'
    //   })
    //   return;

    // }
    this.static.password1 = e.detail.value
  },
  //密码验证
  bindblurPassword2(e) {
    this.static.password2 = e.detail.value
  },
  // 眼睛
  isopen(e) {
    console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.index == 1) {
      this.setData({
        yan1: !this.data.yan1,
        ispassword1: !this.data.ispassword1
      })
    } else if (e.currentTarget.dataset.index == 2) {
      this.setData({
        yan2: !this.data.yan2,
        ispassword2: !this.data.ispassword2
      })
    }

  },
  bindblurname(e) {
    this.static.name = e.detail.value
  },
  // 提交
  confirm() {
    if (!this.static.phone) {
      wx.showToast({
        title: '请输入手机号!',
        icon: 'none'
      })
      return;

    } else if (!this.static.code) {
      wx.showToast({
        title: '请输入验证码!',
        icon: 'none'
      })
      return;

    } else if (!this.static.password1) {
      wx.showToast({
        title: '请输入密码!',
        icon: 'none'
      })
      return;

    } else if (!this.static.password2) {
      wx.showToast({
        title: '请再次输入密码!',
        icon: 'none'
      })
      return;

    } else if (this.static.password1 != this.static.password2) {
      wx.showToast({
        title: '两次输入密码不一致!',
        icon: 'none'
      })
      return;
    } else if (!this.static.name && this.data.type == 1) {
      wx.showToast({
        title: '请输入昵称!',
        icon: 'none'
      })
      return;

    }
    wx.showToast({
      title: '提交成功!'
    })
    setTimeout(() => {
      wx.navigateBack()
    }, 1000)
  },
  // 协议
  agreement() {
    wx.navigateTo({
      url: "/pages/person/service/service"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type == 2) {
      wx.setNavigationBarTitle({
        title: '忘记密码'
      })
    }

    this.setData({
      type: options.type
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})