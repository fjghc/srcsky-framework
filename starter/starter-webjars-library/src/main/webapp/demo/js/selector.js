/**
 * Select2 测试
 */
require(["$app", "$url", "$tools"], function ($app, $url, $tools) {
    $url.setTemplateUrl("../");
    //$url.setServerUrl("user", "http://192.168.121.213/user");
    //$url.setServerUrl("user", "http://localhost:8080/user");
    $app.controller("DemoController", ["$scope", "$user", "$timeout", function ($scope, $user, $timeout) {
        $scope.status = "empty";
        $scope.options = [
            {id: 1, label: "11111"}, {id: 2, label: "22222"}
        ];
        $scope.selected = [];
    }]);
    angular.bootstrap(document, ["$app"])
});

