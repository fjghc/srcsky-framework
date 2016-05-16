define("$data", [], function () {
    function getTimestamp() {
        return new Date().getTime();
    }

    function encode(value) {
        return encodeURIComponent(value);
    }

    function serialize(e) {
        var t = "", r, i, s, o, u, a, f;
        for (r in e) {
            i = e[r];
            if (i instanceof Array) {
                for (f = 0; f < i.length; ++f) {
                    u = i[f],
                        a = {},
                        a[r] = u,
                        t += serialize(a) + "&";
                }
            } else if (i instanceof Object) {
                for (o in i) {
                    u = i[o], s = r + "[" + o + "]",
                        a = {}, a[s] = u,
                        t += serialize(a) + "&";
                }
            } else if (i !== undefined && i !== null) {
                t += encodeURIComponent(r) + "=" + encodeURIComponent(i) + "&";
            }
        }
        return t.length ? t.substr(0, t.length - 1) : t
    }

    return {
        serialize: serialize, encode: encode, getTimestamp: getTimestamp, emptyFun: function () {
        }
    };
})
define("common/support/data", ["$data"], function ($data) {
    return $data;
})
