//=========================================================================
//============================= NEW 2015-12-27 ============================
//=========================================================================
define("common/directives/compile", ["$app", "$directives"], function ($app, $directives) {
    $directives.directive("compile", ["$compile", function ($compile) {
        return function ($socpe, $element, $attr) {
            var i = $socpe.$watch(function (scope) {
                return scope.$eval($attr.compile)
            }, function (html) {
                $element.html(html);
                $compile($element.contents())($socpe);
            })
        }
    }])
})
