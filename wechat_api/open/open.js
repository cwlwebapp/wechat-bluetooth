// open/open.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //初始化
  openBluetoothAdapter() {
    var that = this;
    wx.openBluetoothAdapter({
      success(res) {
        console.log("成功", res)
        that.startBluetoothDevicesDiscovery()

      },
      fail(err) {
        if (err.errCode == 10001) {
          wx.showToast({
            title: '请打开蓝牙!',
            icon: 'none'
          })
          that.onBluetoothAdapterStateChange()
        }
        console.log("失败", err)
      },
      complete(data) {
        console.log('完成', data)
      }
    })
  },
  // 监听蓝牙状态
  onBluetoothAdapterStateChange() {
    var that = this;
    wx.onBluetoothAdapterStateChange(function(res) {
      console.log('adapterState changed, now is', res)
      that.startBluetoothDevicesDiscovery()
    })
  },

  //   参数	类型	说明
  // available	Boolean	蓝牙适配器是否可用
  // discovering	Boolean	蓝牙适配器是否处于搜索状态

  //  蓝牙搜索状态
  startBluetoothDevicesDiscovery() {
    var that = this;
    wx.startBluetoothDevicesDiscovery({
      // services: ['0000fff0-0000-1000-8000-00805f9b34fb'],//蓝牙系统对应unid,
      allowDuplicatesKey: true,
      success(res) {
        console.log(res, '成功')
        that.onBluetoothDeviceFound()
      },
      fail(err) {
        console.log(err, '搜索')
      }
    })
  },
  // 寻找蓝牙设配
  onBluetoothDeviceFound() {
    var that = this;
    wx.onBluetoothDeviceFound(function(devices) {
      console.log(devices, '寻找蓝牙')
      that.getBluetoothDevices()
    })

  },
  // 获取新发现的新设配
  getBluetoothDevices() {
    wx.getBluetoothDevices({
      success(res) {
        console.log(res, '获取新设备')
      }

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