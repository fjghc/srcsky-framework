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
  "common/directives/product.navbar"
], function (angular) {
  // 基础 module、所有module均衍生自该 module
  angular.module("app", ["ui.bootstrap","ui.router", "console.product.navbar"]);
  // 定义测试 module
  var testApp = angular.module("testApp", ["app"]);

  testApp.config(["$stateProvider", "$urlRouterProvider", function ($state, $urlRouterProvider) {
    $state.state("home", {url: "/home.html", template: "---<a ui-sref='bucket.home'>Bucket概览</a>"});
    $state.state("server", {url: "/server.html", template: "server"});
    $state.state("disk", {url: "/disk.html", template: "disk"});
    $state.state("snapshot", {url: "/snapshot.html", template: "snapshot"});
    $state.state("image", {url: "/image.html", template: "image"});
    $state.state("securityGroup", {url: "/securityGroup.html", template: "securityGroup"});
    $state.state("tag", {url: "/tag.html", template: "tag"});
    $state.state("task", {url: "/task.html", template: "task"});

    $state.state("bucket", {url: "/bucket", "abstract": true});
    $state.state("bucket.home", {url: "/index.html", template: "task"});
    $state.state("bucket.attr", {url: "/attr.html", template: "attr"});
    $state.state("bucket.object", {url: "/object.html", template: "object"});
    $state.state("bucket.multipart", {url: "/multipart.html", template: "multipart"});
    $state.state("bucket.task", {url: "/task.html", template: "task"});
    $state.state("bucket.imageService", {url: "/imageService.html", template: "imageService"});

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
    ]);
    navbar.setSubNav([
      {title: "Bucket概览", state: "bucket.home", "abstract": true},
      {title: "Bucket属性", state: "bucket.attr"},
      {title: "Object管理", state: "bucket.object"},
      {title: "碎片管理", state: "bucket.multipart"},
      {title: "任务管理", state: "bucket.task", cls: "nav-uploadtask", extend: "<div object-upload-count></div>"},
      {title: "图片处理", state: "bucket.imageService", includes: [""]}
    ], "home");
  }]);


  angular.element(document).ready(function () {
    angular.bootstrap(document, ["testApp"]);
  });
});
