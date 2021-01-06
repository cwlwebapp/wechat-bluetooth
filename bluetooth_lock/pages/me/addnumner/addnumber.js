// pages/me/addnumner/addnumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yan: false,
    ispassword: true,
    locked: "",
    internal: ""


  },
  static: {
    suohao: 0,
    pass: 0,
    name: ''
  },
  //输入监听
  bindblur(e) {
    console.log(e.detail.value)
    this.static.suohao = e.detail.value
  },
  bindblur1(e) {
    console.log(e.detail.value)
    this.static.pass = e.detail.value
  },
  bindinput(e) {
    console.log(e.detail.value)
    this.static.name = e.detail.value
  },
  // 添加锁
  addnumber() {
    console.log(this.data.internal)
    if (!this.static.suohao && !this.data.internal) {
      wx.showToast({
        title: '请输入锁号!',
        icon: 'none'
      })
      return;
    } else if (!this.static.pass) {
      wx.showToast({
        title: '请输入密码!',
        icon: 'none'
      })
      return;
    } else if (!this.static.name && !this.data.locked) {
      wx.showToast({
        title: '请备注锁名!',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '添加中!',
      mask: true
    })
    setTimeout(() => {
      wx.hideLoading()
      wx.switchTab({
        url: "/pages/me/me/me"
      })
    }, 1000)
  },
  //眼睛
  isopen(e) {
    this.setData({
      yan: !this.data.yan,
      ispassword: !this.data.ispassword
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      locked: options.str1,
      internal: options.num
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