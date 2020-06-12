// item.js
var app = getApp()
var WxParse = require('../../../wxParse/wxParse/wxParse.js');

Page({

  sql: {
    selectProject: "SELECT\n" +
    "	*\n" +
    "FROM\n" +
    "	(\n" +
    "		SELECT\n" +
    "			py.id ,\n" +
    "			py.title ,\n" +
    "			py.thumb ,\n" +
    "     py.thumb_banner ,\n" +
    "			py.description ,\n" +
    "			pyd.content ,\n" +
    "			pyd.`function` ,\n" +
    "			pyd.mechanism_action ,\n" +
    "			pyd.method_use ,\n" +
    "			pyd.pro_specifications ,\n" +
    "			pyd.slogan ,\n" +
    "			pyd.`share`\n" +
    "		FROM\n" +
    "			raisesky_product_yun py\n" +
    "		LEFT JOIN raisesky_product_yun_data pyd ON py.id = pyd.id\n" +
    "		WHERE\n" +
    "			py.id = ?\n" +
    "	) AS t"
  },

  /**
   * 页面的初始数据
   */
  data: {
    production: {}
  },

  bindCallPhoneTap: function (event) {
    wx.makePhoneCall({
      phoneNumber: '0532-80866037'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var id = options.id
    //console.log(id)
    var that = this
    try {
      app.http.postSelectSql({
        sql: this.sql.selectProject,
        params: [id]
      }, function (res) {
        var data = res.data;
        //console.log(data)
        if (data.length < 1) {
          wx.hideLoading()
          wx.showToast({
            title: '运营人员还没有维护上数据',
            icon: 'loading',
            duration: 5000
          })
          return;
        }

        that.setData({
          production: data[0]
        })

        //     ['content', 'slogan', 'pro_specifications', 'function', 'mechanism_action'].forEach(function (item, index) {
        //     //console.log(item, index)
        //     try {
        //         if (that.data.production[item])
        //             app.arrayBufferToString(wx.base64ToArrayBuffer(that.data.production[item]), 'UTF-8', function (x) {
        //                 WxParse.wxParse(item, 'html', x, that, 20);
        //             });
        //     } catch (e) {
        //         //console.error(e)
        //     }
        // });


        try {
          if (that.data.production.content)
            app.arrayBufferToString(wx.base64ToArrayBuffer(that.data.production.content), 'UTF-8', function (x) {
              WxParse.wxParse('chengFen', 'html', x, that, 20);
            });
        } catch (e) {
          //console.error(e)
        }
        try {
          if (that.data.production.slogan)
            app.arrayBufferToString(wx.base64ToArrayBuffer(that.data.production.slogan), 'UTF-8', function (x) {
              WxParse.wxParse('slogan', 'html', x, that, 20);
            });
        } catch (e) {
          //console.error(e)
        }
        try {
          if (that.data.production.pro_specifications)
            app.arrayBufferToString(wx.base64ToArrayBuffer(that.data.production.pro_specifications), 'UTF-8', function (x) {
              WxParse.wxParse('pro_specifications', 'html', x, that, 20);
            });
        } catch (e) {
          //console.error(e)
        }
        try {
          if (that.data.production.function)
            app.arrayBufferToString(wx.base64ToArrayBuffer(that.data.production.function), 'UTF-8', function (x) {
              WxParse.wxParse('function', 'html', x, that, 20);
            });
        } catch (e) {
          // console.error(e)
        }
        try {
          if (that.data.production.mechanism_action)
            app.arrayBufferToString(wx.base64ToArrayBuffer(that.data.production.mechanism_action), 'UTF-8', function (x) {
              WxParse.wxParse('mechanism_action', 'html', x, that, 20);
            });
        } catch (e) {
          //console.error(e)
        }
        try {
          if (that.data.production.method_use)
            app.arrayBufferToString(wx.base64ToArrayBuffer(that.data.production.method_use), 'UTF-8', function (x) {
              WxParse.wxParse('method_use', 'html', x, that, 20);
            });
        } catch (e) {
          //console.error(e)
        }
        wx.hideLoading()
      });
    } catch (e) {
      //console.log('error:')
      //console.log(e)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})