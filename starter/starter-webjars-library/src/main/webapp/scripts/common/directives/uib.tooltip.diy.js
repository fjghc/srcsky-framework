/*
 * AngularJS
 * Directives uibTooltipDiy uibTooltipDiyPopup
 * 重写
 * zhanggj@powerlong.com - 于 2015-12-30 日翻译
 */
define("common/directives/uib.tooltip.diy", ["angular", "$directives","$url"], function (angular, $directives,$url) {
    $directives.directive('uibTooltipDiy', ["$uibTooltip", function ($uibTooltip) {
        return $uibTooltip("uibTooltipDiy", "tooltip", "mouseenter");
    }]);
    $directives.directive("uibTooltipDiyPopup", [function () {
        return {
            restrict: "EA", replace: !0, scope: {content: "@", placement: "@", animation: "&", isOpen: "&"},
            templateUrl: $url.getTemplateUrl("scripts/common/views/uib.tooltip.diy.html")
        }
    }]);

})
