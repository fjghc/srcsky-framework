//=========================================================================
//============================= NEW 2015-12-27 ============================
//=========================================================================
define("common/support/array", [], function () {
    var ap = Array.prototype;
    if (!ap.forEach) {
        ap.forEach = function (e, t) {
            var n, r;
            if (this == null)throw new TypeError(" this is null or not defined");
            var i = Object(this), s = i.length >>> 0;
            if (typeof e != "function")throw new TypeError(e + " is not a function");
            arguments.length > 1 && (n = t), r = 0;
            while (r < s) {
                var o;
                r in i && (o = i[r], e.call(n, o, r, i)), r++
            }
        }
    }
    if (!ap.filter) {
        ap.filter = function (e) {
            "use strict";
            if (this === void 0 || this === null)throw new TypeError;
            var t = Object(this), n = t.length >>> 0;
            if (typeof e != "function")throw new TypeError;
            var r = [], i = arguments.length >= 2 ? arguments[1] : void 0;
            for (var s = 0; s < n; s++)if (s in t) {
                var o = t[s];
                e.call(i, o, s, t) && r.push(o)
            }
            return r
        }
    }
    if (!ap.every) {
        ap.every = function (e, t) {
            "use strict";
            var n, r;
            if (this == null)throw new TypeError("this is null or not defined");
            var i = Object(this), s = i.length >>> 0;
            if (typeof e != "function")throw new TypeError;
            arguments.length > 1 && (n = t), r = 0;
            while (r < s) {
                var o;
                if (r in i) {
                    o = i[r];
                    var u = e.call(n, o, r, i);
                    if (!u)return !1
                }
                r++
            }
            return !0
        }
    }
    if (!ap.map) {
        ap.map = function (callback, thisArg) {
            var T, A, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            // 1. 将O赋值为调用map方法的数组.
            var O = Object(this);
            // 2.将len赋值为数组O的长度.
            var len = O.length >>> 0;
            // 4.如果callback不是函数,则抛出TypeError异常.
            if ({}.toString.call(callback) != "[object Function]") {
                throw new TypeError(callback + " is not a function");
            }
            // 5. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
            if (thisArg) {
                T = thisArg;
            }
            // 6. 创建新数组A,长度为原数组O长度len
            A = new Array(len);
            // 7. 将k赋值为0
            k = 0;
            // 8. 当 k < len 时,执行循环.
            while (k < len) {
                var kValue, mappedValue;
                //遍历O,k为原数组索引
                if (k in O) {
                    //kValue为索引k对应的值.
                    kValue = O[k];
                    // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
                    mappedValue = callback.call(T, kValue, k, O);
                    // 返回值添加到新数组A中.
                    A[k] = mappedValue;
                }
                // k自增1
                k++;
            }
            // 9. 返回新数组A
            return A;
        };
    }
    if (!ap.some) {
        ap.some = function (e) {
            "use strict";
            if (this == null)throw new TypeError("Array.prototype.some called on null or undefined");
            if (typeof e != "function")throw new TypeError;
            var t = Object(this), n = t.length >>> 0, r = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < n; i++)if (i in t && e.call(r, t[i], i, t))return !0;
            return !1
        }
    }
    if (!ap.indexOf) {
        ap.indexOf = function (e, t) {
            for (var n = t || 0, r = this.length; n < r; n++)if (this[n] === e)return n;
            return -1
        }
    }
    if (!ap.remove) {
        ap.remove = function (dx) {
            if (isNaN(dx) || dx > this.length) {
                return false;
            }
            for (var i = 0, n = 0; i < this.length; i++) {
                if (this[i] != this[dx]) {
                    this[n++] = this[i]
                }
            }
            this.length -= 1
        }
    }
    if (!ap.in) {
        ap.in = function (field, value) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][field] && this[i][field] == value) {
                    return true;
                }
            }
            return false;
        }
    }
})
