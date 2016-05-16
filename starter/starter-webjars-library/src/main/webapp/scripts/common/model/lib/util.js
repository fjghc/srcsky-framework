define("common/model/lib/util", [""], function () {
  function e(t, n, r) {
    var i, s = Object.prototype.toString, o = "[object Array]";
    t = t || {};
    for (i in n)r ? typeof n[i] == "object" ? (t[i] = s.call(n[i]) === o ? [] : {}, e(t[i], n[i], r)) : t[i] = n[i] : n.hasOwnProperty(i) && (typeof n[i] == "object" ? (t[i] = s.call(n[i]) === o ? [] : {}, e(t[i], n[i])) : t[i] = n[i]);
    return t
  }

  function t(t, n) {
    function r() {
    }

    r.prototype = n.prototype;
    var i = new r;
    return t.prototype = e(i, t.prototype), t.prototype.constructor = t, t._parent = i, t
  }

  return {deepClone: e, inherit: t}
})
