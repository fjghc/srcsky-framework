define("common/directives/table.search", ["angular", "$directives", "../support/constants","$url"], function (angular, $directives, constants,$url) {
    $directives.directive("tableSearch", function () {
        return {
            restrict: "AM",
            scope: {initAction: "&", clickAction: "&", preSelectedId: "=", items: "=", selectItem: "=?"},
            replace: !1,
            templateUrl:  $url.getTemplateUrl("scripts/common/views/table.search.html"),
            transclude: !0,
            link: function (e, n, r) {
                var i = r.filterField;
                e.spmPrefix = r.spmPrefix || 67, e.$watch("items", function (n) {
                    n && angular.isArray(n) && (e.showDropdown = e.items.length > 1 ? !0 : !1, e.selectItem = e.items[0], angular.isFunction(e.initAction) && e.initAction({data: e.items}))
                }), e.$watch("selectItem", function (n) {
                    n == undefined && angular.isArray(e.items) && (e.selectItem = e.items[0])
                }), e.$watch("preSelectedId", function (n) {
                    if (!angular.isArray(e.items))return;
                    if (n == undefined) {
                        e.selectItem = e.items[0];
                        return
                    }
                    angular.forEach(e.items, function (t) {
                        t.id == n && (e.selectItem = t)
                    })
                }), e.search = function (n) {
                    e.selectItem = n, angular.isFunction(e.clickAction) && (i != undefined ? e.clickAction({data: {item: n, filterField: i}}) : e.clickAction({data: n}))
                }
            }
        }
    })
})
