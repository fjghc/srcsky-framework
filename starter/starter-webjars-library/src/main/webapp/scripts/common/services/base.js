//=========================================================================
//============================= NEW =======================================
//=========================================================================
define("$services", ["angular"], function (angular) {
    return angular.module("$services", []);
})
define("common/services/base", ["$services"], function ($services) {
    return $services;
})
