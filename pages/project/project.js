//index.js
//获取应用实例
var app = getApp()
Page({
  sql: {
    selectProjectList: "SELECT \n" +
    "    	py.id , \n" +
    "    	py.title , \n" +
    "    	py.thumb , \n" +
    "    	py.pro_id , \n" +
    "    	c.catname \n" +
    "    FROM \n" +
    "    	raisesky_ad_yun py \n" +
    "    LEFT JOIN raisesky_category c ON py.catid = c.catid  \n" +
    "    WHERE c.parentid = ?"
  },
  data: {
    categorys1: {},
    categorys2: {}
  },
  //事件处理函数dgs
  bindViewTap: function (event) {
    var id = event.currentTarget.dataset.id
    if (!id) {
      wx.showToast({
        title: '运营人员还没有维护上数据',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
    wx.navigateTo({
      url: '../project/item/item?id=' + id
    })
  },
  bindData: function (parentId, callback) {

    app.http.postSelectSql({
      sql: this.sql.selectProjectList,
      params: [parentId]
    }, function (res) {
      var od = res.data;

      if (od && od.length > 0) {
        var data = []

        for (var i = 0; i < od.length; i++) {
          var o = od[i]
          var category = data[o.catname]
          if (!category) data[o.catname] = []
          data[o.catname].push({
            id: o.id,
            title: o.title,
            src: o.thumb,
            proid: o.pro_id
          })
        }

        var result = [];
        for (var key in data) {
          var d = data[key]
          result.push({
            name: key,
            projects: d
          })
        }
        callback(result);
      }

    });
  },
  onLoad: function () {
    //console.log('onLoad')
    var that = this

    that.bindData(96, function (result) {
      that.setData({
        categorys1: result
      })
    })

    that.bindData(97, function (result) {
      that.setData({
        categorys2: result
      })
    })


  }
})
