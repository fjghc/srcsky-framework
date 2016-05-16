define("common/model/model.system.base.controller", ["angular", "./base"/*, "../support/response"*/], function (angular, commonModel, n) {
    function getArg(args, index) {
        return Array.prototype.slice.call(args, index || 0)
    }

    function i(t) {
        if (angular.isArray(t))for (var n = 0, r = null; r = t[n]; n++)if (r === "$scope")return !0;
        return !1
    }

    function $$baseController($rootScope, $topicService, $mFactory, scopeContext) {
        this.$rootScope = $rootScope;
        this.eventService = $topicService;
        this.modelFactory = $mFactory;
        this.responsePreHandler = n;
        this.getScopeContext = function () {
            return scopeContext
        }
    }

    commonModel.controller("modelSystemBaseController", $$baseController);
    commonModel.controller("$$baseController", $$baseController);
    $$baseController.$inject = ["$rootScope", "$topic", "modelFactory", "modelSystemScopeContextService"];
    $$baseController.prototype = {
        constructor: $$baseController,
        $constructor: function ($scope) {
            this.$scope = $scope
        },
        $on: function () {
            if (this.$scope === undefined) {
                throw new Error("父controller没有初始化，请在子controller中调用 this.$parent.$constructor.call(this,$scope)来完成父类的初始化");
            }
            var name = getArg(arguments), callback = this.eventService.subscribe.apply(this.eventService, name);
            this.$scope.$on("$destroy", function () {
                angular.isFunction(callback) && callback()
            })
        },
        $publish: function () {
            var e = getArg(arguments);
            this.eventService.publish.apply(this.eventService, e)
        },
        $getModel: function () {
            var e = getArg(arguments);
            return this.modelFactory.getModel.apply(this.modelFactory, e)
        },
        $handleResponse: function (e) {
            var t = Array.prototype.slice.call(arguments, 0);
            return this.responsePreHandler.responsePreHandler.apply(this.responsePreHandler, t)
        },
        $getGridModel: function (name) {
            return this.modelFactory.getModel(name, "GridModel");
        }
    };
    var manager = {
        cache: {},
        $rootScope: null, $controller: null,
        resolveSubController: function (ctrl, cache, $controller, rootScope) {
            var parent = ctrl.parent;
            if (ctrl.resolved === false && angular.isString(parent)) {
                var u = cache[parent];
                if (u === undefined || u.resolved === !0) {
                    var a = {$scope: rootScope.$new()};
                    try {
                        var f = $controller(parent, a);
                        ctrl.constructor.prototype.$parent = f;
                        ctrl.constructor.prototype = angular.extend(f, ctrl.constructor.prototype);
                        ctrl.constructor.prototype.constructor = ctrl.constructor;
                        ctrl.constructor.prototype.$name = ctrl.name
                    } catch (l) {
                        throw new Error("the controller you want to inherit dose not exist, check if you registed it")
                    }
                    ctrl.resolved = true;
                } else {
                    manager.resolveSubController(u, cache, $controller, rootScope)
                }
            }
        }, dynamicInherit: function (e, t, n) {
            this.inherit(e, t, n);
            var cache = this.cache, ctrl = cache[e];
            this.resolveSubController(ctrl, cache, this.$controller, this.$rootScope)
        }, inherit: function (name, constructor, parent) {
            if (!angular.isString(name))throw new Error("subControllerName must be the name of sub controller");
            if (!angular.isFunction(constructor))throw new Error("subController must be a function");
            if (!angular.isString(parent))throw new Error("superController must be a name of a controller");
            var i = {
                name: name,
                parent: parent,
                constructor: constructor,
                resolved: false
            }, s = this.cache[name];
            if (angular.isObject(s) && s.parent !== parent) {
                throw new Error(name + 'has inherited "' + s.parent + '" , can not inherit from ' + parent);
            }
            this.cache[name] = i
        }
    };
    commonModel.factory("controllerInheritService", ["$controller", "$rootScope", function ($controller, $rootScope) {
        var init = false;
        manager.$controller = $controller;
        manager.$rootScope = $rootScope;
        return {
            init: function () {
                if (init === false) {
                    init = true;
                    var cache = manager.cache, i = null, s = [];
                    for (var u in cache) {
                        if (cache.hasOwnProperty(u)) {
                            var a = cache[u];
                            manager.resolveSubController(a, cache, $controller, $rootScope)
                        }
                    }
                }
            }
        }
    }]);
    return {
        inherit: function (e, t, n, isLazy) {
            if (isLazy === true) {
                return manager.dynamicInherit(e, t, n)
            } else {
                return manager.inherit(e, t, n);
            }
        }, wrapController: function ($module) {
            var module = $module, controller = module.controller, self = this;
            return function () {
                var args = Array.prototype.slice.call(arguments, 0);
                var constructor = arguments[1];
                if (angular.isArray(constructor)) {
                    constructor = constructor[constructor.length - 1];
                }
                var name = arguments[0], parent = arguments.length == 3 ? arguments[2] : "$$baseController";
                if (module.$$isInLazyMod) {
                    self.inherit(name, constructor, parent, true)
                } else {
                    self.inherit(name, constructor, parent)
                }
                return controller.apply(module, args)
            }
        }
    }
})
