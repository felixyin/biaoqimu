
//index.js


//获取应用实例
var app = getApp()

Page({
  sql: {
    selectCategoryList: "SELECT  \n" +
    "	c.catid,\n" +
    "	c.image ,\n" +
    "	c.catname\n" +
    "FROM  raisesky_category c \n" +
    "WHERE\n" +
    "	c.parentid = ? ORDER BY c.listorder ASC",
    selectCaseList: "SELECT\n" +
    "	*\n" +
    "FROM\n" +
    "	(\n" +
    "		SELECT\n" +
    "			py.id ,\n" +
    "			py.title\n" +
    "		FROM\n" +
    "			raisesky_application_yun py\n" +
    "		WHERE\n" +
    "			py.catid = ?\n" +
    "	) AS t"
  },
  data: {
    categorys: [],
    cases: [],
    catname: '',
    currentCatId: 0
  },
  //事件处理函数dgs
  bindCategoryap: function (event) {
    var that = this
    var ds = event.currentTarget.dataset;
    var catid = ds.id;
    var catname = ds.catname;
    that.setData({
      currentCatId: catid
    })
    //console.log(catid)
    that.setDataCases(catid, catname)
  },
  bindLeftTap: function (event) {
    var that = this
    var nextIndex = 1;
    console.log(this.data.categorys)
    console.log(that.data.currentCatId)
    for (var i = 0; i < this.data.categorys; i++) {
      var category = that.data.categorys[i]
      console.log(category.catid, that.data.currentCatId)
      if (category.catid == that.data.currentCatId)
        nextIndex = i + 1;
    }
    console.log(nextIndex)
    var catid = that.data.categorys[nextIndex].id;
    var catname = that.data.categorys[nextIndex].catname;

    that.setData({
      currentCatId: catid
    })
    that.setDataCases(catid, catname)
  },

  bindCaseTap: function (event) {
    var that = this
    var ds = event.currentTarget.dataset;
    if (!ds.id) {
      wx.showToast({
        title: '运营人员还没有维护上数据',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
    wx.navigateTo({
      url: '../case/item/item?id=' + ds.id
    })
  },

  switchBgColor: function (event) {
    var that = this
    var ds = event.currentTarget.dataset
    var image = ds.image
    for (var i = 0; i < that.data.categorys.length; i++) {
      var category = that.data.categorys[i]
      if (category.image == image) {
        if (category.image.indexOf('_on') == -1)
          category.image = image.substring(0, image.lastIndexOf('.')) + '_on.png'
      } else {
        if (category.image.indexOf('_on') != -1)
          category.image = category.image.substring(0, category.image.lastIndexOf('_')) + '.png'
      }
    }
    that.setData({
      categorys: that.data.categorys
    })
  },

  setDataCases: function (catid, catname) {
    var that = this
    app.http.postSelectSql({
      sql: that.sql.selectCaseList,
      params: [catid]
    }, function (res) {
      var data = res.data;
      //console.log(data)
      that.setData({
        cases: data,
        catname: catname
      })
    });
  },

  onLoad: function () {
    // //console.log('onLoad')
    var that = this
    app.http.postSelectSql({
      sql: that.sql.selectCategoryList,
      params: ['78']
    }, function (res) {
      var data = res.data;
      //console.log(data)
      if (data.length < 0) return;

      var first = data[0]
      that.setDataCases(first.catid, first.catname)

      var image = first.image;
      data[0].image = image.substring(0, image.lastIndexOf('.')) + '_on.png'

      that.setData({
        // currentCatId: first.catid,
        categorys: data
      })
    });
  }
})
