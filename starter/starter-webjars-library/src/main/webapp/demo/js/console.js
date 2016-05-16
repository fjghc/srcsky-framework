/**
 * Require Config
 */
require.config({baseUrl: "../scripts/", urlArgs: "_=" + new Date().getTime()});
/**
 * Grid 控件 依赖模块引入
 */
define("angular", function () {
  return angular;
});

require([
  "angular",
  "common/directives/import"
], function (angular) {
  // 基础 module、所有module均衍生自该 module
  angular.module("app", ["ui.bootstrap","ui.router", "console.framework"]);
  // 定义测试 module
  var testApp = angular.module("testApp", ["app"]);

  testApp.config(["$stateProvider", "$urlRouterProvider", function ($state, $urlRouterProvider) {
    $state.state("home", {url: "/home.html", template: "home"});
    $state.state("server", {url: "/server.html", template: "server"});
    $state.state("disk", {url: "/disk.html", template: "disk"});
    $state.state("snapshot", {url: "/snapshot.html", template: "snapshot"});
    $state.state("image", {url: "/image.html", template: "image"});
    $state.state("securityGroup", {url: "/securityGroup.html", template: "securityGroup"});
    $state.state("tag", {url: "/tag.html", template: "tag"});
    $state.state("task", {url: "/task.html", template: "task"});
    $urlRouterProvider.otherwise("/home.html");
  }]);
  testApp.run(["$productNavbarSetting", function (navbar) {
    navbar.setTitle("云服务器 ECS");
    navbar.setMainNav([
      {title: "概览", state: "home"},
      {title: "实例", state: "server", includes: ["server"]},
      {title: "磁盘", state: "disk"},
      {title: "快照", state: "snapshot"},
      {title: "镜像", state: "image"},
      {title: "安全组", state: "securityGroup"},
      {title: "标签管理", state: "tag"},
      {title: "任务管理", state: "task"}
    ])
  }]);
  angular.element(document).ready(function () {
    angular.bootstrap(document, ["testApp"]);
  });
});
