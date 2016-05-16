define("$url", ["angular", "$helpers"], function (angular, $helpers) {
    var url = {}, templateUrl = "", serverUrls = {}, params = {};

    function getParams() {
        var queryString = window.location.search.substring(1);
        if (!queryString) {
            return {};
        } else if (params[queryString]) {
            return params[queryString];
        } else {
            params[queryString] = {};
            angular.forEach(queryString.split("&"), function (value) {
                var values = value.split("=");
                if (values.length > 1) {
                    params[queryString][values[0]] = values[1];
                }
            })
            return params[queryString]
        }
    }

    url.get = function (field) {
        return getParams()[field];
    }
    url.base = function (path) {
        return "http://" + location.host + path;
    }
    // 是否跨域
    url.isCrossDomain = function (url) {
        return (url.indexOf("http") != -1 && url.indexOf(location.host) == -1) ? true : false;
    }
    url.setServerUrl = function (server, _url) {
        if (_url.indexOf("http://") == -1) {
            serverUrls[server] = url.base(_url);
        } else {
            serverUrls[server] = _url;
        }
    }
    url.getServerUrl = function (server, url) {
        if (!serverUrls[server]) {
            throw new Error("未配置 " + server + " $url.getServerUrl！");
        }
        return !url ? serverUrls[server] : serverUrls[server] + url;
    }
    url.setTemplateUrl = function (url) {
        templateUrl = url;
    }
    url.getTemplateUrl = function (url) {
        return templateUrl + url;
    }
    $helpers.constant("$url", url);
    $helpers.run(["$rootScope", function ($rootScope) {
        $rootScope.$url = url;
    }])
    return url;
});
define("common/support/url", ["$url"], function ($url) {
    return $url;
})
