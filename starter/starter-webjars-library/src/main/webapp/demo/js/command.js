/**
 * Command 测试
 */
require(["$app", "$url", "$tools"], function ($app, $url, $tools) {
    $url.setTemplateUrl("../");
    //$url.setServerUrl("user", "http://localhost:8080/user");
    $app.controller("DemoController", ["$scope", "$user", "$timeout", "$dialog", function ($scope, $user, $timeout, $dialog) {
    }]);
    angular.bootstrap(document, ["$app"])
});