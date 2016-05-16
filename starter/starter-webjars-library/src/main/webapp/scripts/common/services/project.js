//=========================================================================
//============================= NEW 2016-01-29 ============================
//=========================================================================
define("$project", ["angular", "$services", "$url", "$string", "$constants"], function (angular, $services, $url, $string, $constants) {
    $url.setServerUrl("space", "/space");
    var $projects = [], $projects_map = {};
    $services.service("$project", ["$request", function ($request) {
        $request.wrap("space", "/sdk/projects").success(function (response) {
            if (response.success) {
                angular.forEach(response.data, function (project) {
                    $projects.push(
                        $projects_map[project.id] = {
                            id: project.id,
                            code: project.code,
                            name: project.name,
                            shortName: project.shortName
                        }
                    );
                })
            }
        });
        function id(id) {
            return $contains.$projects_map[project.id];
        }

        return {id: id};
    }])
    $constants.$projects = $projects;
    $constants.$projects_map = $projects_map;
});
define("common/services/project", ["$project"], function ($project) {
    return $project;
});