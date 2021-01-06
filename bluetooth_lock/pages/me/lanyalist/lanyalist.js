// pages/me/lanyalist/layalist.js
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
// Unicode解码
function buf2string(buffer) {
  var arr = Array.prototype.map.call(new Uint8Array(buffer), x => x)
  var str = ''
  for (var i = 0; i < arr.length; i++) {
    // 	将 Unicode 转换为字符串
    str += String.fromCharCode(arr[i])
  }
  return str
}
//转码
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
// 十六进制转ASCII
function hexCharCodeToStr(hexCharCodeStr) {
  var trimedStr = hexCharCodeStr.trim();
  var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
  var len = rawStr.length;
  if (len % 2 !== 0) {
    alert("存在非法字符!");
    return "";
  }
  var curCharCode;
  var resultStr = [];
  for (var i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16);
    resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join("");
}
//ASCII码转16进制
function strToHexCharCode(str) {
  if (str === "") {
    return "";
  } else {
    var hexCharCode = [];
    hexCharCode.push("0x");
    for (var i = 0; i < str.length; i++) {
      hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 模板传参
    lanyanlist: [],
    isbnt: false
  },
  static: {
    // 蓝牙连接的mac地址
    deviceId: "",
    // 服务的uniid
    services_uuid: "",
    // 写的服务
    write_charuuid: "",
    // 读的服务
    read_charuuid: ""

  },


  //初始化蓝牙
  openBluetoothAdapter() {
    var that = this;
    wx.showLoading({
      title: '蓝牙搜索中',
      mask: true
    });
    wx.openBluetoothAdapter({
      success(res) {
        that.startBluetoothDevicesDiscovery()
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
  // 获取本机蓝牙状态
  getBluetoothAdapterState() {
    var that = this;
    wx.getBluetoothAdapterState({
      success(res) {
        console.log(res, '获取本机蓝牙状态成功')
        if (res.available) {
          wx.showLoading({
            title: '蓝牙搜索中!',
            mask: true
          });
          that.startBluetoothDevicesDiscovery()
        }else{
          wx.showModal({
            title: '提示!',
            content: '请手动打开蓝牙!'
          })
        }
      },
      fail(err) {
        console.log(err, '获取本机蓝牙状态失败')
      },
      complete(data) {
        console.log(data, '获取本机蓝牙状态完成')
      }
    })
  },
  //开始搜索蓝牙
  startBluetoothDevicesDiscovery() {
    var that = this;
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success(res) {
        setTimeout(() => {
          that.getBluetoothDevices()
        }, 2000)
      },
      fail(res) {
        console.log('启动蓝牙失败!')
        wx.showModal({
          content: '请开启手机蓝牙后再试!'
        })
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
    var that = this;
    wx.getBluetoothDevices({
      success(res) {
        that.stopBluetoothDevicesDiscovery()
        wx.hideLoading()
        console.log(res.devices, '发现的蓝牙设配成功')
        that.setData({
          lanyanlist: res.devices,
          isbnt: true
        })
      },
      fail(err) {
        console.log(err, '发现的蓝牙设配失败')
      },
      complete(data) {
        console.log(data, '发现的蓝牙设配完成')
      }

    })
  },

  // 蓝牙连接
  createBLEConnection() {
    var that = this;
    wx.createBLEConnection({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId: this.static.deviceId, //区分蓝牙的设配id
      // timeout: 600, //超时时间
      success: res => {
        console.log(res, '蓝牙连接成功')
        that.getBLEDeviceServices()
      },
      fail(err) {
        console.log(err, '蓝牙连接失败')
      },
      complete(data) {
        wx.hideLoading()
        console.log(data, '蓝牙连接完成')
      }
    })
  },

  // 获取蓝牙设备所有服务(service)。
  getBLEDeviceServices() {
    var that = this;
    wx.getBLEDeviceServices({
      deviceId: that.static.deviceId, //蓝牙设备 id
      success(res) {
        console.log(res.services, '获取蓝牙设备所有服务成功')
        that.static.services_uuid = res.services[0].uuid
        that.getBLEDeviceCharacteristics()
      },
      fail(err) {
        console.log(err, '获取蓝牙设备所有服务失败')
      },
      complete(data) {
        console.log(data, '获取蓝牙设备所有服务完成')
      }
    })
  },

  // 获取蓝牙设备某个服务中所有特征值(characteristic)。
  getBLEDeviceCharacteristics() {
    var that = this;
    wx.getBLEDeviceCharacteristics({
      deviceId: that.static.deviceId, //蓝牙设配id
      serviceId: that.static.services_uuid, //蓝牙服务uuid需要使用getBLEDeviceServices获取
      success(res) {
        console.log(res, '所有特征值(characteristic)成功')
        that.static.write_charuuid = res.characteristics[0].uuid
        that.static.read_charuuid = res.characteristics[1].uuid
        that.notifyBLECharacteristicValueChange()
        that.writeBLECharacteristicValue()
        that.onBLECharacteristicValueChange()
      }
    })
  },
  // 向低功耗蓝牙写入数据
  writeBLECharacteristicValue() {
    var that = this;
    // 向蓝牙设备发送一个0x00的16进制数据
    // const buffer = new ArrayBuffer(8)
    // const dataView = new DataView(buffer)

    // dataView.setUint8(0, 0xBB)
    // dataView.setUint8(1, 0x55)
    // dataView.setUint8(2, 0x01)
    // dataView.setUint8(3, 0x03)
    // dataView.setUint8(4, 0x02)
    // dataView.setUint8(5, 0x02)
    // dataView.setUint8(6, 0x00)
    // dataView.setUint8(7, 0x02)
    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: that.static.deviceId,
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId: that.static.services_uuid,
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId: that.static.write_charuuid,
      // 这里的value是ArrayBuffer类型
      // value: buffer,
      // value: hexStringToArrayBuffer("BB55010302020002"),
      value: hexStringToArrayBuffer("5A0A031005020F213BEB"),
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
    // 监听低功耗蓝牙设备的特征值变化事件。必须先启用 notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification。
    wx.onBLECharacteristicValueChange(function(res) {
      console.log(res, '监听低功耗蓝牙设备的特征值变化')
      console.log(ab2hex(res.value), "*******************************")
      // console.log(buf2string(res.value),"--------------------------")

      var str = ab2hex(res.value);
      // var str ="AA55010F02020000000000056D43590000037807"//测试锁号 888
      var suo_num = str.substr(-10, 8)
      console.log(suo_num, '截取后十位')
      var num = parseInt(suo_num, 16); //num=217
      console.log(num, "十六转十进制")
      var suo_str = str.substr(-14, 4)
      console.log(hexCharCodeToStr(suo_str), "ASCII")
      var str1 = hexCharCodeToStr(suo_str)
      if (str.slice(0, 1) == "a") {
        wx.navigateTo({
          url: "/pages/me/addnumner/addnumber?str1=" + str1 + "&num=" + num,
        })
      }


    })
  },

  //添加锁
  addsuo(e) {
    wx.showLoading({
      title: '蓝牙连接中',
      mask: true
    });
    var that = this;
    var index = e.currentTarget.dataset.index
    this.static.deviceId = this.data.lanyanlist[index].deviceId;
    this.createBLEConnection()
  },
  // 刷新
  updata() {
    this.getBluetoothAdapterState()
   

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.openBluetoothAdapter()
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