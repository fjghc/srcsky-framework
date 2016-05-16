define("common/directives/table.fixed", ["$directives"], function ($directives) {
  $directives.directive("tableFixed", function () {
    return {
      restrict: "A",
      link: function (e, t, n) {
        function o() {
          i = t, r = t.parents("table.table");
          var n = r.css("margin-bottom") || "0px";
          r.siblings("table.table-fixed").length ? s = r.siblings("table.table-fixed") : (s = angular.element('<table  class="table table-fixed"></table>'), s.css({
            margin: "0px",
            "z-index": "99"
          })), i.appendTo(s), r.after(s), e.$on("$destroy", function () {
            s.remove(), r.css("margin-bottom", n)
          }), setTimeout(function () {
            l(), r.css("margin-bottom", i.outerHeight() + "px")
          }), angular.element(window).bind("resize", l), angular.element(window).bind("scroll", c)
        }

        function l() {
          i.find("td").eq(0).css("width", r.find("th").eq(0).outerWidth() + "px");
          var e = r.offset().top + r.outerHeight() + i.outerHeight() - 1, t = document.documentElement.clientHeight;
          e > t ? (s.css({width: r.outerWidth() + "px"}), a()) : (s.css({width: "100%"}), f())
        }

        function c(e) {
          var t = angular.element(window).scrollTop() < 0 ? 0 : angular.element(window).scrollTop(),
            n = r.offset().top + r.outerHeight() + i.outerHeight(),
            s = t + document.documentElement.clientHeight;
          n < s ? f() : a()
        }

        var r, i, s, u, a = function () {
          u = !0, s.css({position: "fixed", "margin-top": "0px", bottom: "0px"})
        }, f = function () {
          u = !1, s.css({position: "relative", "margin-top": -i.outerHeight() - 1, bottom: "auto"})
        };
        o(), e.$on("$destroy", function () {
          angular.element(window).unbind("resize", l), angular.element(window).unbind("scroll", c)
        })
      }
    }
  })
})
