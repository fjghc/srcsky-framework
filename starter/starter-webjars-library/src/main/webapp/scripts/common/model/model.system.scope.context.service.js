define("common/model/model.system.scope.context.service", ["angular", "./base"], function (angular, commonModel) {
    commonModel.factory("modelSystemScopeContextService", ["$injector", "$rootScope", function (t, n) {
        var r = {};
        return {
            setContext: function (e, t) {
                if (r[e])throw new Error(e + " has been registed, should not regist again.please check your code");
                if (!(t instanceof n.constructor))throw new Error("scopeContextService only can regist angular scope object, if you want to cache something else, please use $cacheProver or $rootScope");
                r[e] = t, t.$on("$destroy", function () {
                    delete r[e]
                })
            }, getContext: function (t) {
                var n = r[t];
                return {
                    get: function (t) {
                        if (angular.isString(t)) {
                            var r = t.split("."), i = "", s = n;
                            do i = r.shift(), s = s[i]; while (s && r.length > 0);
                            return s != null && s != undefined && !angular.isFunction(s) ? angular.copy(s) : undefined
                        }
                        throw new Error('param "key" must be a string, other typeof value is not supported;')
                    }
                }
            }
        }
    }])
})