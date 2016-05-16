//=========================================================================
//============================= NEW 2016-01-03 ============================
//=========================================================================
define("$model", ["angular"], function (angular) {
    var commonModel = angular.module("$model",[]);
    commonModel.constant("commonModelConfig", {
        bizTypes: [],
        modelTypes: [],
        moduleModel: {},
        pageModel: {},
        bizComponentModel: {},
        bizModel: {},
        formModel: {},
        gridModel: {},
        toolBarModel: {}
    }).provider("commonModelConfigSetting", ["commonModelConfig", function (config) {
        var _config = config;
        return {
            setProviderOptions: function (options) {
                angular.extend(_config, options)
            }, setBizTypes: function (t) {
                _config && angular.isArray(t) && (_config.bizTypes = t)
            }, setModelTypes: function (t) {
                _config && e.isArray(t) && (_config.modelTypes = t)
            }, $get: function () {
                return _config
            }
        }
    }]);
    commonModel.run(["controllerInheritService", function (controllerInheritService) {
        controllerInheritService.init()
    }]);
    return commonModel
})
define("common/model/base", ["$model"], function ($model) {
    return $model
})
