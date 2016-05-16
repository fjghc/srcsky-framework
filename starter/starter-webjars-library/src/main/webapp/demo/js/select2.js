/**
 * Select2 测试
 */
require(["$app", "$url", "$tools"], function ($app, $url, $tools) {
    $url.setTemplateUrl("../");
    $url.setServerUrl("user", "http://192.168.121.213/user");
    //$url.setServerUrl("user", "http://localhost:8080/user");
    $app.controller("DemoController", ["$scope", "$user", "$timeout", "$dialog",function ($scope, $user, $timeout,$dialog) {
        /**
         * 常规
         */
        //$scope.selectedItem1 = "2";
        $scope.select2Options1 = $tools.getSelect2Options({
            data: [{id: "1", text: "1月分"}, {id: "2", text: "2月分"}, {id: "3", text: "3月分"}]
        });
        /**
         * Ajax类消息
         */
        $scope.selectedItem2 = "SDFSDFSDFSDFFDGVDEWWERQWEWQEQWEW";
        $scope.select2Options2 = $tools.getSelect2Options({
            overwritePlaceholder: false,
            textField: "name",
            reqData: function () {
                return {data: {id: $scope.selectedItem2}}
            },
            transport: function ($params, $success, $fail) {
                $user.quick($params.data, function (response) {
                    if (response.success) {
                        $success(response);
                    }
                })
            }, onSelectedItem: function (item) {
                //alert(item);
            }
        });
    }]);
    angular.bootstrap(document, ["$app"])
});