define("common/model/common.biz.controller", ["angular", "./base", "./module.manager"], function (e, t, n) {
  t.controller("commonBizController", ["$scope", "$injector", "$state", "$q", "_currentModule", "_pageInitializer", "_moduleLoader", "_pageModelLoader", function (e, t, r, i, s, o, u, a) {
    var f = s, l = o, c = u, h = a, p = n.getInstance();
    e.loadingState = !0;
    var d = function () {
      var n = i.defer();
      return c.loadResources(e, t, function (e) {
        n.resolve(e)
      }), n.promise
    }, v = function () {
      var n = i.defer();
      return h.loadResources(e, t, function (e) {
        n.resolve(e)
      }), n.promise
    };
    i.all([d(), v()]).then(function (n) {
      var i = n[0], s = n[1];
      p.registModules(i), f = p.getModules(f.nameSpace)[0], l.initPageModel(e, t, r, f, s), e.loadingState = !1
    }, function () {
    })
  }])
})
