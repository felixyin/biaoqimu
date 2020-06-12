// pages/advisory/index.js
var app = getApp()
Page({

    sql: {
        selectData: "SELECT\n" +
        "	*\n" +
        "FROM\n" +
        "	raisesky_salesman_yun",
        saveQuestion:
        "INSERT INTO raisesky_form_yun_order(\n" +
        "	userid ,\n" +
        "	username ,\n" +
        "	address ,\n" +
        "	`DATETIME` ,\n" +
        "	ip ,\n" +
        "	`NAME` ,\n" +
        "	phone ,\n" +
        "	content \n" +
        ")\n" +
        "VALUES\n" +
        "	(0 , '' , '' , 0 , '' ,?,?,?)"
    },
    /**
     * 页面的初始数据
     */
    data: {
        salesmans: [],
        name: ''
    },
    bindCallPhoneTap: function (event) {
        var ds = event.currentTarget.dataset
        wx.makePhoneCall({
            phoneNumber: ds.phone //仅为示例，并非真实的电话号码
        })
    },
    bindNameInput: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    bindPhoneInput: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },
    callLxwm:function(e){
      wx.makePhoneCall({
        phoneNumber: '0532 8086 6537' //仅为示例，并非真实的电话号码
      })
    },
    bindQuestionInput: function (e) {
        this.setData({
            question: e.detail.value
        })
    },
    bindSaveTap: function (event) {
        var that = this
        var d = that.data;
        if (!(d.name && d.phone && d.question)) {
            wx.showToast({
                title: '姓名、手机号、问题都必填',
                icon: 'loading',
                duration: 2000
            })
            return;
        }
        app.http.postExecuteSql({
            sql: that.sql.saveQuestion,
            params: [d.name, d.phone, d.question]
        }, function (res) {
            var data = res.data
            if (data.success) {
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                })
            } else {
                wx.showToast({
                    title: '保存失败',
                    icon: 'loading',
                    duration: 2000
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        app.http.postSelectSql({
            sql: that.sql.selectData,
            params: []
        }, function (res) {
            var data = res.data;
            // console.log(data)
            if (data.length < 0) return;
            that.setData({
                salesmans: data
            })
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