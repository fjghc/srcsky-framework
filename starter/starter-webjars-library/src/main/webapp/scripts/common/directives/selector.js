//=========================================================================
//============================= NEW 2015-12-27 ============================
//=========================================================================
define("common/directives/selector", ["$app", "$directives", "$url"], function ($app, $directives, $url) {
    $directives.directive("selector", [function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                values: "=",
                options: "=",
                status: "=",
                loadMore: "&",
                filterBy: "="
            },
            templateUrl: $url.getTemplateUrl('scripts/common/views/selector.html'),
            link: function ($scope, $elements, $attr) {
                var messages = {
                    load: '<span class="text-muted">正在载入,请稍候...</span>',
                    error: '<span class="text-danger">载入失败！</span><span class="text-primary">请点击重试</span>',
                    empty: $attr.messageEmpty || '<span class="text-muted">暂无数据</span>',
                    hasmore: '<span class="text-primary">载入更多</a>'
                };
                $scope.multi = $attr.multi || false;
                $scope.load = function () {
                    if ($scope.status == "load" || $scope.status == "empty") {
                        return;
                    }
                    $scope.loadMore()
                };
                $scope.onSelectOption = function (selected) {
                    if (selected.disabled) {
                        return;
                    }
                    $scope.multi = $attr.multi == "true" || false;
                    selected._active = !selected._active;
                    var values = [];
                    if ($scope.multi) {
                        angular.forEach($scope._options, function (option) {
                            if (option._active) {
                                values.push(option)
                            }
                        });
                    } else if (selected._active) {
                        values.push(selected);
                    }
                    $scope.values = values;
                };
                function watch_list() {
                    $scope._options = angular.copy($scope.options);
                    if (!$scope._options || $scope._options.length == 0 && $scope.status == "empty") {
                        $scope.values = null;
                    }
                    if ($scope.statusClass && $elements.hasClass($scope.statusClass)) {
                        $elements.removeClass($scope.statusClass);
                    }
                    $scope.statusClass = "selector-status-" + $scope.status;
                    $elements.addClass($scope.statusClass);
                    $scope.message = messages[$scope.status];
                    if ($scope._options && $scope._options.length > 0 && $scope.status == "empty") {
                        $scope.showMsg = false
                    } else {
                        $scope.showMsg = true;
                    }
                };
                $scope.$watchCollection("[status,options]", function () {
                    watch_list();
                });
                $scope.$watchCollection("options", function () {
                    watch_list();
                });
                function watch_value() {
                    if ($scope.values) {
                        if (angular.isArray($scope.values)) {
                            angular.forEach($scope._options, function (option, index) {
                                option._active = false;
                                angular.forEach($scope.values, function (value, index) {
                                    if (value.id == option.id) {
                                        option._active = true;
                                    }
                                })
                            })
                        }
                    }
                };
                $scope.$watch("values", function (e) {
                    watch_value();
                });
                //watchList();
                //watchValue();
                $elements.addClass("selector")
            }
        }
    }])
})
