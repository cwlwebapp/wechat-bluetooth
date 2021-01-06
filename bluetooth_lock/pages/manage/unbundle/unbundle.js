// pages/manage/unbundle/unbundle.js
var tim;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lock: 1,
    bnt: '连接蓝牙',
    bnt1: '解除绑定',
    type: null

  },
  // 开锁效果
  openSuo() {
    clearTimeout(tim)
    tim = setInterval(() => {
      if (this.data.lock >= 3) {
        clearTimeout(tim)
        return
      }
      this.setData({
        lock: this.data.lock + 1
      })
    }, 1000)

  },
  // 解除绑定
  unbind() {
    var that = this;
    if (this.data.type == 1) {
      tim = setInterval(() => {
        if (that.data.lock >= 5) {
          clearTimeout(tim)
          wx.navigateBack()
          return
        }
        that.setData({
          lock: that.data.lock + 1
        })
      }, 1000)
    } else if (this.data.type == 2) {
      wx.showModal({
        title: '提示!',
        content: '是否删除指纹!',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            tim = setInterval(() => {
              if (that.data.lock >= 5) {
                clearTimeout(tim)
                wx.navigateBack()
                return
              }
              that.setData({
                lock: that.data.lock + 1
              })
            }, 1000)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (this.data.type == 3) {
      tim = setInterval(() => {
        if (that.data.lock >= 5) {
          clearTimeout(tim)
          wx.navigateBack()
          return
        }
        that.setData({
          lock: that.data.lock + 1
        })
      }, 1000)

    } else if (this.data.type == 4) {
      wx.showModal({
        title: '提示!',
        content: '是否删除IC卡!',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            tim = setInterval(() => {
              if (that.data.lock >= 5) {
                clearTimeout(tim)
                wx.navigateBack()
                return
              }
              that.setData({
                lock: that.data.lock + 1
              })
            }, 1000)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else if (this.data.type == 5) {

      tim = setInterval(() => {
        if (that.data.lock >= 5) {
          clearTimeout(tim)
          wx.navigateBack()
          return
        }
        that.setData({
          lock: that.data.lock + 1
        })
      }, 1000)

    }else if(this.data.type==6){

      tim = setInterval(() => {
        if (that.data.lock >= 5) {
          clearTimeout(tim)
          wx.navigateBack()
          return
        }
        that.setData({
          lock: that.data.lock + 1
        })
      }, 1000)

    } else if (this.data.type == 7) {
      wx.showModal({
        title: '提示!',
        content: '是否恢复出厂设置!',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            tim = setInterval(() => {
              if (that.data.lock >= 5) {
                clearTimeout(tim)
                wx.navigateBack()
                return
              }
              that.setData({
                lock: that.data.lock + 1
              })
            }, 1000)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      type: options.type || ""
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