define("common/helper/util", ["angular"], function () {
  function deepClone(dest, source, deep) {
    var toString = Object.prototype.toString, arrayString = "[object Array]";
    for (var i in source) {
      if (deep || source.hasOwnProperty(i)) {
        if (typeof source[i] == "object") {
          if (toString.call(source[i]) === arrayString) {
            dest[i] = [];
          } else {
            dest[i] = {};
          }
          deepClone(dest[i], source[i]);
        } else {
          dest[i] = source[i];
        }
      }
    }
    return dest;
  }

  function inherit(dest, source) {
    function obj() {
    }

    obj.prototype = source.prototype;
    var i = new obj();
    dest.prototype = deepClone(i, dest.prototype);
    dest.prototype.constructor = dest;
    dest._parent = i;
    return dest;
  }

  return {deepClone: deepClone, inherit: inherit};
});
