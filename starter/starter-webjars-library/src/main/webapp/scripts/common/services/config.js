//=========================================================================
//============================= NEW 2016-01-29 ============================
//=========================================================================
define("$config", ["angular", "$services", "$string", "$url"], function (angular, $services, $request, $string, $url) {
   /* $services.provider('$config', function () {
        var option = {
            user: "/user/"
        };
        return {
            setServerUrl: function (server, url) {
                if (!option.hasOwnProperty(module)) {
                    option[module] = url;
                }
            },
            $get: function () {
                return {
                    getServerUrl: function (server, url) {
                        return option[module];
                    }
                }
            }
        }
    });
    $services.config(["$configProvider", function ($config) {
        for (var i in $config) {
            alert(i);
        }
    }]);*/
    //$services.constant("$config", $config);
    $services.run(["$rootScope", function ($rootScope) {
    }])
});
define("common/services/config", ["$config"], function ($config) {
    return $config;
});