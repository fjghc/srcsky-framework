define("common/directives/customized.content", ["angular", "$directives"], function (angular, $directives) {
    $directives.directive("customizedContent", ["$rootScope", function () {
        return {restrict: "A", scope: {}, template: e.getTranscludedHtml()}
    }])
})
