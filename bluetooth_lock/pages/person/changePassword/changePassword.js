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


  },
  static: {
    readonlys: false,
    code: null,
    password1: null,
    password2: null,
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
    if (e.detail.value <= 999 || e.detail.value >= 9999) {
      wx.showToast({
        title: '请正确输入验证码!',
        icon: 'none'
      })
      return;
    }
    this.static.code = e.detail.value
  },
  // 密码
  bindblurPassword(e) {
    if (e.detail.value.length == 0) {
      return;
    } else if (e.detail.value.length < 6 || e.detail.value.length > 16) {
      wx.showToast({
        title: '密码长度6-16位,数字 字母 数字!',
        icon: 'none'
      })
      return;

    }
    this.static.password1 = e.detail.value
  },
  //密码验证
  bindinput(e) {
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
  // 提交
  confirm() {
    if (!this.static.code) {
      wx.showToast({
        title: '请输入验证码!',
        icon: 'none'
      })
      return;

    } else if (!this.static.password1) {
      wx.showToast({
        title: '请输入新密码!',
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
    }
    wx.showToast({
      title: '提交成功!'
    })
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/person/person/person'
      })
    }, 1000)


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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