// pages/manage/fingerprint/fingerprint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fingerprint: [{
        title: 'IC卡1'
      },
      {
        title: 'IC卡2'
      },
      {
        title: 'IC卡3'
      }, {
        title: 'IC卡4'
      }
    ]
  },
  // 删除
  delate() {
    wx.navigateTo({
      url: "/pages/manage/unbundle/unbundle?type=4"
    })
  },
  //添加指纹
  add() {
    wx.navigateTo({
      url: "/pages/manage/unbundle/unbundle?type=5"
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