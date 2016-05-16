define("common/directives/number.range", ["angular", "$directives"], function (angular, $directives) {
  $directives.directive("numberRange", function () {
    return {
      require: "ngModel", link: function (scope, element, attr, ngCtrl) {
        var valueMin = attr.valueMin * 1 || 0;
        var valueMax = attr.valueMax * 1 || Number.MAX_VALUE;
        var rangeEnabled = attr.rangeEnabled || true;
        attr.$observe("valueMin", function (e) {
          valueMin = attr.valueMin * 1 || 0
        });
        attr.$observe("valueMax", function (e) {
          valueMax = attr.valueMax * 1 || Number.MAX_VALUE
        });
        ngCtrl.$parsers.push(function (e) {
          if (e == undefined)return "";
          var value;
          if (typeof e == "string") {
            var n = "";
            if (/^-\d*/g.test(e)) {
              n = "-"
            }
            value = n + e.replace(/[^0-9]/g, "");
            if (value != e) {
              ngCtrl.$setViewValue(value), ngCtrl.$render()
            }
          }
          var u = true;
          var result = value;
          if (value !== "-") {
            value = value && parseInt(value, 10);
            if (rangeEnabled && value !== "" && (value < valueMin || value > valueMax)) {
              u = false;
            }
          } else {
            u = false;
          }
          ngCtrl.$setValidity("numberRange", u);
          return result
        })
      }
    }
  })
})
