define("$topic", ["angular", "$services"], function (angular, $services) {
    var $topic = {};
    $services.run(["$rootScope", "$q", function ($rootScope, $q) {
        $topic.publish = function (event, data, deferred) {
            if (deferred === true) {
                var defer = $q.defer();
                if (angular.isString(data)) {
                    data = {message: data, deferred: defer};
                } else {
                    data.deferred = defer;
                }
                $rootScope.$emit(event, data);
                return defer.promise;
            }
            $rootScope.$emit(event, data);
        };
        $topic.subscribe = function (event, callback) {
            return $rootScope.$on(event, callback)
        };
    }])
    $services.factory("$topic", ["$rootScope", "$q", function ($rootScope, $q) {
        return $topic
    }]);
    return $topic;
});
define("common/services/topic", ["$topic"], function ($topic) {
    return $topic;
})
