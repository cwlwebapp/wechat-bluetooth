// pages/manage/manageList/manageList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manageList: [{
      title: '锁的备注',
      destr: '家里的锁'
    }, {
      title: '用户管理',
      destr: ''
    }, {
      title: '超级指纹',
      destr: ''
    }, {
      title: '离线密码',
      destr: ''
    }, {
      title: '分享钥匙',
      destr: ''
    }, {
      title: '权限转让',
      destr: ''
    }, {
      title: '恢复出厂',
      destr: ''
    }],
    istoast: false

  },
  static: {
    input: null
  },
  // 修改名字
  addname(e) {
    // console.log(e.currentTarget.dataset.index)

    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        istoast: true
      })
    } else if (index == 1) {
      wx.navigateTo({
        url: "/pages/manage/user/user",
      })
    } else if (index == 2) {
      // wx.navigateTo({
      //   url: "/pages/manage/share/share",
      // })
      // wx.navigateTo({
      //   url:"pages/manage/superfingerprint/superfingerprint"
      // })
      wx.showModal({
        title: '提示!',
        content: '暂未开放',
        showCancel: false
      })
    } else if (index == 3) {
      wx.navigateTo({
        url: "/pages/manage/offline/offline",
      })



    } else if (index == 4) {
      wx.showModal({
        title: '提示!',
        content: '暂未开放',
        showCancel: false
      })

    } else if (index == 5) {
      wx.navigateTo({
        url: "/pages/manage/transfer/transfer",
      })

    } else if (index == 6) {
      wx.navigateTo({
        url: "/pages/manage/unbundle/unbundle?type=7",
      })
    }

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
  confirm(e) {
    console.log(this.static.input)
    if (!this.static.input) {
      wx.showToast({
        title: '请输入昵称!',
        icon: 'none'
      })
      return
    }
    this.setData({
      istoast: false,
      ["manageList[0].destr"]: this.static.input
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
    return global.shareConfig('', '', "");

  }
})