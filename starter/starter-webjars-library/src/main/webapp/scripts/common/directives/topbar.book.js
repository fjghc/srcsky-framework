define("common/directives/topbar.book", ["angular", "$directives","$url"], function (angular, $directives,$url) {
    $directives.directive("topbarBook", [function () {
        return {
            restrict: "A",
            replace: true,
            scope: {
                show: "=",
                config: "=",
                isSidebarFold: "=",
            }, controller: ["$scope", function ($scope) {
                $scope.treedata = [
                    {
                        id: "1", label: "宝龙集团",
                        children: [
                            {id: "11", label: "许华琳"},
                            {id: "12", label: "投资部", children: [{id: "2323", label: "测试123"}]},
                            {id: "13", label: "办公室", children: [{id: "2323", label: "测试123"}]},
                            {id: "14", label: "宝信体系", children: [{id: "2323", label: "测试123"}]},
                            {id: "15", label: "管理部", children: [{id: "2323", label: "测试123"}]},
                            {id: "16", label: "财务部", children: [{id: "2323", label: "测试123"}]}
                        ]
                    },
                    {
                        id: "id2", label: "宝龙地产",
                        children: [
                            {id: "id-2.1", label: "行政部"},
                            {id: "id-2.2", label: "法务部"},
                            {id: "id-2.3", label: "品牌部"},
                            {id: "id-2.4", label: "人力资源部"}
                        ]
                    }, {
                        id: "id2", label: "宝龙文化",
                        children: [
                            {id: "id-2.1", label: "行政部"},
                            {id: "id-2.2", label: "法务部"},
                            {id: "id-2.3", label: "品牌部"},
                            {id: "id-2.4", label: "人力资源部"}
                        ]
                    }
                ];
                $scope.addChild = function () {
                    $scope.treedata[0].children = $scope.treedata[0].children.concat([
                        {id: "id-2.1", label: "行政部"},
                        {id: "id-2.2", label: "法务部"},
                        {id: "id-2.3", label: "品牌部"},
                        {id: "id-2.4", label: "人力资源部"}
                    ])
                }
            }], templateUrl: $url.getTemplateUrl("scripts/common/views/topbar.book.html"),
            link: function ($scope, $element, $attr) {
                $scope.showDetail = false;
                $scope.hidePanel = function () {
                    $scope.show = false;
                };
                $scope.showPanel = function () {
                    $scope.show = true
                };
                $scope.closeDetail = function () {
                    $scope.showDetail = false;
                }
            }
        }
    }]);
})
