define("common/model/model.define.service", ["angular", "./base", /*"./modelSystemModule", "../services/i18nService"*/], function (angular, commonModel) {
    function i(e, t) {
        var n, r = Object.prototype.toString, s = "[object Array]";
        t = t || {};
        for (n in e)e.hasOwnProperty(n) && (typeof e[n] == "object" ? (t[n] = r.call(e[n]) === s ? [] : {}, i(e[n], t[n])) : t[n] = e[n]);
        return t
    }

    if (!angular.emptyFunction) {
        angular.emptyFunction = function () {
        }
    }
    commonModel.factory("modelDefineService", ["$injector", function ($injector) {
        function throwError(e, t) {
            throw new Error(e || "the type of param should be" + t || "string")
        }

        function o(e) {
            throw new Error(e)
        }

        function u(t) {
            var n = {
                bizType: "default",
                bizName: "默认业务",
                bizService: "defaultService",
                bizActions: {
                    defaultAction: new f("default", {})
                },
                extraData: {}
            };
            angular.extend(this, n, t)
        }

        function defBizModel(bizType, bizName, bizService, handler, extraData) {
            function c(e, t) {
                var bizActions = {};
                if (t) {
                    for (var r in t) {
                        if (t.hasOwnProperty(r)) {
                            bizActions[r] = new f(e, t[r])
                        }
                    }
                }
                return bizActions
            }

            if (!angular.isString(bizType) || !angular.isString(bizName) || !angular.isString(bizService)) {
                throwError();
            }
            try {
                bizService = $injector.get(bizService)
            } catch (l) {
                throw console.error('bizService :"' + bizService + '"不存在，检查你的业务模型 [' + bizType + "] 对应的代码，查看 modelDefineService 函数第三个参数是否为已有的Angular Service 名称"), new Error(l)
            }
            if (!angular.isObject(bizService)) {
                throwError("service of the biz '" + bizType + "' should return an object")
            }
            return new u({
                bizType: bizType,
                bizName: bizName,
                bizService: bizService,
                bizActions: c(bizName, handler),
                extraData: extraData
            })
        }

        function f(t, n) {
            this.bizName = t || "默认业务";
            this.handler = angular.noop;
            angular.extend(this, n)
        }

        function TooBarModel(t, n) {
            this.bizName = t || "defaultToolBarModel";
            var r = {
                template: "",
                templateUrl: "",
                prepareDataForTemplate: function (e, t, n) {
                },
                actions: {
                    DEFAULT: new ToolBarAction("defaultToolBarModel")
                },
                status: {
                    normal: ["DEFAULT"]
                }
            };
            angular.extend(this, n)
        }

        function ToolBarAction(bizName, diy) {
            this.bizName = bizName;
            var option = {
                tipDirection: "top",
                action: "defaultToolBarAction",
                type: "command",
                text: "默认工具栏按钮",
                actionClass: "",
                bizStatus: "any",
                disabledTip: {any: "按钮处于any状态"},
                showTip: false,
                tip: "asdf",
                attrs: {key: "value"},
                rawData: null
            };
            angular.extend(this, angular.extend(option, diy));
            this.rawData = {};
            this.attrs = this.attrs || {}
        }

        function h(t) {
            var n = {
                id: "",
                title: "测试1",
                titleClass: "",
                componentClass: "",
                componentBodyClass: "",
                componentType: "",
                toolbar: "",
                bizType: "",
                bizAction: "",
                modelType: "",
                attributes: {},
                toolbarPosition: "right",
                toolbarClass: "",
                selfRefresh: !1,
                intervel: 3e3
            };
            if (!t) {
                t = n
            }
            angular.extend(this, t);
            this.modelType = this.modelType ? this.modelType : this.bizType
        }

        function p() {
        }

        u.prototype.getActionModel = function (e) {
            return this.bizActions[e] || console.log("error: no action named '" + e + "' in the bizModel '" + this.bizName + "', return default empty bizAction instead") && new f
        };
        u.prototype.registAction = function (e, t) {
            !this.bizActions && (this.bizActions = {}), this.bizActions[e] ? o("action '" + e + "' has been registed in the bizModel") : this.bizActions[e] = t
        };
        u.prototype.makeRequest = function (n, r, i, s, o) {
            var s = s || {params: {}}, u = n.getActionParam(r);
            s.params = angular.extend(s.params, u);
            var a = n.hideDefaultErroDialog !== undefined ? n.hideDefaultErroDialog : n.responseHandler ? !0 : !1, f = n.responseHandler != angular.emptyFunction ? n.responseHandler : i.responsePreHandler;
            this.bizService[n.handler](s).then(function (i) {
                var s = f(i, $injector, !0);
                s && angular.isFunction(s.then) == 0 && (s = n.afterActionExecuted(r, s) || s, angular.isFunction(o) && o(s))
            })
        };
        f.prototype = {
            constructor: f,
            getActionParam: function (e) {
            },
            getConfirmMsg: function (e, t) {
                // return "您确定要执行此操作吗？"
                return undefined;
            },
            getActionResultMsg: function (e) {
                return e.message || ""
            },
            injectController: function (e, t) {
            },
            setProperty: function (e, t) {
                e && (this[e] = t)
            },
            afterActionExecuted: angular.emptyFunction,
            responseHandler: angular.emptyFunction,
            hideDefaultErroDialog: undefined
        };
        TooBarModel.prototype = {
            constructor: TooBarModel,
            registAction: function (e, t, n) {
                if (n === !0)return this.actions[e] = t, this;
                var r = this.actions[e];
                if (!r)return this.actions[e] = t, this;
                throw new Error("toolbarAction '" + t.getName() + "' has registed")
            }, _getActionByName: function (e) {
                var t = this.actions[e], n = i(t, {});
                return n instanceof ToolBarAction || (n = new ToolBarAction("", n)), n || null
            }, getActionListByBizStatus: function (status) {
                function r(t, i) {
                    var u = [];
                    if (angular.isArray(t))
                        for (var a = 0, f = null, l = null; l = t[a]; a++) {
                            if (typeof l == "string") {
                                l = l.split(":");
                                o = (l[1] || "").toLowerCase();
                                l = l[0];
                                f = n._getActionByName(l);
                                f.setBizStatus(i);
                                f.setActionStatus(o, o, true)
                            } else if (typeof l == "object") {
                                f = l;
                                if (!(f instanceof ToolBarAction)) {
                                    f = new ToolBarAction("", f)
                                }
                                f.setBizStatus(i)
                            }
                            actionType = f.getType();
                            actionType === "menu" && angular.isArray(f.children) && (f.children = r(f.children));
                            u.push(f);
                        }
                    return u
                }

                var n = this, actionList = [], actionType = "", o = "", u = [];
                if (!status) {
                    var actions = this.actions;
                    for (var action in actions) {
                        if (actions.hasOwnProperty(action)) {
                            u.push(action)
                        }
                    }
                } else {
                    u = this.status[status];
                }
                actionList = r(u, status);
                return actionList
            }, getModelBizStatus: function (e, t) {
                return ""
            }, setActionListByBizStatus: function (t, n) {
                angular.isString(t) && angular.isArray(n) && (this.status[t] = n)
            }, setActionListOfBizStatusByRawData: function (e, t) {
            }, getActionSeparator: function () {
                return '<span class="text-explode">|</span> '
            }, config: function () {
            }
        }
        ToolBarAction.prototype = {
            constructor: ToolBarAction,
            render: function (e) {
                return ""
            }, getAction: function () {
                return this.action || ""
            }, getType: function () {
                return this.type || ""
            }, getText: function () {
                return this.text || ""
            }, getBizStatus: function () {
                return this.bizStatus || ""
            }, setBizStatus: function (e) {
                this.bizStatus = e
            }, getBizStatusTip: function () {
                return this.disabledTip[this.getBizStatus()] || ""
            }, getAttrs: function () {
                return this.attrs || {}
            }, getClass: function () {
                return this.actionClass/* || "btn btn-link btn-xs"*/;
            }, setActionStatus: function (e, t, n) {
                if (e === "disabled") {
                    this.showTip = true;
                } else {
                    this.showTip = false;
                }
                if (e == "") {
                    this.tip = "";
                } else {
                    this.tip = this.getBizStatusTip() || "";
                }
                if (e != "") {
                    this.attrs[t] = n;
                    this.attrs["data-ng-" + t] = n
                }
            }, setRawData: function (e) {
                this.rawData = e
            }, getRawDataValue: function (e) {
                var t = this.rawData[e] || "";
                return t
            }
        };
        h.prototype = {
            constructor: h, getId: function () {
                return this.id || ""
            }, getHeaderClass: function () {
                return this.headerClass || ""
            }, getClass: function () {
                return this.componentClass || ""
            }, getToolbarClass: function () {
                return this.toolbarClass || ""
            }, getToolbarPosition: function () {
                return this.toolbarPosition || "right"
            }, getTitleClass: function () {
                return this.titleClass || ""
            }, getTitle: function () {
                return this.title || ""
            }, getComponentBodyClass: function () {
                return this.componentBodyClass || ""
            }, getType: function () {
                return this.componentType || ""
            }, getBizType: function () {
                return this.bizType || ""
            }, getBizAction: function () {
                return this.bizAction || ""
            }, getModelType: function () {
                return this.modelType || ""
            }, refresh: function () {
            }, setBizModel: function (e) {
                this.bizModel = e
            }, getBizModel: function () {
                return this.bizModel || undefined
            }
        };
        p.prototype = {
            refresh: function (e) {
            }
        };
        return {
            define: defBizModel,
            defBizAction: function (e, t) {
                return new f(e, t)
            }, defToolbarModel: function (e, t) {
                return new TooBarModel(e, t)
            }, defToolbarAction: function (e, t) {
                return new ToolBarAction(e, t)
            }, defBizComponentModel: function (e) {
                return new h(e)
            }
        }
    }])

})
