// pages/person/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    istoast: false,
    profile: {
      headimg: 'http://qn.sghappy.com/upload/201901/21/00e547c972b5456f88a00f4c4cfdc2b4',
      name: '子不语',
      phone: 13265472403
    }

  },
  static: {
    input: ''

  },
  // 选择图片
  addimg() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // console.log(res)
        that.setData({
          ['profile.headimg']: res.tempFilePaths[0]
        })
      }
    })
  },
  // 修改名字
  addname() {
    this.setData({
      istoast: true
    })
  },
  // 取消
  cancal() {
    this.setData({
      istoast: false
    })
  },
  //输入
  bindinput(e) {
    console.log(e.detail.value)

    this.static.input = e.detail.value
  },
  //提交
  confirm() {
    if (!this.static.input) {
      wx.showToast({
        title: '请输入昵称!',
        icon: 'none'
      })
      return
    } else if (this.static.input.length>=16){
      wx.showToast({
        title: '昵称最长16个字符!',
        icon: 'none'
      })
      return
    }
    this.setData({
      ['profile.name']: e.detail.value,
      istoast: false
    })
  },
  //页面提交
  bnt_confirm() {
    wx.navigateBack()
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