// home.js

var app = getApp()

var WxParse = require('../../wxParse/wxParse/wxParse.js');

Page({

  sql: {
    selectDesc: "SELECT\n" +
    "	t.title ,\n" +
    "	t.content\n" +
    "FROM\n" +
    "	raisesky_page t\n" +
    "WHERE\n" +
    "	t.catid = ?",
    selectHomeData: "SELECT\n" +
    " t.id, \n" +
    "	t.title ,\n" +
    "	t.thumb ,\n" +
    "	t.description\n" +
    "FROM\n" +
    "	raisesky_history_yun t\n" +
    "ORDER BY\n" +
    "	t.listorder ASC"
  },

  /**
   * 页面的初始数据
   */
  data: {
    homeData: [],
    desc: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.http.postSelectSql({
      sql: that.sql.selectHomeData,
      params: []
    }, function (res) {
      var od = res.data;
      if (od && od.length > 0) {
        that.setData({
          homeData: od
        })
      }
    });
    app.http.postSelectSql({
      sql: that.sql.selectDesc,
      params: [80]
    }, function (res) {
      var od = res.data;
      if (od && od.length > 0) {
        try {
          if (od[0].content)
            app.arrayBufferToString(wx.base64ToArrayBuffer(od[0].content), 'UTF-8', function (x) {
              WxParse.wxParse('desc', 'html', x, that, 20);
            });
        } catch (e) {
          //console.error(e)
        }
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