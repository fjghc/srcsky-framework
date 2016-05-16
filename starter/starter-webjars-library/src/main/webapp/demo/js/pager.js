/**
 * Require Config
 */
require.config({baseUrl: "/scripts/", urlArgs: "_=" + new Date().getTime()});
/**
 * Pager2 控件 依赖模块引入
 */
define("angular", function () {
  return angular;
});
require([
  "angular",
  "common/directives/pager"
], function (angular) {
  // 基础 module、所有module均衍生自该 module
  angular.module("app", ["ui.bootstrap", "commonDirectives"]);
  // 定义测试 module
  var testApp = angular.module("testApp", ["app"]);
  // 定义测试 controller
  testApp.controller("DemoController", ["$scope", function ($scope) {
    // 定义 pager2 条件参数
  }]);
  angular.element(document).ready(function () {
    angular.bootstrap(document, ["testApp"]);
  });
});
