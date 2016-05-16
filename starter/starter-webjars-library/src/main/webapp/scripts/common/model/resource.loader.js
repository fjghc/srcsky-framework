define("common/model/resource.loader", ["angular", "./lib/util"], function (e, t) {
  function n(e) {
    this.moudle = e
  }

  function r() {
  }

  function i(e) {
    this.module = e
  }

  function s(e) {
    this.module = e
  }

  return n.constructors = {}, n.factory = function (e) {
    return this.constructors[e] || n
  }, n.regist = function (e, r, i) {
    r = t.inherit(r, n), i ? this.constructors[e] = r : this.constructors[e] === undefined ? this.constructors[e] = r : console.log("regist '" + e + "' fail, because it has been registed")
  }, n.prototype = {
    constructor: n, loadResources: function (e, t, n) {
      n(null)
    }
  }, i.prototype = {
    constructor: i, loadResources: function (e, t, n) {
      var r = t.get("modelFactory"), i = this.module, s = i.getNameSpace();
      n(r.getModel(s, "BizComponentModel"))
    }
  }, s.prototype = {
    constructor: s, loadResources: function (t, n, r) {
      var i = n.get("modelFactory"), s = this.module, o = s.pageModel;
      e.isString(o) && (o = i.getModel(o, "PageModel"));
      if (o && o.bizComponents) {
        var u = o.bizComponents, a = [];
        if (u && e.isString(u))u = i.getModel(u, "BizComponentModel"), o.bizComponents = u; else if (u && e.isArray(u)) {
          for (var f = 0, l = u.length; f < l; f++) {
            var c = u[f];
            e.isString(c) ? (c = i.getModel(c, "BizComponentModel"), a.push(c), c = null) : e.isObject(c) && a.push(c)
          }
          o.bizComponents = a
        }
      }
      r(o)
    }
  }, n.regist("module", r), n.regist("page", s), {
    factory: function (e) {
      return n.factory(e)
    }, regist: function (e, t) {
      n.regist(e, t)
    }
  }
})
