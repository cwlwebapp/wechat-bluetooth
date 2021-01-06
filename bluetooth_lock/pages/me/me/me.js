// pages/me/me/me.js
//二进制转十六进制 
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function(bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('')
}
//转码写入
function hexStringToArrayBuffer(str) {
  if (!str) {
    return new ArrayBuffer(0);
  }
  var buffer = new ArrayBuffer(str.length);
  let dataView = new DataView(buffer)
  let ind = 0;
  for (var i = 0, len = str.length; i < len; i += 2) {
    let code = parseInt(str.substr(i, 2), 16)
    dataView.setUint8(ind, code)
    ind++
  }
  return buffer;
}
var tim;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 锁列表
    suoList: [{
        active: true,
        locked: "科名测试",
        internal: "cy997"

      },
      {
        active: false
      },
      {
        active: false
      },
      {
        active: false
      },
      {
        active: false
      },
      {
        active: false
      }
    ],
    // suoList: [],
    // 锁开关
    lock: 1,
    // 添加锁
    add: false,
    percent: 0,
    // 界面状态
    status: 0
  },
  static: {
    index: 0,
    // 蓝牙连接的mac地址
    deviceId: "00:00:00:00:05:C6",
    // 服务的uniid
    services_uuid: "0000fff0-0000-1000-8000-00805f9b34fb",
    // 写的服务
    write_charuuid: "0000FFF2-0000-1000-8000-00805F9B34FB",
    // 读的服务
    read_charuuid: "0000FFF1-0000-1000-8000-00805F9B34FB",
    // 开锁服务
    opensuo: "BB5501030102A6A7"
  },
  // 选中效果
  active(e) {
    var index = e.currentTarget.dataset.index;
    var indexed = this.static.index
    if (index == indexed) return;
    this.setData({
      [`suoList[${index}].active`]: true,
      [`suoList[${indexed}].active`]: false
    })
    this.static.index = index;
  },
  // 开锁效果
  // openSuo() {
  //   wx.navigateTo({
  //     url: "/pages/manage/unbundle/unbundle?type=1"
  //   })
  // },
  //开锁
  openSuo() {
    this.openBluetoothAdapter()
    // clearTimeout(tim)
    // tim = setInterval(() => {
    //   if (this.data.lock >= 4) {
    //     clearTimeout(tim)
    //     this.setData({
    //       lock: 1
    //     })
    //     return
    //   }
    //   this.setData({
    //     lock: this.data.lock + 1
    //   })
    // }, 1000)
  },
  //初始化蓝牙
  openBluetoothAdapter() {
    var that = this;
    wx.openBluetoothAdapter({
      success(res) {
        that.setData({
          lock: 2
        })
        that.createBLEConnection()
      },
      fail(res) {
        wx.showModal({
          content: '请开启手机蓝牙后再试!',
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.hideLoading()
              that.setData({
                lanyanlist: res.devices,
                isbnt: true
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }

        })
      }
    })
  },
  // 蓝牙连接
  createBLEConnection() {
    var that = this;
    wx.createBLEConnection({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: that.static.deviceId, //区分蓝牙的设配id
      //timeout: 600, //超时时间
      success(res) {
        console.log(res, '蓝牙连接成功')
        that.notifyBLECharacteristicValueChange()
        that.onBLECharacteristicValueChange()
        that.writeBLECharacteristicValue()

      },
      fail(err) {
        console.log(err, '蓝牙连接失败')
      },
      complete(data) {
        console.log(data, '蓝牙连接完成')
      }
    })

  },
  // 另外，必须先启用 notifyBLECharacteristicValueChange 才能监听到设备 characteristicValueChange 事件
  notifyBLECharacteristicValueChange() {
    var that = this;
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: that.static.deviceId, //蓝牙设备 id
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId: that.static.services_uuid, //蓝牙特征值对应服务的 uuid
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId: that.static.read_charuuid, //蓝牙特征值的 uuid
      success(res) {
        console.log(res, '启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值')
      }
    })

  },
  //监听低功耗蓝牙设备的特征值变化
  onBLECharacteristicValueChange() {
    var that = this;
    // 监听低功耗蓝牙设备的特征值变化事件。必须先启用 notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification。
    wx.onBLECharacteristicValueChange(function(res) {
      if (ab2hex(res.value).substr(0,1) == "f") return
      console.log(res, '监听低功耗蓝牙设备的特征值变化')
      console.log(ab2hex(res.value), "*******************************")
      var str = ab2hex(res.value)
      that.setData({
        lock: 3
      })

      if (ab2hex(res.value).toUpperCase() == "AA55010301020001") {
        that.static.opensuo = "BB55010301040007"
        that.writeBLECharacteristicValue()
      } else {
        var suo_num = str.substr(-4, 2)
        console.log(suo_num)
        var num = parseInt(suo_num, 16)
        var percent = (num - 168) / (198 - 168) > 1 ? 1 : (num - 168) / (198 - 168)
        console.log(percent,"百分比")
        console.log(num, "电量")
        that.setData({
          percent: percent*100
        })
      }

    })
  },
  // 向低功耗蓝牙写入数据
  writeBLECharacteristicValue() {
    var that = this;
    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: that.static.deviceId,
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId: that.static.services_uuid,
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId: that.static.write_charuuid,
      // 这里的value是ArrayBuffer类型
      // value: buffer,
      value: hexStringToArrayBuffer(that.static.opensuo),
      success(res) {
        console.log(res, '向低功耗蓝牙写入数据')
      },
      fail(err) {
        console.log(err, "向低功耗蓝牙写入数据")
      },
      complete(data) {
        console.log(data, '向低功耗蓝牙写入数据')
      }

    })
  },
  // 添加锁
  addSuo() {
    this.setData({
      add: !this.data.add
    })
  },
  // 扫码
  saoma() {
    var that = this;
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode', 'qrCode', 'pdf417'],
      success(res) {
        console.log(res.result, '扫码内容')
        console.log(res.charSet, '扫码子集')
        console.log(res.path, '二维码携带的 path')
        console.log(res.rawData, 'base64编码')
        wx.showToast({
          title: '扫码成功!',
          icon: 'none'
        })
      },
      fail(res) {
        wx.showToast({
          title: '解析失败 请重试!',
          icon: 'none'
        })
      },
      complete(res) {
        that.setData({
          add: !that.data.add
        })
      }
    })
  },
  //增加蓝牙
  addLaya() {
    wx.navigateTo({
      url: "/pages/me/lanyalist/lanyalist",
    })
  },
  // 表示成功
  isadd() {
    this.setData({
      add: false
    })
    setTimeout(() => {
      wx.showToast({
        title: '添加成功!',
      })
    })
  },
  //数字添加
  addNumber() {
    wx.navigateTo({
      url: "/pages/me/addnumner/addnumber",
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