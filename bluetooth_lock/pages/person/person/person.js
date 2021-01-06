// pages/person/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    profile: {
      headimg: 'http://qn.sghappy.com/upload/201901/21/00e547c972b5456f88a00f4c4cfdc2b4',
      name: '子不语',
      phone: 13265472403
    }
  },
  // 个人资料
  profile() {
    wx.navigateTo({
      url: "/pages/person/profile/profile",
    })
  },
  //我的消息
  myNews() {
    wx.navigateTo({
      url: "/pages/person/myNews/myNews",
    })
  },
  // 账号管理
  management() {
    wx.navigateTo({
      url: "/pages/person/management/management"
    })
  },
  //使用说明
  instructions() {
    wx.navigateTo({
      url: "/pages/person/instructions/instructions"
    })
  },
  // 意见反馈
  feedback(){
    wx.navigateTo({
      url: "/pages/person/feedback/feedback"
    })
  },
  //服务协议
  service(){
    wx.navigateTo({
      url: "/pages/person/service/service"
    })
  },
  // app升级
  update(){
    wx.navigateTo({
      url: "/pages/person/upgrading/upgrading"
    })
    // if (wx.canIUse('getUpdateManager')) {
    //   const updateManager = wx.getUpdateManager()
    //   updateManager.onCheckForUpdate(function (res) {
    //     console.log('onCheckForUpdate====', res)
    //     // 请求完新版本信息的回调
    //     if (res.hasUpdate) {
    //       console.log('res.hasUpdate====')
    //       updateManager.onUpdateReady(function () {
    //         wx.showModal({
    //           title: '更新提示',
    //           content: '新版本已经准备好，是否重启应用？',
    //           success: function (res) {
    //             console.log('success====', res)
    //             // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
    //             if (res.confirm) {
    //               // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //               updateManager.applyUpdate()
    //             }
    //           }
    //         })
    //       })
    //       updateManager.onUpdateFailed(function () {
    //         // 新的版本下载失败
    //         wx.showModal({
    //           title: '已经有新版本了哟~',
    //           content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
    //         })
    //       })
    //     }
    //   })
    // }

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