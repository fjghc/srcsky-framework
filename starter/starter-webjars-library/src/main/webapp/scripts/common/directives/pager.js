define("common/directives/pager", ["angular", "$directives","$url", "./number.range"], function (angular, $directives,$url) {
        var $config = {
            tipHide: false,
            size: 20,
            index: 1,
            showGotoPage: true,
            total: 1000,
            maxSize: 5,
            gotoPageBtnDisabled: false
        };
        $directives.directive("pager2", ["$compile", function (e) {
            return {
                restrict: "AM",
                scope: {
                    config: "=",
                    onSelectPage: "&"
                },
                replace: !0,
                templateUrl: $url.getTemplateUrl("scripts/common/views/pager.html"),
                transclude: false,
                link: function ($scope, $element, $attr) {
                    $scope.$watch("config.showGotoPage", function () {
                        $scope.config.totalPage = Math.ceil($scope.config.total / $scope.config.size);
                        $scope.config.showGotoPage = $scope.config.totalPage >= 5;
                        $scope.gotoPage = ""
                    })
                    $scope.$watch("gotoPage", function (gotoPage) {
                        if (gotoPage && gotoPage != "0" && gotoPage > 0) {
                            $scope.config.gotoPageBtnDisabled = gotoPage > $scope.config.totalPage
                        } else {
                            $scope.config.gotoPageBtnDisabled = true;
                        }
                    })
                    $scope.go = function () {
                        $scope.pageChangedHandler($scope.gotoPage)
                    }
                    $scope.pageChangedHandler = function () {
                        $scope.onSelectPage({page: $scope.config.page});
                    }
                    $scope.message = {total: "共有", item: "条", perPage: "每页显示："}
                }
            }
        }])
    }
)
