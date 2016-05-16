/**
 * Require Config
 */
require.config({baseUrl: "/scripts/", urlArgs: "_=" + new Date().getTime()});
/**
 * Tree 控件 依赖模块引入
 */
define("angular", function () {
    return angular;
});
require([
    "angular",
    "common/directives/tree"
], function (angular) {
    // 基础 module、所有module均衍生自该 module
    angular.module("app", ["ui.bootstrap", "commonDirectives"]);
    // 定义测试 module
    var testApp = angular.module("testApp", ["app"]);
    // 定义测试 controller
    testApp.controller("DemoController", ["$scope", function ($scope) {
        $scope.opts={
            rootTitle:"宝龙集团"
        }
        $scope.treedata = [
            {id: "id-1", label: "决策层", children: []},
            {
                id: "id2", label: "行政人事中心", children: [
                {id: "id-2.1", label: "行政部"},
                {id: "id-2.2", label: "法务部"},
                {id: "id-2.3", label: "品牌部"},
                {id: "id-2.4", label: "人力资源部"}
            ]
            },
            {id: "id2", label: "财务部", children: []},
            {id: "id3", label: "技术研发中心", children: []},
            {id: "id3", label: "产品设计中心", children: []},
            {id: "id3", label: "运营部", children: []},
            {id: "id3", label: "营销部", children: []}
        ];
        $scope.addChild = function () {
            $scope.treedata[0].children = $scope.treedata[0].children.concat([
                {id: "id-2.1", label: "行政部"},
                {id: "id-2.2", label: "法务部"},
                {id: "id-2.3", label: "品牌部"},
                {id: "id-2.4", label: "人力资源部"}
            ])
        }

    }]);
    angular.element(document).ready(function () {
        angular.bootstrap(document, ["testApp"]);
    });
});
