/*!
 * AngularJS
 * Test grid
 * zhanggj@powerlong.com - 于 2016-01-06 日编写
 */
/**
 * Require Config
 */
require.config({baseUrl: "../scripts/", urlArgs: "_=" + new Date().getTime()});
/**
 * Dialog 控件 依赖模块引入
 */
define("angular", function () {
  return angular;
});
require(["angular", "common/services/import"], function (angular) {
  // 基础 module、所有module均衍生自该 module
  angular.module("app", ["ngSanitize", "pasvaz.bindonce", "ui.bootstrap", "ui.router", "commonServices"]);
  // 定义测试 module
  var testApp = angular.module("testApp", ["app"]);
  testApp.controller("DemoController", ["$scope", "$dialogService", function ($scope, $dialog) {
    $scope.alert = function () {
      $dialog.showMessage({title: "消息提示", message: "测试消息～～～", passedObject: {iconClass: "icon-warning-2"}});
    }
    $scope.error = function () {
      $dialog.showMessage({title: "错误提示", message: "测试消息～～～", passedObject: {iconClass: "icon-no-2"}});
    }
    $scope.success = function () {
      $dialog.showMessage({title: "错误提示", message: "测试消息～～～", passedObject: {iconClass: "icon-yes-2", iconColor: "text-danger"}});
    }
  }]);
  angular.element(document).ready(function () {
    angular.bootstrap(document, ["testApp"]);
  });
});
