//=========================================================================
//============================= NEW 2015-12-27 ============================
//=========================================================================
define("$directives", ["angular"], function (angular) {
    return angular.module("$directives", []);
})
define("common/directives/base", ["$directives"], function ($directives) {
    return $directives;
})