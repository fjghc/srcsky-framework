define("common/directives/sidebar", ["angular", "$directives", "../services/dialog", "../support/constants", "../support/response", "../services/i18n", "../support/framework","$url"]
    , function (angular, $directives, $dialog, constants, response, $i18nService, framework,$url) {
        //var module = angular.module("console.sidebar", ["commonDirectives", "commonServices"]);
        $directives.directive("consoleSidebar", ["$http", "$timeout", "$rootScope", function ($http, $timeout, $rootScope) {
            function readerConfig($scope) {
                if (!constants.sidebar.url) {
                    bindSidebarData(constants.sidebar, $scope);
                } else {
                    $http({method: "jsonp", url: constants.sidebar.url, params: {callback: "JSON_CALLBACK", timestamp: (new Date).getTime()}}).then(function ($result) {
                        var data = $result.data;
                        if (data && data.code == "200") {
                            bindSidebarData(data.data, $scope);
                        } else {
                            bindSidebarData(constants.sidebar, $scope);
                        }
                    }, function () {
                        bindSidebarData(constants.sidebar, $scope)
                    })
                }
            }

            function bindSidebarData($data, $scope) {
                if (!$data)return;
                $timeout(function () {
                    $scope.loadingState = false;
                    $scope.navConfig = $data.navConfig;
                    $scope.products = $data.products;
                    $scope.services = $data.services;
                    $scope.productsMap = c($scope.products);
                    $scope.servicesMap = c($scope.services);
                    $scope.currentEntry = v($scope);
                    $scope.productPreference = h($data.productPreference, $scope.productsMap);
                    $scope.servicePreference = h($data.servicePreference, $scope.servicesMap);
                    $scope.locale = $data.locale;
                    $scope.messages = getSidebarMessage($scope.locale || $rootScope.locale);
                }, 0)
            }

            function c(e) {
                var t = {};
                return angular.forEach(e, function (e, n) {
                    e.productId && (t[e.productId] = e)
                }), t
            }

            function h(e, t) {
                var n = [];
                return angular.forEach(e, function (e, r) {
                    var i = t[e];
                    i && n.push(e)
                }), n
            }

            function p(e, t) {
                var n = [];
                return angular.forEach(e, function (e, r) {
                    var i = t[e];
                    i && n.push(i)
                }), n
            }

            function v(e) {
                var t = null, n = e.productId;
                return !e.currentEntry && n && angular.forEach([e.productsMap, e.servicesMap], function (e, r) {
                    if (e) {
                        var i = e[n];
                        i && (t = i)
                    }
                }), t
            }

            return {
                restrict: "A", replace: !0, scope: !0, templateUrl: $url.getTemplateUrl("scripts/common/views/sidebar.html"), link: function i($scope, $element, $attr) {
                    function productPreference(t) {
                        if (!t || !$scope.productsMap)return;
                        $scope.productList = p(t, $scope.productsMap), $scope.productHeight = b(t, $scope.productsMap)
                    }

                    function servicePreference(t) {
                        if (!t || !$scope.productsMap)return;
                        $scope.serviceList = p(t, $scope.servicesMap), $scope.serviceHeight = b(t, $scope.servicesMap, $scope.serviceList.length)
                    }

                    function a(t) {
                        t && ($scope.navConfig = t)
                    }

                    function l(t) {
                        t && ($scope.productId = t, $scope.currentEntry = v($scope))
                    }

                    function setType(type) {
                        if (type) {
                            $scope.type = type;
                        }
                    }

                    function h(t) {
                        t && ($scope.spmId = t)
                    }

                    function d(t) {
                        angular.isDefined(t) && ($scope.version = t)
                    }

                    function updatePreference(t, n) {
                        if (!n || !n.type || !n.preference)return;
                        n.type === "product" ? $scope.productPreference = n.preference : n.type === "service" && ($scope.servicePreference = n.preference)
                    }

                    function toggleSidebarStatus() {
                        $scope.$emit("updateFrameworkConfigSidebar", $scope.config.sidebar == "mini" ? "full" : "mini")
                    }

                    function toggleFoldStatus(e, t) {
                        t.folded = !t.folded
                    }

                    function b(t, n) {
                        var i = t.length, s = $scope.currentEntry;
                        t && s && angular.isDefined(n[s.id]) && t.indexOf(s.id) == -1 && (i += 1);
                        return i * 40
                    }

                    readerConfig($scope);
                    $scope.currentEntry = null;
                    $scope.loadingState = true;
                    $scope.toggleFoldStatus = toggleFoldStatus;
                    $scope.toggleSidebarStatus = toggleSidebarStatus;
                    $scope.$on("updatePreference", updatePreference);
                    $scope.$watch("productPreference", productPreference);
                    $scope.$watch("servicePreference", servicePreference);
                    $scope.$watch("navConfig", a);
                    $attr.$observe("type", setType);
                    $attr.$observe("productId", l);
                    $attr.$observe("version", d);
                }
            }
        }]);


        function getSidebarMessage() {
            /*var t = $i18nService.get("sidebar");
             return angular.extend({}, t.local, t.common)*/
            return {
                backToOld: "将回旧版",
                pickedArea: "已选区域: ",
                allItems: "可选区域: ",
                errorTooltip: "请至少选择一个快捷入口",
                confirm: "确定",
                cancel: "取消"
            };
        }

        $directives.directive("consoleSidebarManage", ["$rootScope", "$injector", "$http", "$dialog", function ($rootScope, $injector, $http, $dialog) {
            return {
                restrict: "A",
                scope: {
                    pickedItems: "=",
                    items: "=",
                    requestUrl: "=",
                    type: "@",
                    title: "@",
                    locale: "@"
                }, link: function ($scope, $element, $attr) {
                    function h(e, t, n) {
                        var i = {};
                        if (angular.isArray(e) && e.length > 0) {
                            angular.forEach(e, function (e, r) {
                                n && e[n] && (e.arrayIndex = r, e.selected = t.indexOf(e[n]) !== -1, i[e[n]] = e)
                            })
                            return i;
                        } else {
                            return {};
                        }
                    }

                    function dialogCallback($dialogScope) {
                        var pickedItems = $dialogScope.pickedItems = angular.copy($scope.pickedItems),
                            allItems = $dialogScope.allItems = angular.copy($scope.items),
                            allItemsMap = $dialogScope.allItemsMap = h(allItems, pickedItems, "productId");
                        $dialogScope.title = $scope.title;
                        $dialogScope.messages = getSidebarMessage();
                        $dialogScope.clickHandler = function (e) {
                            var t = pickedItems.indexOf(e);
                            t !== -1 ? pickedItems.splice(t, 1) : pickedItems.push(e);
                            var n;
                            if (allItemsMap[e]) {
                                n = allItemsMap[e].arrayIndex
                            }
                            allItems[n].selected = !allItems[n].selected
                        }
                        $dialogScope.setUserConfig = function () {
                            $http({
                                method: "jsonp",
                                url: $scope.requestUrl ? $scope.requestUrl : constants.sidebar.navConfig.requestUrl.setUserPreference,
                                params: {callback: "JSON_CALLBACK", preference: angular.toJson(pickedItems), type: $scope.type, timestamp: (new Date).getTime()}
                            }).then(function (n) {
                                var s = response.preHandler(n, $injector, !0);
                                if (s && angular.isFunction(s.then) == 0) {
                                    $scope.$emit("updatePreference", {preference: pickedItems, type: $scope.type});
                                }
                                $dialogScope.close();
                            }, function (e) {
                                $injector.invoke(["$topic", function ($topic) {
                                    $topic.publish(constants.event.showResponseErrorMessage, e, true)
                                }])
                            })
                        }
                    }

                    $element.click(function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $dialog.showUrl($url.getTemplateUrl("scripts/common/views/sidebar.manager.html"), dialogCallback, {windowClass: "framework-sidebar-dialog"})
                    })
                }
            }
        }]);
        $directives.directive("sidebarTooltip", ["$uibTooltip", function (e) {
            return e("sidebarTooltip", "tooltip", "mouseenter")
        }]);
        $directives.directive("sidebarTooltipPopup", [function () {
            return {restrict: "EA", replace: !0, scope: {content: "@", placement: "@", animation: "&", isOpen: "&"}, templateUrl: "scripts/common/views/sidebar.tooltip.popup.html"}
        }]);
    })
