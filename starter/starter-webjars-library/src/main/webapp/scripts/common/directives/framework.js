define("common/directives/framework", ["angular", "$directives", "$framework", "$constants", "./product.navbar", "./sidebar", "./topbar"], function (angular, $directives, $framework, $constants) {
    $directives.factory("frameworkSetting", ["$rootScope", "$state", "$q", "$user", function ($rootScope, $state, $q, $user) {
        if (!$rootScope.frameworkConfig) {
            $rootScope.frameworkConfig = {
                version: null,
                showTopbar: !0,
                sidebar: "mini",
                productId: "",
                productNavBar: "disabled", /*col-1*/
                bodyClass: "",
                workorderId: "",
                topbarNavLinks: null,
                ramTag: "",
                exclusiveStates: [],
                loading: true,
                className: ""
            };
            $framework.init($rootScope.frameworkConfig)
        }
        var defer = $q.defer();
        return {
            promise: defer,
            config: $rootScope.frameworkConfig,
            setConfig: function (frameworkConfig, over) {
                if (over) {
                    $rootScope.frameworkConfig = frameworkConfig
                } else {
                    $rootScope.frameworkConfig = angular.extend($rootScope.frameworkConfig, frameworkConfig);
                    $framework.init($rootScope.frameworkConfig);
                }
            }, setVersion: function (version) {
                $rootScope.frameworkConfig.version = version;
                $framework.init($rootScope.frameworkConfig)
            }, setShowTopbar: function (isShow) {
                $rootScope.frameworkConfig.showTopbar = isShow
            }, setProductId: function (id) {
                $rootScope.frameworkConfig.productId = id
            }, setSidebar: function (type) {
                $rootScope.frameworkConfig.sidebar = type
            }, setProductNavBar: function (type) {
                $rootScope.frameworkConfig.productNavBar = type
            }, setBodyClass: function (className) {
                $rootScope.frameworkConfig.bodyClass = className;
            }, setWorkorderId: function (workorderId) {
                $rootScope.frameworkConfig.workorderId = workorderId
            }, setExclusiveStates: function (states) {
                $rootScope.frameworkConfig.exclusiveStates = states
            }, setTopbarNavLinks: function (links) {
                $rootScope.frameworkConfig.topbarNavLinks = links
            }, setRamTag: function (ramTag) {
                $rootScope.frameworkConfig.ramTag = ramTag
            }, onReady: function (callback) {
                defer.promise.then(function () {
                    callback()
                })
            }, isExclusiveOperation: function (e) {
                var r = $rootScope.frameworkConfig.exclusiveStates, i = false;
                angular.forEach(r, function (e) {
                    !i && $state.includes(e) && (i = !0)
                });
                return i;
            }, setLogin: function (login) {
                $rootScope.frameworkConfig.isLogin = login;
                if (login) {
                    jQuery("body").removeClass("login-container");
                } else {
                    jQuery("body").addClass("login-container");
                }
            }, loading: function (show) {
                $rootScope.frameworkConfig.loading = show;
            }
        }
    }]);
    $directives.directive("framework", ["$rootScope", '$animate', "$compile", "$templateCache", "$url", function ($rootScope, $animate, $compile, $templateCache, $url) {
        return {
            restrict: "A",
            replace: true,
            scope: true,
            transclude: 'element',
            templateUrl: $url.getTemplateUrl("scripts/common/views/framework.html"),
            controller: ["$rootScope", "$scope", "$user", "frameworkSetting", function ($rootScope, $scope, $user, frameworkSetting) {
                $rootScope.$watch("frameworkConfig", function (config) {
                    if (config) {
                        $framework.init($rootScope.frameworkConfig);
                        $scope.config = config;
                    }
                });

                $rootScope.$on("$viewContentLoaded", function (e) {
                    frameworkSetting.promise.resolve()
                });
                $scope.collapseProductNavbar = function () {
                    if ($scope.config.productNavBar == "col-1") {
                        $scope.config.productNavBar = "none";
                    } else {
                        $scope.config.productNavBar = "col-1";
                    }
                };
                $scope.$watch("config", function (newValue, oldValue) {
                    /*if (newValue.productNavBar != oldValue.productNavBar || newValue.sidebar != oldValue.sidebar) {
                     setTimeout(function () {
                     angular.element(window).resize()
                     }, 500);
                     }*/
                    /*if (newValue.isLogin) {
                     jQuery("body").removeClass("login-container");
                     } else {

                     }*/
                }, true);
                $scope.$on("updateFrameworkConfigSidebar", function (event, type) {
                    if ($scope.config) {
                        $scope.config.sidebar = type;
                        $framework.setCookie($constants.sideBarFoldCookieName, type/*, constants.SIDEBAR_FOLD_COOKIEDOMAIN*/);
                    }
                });
                $user.check(function (isLogin) {
                    if (!isLogin) {
                        $scope.config.loading = false;
                        //jQuery("html").addClass("login-html");
                    } else {

                    }
                    // alert(isLogin);
                });
            }]
        }
    }]);
})
