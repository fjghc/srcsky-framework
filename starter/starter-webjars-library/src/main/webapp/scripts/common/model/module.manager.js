define("common/model/module.manager", ["angular", "./lib/util", "./resource.loader", "./page.initializer"], function (e, t, n, r) {
  function i(e) {
    var t = e.pageType || "normal", i = r.factory(t), s = new i(e);
    e.pageInitializer = s;
    if (e.hasChildren() && (e.pageType === "tab" || e.pageType === "menu")) {
      e.subUiView = e.nameSpace.replace(/[.]/g, "$");
    }
    var o = e.getParent(), u = null;
    o && t != "innerDetail" ? u = o.subUiView : t == "innerDetail";
    var a = {templateUrl: e.router.templateUrl || s.getTemplateUrl(), controller: e.router.controller || "commonBizController"};
    if (u) {
      !e.router.views && (e.router.views = {}), e.router.views[u] = a, e.parentSubUiView = u
    } else {
      e.router.templateUrl = e.router.templateUrl ? e.router.templateUrl : a.templateUrl, e.router.controller = e.router.controller ? e.router.controller : a.controller
    }
    if (e.routerType !== "custom") {
      if (!e.router.resolve) {
        e.router.resolve = {}
      }
      e.router.resolve._currentModule = function () {
        return e
      }
      e.router.resolve._pageInitializer = function () {
        return s
      }
      e.router.resolve._moduleLoader = function () {
        var t = n.factory("module"), r = new t(e);
        return r
      }
      e.router.resolve._pageModelLoader = function () {
        var t = n.factory("page"), r = new t(e);
        return r
      }
    }
  }

  function Module(n, r) {
    !n && (n = {});
    var o = {id: "", name: "", type: "", router: {state: "", url: "", controller: "", templateUrl: ""}, children: {type: "menu", items: {}}};
    n = t.deepClone(o, n), e.extend(this, n), this.parent = r, this.pageModel = !this.pageModel && this.getNameSpace();
    var u = this.children, a = null;
    i(this);
    var f = u.items, l = this;
    for (var c in f)f.hasOwnProperty(c) && (a = f[c], a.nameSpace = this.nameSpace + "." + c, a = new Module(a, l), f[c] = a)
  }

  function ModuleManager() {
    this.modules = {}
  }

  function u(e, t) {
    var n = null,
      r = e.split("."),
      i = 0,
      o = r.length,
      u = null,
      a = t[r[i++]];
    a instanceof Module || (a = new Module(a), t[r[0]] = a), u = a;
    while (a && i < o) {
      a = a.getChild(r[i++]), u = a;
      if (u == null || u == undefined)break
    }
    return u
  }

  function setValueByNameSpace(e, t, n, r) {
    n.nameSpace = e;
    var i = null, o = "", u = e.split("."), a = 0, f = u.length, l = null, c = new Module(n), h = t[u[a++]];
    if (f === 1)return t[u[0]] = c, c;
    h instanceof Module || (h = new Module(h), t[u[0]] = h);
    while (a < f) {
      o = u[a++], l = h.getChild(o);
      if (l === undefined || l === null)l = new Module, h.setChild(o, l), h = h.getChild(o)
    }
    return h.setChild(o, c), c
  }

  Module.prototype = {
    constructor: Module, getModuleMenus: function () {
      if (this.type === "top") {
        var e = [];
        return e = this.getChildrenStates(), e.push(this.router.state), {router: this.defaultPageRouter || this.router.state, text: this.name, module: e}
      }
    }, getChildrenMenus: function () {
      var e = this.getChildren(), t = null, n = [], r = {};
      for (var i in e)e.hasOwnProperty(i) && (t = e[i], r = {state: t.router.state, text: t.name}, n.push(r), r = null);
      return n
    }, getNameSpace: function () {
      return this.nameSpace
    }, getParent: function () {
      return this.parent || null
    }, getChildren: function () {
      return this.children.items
    }, injectResolve: function () {
    }, getSubUiView: function () {
      return this.subUiView
    }, hasChildren: function () {
      var children = this.getChildren();
      if (!children)return false;
      for (var child in children) {
        if (children.hasOwnProperty(child)) {
          return true;
        }
      }
      return false;
    }, getChildrenStates: function () {
      var children = this.getChildren(), child = null, status = [];
      for (var property in children) {
        if (children.hasOwnProperty(property)) {
          child = children[property];
          if (child.hasChildren()) {
            status.push(child.router.state);
            status = status.concat(child.getChildrenStates());
          } else {
            status.push(child.router.state)
          }
        }
      }
      return status
    }, getChild: function (name) {
      return this.children.items[name]
    }, setChild: function (name, module, n) {
      if (module instanceof Module) {
        module = new Module(module);
      }
      if (n) {
        this.children.items[name] = module;
      } else if (this.children.items[name] === undefined) {
        this.children.items[name] = module
      } else {
        console.log("setChild '" + name + "' fail, because it has" + " been registed");
      }
    }
  };
  ModuleManager.prototype = {
    contructor: ModuleManager,
    getDefaultModuleChildType: function (name) {
      var length = name.split(".").length, type = "";
      switch (length) {
        case 1:
          type = "menu";
          break;
        case 2:
          type = "tab";
          break;
        case 3:
          type = "simpleDetail";
          break;
        default:
          type = "tab"
      }
      return type
    }, getValueByNameSpace: function (name, modules) {
      return getValueByNameSpace(name, modules)
    }, setValueByNameSpace: function (name, modules, module, defaultModuleChildType) {
      return setValueByNameSpace(name, modules, module, defaultModuleChildType)
    }, getModules: function (nameSpace) {
      var results = [], modules = this.modules;
      if (nameSpace == undefined) {
        for (var module in modules) {
          if (modules.hasOwnProperty(module)) {
            results.push(modules[module]);
          }
        }
      } else {
        results = [this.getValueByNameSpace(nameSpace, modules)];
      }
      return results
    }, getModuleMenus: function () {
      var menus = [], modules = this.getModules();
      for (var i = 0; i < modules.length; i++) {
        menus.push(modules[i].getModuleMenus());
      }
      return menus;
    }, registModule: function (nameSpace, module) {
      if (arguments.length === 1) {
        throw new Error("nameSpace is needed for register modules");
      }
      var module = this.modules[nameSpace];
      if (module != undefined) {
        console.log(nameSpace + " has been registered!");
        return null;
      }
      return this.setValueByNameSpace(nameSpace, this.modules, module, this.getDefaultModuleChildType(nameSpace))

    }, registModules: function (modules) {
      if (angular.isArray(modules)) {
        for (var i = 0; i < modules.length; i++) {
          this.registModule(modules[i].nameSpace, modules[i])
        }
      }
    }, registRemoteModules: function (e, t, n) {
      this.modules.$remoteModules = t
    }, config: function (methodName, method) {
      var methods = {
        getDefaultModuleChildType: true,
        getValueByNameSpace: true,
        setValueByNameSpace: true
      };
      if (methods[methodName] === true) {
        this[methodName] = method
      } else {
        console.log("Error: can't set " + methodName + " of ModuleManager because it's a protected property");
        console.log("properties can be configed in ModuleManager is:");
        console.dir(methods)
      }
    }
  };
  var instance = null;
  return {
    getInstance: function () {
      if (instance == null) {
        instance = new ModuleManager();
      }
      return instance;
    }
  }
})
