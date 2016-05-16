//=========================================================================
//============================= NEW 2015-12-27 ============================
//=========================================================================
define("common/directives/shuttle", ["$app", "$directives", "$url", "$tools"], function ($app, $directives, $url) {
    $directives.directive("shuttle", ["$timeout", function ($timeout) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                values: "=",
                options: '=',
                select2Options: "=",
                onSelectedItem: "=",
                loadMore: "=",
                searchDisabled: "="
            },
            templateUrl: $url.getTemplateUrl("scripts/common/views/shuttle.html"),
            controller: ["$scope", function ($scope) {
                if (!$scope.options) {
                    alert("未配置 -> shuttle.options")
                }
                $scope.options.list = $scope.options.list ? $scope.options.list : [];
                $scope.options.values = $scope.options.values ? $scope.options.values : [];
                $scope.status = "empty";
                $scope.addDisabled = true;
                $scope.dropDisabled = true;
                $scope.selectedList = [];
                $scope.cancelList = [];
                $scope.addItems = function () {
                    angular.forEach($scope.selectedList, function (item) {
                        if (!$scope.options.values.in("id", item.id)) {
                            item._active = false;
                            $scope.options.values.push(item);
                        }
                    });
                    $scope.options.list = $scope.options.list.filter(function (item) {
                        return !$scope.options.values.in("id", item.id);
                    });
                    $scope.selectedList = [];
                }
                $scope.removeItems = function () {
                    angular.forEach($scope.cancelList, function (item) {
                        if (!$scope.options.list.in("id", item.id)) {
                            item._active = false;
                            $scope.options.list.push(item);
                        }
                    });
                    $scope.options.values = $scope.options.values.filter(function (item) {
                        return !$scope.options.list.in("id", item.id);
                    });
                    $scope.cancelList = [];
                }
            }],
            link: function ($scope, element, attrs) {
                $scope.$watch("options", function (options) {
                    options.lTitle = !options.lTitle ? "选项列表" : options.lTitle;
                    options.rTitle = !options.rTitle ? "结果列表" : options.rTitle;
                });
                $scope.$watch("selectedList", function (list) {
                    if (list && list.length > 0) {
                        $scope.addDisabled = false;
                    } else {
                        $scope.addDisabled = true;
                    }
                });
                $scope.$watch("cancelList", function (list) {
                    if (list && list.length > 0) {
                        $scope.dropDisabled = false;
                    } else {
                        $scope.dropDisabled = true;
                    }
                });
            }
        }
    }])
})
