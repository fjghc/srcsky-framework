define("$string", function () {
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    function equals(source, target) {
        if (!source || !target) {
            return false;
        } else {
            return $.trim(source).toUpperCase() == $.trim(target).toUpperCase();
        }
    }

    function trim(value) {
        return value == null ? "" : ( value + "" ).replace(rtrim, "")
    }

    function isEmpty(value) {
        return !value || $.trim(value) == "";
    }

    function format() {
        var args = arguments;
        if (args[0]) {
            return args[0].replace(/\{\{|\}\}|\{(\d+)\}/g, function (word, index) {
                if (word == "{{") {
                    return "{";
                }
                if (word == "}}") {
                    return "}";
                }
                index = parseInt(index, 10) + 1;
                return args[index] ? args[index] : word;
            })
        }
    }

    function startWith(source, target) {
        if (target == null || target == "" || source.length == 0 || target.length > source.length)
            return false;
        if (source.substr(0, target.length) == target)
            return true;
        else
            return false;
        return true;
    }

    function endWith(source,target) {
        if (target == null || target == "" || source.length == 0 || target.length > source.length)
            return false;
        if (source.substring(source.length - target.length) == target)
            return true;
        else
            return false;
        return true;
    }

    return {trim: trim, equals: equals, isEmpty: isEmpty, format: format,startWith:startWith,endWith:endWith};
})
define("common/support/string", ["$string"], function ($string) {
    return $string;
})
