// item.js
var app = getApp()
var WxParse = require('../../../wxParse/wxParse/wxParse.js');
//var BASE64 = require('../../../utils/base64.js');

Page({

  sql: {
    selectImage: "SELECT\n" +
    // " c.content,\n" +
    "	c.xiaochengxu\n" +
    "FROM\n" +
    "	raisesky_application_yun_data c\n" +
    "WHERE\n" +
    "	c.id = ?"
  },
  /**
   * 页面的初始数据
   */
  data: {
    caseImg: '',
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    //console.log(id)
    var that = this
    app.http.postSelectSql({
      sql: that.sql.selectImage,
      params: [id]
    }, function (res) {
      var data = res.data;
      // console.log(data)
      if (!data || data.length < 1) {
        wx.showToast({
          title: '运营人员还没有维护上数据',
          icon: 'loading',
          duration: 1000
        })
        return;
      }
      // app.arrayBufferToString(wx.base64ToArrayBuffer(data[0].content), 'UTF-8', function (x) {
      //   that.setData({
      //     caseImg: data[0].xiaochengxu,
      //     nodes: x
      //   });
      // });
     
      try {
        if (that.data.caseImg) {
          app.arrayBufferToString(wx.base64ToArrayBuffer(that.data.caseImg), 'UTF-8', function (x) {
            WxParse.wxParse('caseImg', 'html', x, that, 20);
          });
        }
      } catch (e) {
        //console.error(e)
      }
    });
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