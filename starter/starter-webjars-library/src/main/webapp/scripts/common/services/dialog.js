define("common/services/dialog", ["angular", "$services", "./i18n", "$url"], function (angular, $services, i18n, $url) {
    var message = i18n.get("common");
    $services.provider("$dialogConfig", function () {
        var dialogConfig = {
            defaultButtonConfig: [
                {result: true, label: message.text("confirm"), cssClass: "btn-primary"},
                {result: false, label: message.text("cancel"), cssClass: "btn-default"}
            ]
        };
        return {
            setButtonLabels: function (t) {
                angular.forEach(dialogConfig.defaultButtonConfig, function (value, index) {
                    value.label = t[index]
                })
            }, setProviderOptions: function (config) {
                angular.extend(dialogConfig, config)
            }, $get: function () {
                return dialogConfig
            }
        }
    });
    function dialogService($rootScope, $modal, $config, growl) {
        var open = function ($option) {
            return $modal.open(angular.extend({backdrop: "static", animation: true}, $option))
        };

        function showDialogByUrl(url, callback, option) {
            var dialog, onChange, options = angular.extend({
                templateUrl: url,
                resolve: {
                    passedObject: function () {
                        return option
                    }
                },
                controller: ["$scope", "$uibModalInstance", "$stack", "passedObject", function ($scope, $instance, $stack, passedObject) {
                    var onChange = $scope.$on("$locationChangeSuccess", function () {
                        if (dialog && $scope._dialogShow == true) {
                            $scope.close(false)
                        }
                    });
                    var icon = "icon-warning-2";
                    var color = "text-warning";
                    if (passedObject != undefined && passedObject.iconClass) {
                        icon = passedObject.iconClass
                    }
                    if (passedObject != undefined && passedObject.iconColor) {
                        color = passedObject.iconColor
                    }
                    $scope.iconClass = icon + " " + color;
                    if ($scope._passedObject = passedObject) {
                        $scope._dialogShow = true
                    }
                    $scope.close = function (result) {
                        $scope._dialogShow = false;
                        $instance.close(result);
                        dialog = null
                    }
                    $scope.$dHide = function () {
                        $stack.getTop().value.modalDomEl.hide();
                    }
                    $scope.$dShow = function () {
                        $stack.getTop().value.modalDomEl.show();
                    }
                    if (angular.isFunction(callback)) {
                        callback($scope)
                    }
                }]
            }, !angular.isFunction(callback) ? callback : option);
            dialog = open(options);

            var a = function (e) {
                onChange && onChange();
                return e
            };
            dialog.result.then(function (e) {
                return a(e)
            }, function (e) {
                return a(e)
            })
            return dialog;
        };
        function showMessageDialog($option, $callback, $passedObject) {
            // option, callback, data
            $callback = $callback || $option.callback;
            function callback($scope) {
                $scope.title = $option.title;
                $scope.message = $option.message;
                $scope.buttons = $option.buttons || $config.defaultButtonConfig;
                $scope.eventHandler = function (result) {
                    $scope.close(result)
                };
                if (angular.isFunction($callback)) {
                    $callback($scope)
                }
            };
            return showDialogByUrl($url.getTemplateUrl("scripts/common/views/message.html"), callback, $passedObject || $option.passedObject)
        }

        function showMessageDialogSimple(e, t, n, passedObject) {
            return showMessageDialog({title: e, message: t, buttons: n, passedObject: passedObject})
        };
        return {
            show: open,
            showUrl: showDialogByUrl,
            showMessage: showMessageDialog,
            showMessageSimple: showMessageDialogSimple,
            growl: growl
        };
    }

    dialogService.$inject = ["$rootScope", "$uibModal", "$dialogConfig", "growl"]
    $services.factory("$dialog", dialogService);
})
