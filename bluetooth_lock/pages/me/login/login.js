Page({

  /**
   * 页面的初始数据
   */
  data: {
    eye: true
  },

  static: {
    phone: null,
    pword: null,
  },
  // 电话号码
  bindblur(e) {
    console.log(e.detail.value)
    if (!(/^1[34578]\d{9}$/.test(e.detail.value)) && e.detail.value!="") {
      wx.showToast({
        title: '手机号码有误，请重填!',
        icon: "none"
      })
      return;
    }
    this.static.phone = e.detail.value
  },
  // 密码
  bindinput(e) {
    console.log(e.detail.value)
    this.static.pword = e.detail.value
  },
  // 开眼活动
  isopeneye() {
    this.setData({
      eye: !this.data.eye
    })
  },
  // 登录
  longin() {
    // if (!this.static.phone) {
    //   wx.showToast({
    //     title: '请填入手机号!',
    //     icon: "none"
    //   })
    //   return
    // } else if (!this.static.pword) {
    //   wx.showToast({
    //     title: '请填入密码!',
    //     icon: "none"
    //   })
    //   return
    // }
    wx.switchTab({
      url: "/pages/me/me/me",
    })

  },
  //忘记密码
  // 注册
  register(e) {
    // console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: "/pages/me/register/register?type=" + e.currentTarget.dataset.index
    })
  },
  // 获取手机号码
  getPhoneNumber(e) {
    console.log(e)
  },
  //协议
  agreement() {
    wx.navigateTo({
      url: "/pages/person/service/service"
    })
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