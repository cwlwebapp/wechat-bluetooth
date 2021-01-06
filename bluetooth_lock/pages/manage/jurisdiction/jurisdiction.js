// pages/manage/jurisdiction/jurisdiction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 开锁时间
  opentime(){
   wx.navigateTo({
     url: "/pages/manage/share/share?type=time",
   })
  },
  // 指纹管理
  fingerprint(){
    wx.navigateTo({
      url: "/pages/manage/fingerprint/fingerprint"
    })
  },
  // ic卡管理
  iC(){
    wx.navigateTo({
      url: "/pages/manage/iclist/iclist"
    })
  },
  // 密码管理
  password(){
    wx.navigateTo({
     url: "/pages/manage/unbundle/unbundle?type=6"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})