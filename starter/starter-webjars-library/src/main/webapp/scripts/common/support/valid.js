define("$valid", ["$string"], function ($string) {
    function isGet(option) {
        return $string.equals(option, 'get') || $string.equals(option.method, 'get');
    }

    function isPost(option) {
        return $string.equals(option, 'post') || $string.equals(option.method, 'post');
    }

    return {isGet: isGet, isPost: isPost};
})

define("common/support/valid", ["$valid"], function ($valid) {
    return $valid;
})
