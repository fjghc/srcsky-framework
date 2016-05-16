define("common/model/directives/inline.command", ["angular", "./base", "../../support/response"], function (angular, commonModelDirectives, response) {
    commonModelDirectives.directive("inlineCommand", ["$compile", "$injector", "modelFactory", "$dialog", function ($compile, $injector, modelFactory, $dialog) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attr) {
                $element.on("click", function (event) {
                    event.preventDefault();
                    var bizType = $attr.bizType, action = $attr.action, itemField = $attr.itemField;
                    if (!bizType || !action | !itemField) {
                        $dialog.showMessage({
                            title: "错误提示",
                            message: "属性未配置 biz-type、action、item-field",
                            passedObject: {iconClass: "icon-no-2"}
                        });
                        return;
                    }
                    $scope.keyField = $attr.keyField || "";
                    var selectedItems = $scope[itemField],
                        bizModel = modelFactory.getModel(bizType, "BizModel"),
                        bizAction = bizModel.bizActions[action];
                    if (!bizAction) {
                        $dialog.showMessage({
                            title: "错误提示",
                            message: bizType + "BizModel 未定义",
                            passedObject: {iconClass: "icon-no-2"}
                        });
                        return;
                    }

                    bizAction.afterActionExecuted = function (data) {
                        $scope.$emit(bizType + ":actionExecuted", action, data)
                    };
                    var option = {
                        title: bizAction.title || bizAction.name + bizModel.bizName,
                        message: bizAction.getConfirmMsg(selectedItems, $scope)
                    };

                    function execute($scope) {
                        var params = {method: (bizAction.requestMethod || "POST").toUpperCase()},
                            data = bizAction.getActionParam(selectedItems, $scope);
                        params = angular.extend(params, data);
                        if (angular.isFunction(bizAction.handler)) {
                            bizAction.handler(params, function (e) {
                                bizAction.afterActionExecuted(e)
                            })
                        } else {
                            bizModel.bizService[bizAction.handler](params).then(function (e) {
                                var data = response.preHandler(e, $injector, true);
                                bizAction.afterActionExecuted(data)
                            })
                        }
                    }

                    if (option.message != undefined) {
                        $dialog.showMessage(option, function ($scope) {
                            $scope.bizInfo = bizModel;
                            $scope.eventHandler = function (isOk) {
                                if (isOk) {
                                    execute();
                                }
                                $scope.close()
                            }
                        }, {})
                    } else {
                        execute();
                    }
                })
            }
        }
    }])
})
