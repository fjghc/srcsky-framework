/*!
 * AngularJS
 * Test grid
 * zhanggj@powerlong.com - 于 2015-12-30 日编写
 */
/**
 * Require Config
 */
require.config({baseUrl: "/scripts/", urlArgs: "_=" + new Date().getTime()});
/**
 * Toolbar 控件 依赖模块引入
 */
define("angular", function () {
  return angular;
});
require([
  "angular",
  "common/services/import",
  "common/model/import"
], function (angular) {
  // 基础 module、所有module均衍生自该 module
  angular.module("app", ["ngSanitize", "pasvaz.bindonce", "ui.bootstrap", "ui.router", "commonServices", "commonModelDirectives"]);
  // 定义测试 module
  var testApp = angular.module("testApp", ["app"]);
  testApp.controller("DemoController", ["$scope", "$timeout", "modelFactory", function ($scope, $timeout, modelFactory) {
    $scope.$on("my:actionExecuted", function (action, data) {
      alert(action + ":" + data);
    })
    $scope.selectedItems = []
  }]);
  testApp.factory("innerMsgRequest", ["$q", function ($q) {
    return {
      "delete": function ($data) {
        var deferred = $q.defer();
        setTimeout(function () {
          deferred.resolve('你好, ' + name + '!');
        }, 3000);
        return deferred.promise;
      }
    }
  }])
  angular.element(document).ready(function () {
    angular.bootstrap(document, ["testApp"]);
  });
});

require(["common/model/model.factory"], function (modelFactory) {
  modelFactory.toolbar("myToolbar", {
    actions: {
      DELETE: {
        showTip:true,
        type: "command", text: "删除", actionClass: "btn btn-default",
        disabledTip: {
          readed: "按钮处于any状态",
          normal:"asdfasdf"
        },
        attrs: {
          "biz-type": "my",
          action: "delete",
          "item-field": "rawData",
          "key-field": "msgId",
          /*"data-ng-disabled": "!rawData || rawData.length==0",
           "data-ng-class": "{'disabled':(!rawData || rawData.length==0)}"*/
        }
      },
      MARKREAD: {
        type: "command",
        text: "标记已读",
        actionClass: "btn btn-default",
        attrs: {
          /*"biz-type": "innerMsg", */action: "markRead", "item-field": "rawData", "key-field": "msgId",
          "data-ng-disabled": "!rawData || rawData.length==0",
          "data-ng-class": "{'disabled':(!rawData || rawData.length==0)}"
        },
      },
      MORE: {
        type: "menu",
        text: "更多",
        actionClass: "btn btn-default",
        disabledTip: {
          readed: "按钮处于any状态",
          normal:"asdfasdf"
        },
        children: [
          {
            type: "command",
            text: "重新开机"
          },
          {
            type: "command",
            text: "编辑标签"
          }
        ],
        attrs: {
          "biz-type": "innerMsg",
          action: "delete",
          "item-field": "rawData",
          "key-field": "msgId",
          "data-ng-disabled": "!rawData || rawData.length==0"
        }
      }
    },
    status: {
      normal: ["DELETE:disabled", "MARKREAD", "MORE"],
      readed: ["DELETE", "MORE"]
    },
    getActionSeparator: function () {
      return '<span class="margin-right"></span>'
    },
    getModelBizStatus: function (rawData, $scope, $injector) {
      var state = $scope.$root.$state;
      //return state && state.current.name === "innerMsg.read.list" ? "readed" : "normal"
      return "readed"
    }
  });
  modelFactory.bizModel("my", ["modelDefineService", function (modelDefineService) {
    return modelDefineService.defBizModel("my", "测试", "innerMsgRequest", {
      "delete": {
        title: "删除站内消息",
        handler: "delete",
        /*handler: function () {
         alert("imFunction");
         },*/
        getActionParam: function (data, $scope) {
          if (angular.isArray(data)) {
            var r = [], i = data.length;
            for (var s = 0; s < i; s++)r.push(data[s].MsgId);
            return {msgId: r.join(",")}
          }
          return {}
        },
        getConfirmMsg: function (data, $scope) {
          return "您确定要删除选中的消息吗？";
        }
      }
    })
  }]);
});
