//=========================================================================
//============================= NEW 2016-01-29 ============================
//=========================================================================
define("common/services/request", ["angular", "$services", "./topic", "$constants", "$data", "$valid", "$url"], function (angular, $services, $topic, $constants, $data, $valid, $url) {
    var response = $constants.response, event = $constants.event;
    $services.config(["$provide", function ($provide) {
        $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
            return function (t, n) {
                $delegate(t, n);
                console.log(t.message || t);
            }
        }]);
    }]);
    $services.factory("requestWrapper", ["$http", function ($http) {
        function sendRequest($option) {
            var option = angular.extend({}, {method: "GET"}, $option),
                method = option.method.toUpperCase();
            if (method == "POST") {
                option.headers = option.headers || {};
                option.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
                if (undefined == option.data && option.params) {
                    option.data = $data.serialize(option.params);
                    delete option.params;
                } else {
                    option.data = $data.serialize(option.data);
                }
            } else if (method == "GET") {
                option.params = option.params || {}
                option.params.timestamp = $data.getTimestamp();
            }

            var result = $http(option);
            if (angular.isFunction(option.dataFormatter)) {
                result.then(function (result) {
                    return option.dataFormatter.apply(null, [result])
                });
            }
            return result;
        }

        function sendRequestWithUrl(url, option) {
            return sendRequest(angular.extend(option || {}, {url: url}));
        }

        return {sendRequest: sendRequest, sendRequestWithUrl: sendRequestWithUrl}
    }])
    $services.constant("requestConf", {
        linkHandler: function (e) {
            return e
        },
        httpOptionInterceptor: function (e) {
            return e
        },
        httpOptionWrapper: function (e) {
            return e
        },
        httpResponseInterceptor: function (e) {
            return e
        },
        responseSuccessCode: response.success,
        responseErrorCode: response.error,
        sessionTimeoutCode: response.sessionTimeout,
        enableSessionTimeout: true,
        enableShowError: true,
        sessionTimeoutLink: "",
        sessionTimeoutNeedCallbackFunc: true,
        labels: {SESSION_TIMEOUT1: "您当前的会话已超时，请", SESSION_TIMEOUT2: "重新登录", RESPONSE_ERROR: "当前请求失败，建议您刷新页面或者稍后重试。"}
    });
    $services.provider("requestConfSetting", ["requestConf", function (requestConf) {
        var conf = requestConf;
        return {
            setProviderOptions: function (t) {
                angular.extend(conf, t)
            }, setGlobalLabels: function (labels) {
                conf && (conf.labels = labels)
            }, $get: function () {
                return conf
            }
        }
    }])
    $services.factory("requestInterceptor", ["$q", "$rootScope", "requestConfSetting", "$injector", function ($q, $rootScope, setting, $injector) {
        return {
            response: function (response) {
                var data = response.data;
                if (setting.enableSessionTimeout && data.code == setting.sessionTimeoutCode) {
                    response.ignoreErrorHandler = true;
                    $rootScope.$emit(event.sessionTimeout, response);
                    return $q.reject(response);
                } else {
                    if (setting.enableShowError && data.code == setting.responseErrorCode) {
                        $topic.publish(event.showResponseErrorMessage, data.data.path + " -> " + data.data.message, false);
                        response.ignoreErrorHandler = true;
                        return $q.reject(response);
                    } else if (setting.httpResponseInterceptor(response, $injector) === false) {
                        return $q.reject(response);
                    }
                }
                return response || $q.when(response);
            },
            requestError: function (error) {
                console.log("request error: " + error);
                return $q.reject(error)
            },
            responseError: function (error) {
                console.log("response error: ", error);
                return $q.reject(error)
            }
        }
    }]);
    $services.factory("$request", ["$q", "requestWrapper", "growl", "requestConfSetting", function ($q, requestWrapper, growl, setting) {
        function request(url, option) {
            option = option || {};
            var url = setting.linkHandler(url);
            if ($valid.isPost(option)) {
                if (undefined == option.data) {
                    option.data = {};
                }
                setting.httpOptionInterceptor(option);
            }
            if (option.submitMessage) {
                growl.addSuccessMessage(option.submitMessage);
            }
            setting.httpOptionWrapper(option);
            var result = requestWrapper.sendRequestWithUrl(url, option);
            result.then(function success(result) {
                var data = result.data, config = data.config;
                if (config) {
                    if (config.successMessage != undefined) {
                        growl.addSuccessMessage(config.successMessage);
                    } else if (config.errorMessage != undefined) {
                        growl.addErrorMessage(config.errorMessage);
                    }
                }
                return result;
            }, function error(result) {
                if (option.ignoreErrorHandler) {
                    return $q.reject(result);
                } else {
                    if (!result.ignoreErrorHandler) {
                        $topic.publish(event.showResponseErrorMessage, "当前请求失败，建议您刷新页面或者稍后重试。");
                    }
                    return $q.reject(result);
                }
            });
            return result;
        }

        request.wrap = function (server, url, data) {
            var api = $url.getServerUrl(server, url), params = {method: "get"};
            if (!data) {
                data = {};
            }
            if (data.method) {
                params.method = data.method;
            }
            params.method = params.method.toUpperCase();
            if ($url.isCrossDomain(api)) {
                // 跨域使用JSONP
                params.method = "jsonp";
                params.params = data;
                params.params.jsonp_callback = "JSON_CALLBACK";
            } else {
                if (params.method == "POST") {
                    params.data = data;
                } else {
                    params.params = data;
                }
            }
            return request(api, params);
        }
        return request;
    }])
    $services.config(["growlProvider", "$compileProvider", "$tooltipProvider", function (growl, $compile, $tooltip) {
        growl.onlyUniqueMessages(true);
        growl.globalTimeToLive(3000);
        growl.globalEnableHtml(true);
        $compile.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
        $tooltip.options({animation: true})
    }]);
    $services.config(["$httpProvider", function ($http) {
        $http.interceptors.push("requestInterceptor")
    }]);

    $services.run(["$rootScope", "$state", "$stateParams", "$dialog", "requestConfSetting", function ($rootScope, $state, $stateParams, $dialog, setting) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on("$stateChangeSuccess", function (e, t, n, r, i) {
        });
        $rootScope.$on("$stateChangeError", function (e, t, n, r, i, s) {
            console.log("ERROR " + s + " . From state: " + r.name + " to state: " + t.name)
        });
        $rootScope.$on(event.sessionTimeout, function (evt, $result) {
            var url = $result.data.data._srk_ + "?_srk_=" + $data.encode(location.href);
            var message = "您当前的会话已超时，请<a href='" + url + "'>重新登录</a>。";
            if (!$rootScope.sessionTimeout) {
                $rootScope.sessionTimeout = true;
                setTimeout(function () {
                    var result = $topic.publish(event.showResponseErrorMessage, message, true);
                    result.then(function (result) {
                        if (result.result) {
                            window.location = url;
                        }
                    })
                }, 0);
            }
        });
        $topic.subscribe(event.showResponseErrorMessage, function (event, data) {
            var data = angular.isString(data) ? {message: data} : data;
            if (!data.message) {
                if (data.data && data.data.message) {
                    data.message = data.data.message;
                } else {
                    data.message = setting.defaultErrorMsg;
                }
            }
            var dialog = $dialog.showMessageSimple("错误提示", data.message, [{
                result: true,
                label: "确定",
                cssClass: "btn btn-primary"
            }], {iconClass: "icon-no-2"}, data);

            function callback(deferred, result) {
                deferred && deferred.resolve({result: result, option: data});
            }

            dialog.result.then(function (result) {
                callback(data.deferred, result);
            }, function (result) {
                callback(data.deferred, result);
            })
        });
    }]);
})
