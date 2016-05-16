/**
 * Select2 测试
 */
require(["$app", "$url", "$tools"], function ($app, $url, $tools) {
    $url.setTemplateUrl("../");
    $url.setServerUrl("user", "http://192.168.121.213/user");
    //$url.setServerUrl("user", "http://localhost:8080/user");
    $app.controller("DemoController", ["$scope", "$user", "$timeout", function ($scope, $user, $timeout) {
        function getOption(option) {
            return "<div class=\"line-column-left\">\n" +
                "    <span class=\"text-explode\">用户名</span>\n" +
                "    <span truncate-text source-text=\"" + option.text + "\" copy-text=\"true\" text-length=\"10\"></span>\n" +
                "</div>\n" +
                "<div class=\"line-column-right\">\n" +
                "    <span class=\"text-explode\">手机号</span>\n" +
                "    <span truncate-text source-text=\"" + option.mobile + "\" copy-text=\"true\" text-length=\"10\"></span>\n" +
                "</div>";
        }

        $scope.shuttleOptions = {lTitle: "用户列表", rTitle: "已选结果", list: [], values: []};
        $scope.select2Options = $tools.getSelect2Options({
            overwritePlaceholder: true,
            data: [
                {id: "1", text: "1月分"},
                {id: "2", text: "2月分"},
                {id: "3", text: "3月分"},
                {id: "4", text: "4月分"},
                {id: "5", text: "5月分"},
                {id: "6", text: "6月分"},
            ],
            onSelectedItem: function (item) {
                item.label = getOption(item);
                $timeout(function () {
                    if (!$scope.shuttleOptions.list.in("id", item.id)) {
                        $scope.shuttleOptions.list.push(item);
                    }
                });
            }
        });
        $scope.select2Options = $tools.getSelect2Options({
            overwritePlaceholder: true,
            textField: "name",
            transport: function ($params, $success, $fail) {
                $user.quick($params.data, function (response) {
                    if (response.success) {
                        $success(response);
                    }
                })
            }, onSelectedItem: function (item) {
                item.label = getOption(item);
                $timeout(function () {
                    if (!$scope.shuttleOptions.list.in("id", item.id)) {
                        $scope.shuttleOptions.list.push(item);
                    }
                });
            }
        });
        angular.forEach($scope.select2Options.data, function (item) {
            item.label = getOption(item);
        });
        $scope.shuttleOptions.values = $scope.select2Options.data;
        $scope.showResult = function () {
            alert($scope.shuttleOptions.values);
        }
    }]);
    angular.bootstrap(document, ["$app"])
});

