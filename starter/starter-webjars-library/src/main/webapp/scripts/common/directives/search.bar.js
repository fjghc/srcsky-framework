define("common/directives/search.bar", ["angular", "$directives", "$string", "$url"], function (angular, $directives, $string, $url) {
    $directives.directive("searchBar", ["$injector", "$topic", "$timeout", function ($injector, $topic, $timeout) {
        return {
            restrict: "AM",
            scope: {
                conditions: "=",
                action: "&",
                toolbars: "="
            },
            templateUrl: $url.getTemplateUrl("scripts/common/views/search.bar.html"),
            link: function ($scope, $element, $attr) {
                $scope.conditions.values = {};
                angular.forEach($scope.conditions || [], function (item, index) {
                    if (item.event) {
                        $topic.publish(item.event, item);
                    }
                    if (item.type == "texts" || item.type == "select") {
                        angular.forEach(item.options || [], function (option) {
                            if (item.selected == option.name || item.selected == option.value) {
                                item.selected = option;
                            }
                        });
                    }
                    if (item.type == 'select') {
                        $scope.$watch("conditions[" + index + "].selected", function () {
                            if (item.selected.value != "default" && item.selected.value != "0") {
                                $scope.conditions.values[item.name] = $string.trim(item.selected.value);
                            } else {
                                delete $scope.conditions.values[item.name];
                            }
                        });
                    } else if (item.type == 'text') {
                        $scope.$watch("conditions[" + index + "].value", function () {
                            if (item.value) {
                                $scope.conditions.values[item.name] = $string.trim(item.value);
                            } else {
                                delete $scope.conditions.values[item.name];
                            }
                        });
                    } else if (item.type == 'texts') {
                        $scope.$watchCollection("[conditions[" + index + "].selected , conditions[" + index + "].value]", function () {
                            if (item.selected.name && item.selected.name != "default" && item.value) {
                                $scope.conditions.values[item.selected.name] = $string.trim(item.value);
                            } else {
                                // $scope.conditions.values[item.selected.name] = undefined;
                                delete $scope.conditions.values[item.selected.name];
                            }
                        });
                    } else if (item.type == 'date') {
                        $scope.$watch("conditions[" + index + "].value", function () {
                            if (item.value) {
                                $scope.conditions.values[item.name] = item.value.getTime();
                            } else {
                                delete $scope.conditions.values[item.name];
                            }
                        });
                    }
                });
                $scope.maxDate = new Date();
                $scope.handle = function (button) {
                    if (angular.isFunction(button.click)) {
                        button.click()
                    }
                    if (button.event) {
                        $topic.publish(button.event);
                    }
                }
                $scope.clear = function () {
                    $scope.conditions.values = {};
                    angular.forEach($scope.conditions || [], function (item, index) {
                        if (item.type == 'select') {
                            item.selected = item.options[0];
                        } else if (item.type == 'text') {
                            item.value = "";
                        } else if (item.type == 'texts') {
                            item.selected = item.options[0];
                            item.value = "";
                        } else if (item.type == 'date') {
                            item.value = "";
                        }
                    });
                };
                var process, isFirst = true;
                $scope.$watch("conditions.values", function (value) {
                    if (!isFirst) {
                        if (process) {
                            process = $timeout.cancel(process);
                        }
                        process = $timeout(function () {
                            $scope.action($scope.conditions.values);
                        }, 350);
                    } else {
                        isFirst = false;
                    }
                }, true);
            }
        }
    }])
})
