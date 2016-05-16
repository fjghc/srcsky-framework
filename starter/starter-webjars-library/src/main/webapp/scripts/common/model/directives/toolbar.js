define("common/model/directives/toolbar", ["angular", "./base", "../lib/template", "../model.define.service"], function (angular, commonModelDirectives, template, m) {
    function r(e, t) {
        function n() {
        }

        n.prototype = t.prototype;
        e.prototype = new n;
        e.prototype.constructor = e;
        return e
    }

    function menuRender(e, t) {
        var n = e.render(t);
        if (n) {
            return n;
        }
        e.setRawData(t);
        var r = e.getType() || "", i = new (s.factory(r))(e);
        return i.renderAction(e)
    }

    function s(e) {
        this.action = e;
        if (angular.isFunction(this.action.action)) {
            this.action.action = this.action.action(this.action, this.action.rawData);
        }
    }

    function command(e) {
        s.call(this, e)
    }

    function menu(e) {
        s.call(this, e)
    }

    function empty(e) {
        s.call(this, e)
    }

    function link(e) {
        s.call(this, e)
    }

    function stateLink(e) {
        s.call(this, e)
    }

    function normal(e) {
        s.call(this, e)
    }

    function click(e) {
        s.call(this, e)
    }

    function getToolBarModel($scope, modelFactory, bizType) {
        if ($scope.toolBarModel) {
            return $scope.toolBarModel;
        }
        if (modelFactory) {
            return modelFactory.getModel(bizType, "ToolbarModel")
        }
    }

    s.prototype = {
        constructor: s,
        renderAction: function (e) {
            var t = template.tmpl(this.getActionTemplate(e), this.getRenderData(e)) || "";
            return t
        },
        getActionTemplate: function (e) {
            var e = this.action || e, t = "", n = toolbarRenderConf.renderTemplates, r = "";
            if (e.showTip) {
                r = "tipAction"
            } else if (e.getType() == "menu") {
                r = "menu"
            } else if (e.getType() == "empty") {
                r = "empty"
            } else if (e.getType() == "click") {
                r = "click";
            } else {
                r = "action"
            }
            return n[r]
        },
        getRenderData: function (action) {
            var action = this.action || action, renderData = {
                actionClass: action.getClass() || "",
                action: this.getActionDirective(action) || "",
                attributes: this.getAttrsHtml() || "",
                rawData: this.getRawDataHtml() || "",
                actionTextClass: action.actionTextClass || "",
                text: action.text || ""
            };
            if (action.showTip) {
                renderData.tipDirection = action.tipDirection || "top";
                renderData.tipText = action.tip || "";
            }
            return renderData
        },
        getActionDirective: function (e) {
            var e = this.action || e;
            return e.action
        },
        getAttrsHtml: function (e) {
            var e = this.action || e, t = e.attrs, n = "";
            if (t)for (var r in t)t.hasOwnProperty(r) && (n += r + '="' + t[r] + '" ');
            return n
        }, getRawDataHtml: function () {
        }
    }
    s.init = function (e) {
        if (!this.constructors) {
            this.constructors = {}
        }
        var n = e.renders;
        if (!angular.isObject(n)) {
            n = {}
        }
        s.prototype.renderTemplates = e.renderTemplates;        angular.extend(this.constructors, n);

    };
    s.factory = function (e) {
        return e == 0 ? e = "normal" : "", this.constructors[e] || s
    };
    s.registRender = function (e, t) {
        this.constructors[e] || (this.constructors[e] = t)
    };
    r(command, s);
    angular.extend(command.prototype, {
        getActionDirective: function (e) {
            return "inline-command"
        }
    });
    r(menu, s);
    angular.extend(menu.prototype, {
        getRenderData: function (e) {
            return {
                menu: e,
                actionClass: e.getClass() || "",
                text: e.text || "",
                actions: e.children || [],
                itemClass: e.menuItemClass || "",
                renderer: menuRender
            }
        }
    });
    r(empty, s);
    angular.extend(empty.prototype, {
        getActionDirective: function (e) {
            return "inline-command"
        }
    });
    r(link, s);
    angular.extend(link.prototype, {
        getActionDirective: function (e) {
            return 'ng-href = " ' + e.action + '"'
        }
    });
    r(stateLink, s);
    angular.extend(stateLink.prototype, {
        getActionDirective: function (e) {
            return 'ui-sref= "' + e.action + '"'
        }
    });
    r(normal, s);
    angular.extend(normal.prototype, {
        getActionDirective: function (e) {
            return e.action
        }
    });
    var toolbarRenderConf = {
        renders: {
            command: command,
            menu: menu,
            empty: empty,
            link: link,
            stateLink: stateLink,
            normal: normal
        },
        actionRender: s,
        renderTemplates: {
            tipAction: ['<div style="display:inline-block;"', 'tooltip-placement="<%=tipDirection%>"', 'uib-tooltip="<%=tipText%>">', '<a href="javascript:;"', 'class="<%=actionClass%>"', "<%=action%>", "<%=attributes%>", "<%=rawData%>", '><span class="<%=actionTextClass%>">', "<%=text%>", "</span></a></div>"].join(" "),
            action: [
                '<a href="javascript:;"', 'class="<%=actionClass%>"', "<%=action%>", "<%=attributes%>", "<%=rawData%>", '><span class="<%=actionTextClass%>">', "<%=text%>", "</span></a>"
            ].join(" "),
            menu: [
                '<div class="dropup dropdown inline-block" uib-dropdown>',
                ' <a href="javascript:;" class="dropdown-toggle <%=actionClass%>"', 'class="<%=actionClass%>"', ' uib-dropdown-toggle data-toggle="dropdown">',
                '   <%=text%><span class="caret"></span>',
                ' </a>',
                ' <ul class="dropdown-menu">',
                "   <%if(actions && actions.length>0){%>",
                "   <%for(var i=0, act=null;act=actions[i];i++){%>",
                '   <li class="<%=itemClass%>"><%=renderer(act,menu.rawData)%></li>',
                "   <%}}%>",
                " </ul>",
                "</div>"].join(""),
            empty: ["<div ", 'class="btn-xs" ', "<%=action%>", "<%=attributes%>", "<%=rawData%>", '><span class="<%=actionTextClass%>">', "<%=text%>", "</span></div>"].join(""),
            click: ['<a href="javascript:void(0);"', 'class="<%=actionClass%>"', "<%=action%>", "<%=attributes%>", "<%=rawData%>", '><span class="<%=actionTextClass%>">', "<%=text%>", "</span></a>"].join("")
        }
    };
    commonModelDirectives.constant("toolbarRenderConf", toolbarRenderConf);
    commonModelDirectives.directive("toolbar", ["$compile", "$injector", "modelDefineService", "modelFactory", function ($compile, $injector, modelDefineService, modelFactory) {
        return {
            restrict: "A",
            scope: {
                toolBarModel: "=",
                rawData: "=",
                toolbarWatch: "="
            },
            controller: ["$scope", "$templateCache", "toolbarRenderConf", function ($scope, $templateCache, toolbarRenderConf) {
                function o(e) {
                    var t = e.template ? e.template : e.templateUrl ? $templateCache.get(e.templateUrl) : "";
                    return t
                }

                s.init(toolbarRenderConf);
                $scope.renderToolbar = function (n, r, s) {
                    var u = o(n);
                    if (u) {
                        if (angular.isFunction(n.prepareDataForTemplate)) {
                            n.prepareDataForTemplate(n, s, $scope);
                        }
                        return angular.element(u);
                    }
                    var $html = [], f = n.getActionSeparator();
                    for (var l = 0, c = null; c = r[l]; l++) {
                        c.withPreSeparator === !1 && r[l - 1] && r[l - 1].withSeparator !== !1 && $html.pop(), $html.push(menuRender(c, s));
                        if (c.withSeparator !== !1 && l < r.length - 1) {
                            var h = angular.isFunction(c.getActionSeparator) ? c.getActionSeparator() : f;
                            $html.push(h)
                        }
                    }
                    $html = $html.join("");
                    return angular.element($html)
                }
            }],
            link: function ($scope, $element, $attr) {
                function render(rawData) {
                    toolbarModel.setActionListOfBizStatusByRawData(rawData, toolbarModel.getActionListByBizStatus());
                    var modelBizStatus = toolbarModel.getModelBizStatus(rawData, $scope, $injector),
                        actions = toolbarModel.getActionListByBizStatus(modelBizStatus),
                        $html = $scope.renderToolbar(toolbarModel, actions, rawData);
                    $element.append($html);
                    $compile($element.contents())($scope)
                }

                var u = getToolBarModel($scope, modelFactory, $attr.bizType);
                if (!u) {
                    throw new Error("toolBarModel is needed for the toolbar directive");
                }
                var toolbarModel = modelDefineService.defToolbarModel(u.bizType, u);
                $scope.$watch("toolbarWatch", function (toolbarWatch) {
                    render($scope.rawData)
                })
            }
        }
    }]);
    commonModelDirectives.provider("actionRenderExtend", ["toolbarRenderConf", function (e) {
        var t = e.renders;
        return {
            extend: function (e, n) {
                var r = t[e];
                r || (t[e] = n)
            }, $get: function () {
                return s
            }
        }
    }]);
})
