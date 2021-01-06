// bluetooth/bluetooth.js
// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  console.log(buffer, 'buffer数据')
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function(bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  console.log(hexArr, '数据解析----------------')
  return hexArr.join('');
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // ***********************************操作蓝牙适配器的方法
  // 初始化蓝牙模块(蓝牙模块调用前的初始化 所有的api在里面调用)
  openBluetoothAdapter() {
    var that = this;
    wx.openBluetoothAdapter({
      success(res) {
        console.log(res, '初始化模块成功')
        // 监听蓝牙的变化
        // that.onBluetoothAdapterStateChange()
        // 蓝牙搜索
        // that.startBluetoothDevicesDiscovery()

      },
      fail(err) {
        console.log(err, '初始化模块失败')
      },
      complete(data) {
        console.log(data, '初始化模块完成')
      }
    })
  },
  //关闭蓝牙模块 
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter({
      success(res) {
        console.log(res, '关闭蓝牙模块成功')
      },
      fail(err) {
        console.log(err, '关闭蓝牙模块失败')
      },
      complete(data) {
        console.log(data, '关闭蓝牙模块完成')
      }

    })

  },
  // 获取本机蓝牙状态
  getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
      success(res) {
        console.log(res, '获取本机蓝牙状态成功')
      },
      fail(err) {
        console.log(err, '获取本机蓝牙状态失败')
      },
      complete(data) {
        console.log(data, '获取本机蓝牙状态完成')
      }
    })
  },
  //监听蓝牙状态的变化
  onBluetoothAdapterStateChange() {
    wx.onBluetoothAdapterStateChange(function(res) {
      console.log(res, '蓝牙状态的改变')
    })
  },
  // *************************蓝牙连接前的方法

  // 开始搜寻周围的蓝牙设配
  startBluetoothDevicesDiscovery() {
    var that = this;
    wx.startBluetoothDevicesDiscovery({
      //services: ['00:00:00:00:05:C6'], //非必填 要搜索的蓝牙设备主 service 的 uuid 列表
      allowDuplicatesKey: true, //非必填 true是重复上报同一设备。是 wx.onBlueToothDeviceFound 会多次上报同一设备，但是RSSI值会有不同。
      interval: 0, //非必填 0 表示找到新设备立即上报
      success(res) {
        console.log(res, '开始搜寻周围的蓝牙设配成功')
        // that.onBluetoothDeviceFound()
      },
      fail(err) {
        console.log(err, '开始搜寻周围的蓝牙设配失败')
      },
      complete(data) {
        console.log(data, '开始搜寻周围的蓝牙设配完成')
      }
    })
  },
  // 停止蓝牙搜索
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery({
      success(res) {
        console.log(res, '停止搜寻周围的蓝牙设配成功')
      },
      fail(err) {
        console.log(err, '停止搜寻周围的蓝牙设配失败')
      },
      complete(data) {
        console.log(data, '停止搜寻周围的蓝牙设配完成')
      }

    })
  },
  // 获取已发现的蓝牙设配
  getBluetoothDevices() {
    wx.getBluetoothDevices({
      success(res) {
        console.log(res, '发现的蓝牙设配成功')
      },
      fail(err) {
        console.log(err, '发现的蓝牙设配失败')
      },
      complete(data) {
        console.log(data, '发现的蓝牙设配完成')
      }

    })
  },
  // 监听寻找新设配事件
  onBluetoothDeviceFound() {
    console.log('监听寻找新设配事件')
    wx.onBluetoothDeviceFound(function(devices) {
      console.dir(devices)
    })
  },
  // ******************连接蓝牙的操作
  // 蓝牙连接
  createBLEConnection() {
    wx.createBLEConnection({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: '00:00:00:00:05:C6', //区分蓝牙的设配id
      //timeout: 600, //超时时间
      success(res) {
        console.log(res, '蓝牙连接成功')
      },
      fail(err) {
        console.log(err, '蓝牙连接失败')
      },
      complete(data) {
        console.log(data, '蓝牙连接完成')
      }
    })

  },
  //关闭连接 
  closeBLEConnection() {
    wx.closeBLEConnection({
      deviceId: '00:00:00:00:05:C6', //区分蓝牙的设配id
      success(res) {
        console.log(res, '关闭连接成功')
      },
      fail(err) {
        console.log(err, '关闭连接失败')
      },
      complete(data) {
        console.log(data, '关闭连接完成')
      }
    })
  },

  // *******************连接成功后的操作
  // 获取蓝牙设备所有服务(service)。
  getBLEDeviceServices() {
    wx.getBLEDeviceServices({
      deviceId: '00:00:00:00:05:C6', //蓝牙设备 id
      success(res) {
        console.log(res, '获取蓝牙设备所有服务成功')
      },
      fail(err) {
        console.log(err, '获取蓝牙设备所有服务失败')
      },
      complete(data) {
        console.log(data, '获取蓝牙设备所有服务完成')
      }
    })
  },

  // 根据 uuid 获取处于已连接状态的设备。
  getConnectedBluetoothDevices() {
    wx.getConnectedBluetoothDevices({
      services: ['0000FEF0-0000-1000-8000-00805F9B34FB'], //蓝牙设备主 service 的 uuid 列表
      success(res) {
        console.log(res, '根据 uuid 获取处于已连接状态的设备成功')
      },
      fail(err) {
        console.log(err, '根据 uuid 获取处于已连接状态的设备失败')
      },
      complete(data) {
        console.log(data, '根据 uuid 获取处于已连接状态的设备完成')
      }
    })
  },

  // 获取蓝牙设备某个服务中所有特征值(characteristic)。
  getBLEDeviceCharacteristics() {
    wx.getBLEDeviceCharacteristics({
      deviceId: '00:00:00:00:05:C6', //蓝牙设配id
      serviceId: '0000FFF0-0000-1000-8000-00805F9B34FB', //蓝牙服务uuid需要使用getBLEDeviceServices获取
      success(res) {
        console.log(res, '所有特征值(characteristic)成功')
      },
      fail(err) {
        console.log(err, '所有特征值(characteristic)失败')
      },
      complete(data) {
        console.log(data, '所有特征值(characteristic)完成')
      }

    })
  },
  // 另外，必须先启用 notifyBLECharacteristicValueChange 才能监听到设备 characteristicValueChange 事件
  notifyBLECharacteristicValueChange() {
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: "00:00:00:00:05:C6", //蓝牙设备 id
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId: "0000FFF0-0000-1000-8000-00805F9B34FB", //蓝牙特征值对应服务的 uuid
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId: "0000FFF1-0000-1000-8000-00805F9B34FB", //蓝牙特征值的 uuid
      success(res) {
        console.log(res, '启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值')
      }
    })
  },
  //监听低功耗蓝牙设备的特征值变化
  onBLECharacteristicValueChange() {
    // 监听低功耗蓝牙设备的特征值变化事件。必须先启用 notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification。
    wx.onBLECharacteristicValueChange(function(res) {
      console.log(res, '监听低功耗蓝牙设备的特征值变化')
    })
  },
  //读取低功耗蓝牙设备的特征值的二进制数据值
  readBLECharacteristicValue() {
    // 必须在这里的回调才能获取
    // wx.onBLECharacteristicValueChange(function (characteristic) {
    //   console.log('characteristic value comed:', characteristic)
    // })
    wx.readBLECharacteristicValue({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: "00:00:00:00:05:C6",
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId: "0000FFF0-0000-1000-8000-00805F9B34FB",
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId: "0000FFF1-0000-1000-8000-00805F9B34FB",
      success(res) {
        console.log(res, '读取低功耗蓝牙设备的特征值的二进制数据值:')
      },
      fail(err) {
        console.log(err, '读取低功耗蓝牙设备的特征值的二进制数据值失败')
      },
      complete(data) {
        console.log(data, '读取低功耗蓝牙设备的特征值的二进制数据值完成')
      }
    })
  },
  // 向低功耗蓝牙写入数据
  writeBLECharacteristicValue() {
    // 向蓝牙设备发送一个0x00的16进制数据
    const buffer = new ArrayBuffer(8)
    const dataView = new DataView(buffer)
    dataView.setUint8(0, 0xBB)
    dataView.setUint8(1, 0x55)
    dataView.setUint8(2, 0x01)
    dataView.setUint8(3, 0x03)
    dataView.setUint8(4, 0x01)
    dataView.setUint8(5, 0x02)
    dataView.setUint8(6, 0xA6)
    dataView.setUint8(7, 0xA7)

    console.log(buffer, "蓝牙功能")
    // var buffer = new Uint8Array() 
    // var buffer = new ArrayBuffer(8)
    // var dataView = new Uint8Array(buffer)
    // var arr = "BB,55,01,03,01,02,A6,A7";
    // for (var i = 0; i < arr.length; i++) {
    //   // 字符串转化为Unicode
    //   dataView[i] = arr.charCodeAt(i)
    // }
    // var hex = "BB5501030102A6A7";
    // var buffer = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function(h) {
    //   return parseInt(h, 16)
    // }))



    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: "00:00:00:00:05:C6",
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId: "0000fff0-0000-1000-8000-00805f9b34fb",
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId: "0000fff2-0000-1000-8000-00805f9b34fb",
      // 这里的value是ArrayBuffer类型
      value: buffer,
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


  //监听低功耗蓝牙连接的错误事件
  onBLEConnectionStateChange() {
    wx.onBLEConnectionStateChange(function(res) {
      console.log(res, '监听低功耗蓝牙连接的错误事件')
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