define("$mFactory", ["angular", "common/model/base", "common/model/module.manager", "common/model/lazy.module"], function (angular, commonModel, moduleManager, lazyModule) {
    function u() {
        this.constructors = {
            BizModel: new f,
            CommandModel: new f,
            StepModel: new f,
            GridModel: new a,
            ToolbarModel: new a,
            BizModuleModel: new l
        }
        this.regist = function () {
        }
    }

    function a() {
    }

    function f() {
    }

    function l() {
    }

    var i = [], s = [], o = moduleManager.getInstance();
    u.prototype.factory = function (e) {
        return this.constructors[e] || new a
    }
    u.registBizType = function (e) {
        var t = s[e];
        if (t < 0 || t === undefined)s[e] = s.length, s.push(e)
    }
    u.registModelType = function (e) {
        var t = i[e];
        if (t < 0 || t === undefined)i[e] = i.length, i.push(e)
    }
    a.prototype.regist = function (n, r, i) {
        var serviceName = n + r;
        commonModel.provider(serviceName, function () {
            this.model = i,
                this.$get = function () {
                    return this.model
                }, this.setModel = function (t, n) {
                var r = function (e, t, n) {
                    return e[t] = n, e
                };
                angular.isFunction(t) && arguments.length == 1 && (r = t), this.model = r(this.model, t, n)
            }
        })
    }
    f.prototype.regist = function (e, n, r) {
        var i = e + n;
        commonModel.factory(i, r)
    }
    l.prototype.regist = function (e, r, i) {
        var s = moduleManager.getInstance(), o = s.registModule(e, i), u = e + r;
        commonModel.provider(u, function () {
            this.model = o, this.$get = function () {
                return this.model
            }
        })
    }
    commonModel.factory("modelFactory", ["$injector", "commonModelConfig", function ($injector, commonModelConfig) {
        var r = {
            bootStrap: function () {
            },
            init: function () {
                this.models = {};
                var r = this, o = commonModelConfig.bizTypes.concat(s),
                    u = commonModelConfig.modelTypes.concat(i);
                angular.forEach(o, function (e, n) {
                    for (var i = 0, s = null; s = u[i]; i++) {
                        !r[s] && (r[s] = {models: {}});
                        var o = "";
                        try {
                            o = $injector.get(e + s)
                        } catch (a) {
                            o = null
                        }
                        o && (r[s].models[e] = o)
                    }
                })
            },
            regist: function (e, t, n) {
                return this.getModel(e, t) == null && (this[t].models[e] = n), n
            },
            getModel: function (r, i) {
                var s = null;
                if (angular.isString(r) && angular.isString(i)) {

                    if (!this[i]) {
                        this[i] = {models: {}};
                    }
                    s = this[i].models[r];
                    if (s === null || s === undefined) {
                        try {
                            s = $injector.get(r + i);
                            this[i].models[r] = s
                        } catch (o) {
                            s = null
                            alert(o.message);
                        }
                    }
                    if (!s) {
                        s = commonModelConfig[i]
                    }
                }
                return angular.copy(s)
            }, setModel: function (e, t) {
            }
        };
        return {
            getModel: function (e, t) {
                return r.getModel(e, t)
            }, getModels: function (t, n) {
                var i = [];
                if (angular.isArray(t))for (var s = 0, o = ""; o = t[s]; s++)i.push(r.getModel(o, n));
                return i
            }, setModel: function (e, t) {
                var n = Array.prototype.slice.call(arguments, 0);
                return r.setModel.apply(r, n)
            }, regist: function (e, t) {
                return r.regist(e, t)
            }
        }
    }]);
    var c = new u;
    return {
        regist: function (e, n, i) {
            if (lazyModule.isInLazyMod && !commonModel.$$isInLazyMod) {
                commonModel = lazyModule.makeLazy(commonModel)
            }
            var s = c.factory(n);
            u.registModelType(n);
            u.registBizType(e);
            if (i instanceof Object && !i.bizType) {
                i.bizType = e
            }
            s.regist(e, n, i);
            return this;
        }, module: function (e, t) {
            return this.regist(e, "BizModuleModel", t)
        }, page: function (e, t) {
            return this.regist(e, "PageModel", t)
        }, bizComponent: function (e, t) {
            return this.regist(e, "BizComponentModel", t)
        }, biz: function (name, model) {
            return this.regist(name, "BizModel", model)
        }, chart: function (e, t) {
            return this.regist(e, "ChartModel", t)
        }, form: function (e, t) {
            return this.regist(e, "FormModel", t)
        }, grid: function (e, t) {
            return this.regist(e, "GridModel", t)
        }, toolbar: function (e, t) {
            return this.regist(e, "ToolbarModel", t)
        }, step: function (e, t) {
            return this.regist(e, "StepModel", t)
        }
    }
})
define("common/model/model.factory", ["$mFactory"], function ($mFactory) {
    return $mFactory;
});
