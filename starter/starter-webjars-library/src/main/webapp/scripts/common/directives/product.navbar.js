//=========================================================================
//============================= NEW 2015-12-27 ============================
//=========================================================================
define("common/directives/product.navbar", ["angular", "$directives","$url"], function (angular, $directives,$url) {
    $directives.factory("$productNavbarSetting", ["$rootScope", function ($rootScope) {
        if (!$rootScope.productNavbarConfig) {
            $rootScope.productNavbarConfig = {
                title: "",
                mainNav: [],
                subNav: [],
                backNav: "",
                mainNavMapping: [],
                subNavMapping: [],
                extend: {},
                transcludedHtml: ""
            };
        }
        return {
            setTitle: function (title) {
                $rootScope.productNavbarConfig.title = title;
            },
            setMainNav: function (mainNav) {
                $rootScope.productNavbarConfig.mainNav = mainNav;
            },
            setSubNav: function (subNav, backNav) {
                $rootScope.productNavbarConfig.subNav = subNav;
                $rootScope.productNavbarConfig.backNav = backNav;
            },
            getTranscludedHtml: function (html) {
                $rootScope.productNavbarConfig.transcludedHtml = html;
                return html;
            }
        }
    }]);
    $directives.directive("customizedContent", ["$productNavbarSetting", function (setting) {
        return {restrict: "A", scope: {}, template: setting.getTranscludedHtml()};
    }]);
    $directives.directive("productNavbar", function () {
        return {
            restrict: "A",
            replace: true,
            scope: true,
            templateUrl: $url.getTemplateUrl("scripts/common/views/product.navbar.html"),
            controller: ["$rootScope", "$scope", "$state", "$productNavbarSetting", "$timeout", function ($rootScope, $scope, $state, $setting, $timeout) {// e, t, n, r, i
                var hash = window.location.hash, stateName = hash.replace("#/", "").replace(/\//g, ".");
                $rootScope.$watch("productNavbarConfig", function (config) {
                    $scope.config = config;
                    angular.forEach(config.mainNav, function (nav) {
                        /*alert(stateName+":"+nav.state)
                         if (nav.childs && stateName.indexOf(nav.state) != -1) {
                         alert(1);
                         }*/
                    })
                });
                $scope.navScene = false;
                var includes = function (child) {
                    if (!child.includes && child.state) {
                        return $state.includes(child.state);
                    }
                    if (child.includes) {
                        var include = child.includes;
                        if (angular.isArray(include)) {
                            for (var i = 0; i < include.length; i++) {
                                if ($state.includes(include[i])) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        return $state.includes(include)
                    }
                };
                $scope.checkActive = function (item, navScene) {
                    var include = includes(item);
                    if (include && item.childs) {
                        item.showChild=true;
                    }
                    if (include && $scope.navScene != navScene) {
                        $timeout(function () {
                            $scope.navScene = navScene
                        }, 20)
                    }
                    return include
                }
                $scope.backNav = function () {
                    $state.go($rootScope.productNavbarConfig.backNav)
                }
            }]
        }
    })

    $directives.directive("productNavLink", ["$compile", function ($compile) {
        return {
            restrict: "A",
            scope: {item: "="},
            replace: true,
            controller: ["$rootScope", "$scope", "$state", "$productNavbarSetting", function ($rootScope, $scope, $state, r) {
                $scope.go = function (state, stateParams) {
                    $state.go(state, stateParams || {})
                };
                $scope.extend || ($scope.extend = {})
            }],
            link: function ($scope, $element, $attr) {
                var $html = "";
                if ($scope.item.childs) {
                    $html += '<a href="" ng-click="item.showChild=!item.showChild">';
                } else if ($scope.item.outlet && $scope.item.outlet.state) {
                    $html += '<a href="javascript:void(0)" ui-sref="{{item.outlet.state}}({{item.outlet.params||\'\'}})">';
                } else if ($scope.item.outlet && $scope.item.outlet.url) {
                    $html += '<a href="{{item.outlet.url}}" target="{{item.outlet.target || \'_blank\'}}">';
                } else if ($scope.item.state) {
                    $html += '<a href="" ui-sref="{{item.state}}({{item.params||\'\'}})">';
                }
                $html += '<div class="nav-icon">';
                if ($scope.item.childs) {
                    $html += "<span ng-class=\"{'icon-arrow-down':item.showChild,'icon-arrow-right':!item.showChild}\"></span>"
                }
                $html += '</div><div class="nav-title" ng-bind="item.title"></div>';
                if ($scope.item.extend) {
                    $html += '<div class="nav-extend">' + $scope.item.extend + "</div>"
                }
                $html += "</a>";
                $element.html($html);
                $compile($element.contents())($scope)
            }
        }
    }])
})
