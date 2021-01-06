// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    arr: [{
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      }, {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      }, {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      }, {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      }
    ]


  },
  static: {
    // 使用记录
    employ: [{
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/01d645f735bf4b91ae401d2319b42a9d',
        title: ' 漂流的许愿瓶',
        describe: '2018 - 12 - 17 8: 52打开了家门'
      }
    ],
    // 分享记录
    share: [{
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/6897399be2ff482eab1a0ac7e81c1ff5',
        title: ' 分享快乐',
        describe: '2018 - 12 - 17 8: 52分享'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/6897399be2ff482eab1a0ac7e81c1ff5',
        title: ' 分享快乐',
        describe: '2018 - 12 - 17 8: 52分享'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/6897399be2ff482eab1a0ac7e81c1ff5',
        title: ' 分享快乐',
        describe: '2018 - 12 - 17 8: 52分享'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/6897399be2ff482eab1a0ac7e81c1ff5',
        title: ' 分享快乐',
        describe: '2018 - 12 - 17 8: 52分享'
      },
      {
        imagesrc: 'http://qn.sghappy.com/upload/201901/21/6897399be2ff482eab1a0ac7e81c1ff5',
        title: ' 分享快乐',
        describe: '2018 - 12 - 17 8: 52分享'
      }
    ]
  },
  // 切换
  jump(e) {
    // console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    if (index == 1) {
      this.setData({
        active: index,
        arr: this.static.employ
      })

    } else if (index == 2) {
      this.setData({
        active: index,
        arr: this.static.share
      })
    } else {
      this.setData({
        active: index,
        arr: []
      })
      wx.showModal({
        title: '提示',
        content: '该功能暂未开放,敬请期待!',
        showCancel:false
      }) 
    }

  },
  //分享记录
  share_detail() {
    wx.navigateTo({
      url: "/pages/record/share_detatil/share_detatil"
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