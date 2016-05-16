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
  "common/services/i18n",
  "common/directives/uib.datepicker.diy",
  "common/directives/search.bar"
], function (angular) {
  // 基础 module、所有module均衍生自该 module
  angular.module("app", ["ui.bootstrap", "commonServices", "commonDirectives"]);
  // 定义测试 module
  var testApp = angular.module("testApp", ["app"]);
  // 定义测试 controller
  testApp.controller("DemoController", ["$scope", function ($scope) {
    // 定义 search-bar 条件参数
    this.searchConditions = [
      // 单条文本条件
      {type: "text", name: "ct", placeholder: "请输入查询条件", size: 16},
      {
        type: "texts", selected: "default", size: 14,
        options: [
          {name: "default", text: "--请选择--", placeholder: "请选择查询条件"},
          {name: "title", text: "标题查询", placeholder: "请输入实例名称进行模糊查询"},
          {name: "content", text: "内容查询", placeholder: "请输入实例内网IP地址进行精确查询"}
        ]
      },
      // 多条文本条件
      {
        type: "select", name: "age", selected: "0", size: 16,
        options: [
          {value: "0", text: "--年龄选择--"},
          {value: "1", text: "1岁"},
          {value: "2", text: "2岁"}
        ]
      },
      // 日期条件
      {type: "date", name: "bithday", placeholder: "请选择生日"},
      // 日期区间条件
      {
        type: "dateRange",
        start: {name: "start", placeholder: "开始日期", size: 10},
        end: {name: "end", placeholder: "结束日期", size: 10}
      }
    ];
    this.search = function ($params) {
      alert(angular.toJson($params));
    }
  }]);
  angular.element(document).ready(function () {
    angular.bootstrap(document, ["testApp"]);
  });
});
