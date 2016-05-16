//=========================================================================
//============================= NEW 2015-12-27 ============================
//=========================================================================
define("common/directives/select2", ["$app", "$directives", "$tools", "$string"], function ($app, $directives, $tools, $string) {
    $directives.directive("select2", ["$user", "$timeout", function ($user, $timeout) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                select2: "="
            },
            link: function ($scope, element, $attr) {
                var $element = $(element), config = angular.extend({}, $scope.select2), instance = null;
                instance = $element.select2(config).data("select2");
                config.value = $scope.ngModel;
                // 防止覆盖 提示
                if (config.overwritePlaceholder) {
                    instance.dataAdapter.current = angular.noop;
                }
                // 内容选中
                instance.on("select", function (event) {
                    config.onSelectedItem(event.data);
                });
                if (config.ajax) {
                    instance.on("query", function () {
                        instance.$dropdown.find("input").addClass("select2-search__field_loading")
                    })
                    instance.on("results:all", function () {
                        instance.$dropdown.find("input").removeClass("select2-search__field_loading");
                    });
                    if (!$string.isEmpty(config.value)) {
                        // 读取默认选项
                        config.transport(config.reqData ? config.reqData() : {data: {term: ""}}, function (response) {
                            if (response.success) {
                                var items = angular.isArray(response.data) ? response.data : response.data.content;
                                if (items.length > 0) {
                                    $element.append($("<option/>").attr({value: items[0].id}).text(items[0][config.textField]));
                                    $scope.ngModel = items[0].id;
                                }
                            }
                        });
                    }
                }
                $scope.$watch("ngModel", function (newVal) {
                    $timeout(function () {
                        $element.find('[value^="?"]').remove();
                        $element.val(newVal);
                        $element.trigger('change');
                    });
                });
                $scope.$on("$destroy", function () {
                    instance.destroy();
                });
            }
        }
    }])
})
