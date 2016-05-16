define("admin/support/constants", ["angular", "$app"], function (angular, app) {
    return {
        title: "Admin Console",
        siderbar: "full",
        navbar: "col-1",
        main: [
            {title: "概览", state: "admin.index"},
            {title: "账号", state: "admin.account"},
            {title: "组织机构", state: "admin.organization"},
            {title: "应用", state: "admin.app"},
            {
                title: "菜单", state: "admin.menu",
                childs: [
                    {title: "模块", state: "admin.menu.module"},
                    {title: "页面", state: "admin.menu.page"}
                ]
            },
            {
                title: "系统权限", state: "admin.security",
                childs: [
                    {title: "资源", state: "admin.security.resource"},
                    {title: "角色", state: "admin.security.role"}
                ]
            }
        ]
    };
})
