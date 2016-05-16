/*!
 * AngularJS
 * Directives truncateText
 * Service    truncateTextConfig
 * zhanggj@powerlong.com - 于 2015-12-30 日翻译
 */
define("common/directives/truncate.text", ["angular", "$directives", "./uib.tooltip.diy"], function (angular, $directives) {

    function n(e) {
        return angular.element("<div/>").html(e).text()
    }

    function r(e) {
        return angular.element("<div/>").text(e).html()
    }

    $directives.provider("truncateTextConfig", function () {
        var e = {copyText: !1, textLength: 12};
        return {
            config: function (t) {
                t && (e.copyText = t.copyText, e.textLength = t.textLength)
            }, $get: function () {
                return e
            }
        }
    });
    $directives.directive("truncateText", ["$compile", "$sanitize", "truncateTextConfig", function ($compile, $sanitize, $config) {
        return {
            restrict: "A",
            link: function (scope, element, attr) {
                var u = attr.textLength || 12;
                attr.textLength || (u = $config.textLength);
                var a = attr.copyText || false;
                if (a != 1 && a != "true") {
                    var f = $config.copyText;
                    a = f
                }
                var l = attr.trigger || "mouseenter", c = attr.tooltipPlacement || "top";
                attr.$observe("sourceText", function (i) {
                    if (i) {
                        i = i.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        var o = n(i);
                        if (o.length > u) {
                            var f = o.substr(0, u);
                            f.length < o.length && (f += "..."),
                                f = r(f), i = i.replace(/["]/g, "&quot;");
                            if (a) {
                                element.html('<span tooltip-trigger="' + l + '" tooltip-placement="' + c + '"  uib-tooltip-diy="' + i + '" content-html="false">' + f + "</span>")
                            } else {
                                element.html('<span tooltip-trigger="' + l + '" tooltip-placement="' + c + '"  uib-tooltip-diy="' + i + '" tooltip-append-to-body="true"  ng-class="{in: isOpen(), fade: animation()}">' + f + "</span>")
                            }
                            $compile(element.contents())(scope);
                        } else {
                            element.text(o)
                        }
                    }
                })
            }
        }
    }])
})
