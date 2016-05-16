define("common/directives/login", ["angular", "$directives","$url"], function (angular, $directives,$url) {
    $directives.directive("login", ["$rootScope", "frameworkSetting", "$timeout", function ($rootScope, frameworkSetting, $timeout) {
        return {
            restrict: "A",
            replace: true,
            scope: {
                username: "=",
                password: "=",
                submit: "&"
            },
            controller: ["$scope", function ($scope) {
                this.$scope = $scope;
            }],
            controllerAs: "ctrl",
            templateUrl: $url.getTemplateUrl("scripts/common/views/login.html"),
            transclude: false,
            link: function ($scope) {
                $scope.keyup = function ($event) {
                    var keycode = window.event ? $event.keyCode : $event.which;
                    if (keycode == 13) {
                        $scope.submit()($scope);
                    }
                }
                /* $scope.login = function () {
                 frameworkSetting.setLogin(false);
                 frameworkSetting.loading(true);
                 $timeout(function () {
                 frameworkSetting.loading(false);
                 frameworkSetting.setLogin(true);
                 }, 800)
                 }*/
            }
        }
    }]);
});
