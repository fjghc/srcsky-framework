define("admin/states/base", ["$app", "../support/constants"], function (app, constants) {
    app.config(["$stateProvider", function ($state) {
        $state.state("admin", {
            url: "/admin", "abstract": true, template: "<div ui-view></div>",
            onEnter: ["stateService", function (stateService) {
                stateService.enter(constants);
            }]
        });
        $state.state("admin.index", {url: "/index.html", templateUrl: "scripts/admin/views/index.html"});
        $state.state("admin.account", {url: "/account.html", templateUrl: "scripts/admin/views/account.html"});
        $state.state("admin.organization", {url: "/organization.html", templateUrl: "scripts/admin/views/organization.html"});
        $state.state("admin.app", {url: "/app.html", templateUrl: "scripts/admin/views/app.html"});
        $state.state("admin.menu", {"abstract": true,template: "<div ui-view></div>"});
        $state.state("admin.menu.module", {url: "/module.html", templateUrl: "scripts/admin/views/module.html"});
        $state.state("admin.menu.page", {url: "/page.html", templateUrl: "scripts/admin/views/page.html"});
        $state.state("admin.security", {"abstract": true,template: "<div ui-view></div>"});
        $state.state("admin.security.resource", {url: "/resource.html", templateUrl: "scripts/admin/views/resource.html"});
        $state.state("admin.security.role", {url: "/role.html", templateUrl: "scripts/admin/views/role.html"});
    }]);
});
