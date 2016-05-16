define("common/model/page.initializer", ["angular", "./lib/util"], function (e, t) {
  function n(n) {
    var r = {templateUrl: ""};
    n ? n = t.deepClone(r, n) : "", e.extend(this, r)
  }

  function r() {
  }

  function i() {
  }

  function s(e) {
  }

  function o() {
  }

  return n.constructors = {}, n.factory = function (e) {
    return this.constructors[e] || n
  }, n.regist = function (e, r, i) {
    r = t.inherit(r, n), i ? this.constructors[e] = r : this.constructors[e] === undefined ? this.constructors[e] = r : console.log("regist '" + e + "' fail, because it has been registed")
  }, n.prototype = {
    constructor: n, getTemplateUrl: function () {
      return this.templateUrl
    }, initPageModel: function (e, n, r, i, s) {
      s && (t.deepClone(e.viewModel, s), e.viewModel.layoutConfig = {layout: s.layout, components: s.bizComponents})
    }
  }, r.prototype = {
    constructor: r, getTemplateUrl: function () {
      return "scripts/template/commonSideMenuPage.html"
    }, initPageModel: function (e, n, r, i, s) {
      e.viewModel = {}, s && (t.deepClone(e.viewModel, s), e.viewModel.layoutConfig = {
        layout: s.layout,
        components: s.bizComponents
      }), e.viewModel.menuItems = e.viewModel.menuItems ? e.viewModel.menuItems : i.getChildrenMenus(), e.viewModel.subUiViewName = e.viewModel.subUiViewName ? e.viewModel.subUiViewName : i.getSubUiView()
    }
  }, i.prototype = {
    constructor: i, getTemplateUrl: function () {
      return "scripts/template/commonNormalPage.html"
    }, initPageModel: function (e, n, r, i, s) {
      e.viewModel = {}, s && (t.deepClone(e.viewModel, s), e.viewModel.layoutConfig = {layout: s.layout, components: s.bizComponents})
    }
  }, s.prototype = {
    constructor: s, getTemplateUrl: function () {
      return "scripts/template/commonInnerDetailPage.html"
    }, initPageModel: function (e, n, r, i, s) {
      var o = i.getParent();
      e.viewModel = {
        iconClass: "",
        title: i.name,
        parentState: o.router.state,
        parentName: o.name,
        subTitle: i.subTitle
      }, s && (t.deepClone(e.viewModel, s), e.viewModel.layoutConfig = {
        layout: s.layout,
        components: s.bizComponents
      }), e.viewModel.subUiViewName = e.viewModel.subUiViewName ? e.viewModel.subUiViewName : i.getSubUiView()
    }
  }, n.regist("menu", r), n.regist("normal", i), n.regist("tab", o), n.regist("innerDetail", s), {
    factory: function (e) {
      return n.factory(e)
    }, regist: function (e, t) {
      n.regist(e, t)
    }
  }
})
