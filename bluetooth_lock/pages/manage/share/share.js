// pages/manage/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timelist: [{
        time: '十分钟'
      },
      {
        time: '一天'

      },
      {
        time: '一个星期'

      },
      {
        time: '半个月'

      }, {
        time: '长期',
        checked: true
      }
    ],
    disabled: false
  },
  //选择
  radioChange(e) {
    console.log(e)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type == 'time') {
      this.setData({
        disabled: true
      })
    }


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