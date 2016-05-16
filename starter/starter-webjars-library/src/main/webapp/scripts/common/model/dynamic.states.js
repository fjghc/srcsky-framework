define("common/model/dynamic.states", ["./base", "./module.manager"], function (e, t) {
  var n = t.getInstance();
  e.config(["$stateProvider", "$urlRouterProvider", function (e, t) {
    var r = n.getModules(), i = [], s = 0, o = null, u = null, a = null;
    i = Array.prototype.slice.call(r, 0), u = i.pop();
    while (u) {
      a = u.router, a && e.state(a.state, a);
      if (u.children && u.children.items) {
        o = u.children.items;
        for (var f in o)o.hasOwnProperty(f) && i.push(o[f])
      }
      u = i.pop()
    }
  }])
})
