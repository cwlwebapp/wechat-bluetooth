// pages/manage/fingerprint/fingerprint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fingerprint: [{
        title: '大拇指'
      },
      {
        title: '小拇指'
      },
      {
        title: '食拇指'
      }, {
        title: '中拇指'
      }
    ],
    ishidden: true
  },
  static: {
    title: 'xx的指纹'
  },
  // 删除
  delate() {
    wx.navigateTo({
      url: "/pages/manage/unbundle/unbundle?type=2"
    })
  },
  // 重命名
  rechristen() {
    this.setData({
      ishidden: false
    })
  },
  // modal取消
  cancel() {
    this.setData({
      ishidden: true
    })

  },
  // 文本输入
  bindinput(e) {
    console.log(e.detail.value)
  },
  // modal提交
  confirm() {
    this.setData({
      ishidden: true
    })
  },
  // 删除
  remove() {
    wx.showModal({
      title: "提示",
      content: this.static.title,
      success: (e) => {
        // 取消
        console.log(e.cancel)
        // 确定
        console.log(e.confirm)
      }
    })

  },
  // 添加指纹
  add() {
    wx.navigateTo({
      url: "/pages/manage/fingerprintEntry/fingerprintEntry"
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