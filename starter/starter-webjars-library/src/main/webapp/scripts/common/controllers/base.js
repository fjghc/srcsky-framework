//=========================================================================
//============================= NEW 2015-12-27 ============================
//=========================================================================
define("$controllers", ["angular", "common/model/model.system.base.controller"], function (angular, baseController) {
    var $controllers = angular.module("$controllers", []);
    $controllers.controller = baseController.wrapController($controllers);
    return $controllers;
})

define("common/controllers/base", ["$controllers"], function ($controllers) {
    return $controllers;
})

