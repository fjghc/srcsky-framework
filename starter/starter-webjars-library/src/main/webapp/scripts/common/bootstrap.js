/**
 * 基础 module、所有module均衍生自该 module
 */
define("$app", ["angular", "common/support/import", "common/directives/import", "common/services/import", "common/controllers/import", "common/model/import"/*, "common/states/import"*/], function (angular) {
    return angular.module("$app", [
        "ngAnimate",
        "ngSanitize",
        "pasvaz.bindonce",
        "ui.bootstrap",
        "angular-growl",
        "ui.router",
        "ngWebSocket",
        "jQueryScrollbar",
        "$model",
        "$model.directives",
        "$helpers",
        "$directives",
        "$services",
        "$controllers"
        /*,"commonStates"*/
    ]);
});

define("common/bootstrap", ["$app"], function (app) {
    return app;
});