//=========================================================================
//============================= NEW 2016-01-29 ============================
//=========================================================================
define("$user", ["angular", "$services", "$url", "$string"], function (angular, $services, $url, $string) {
    $url.setServerUrl("user", "/user");
    var $account = {
        id: "",
        name: "",
        head: "styles/img/user/head_default.png",
        email: "",
        sex: "",
        project: "",
        login: false
    }
    $services.service("$user", ["$request", "$url", function ($request, $url) {
        /**
         * 检测用户是否登录
         */
        function check($callback) {
            return $request.wrap("user", "/sdk/check").success(function ($result) {
                if ($result.success) {
                    var data = $result.data;
                    $account.id = data.id;
                    $account.name = data.name;
                    $account.project = data.project;
                    $account.email = data.email;
                    if (!$string.isEmpty(data.head)) {
                        $account.head = data.head;
                    }
                    $account.login = true;
                } else {
                    $account.login = false;
                }
                if (angular.isFunction($callback)) {
                    $callback($account.login);
                }
            });
        }

        /**
         * ID 查找用户
         * @param id
         * @param $callback
         * @returns {*}
         */
        function id(id, $callback) {
            return $request.wrap("user", "/sdk/user/" + id).success($callback);
        }

        // username、email、mobile、nickname模糊查找用户
        function list(params, $callback) {
            return $request.wrap("user", "/sdk/users/", params).success($callback);
        }

        // 切换用户所在项目
        function modifyProject(projectId, $callback) {
            return $request.wrap("user", "/sdk/modify/project", {
                projectId: projectId, method: "post"
            }).success($callback);
        }

        // 修改密码
        function modifyPassword(password, $callback) {
            return $request.wrap("user", "/sdk/modify/password", {
                password: password, method: "post"
            }).success($callback);
        }

        // 修改头像
        function modifyHead(head, $callback) {
            return $request.wrap("user", "/sdk/modify/head", {
                head: head, method: "post"
            }).success($callback);
        }

        // 退出
        $account.logout = logout;
        function logout() {
            $account.id = "";
        }

        return {
            id: id,
            check: check,
            list: list,
            modifyProject: modifyProject,
            modifyPassword: modifyPassword,
            modifyHead: modifyHead,
            logout: logout
        };
    }])
    $services.constant("$account", $account);
    $services.run(["$rootScope", function ($rootScope) {
        $rootScope.$account = $account;
    }])
});
define("common/services/user", ["$user"], function ($user) {
    return $user;
});