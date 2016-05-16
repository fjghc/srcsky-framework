//=========================================================================
//============================= NEW 2015-12-27 ============================
//=========================================================================
define("common/support/object", [], function () {
  if (typeof String.prototype.trim != "function") {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, "")
    }
  }
  if (!Object.keys) {
    Object.keys = (function () {
      var e = Object.prototype.hasOwnProperty,
        t = !{toString: null}.propertyIsEnumerable("toString"),
        n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        r = n.length;
      return function (i) {
        if (typeof i == "object" || typeof i == "function" && i !== null) {
          var s = [], o, u;
          for (o in i)e.call(i, o) && s.push(o);
          if (t)for (u = 0; u < r; u++)e.call(i, n[u]) && s.push(n[u]);
          return s
        }
        throw new TypeError("Object.keys called on non-object")
      }
    })()
  }
})
