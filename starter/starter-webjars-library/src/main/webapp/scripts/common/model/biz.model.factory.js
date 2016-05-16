define("common/model/biz.model.factory", ["angular", "./base"], function (e, t, n) {
  t.factory("bizModelFactory", ["$injector", "commonModelConfig", function (t, n) {
    function r(e, t) {
      throw new Error(e || "the type of param should be" + t || "string")
    }

    function i(e) {
      throw new Error(e)
    }

    var s = {
      init: function () {
        this.bizModels = {};
        var r = this, i = n.bizTypes;
        e.forEach(i, function (e, n) {
          var i = null;
          try {
            i = t.get(e + "BizModel")
          } catch (s) {
          }
          i && r.regist(e, i)
        })
      }, regist: function (e, t) {
        var n = this.bizModels[e];
        if (n === undefined)return this.bizModels[e] = t, !0;
        i("the bizModel '" + e + "' has been registed!")
      }, getBizModel: function (t) {
        var n = null;
        return e.isString(t) ? this.bizModels[t] || null : n
      }
    };
    return s.init(), {
      getBizModel: function (e) {
        return s.getBizModel(e)
      }, registBizModel: function (e, t) {
        s.regist(e, t)
      }
    }
  }])
})
