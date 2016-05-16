define("$model.directives", ["angular", "common/model/model.system.base.controller"], function (angular, baseController) {
    var commonModelDirectives = angular.module("$model.directives", ["$model"]);
    commonModelDirectives.controller = baseController.wrapController(commonModelDirectives);
    return commonModelDirectives
})

define("common/model/directives/base", ["$model.directives"], function ($modelDirectives) {
    return $modelDirectives
})
