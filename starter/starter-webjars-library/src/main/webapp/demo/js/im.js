/*!
 * AngularJS
 * Test grid
 * zhanggj@powerlong.com - 于 2016-01-28 日编写
 */
/**
 * Require Config
 */
require.config({baseUrl: "/scripts/", urlArgs: "_=" + new Date().getTime()});
/**
 * Grid 控件 依赖模块引入
 */
define("angular", function () {
    return angular;
});
define("jquery", function () {
    return jQuery;
});

require([
    "angular",
    "common/bootstrap",
    "im/bootstrap",
], function (angular) {
    angular.bootstrap(document, ["app"])
});