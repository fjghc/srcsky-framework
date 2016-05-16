/*!
 * AngularJS
 * Test grid
 * zhanggj@powerlong.com - 于 2015-12-30 日编写
 */
require(["$app", "$mFactory", "$url", "$string", "$data"], function ($app, $mFactory, $url, $string, $data) {
    $url.setTemplateUrl("../");
    $mFactory.grid("imGroups", {
        config: {
            searchSupport: true,
            paginationSupport: true,
            checkboxSupport: true,
            paginationInfo: {page: 1, size: 10, total: 100, maxSize: 2, tipHide: true},
            batchOperationBarDirective: '<div toolbar biz-type="imGroups" raw-data="selectedItems"></div>',
            rowItemName: "result",
            searchItems: [
                {
                    type: "select", selected: "0", name: "mall", size: 16,
                    options: [
                        {value: "0", text: "--所属项目--"},
                        {value: "1", text: "--1--"},
                        {value: "2", text: "--2--"}
                    ]
                },
                {
                    type: "texts",
                    selected: "default",
                    size: 35,
                    options: [
                        {name: "default", text: "--请选择--", placeholder: "请选择查询条件"},
                        {name: "name", text: "群组名称", placeholder: "请输入群组名称进行模糊查询"}
                    ]
                }
            ],
            searchToolbars: [
                {text: "创建群组", type: "primary"}
            ]
        },
        columns: [
            {
                name: "",
                cssProperty: "state-column",
                fieldDirective: '<span class="state-unread" ng-if="result.status===0">●</span>'
            },
            {
                name: "标题内容",
                cssProperty: "title-column",
                fieldDirective: '<a ng-class="{\'title-unread\':item.status===0,\'title-read\':result.status!==0}" detail-router detail-id="item.MsgId" href="javascript:;"><span truncate-text text-length="50" source-text="{{result.title}}"></span></a>'
            },
            {
                name: "提交时间",
                fieldDirective: '<span class="column-text" bo-text="result.create|date:\'yyyy-MM-dd HH:mm:ss\'"></span>'
            },
            {
                name: "类型",
                fieldDirective: '<span class="column-text" bo-text="result.categoryName" ></span>',
                filterOptionKey: "category"
            }
        ]
    });
    $mFactory.toolbar("imGroups", {
        actions: {
            DELETE: {
                type: "command",
                text: "删除",
                actionClass: "btn btn-default",
                attrs: {
                    "biz-type": "imGroups",
                    "action": "delete",
                    "item-field": "rawData",
                    "key-field": "id",
                    "data-ng-disabled": "!rawData || rawData.length==0"
                },
            },
            MARKREAD: {
                type: "command",
                text: "标记已读",
                actionClass: "btn btn-default",
                attrs: {
                    "biz-type": "imGroups",
                    "action": "markRead",
                    "item-field": "rawData",
                    "key-field": "msgId",
                    "data-ng-disabled": "!rawData || rawData.length==0"
                },
            }
        },
        status: {
            normal: ["DELETE", "MARKREAD"],
            readed: ["DELETE"]
        },
        getActionSeparator: function () {
            return '<span class="margin-right"></span>'
        },
        getModelBizStatus: function (e, t) {
            var n = t.$root.$state;
            return n && n.current.name === "innerMsg.read.list" ? "readed" : "normal"
        }
    });
    $mFactory.biz("imGroups", ["modelDefineService", function ($service) {
        $url.setServerUrl("im", "/");
        return $service.define("imGroups", "群组", "imGroups", /*"imGroupService",*/ {
            "delete": {
                title: "删除群组",
                handler: "drop",
                //handler: "delete",
                getActionParam: function (t, n) {
                    if (angular.isArray(t)) {
                        var r = [], i = t.length;
                        for (var s = 0; s < i; s++) {
                            r.push(t[s].id);
                        }
                        return {id: r.join(",")}
                    }
                    return {}
                }/*, getConfirmMsg: function (rawData, t) {
                 return $string.format("您确定删除选中的{0}个群组吗？", rawData.length);
                 }*/
            }
        });
    }]);
    $app.service("imGroups", ["$request", function ($request) {
        return {
            drop: function ($params) {
                $request.wrap("im", "/sdk/groups/drop", $params);
            }
        }
    }])
    $app.controller("DemoController", ["$scope", "$timeout", "imGroupsGridModel", function ($scope, $timeout, innerMsgGridModel) {
        var self = this;
        self.gm = innerMsgGridModel;
        self.results = [];
        self.updateTableData = function (event) {
            self.results = [];
            self.results.push(
                {
                    id: 1,
                    title: "1【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好,云栖社区起航！独家12篇技术干货，没有最好，只有更好！",
                    category: 1,
                    categoryName: "产品消息-域名和网站",
                    create: 1450850218000,
                    status: 0
                },
                {
                    id: 2,
                    title: "2【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！",
                    category: 2,
                    categoryName: "产品消息-域名和网站",
                    create: 1450850218000,
                    status: 0
                }
            );
        }
    }]);
    angular.bootstrap(document, ["$app"])
});

/*
 require([
 "angular",
 "common/model/import",
 "common/services/import",
 "common/directives/import"
 ], function (angular) {
 // 基础 module、所有module均衍生自该 module
 angular.module("app", ["ngSanitize", "pasvaz.bindonce", "ui.bootstrap", "ui.router", "commonServices", "commonDirectives", "commonModelDirectives"]);
 // 定义测试 module
 var testApp = angular.module("testApp", ["app"]);
 testApp.controller("DemoController", ["$scope", "$timeout", "modelFactory", function ($scope, $timeout, modelFactory) {
 this.config = {
 batchOperationBarDirective: '<div toolbar biz-type="innerMsgToolbar" raw-data="selectedItems"></div>',
 loading: false,
 pager: {size: 4, total: 100},
 // 定义 search-bar 条件参数
 searchConditions: [
 // 单条文本条件
 {type: "text", name: "title", placeholder: "请输入查询条件", size: 16},
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
 type: "select", selected: "0", size: 16,
 options: [
 {value: "0", text: "--年龄选择--"},
 {value: "1", text: "1岁"},
 {value: "2", text: "2岁"}
 ]
 },
 // 日期条件
 {type: "date", name: "start", placeholder: "请选择开始日期"},
 // 日期区间条件
 {
 type: "dateRange",
 start: {name: "start", placeholder: "开始日期", size: 10},
 end: {name: "end", placeholder: "结束日期", size: 10}
 }
 ],
 columns: [

 ], results: [
 {l1: 1, title: "1【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好,云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 1, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {l1: 1, title: "2【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 2, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "3【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 3, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "4【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 1, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "5【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 2, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "6【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 3, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "7【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 1, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "8【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 2, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "9【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 3, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "10【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 2, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "11【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 3, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "12【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 1, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "13【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 2, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "14【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 3, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "15【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 1, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "16【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 2, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0},
 {title: "17【深度】云栖社区起航！独家12篇技术干货，没有最好，只有更好！", category: 3, categoryName: "产品消息-域名和网站", create: 1450850218000, status: 0}
 ]
 }
 var _this = this;
 $timeout(function () {
 // _this.config.loading = true;
 // _this.config.columns.push({});
 //_this.config.columns=[];
 _this.config.pager.total = 999;
 }, 1000);
 }]);
 angular.element(document).ready(function () {
 angular.bootstrap(document, ["testApp"]);
 });
 });

 require(["common/model/model.factory"], function (modelFactory) {
 modelFactory.toolbar("innerMsgToolbar", {
 actions: {
 MARKREAD: {
 type: "command",
 text: "标记已读",
 actionClass: "btn btn-default",
 attrs: {
 "biz-type": "innerMsg", action: "markRead", "item-field": "rawData", "key-field": "msgId",
 "data-ng-disabled": "!rawData || rawData.length==0"
 },
 },
 DELETE: {
 type: "command",
 text: "删除",
 actionClass: "btn btn-default",
 attrs: {"biz-type": "innerMsg", action: "delete", "item-field": "rawData", "key-field": "msgId", "data-ng-disabled": "!rawData || rawData.length==0"},
 }
 },
 status: {
 normal: ["DELETE", "MARKREAD"],
 readed: ["DELETE"]
 },
 getActionSeparator: function () {
 return '<span class="margin-right"></span>'
 },
 getModelBizStatus: function (e, t) {
 var n = t.$root.$state;
 return n && n.current.name === "innerMsg.read.list" ? "readed" : "normal"
 }
 });
 });*/
