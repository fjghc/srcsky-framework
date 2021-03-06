/**
 * Require Config
 */
require.config({baseUrl: "/scripts/", urlArgs: "_=" + new Date().getTime()});
/**
 * Grid 控件 依赖模块引入
 */
define("angular", function () {
  return angular;
});
require([
  "angular",
  "common/directives/sidebar"
], function (angular) {
  // 基础 module、所有module均衍生自该 module
  angular.module("app", ["ui.bootstrap", "console.sidebar"]);
  // 定义测试 module
  var testApp = angular.module("testApp", ["app"]);
  // 定义测试 controller
  testApp.controller("DemoController", ["$scope", function ($scope) {

  }]);
  angular.element(document).ready(function () {
    angular.bootstrap(document, ["testApp"]);
  });
});
