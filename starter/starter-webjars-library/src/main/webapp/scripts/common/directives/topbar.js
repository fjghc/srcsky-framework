define("common/directives/topbar", ["angular", "$directives", "$constants", "$framework","$url"], function (angular, $directives, $constants, $framework,$url) {
    $directives.directive("consoleTopbar", ["$rootScope", "$timeout", "$http", "$sce", function ($rootScope, $timeout, $http, $sce) {
        var a, f, l

        function readerConfig($scope) {
            if (!$constants.topbar.url) {
                bindTopbarData($constants.topbar, $scope);
            } else {
                $http({
                    method: "jsonp",
                    url: $constants.topbar.url,
                    params: {productId: $scope.productId, callback: "JSON_CALLBACK", timestamp: (new Date).getTime()}
                }).then(function (result) {
                    var data = result.data;
                    if (data && data.code == "200") {
                        bindTopbarData(data.data, $scope);
                    } else {
                        bindTopbarData($constants.topbar, $scope);
                    }
                }, function (result) {
                    bindTopbarData($constants.topbar, $scope)
                })
            }
        }

        function bindTopbarData(topbar, $scope) {
            $timeout(function () {
                buildCategories(topbar.categories, topbar.categoryGroup, $scope);
                $scope.navLinks = buildNavLinks(topbar.navLinks, $scope);
                $scope.messages = topbar.messages || null;
                $scope.account = p(topbar.account) || {};
                $scope.requestUrl = $scope.navLinks && $scope.navLinks.requestUrl || r.requestUrl;
            }, 0)
        }

        function p(e) {
            if (e) {
                var t = e.id;
                e.origin = t;
                if (t.length > 32) {
                    t = t.substring(0, 31) + "...";
                    e.id = t;
                }
            }
            return e
        }

        function buildNavLinks(navLinks, $scope) {
            $scope.topbarNavLinks && jQuery.extend(true, navLinks, $scope.topbarNavLinks);
            if (!navLinks)return {};
            angular.forEach(navLinks, function (value) {
                if (value) {
                    value.navRedirect && (value.href = v(value.href, $scope));
                    if (value.links && angular.isArray(value.links)) {
                        angular.forEach(value.links, function (val) {
                            if (val && val.navRedirect) {
                                val.href = v(val.href, $scope);
                            }
                        })
                    }
                }
            });
            var user = navLinks.user;
            if (user && user.links) {
                angular.forEach(user.links, function (value, t) {
                    var n = value.href;
                    if (angular.isString(n) && /oauth_callback=$/.test(n)) {
                        value.href = encodeURI(n);
                    }
                    a = t;
                    f = n;
                })
            }
            setI18n(navLinks.i18n);
            var help = navLinks.help;
            if (help) {
                $scope.helpConfig = {
                    title: ($scope.currentProduct ? $scope.currentProduct.shortName + " " : "") + help.title,
                    link: $sce.trustAsResourceUrl(help.href)
                };
            }
            return navLinks
        }

        function v(e, t) {
            return e + "&productId=" + t.productId
        }

        function encodeURI(e) {
            return e + encodeURIComponent(window.location.href)
        }

        function g(e, t, n) {
            n || (n = "id");
            var r;
            if (angular.isArray(e) && e.length > 0 && t) {
                angular.forEach(e, function (e, i) {
                    !r && e[n] == t && (r = e)
                })
            }
            return r;
        }

        function buildCategories($categorys, $categoryGroup, $scope) {
            var r = [], i = [], s, o = 0, u = 2, a = angular.isNumber($categoryGroup[o]) ? $categoryGroup[o] : u;
            if (!$categoryGroup || !angular.isArray($categoryGroup))$categoryGroup = [];
            angular.isArray($categorys) && (s = $categorys.length, angular.forEach($categorys, function (e, f) {
                b(e, $scope), i.push(e);
                if (a == i.length || f == s - 1)r.push(i), i = [], o++, a = angular.isNumber($categoryGroup[o]) ? $categoryGroup[o] : u
            }));
            $scope.categories = r
        }

        function buildCategories2($categories, $scope) {
            var n = [], r = [], i, s = 0;
            if (angular.isArray($categories)) {
                i = $categories.length;
                angular.forEach($categories, function (e, o) {
                    b(e, $scope);
                    r.push(e);
                    if (o % 2 == 1 || o == i - 1) {
                        n.push(r)
                    }
                    r = [];
                    s++;
                })
            }
            $scope.categories = n;
        }

        function b(e, t) {
            var n = t.productId;
            if (n) {
                angular.forEach(e.products, function (e, r) {
                    t.currentProduct == undefined && e.productId == n && (t.currentProduct = e)
                })
            }
        }

        function w(n) {
            $http({method: "jsonp", url: n.requestUrl.updateMessageInfo, params: {callback: "JSON_CALLBACK", timestamp: (new Date).getTime()}}).then(function (t) {
                var r = t.data;
                if (r && r.code == "200" && r.data) {
                    $timeout(function () {
                        n.messageInfo = r.data
                    }, 0)
                }
            })
        }

        function setI18n(i18n) {
            if (!i18n) {
                return;
            }
            if (i18n.show && i18n.requestUrl) {
                $http({
                    method: "jsonp",
                    url: i18n.requestUrl,
                    params: {callback: "JSON_CALLBACK", timestamp: (new Date).getTime()}
                }).then(function (result) {
                    var data = result.data;
                    if (data && data.code == "200" && data.data) {
                        var currentLanguage = data.data.currentLanguage,
                            supportedLanguages = data.data.supportedLanguages,
                            tempCurrentLanguage,
                            tempLanguages = [];
                        angular.forEach(supportedLanguages, function (language) {
                            if (language) {
                                if (language.value == currentLanguage) {
                                    tempCurrentLanguage = language
                                } else {
                                    tempLanguages.push(language);
                                }
                            }
                        });
                        if (!tempCurrentLanguage) {
                            tempCurrentLanguage = supportedLanguages[0];
                        }
                        i18n.currentLanguage = tempCurrentLanguage;
                        i18n.languages = tempLanguages;
                    } else {
                        i18n.show = false;
                    }
                }, function () {
                    i18n.show = false;
                })
            }
        }

        function changeCurrentLanguage(url) {
            if (url) {
                $http({
                    method: "jsonp",
                    url: url,
                    params: {callback: "JSON_CALLBACK", timestamp: (new Date).getTime()}
                }).then(function (e) {
                    window.location.reload()
                })
            }
        }


        return {
            restrict: "A", replace: !0,
            scope: {
                workorderId: "=",
                productId: "=",
                topbarNavLinks: "="
            },
            templateUrl: $url.getTemplateUrl("scripts/common/views/topbar.html"),
            link: function ($scope) {

                function toggleBookPanelStatus() {
                    $scope.topbarBook.showPanel = !$scope.topbarBook.showPanel;
                }

                function toggleHelpPanelStatus() {
                    $scope.topbarConfig.showHelpPanel = !$scope.topbarConfig.showHelpPanel
                }

                function toggleSidebarStatus() {
                    $scope.isSidebarFold = !$scope.isSidebarFold;
                    var t = $scope.isSidebarFold ? "mini" : "full";
                    $scope.$emit("updateFrameworkConfigSidebar", t)
                }

                $scope.isSidebarFold = $framework.isSidebarFold();
                $scope.toggleSidebarStatus = toggleSidebarStatus;
                $scope.toggleBookPanelStatus = toggleBookPanelStatus;
                $scope.topbarConfig = {showHelpPanel: false};
                $scope.topbarBook = {showPanel: false};
                $scope.toggleHelpPanelStatus = toggleHelpPanelStatus;
                $scope.changeCurrentLanguage = changeCurrentLanguage;
                readerConfig($scope);
                $rootScope.$on("topbarUpdateMessageInfo", function () {
                    w($scope)
                });
                $rootScope.$on("$stateChangeSuccess", function (n, r, i, s, o) {
                    $timeout(function () {
                        if (!$scope.navLinks)return;
                        var e = $scope.navLinks.userLink;
                        if (e && e.links && a != undefined && f != undefined) {
                            var n = e.links[a];
                            n && (n.href = encodeURI(f))
                        }
                    }, 0)
                });
                $rootScope.$on("updateFrameworkConfigSidebar", function (event, type) {
                    $scope.isSidebarFold = (type == "mini");
                });
                $scope.readMessage = function () {
                    $timeout(function () {
                        w($scope)
                    }, 2e3)
                }
            }
        };
    }]);
    $directives.directive("topbarSearch", ["$timeout", function ($timeout) {
        return {
            restrict: "AM",
            scope: {searchLink: "="},
            templateUrl: $url.getTemplateUrl("scripts/common/views/topbar.search.html"),
            transclude: false,
            link: function ($scope, $element, $element, s) {
                function close(n) {
                    if ($(n.target).closest(".console-topbar-search").length == 0) {
                        $timeout(function () {
                            $scope.dropdownOpen = false;
                        });
                    }
                }

                $scope.model = {askInput: ""};
                $element.$observe("searchUrl", function (e) {
                    e && ($scope.searchUrl = e)
                });
                $($element).on("keypress", ".topbar-search-ask", function (e) {
                    e.keyCode == 13 && window.open($scope.searchUrl + $scope.model.askInput, "_blank")
                });
                $scope.isActive = !1;
                $scope.activeInput = function () {
                    $scope.isActive = !0
                };
                $scope.inactiveInput = function () {
                    $timeout(function () {
                        $scope.isActive = !1
                    }, 150)
                };
                $scope.searchClick = function (e) {
                    $scope.isActive || ($scope.isActive = !0, $element.find(".topbar-search-ask").focus(), e.preventDefault())
                };
                $scope.dropdownOpen = false;
                $scope.toggleDropdownStatus = function (e) {
                    e.preventDefault();
                    $scope.dropdownOpen = !$scope.dropdownOpen;
                    if (!$scope.dropdownOpen) {
                        $(document).off("click", close);
                    }
                };
                $(document).on("click", close);
                $scope.$on("$destroy", function () {
                    $(document).off("click", close)
                })
            }
        }
    }]);
    $directives.directive("topbarHelp", [function a() {
        return {
            restrict: "A", replace: !0, scope: {show: "=", config: "="}, templateUrl: $url.getTemplateUrl("scripts/common/views/topbar.help.html"),
            link: function ($scope) {
                function showPanel() {
                    $scope.show = true
                }

                function hidePanel() {
                    $scope.show = false;
                }

                $scope.hidePanel = hidePanel;
                $scope.showPanel = showPanel;
            }
        }
    }]);
})
