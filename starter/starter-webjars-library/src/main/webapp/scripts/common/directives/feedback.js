define("common/directives/feedback", ["angular", "$directives", "$url"], function (angular, $directives, $url) {
    $url.setServerUrl("feedback", "/feedback")
    $directives.directive("feedback", ["$http", function ($http) {
        return {
            restrict: "AE",
            replace: true,
            scope: {server: "@"},
            templateUrl: $url.getTemplateUrl("scripts/common/views/feedback.html"),
            link: function ($scope, $element, $attr) {
                $scope.feedback = {};
                $scope.emailError = false;
                $scope.open = function () {
                    $scope.formPanel = true;
                    $scope.resultPanel = false;
                    $($element).addClass("active")
                }
                $scope.close = function () {
                    $scope.formPanel = false;
                    $scope.resultPanel = false;
                    $($element).removeClass("active");
                }
                $scope.checkContent = function () {
                    return !$scope.feedback.content || 400 - $scope.feedback.content.length > 0
                }
                $scope.checkEmail = function () {
                    var email = $scope.feedback.email;
                    if (email && /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email.toLowerCase())) {
                        $scope.emailError = false;
                    } else {
                        $scope.emailError = true;
                    }
                }
                $scope.postFeedback = function () {
                    var feedback = $scope.feedback,
                        data = {
                            params: {
                                content: feedback.content,
                                email: feedback.email,
                                url: window.location.href,
                                server: $scope.server
                            }
                        };
                    $http.jsonp($url.getServerUrl("feedback","/sdk/"), data);
                    $scope.formPanel = false;
                    $scope.resultPanel = true;
                    $scope.feedback = {}
                }
            }
        }
    }])

})
