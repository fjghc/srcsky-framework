//=========================================================================
//============================= NEW 2016-01-20 ============================
//=========================================================================
define("common/services/state", ["angular", "$services", "$framework"], function (angular, $services, $framework) {
    $services.provider("stateService", function () {
        this.$get = ["frameworkSetting", "$productNavbarSetting", "$state", function (framework, navbar, $state) {
            var self = this;
            var service = {
                enter: function (config) {
                    if (config.siderbar) {
                        framework.setSidebar($framework.getSidebarTypeByCookie() ? $framework.getSidebarTypeByCookie() : config.siderbar);
                    }
                    if (config.navbar) {
                        framework.setProductNavBar(config.navbar);
                    }
                    if (config.title) {
                        navbar.setTitle(config.title);
                    }
                    if (config.main) {
                        navbar.setMainNav(config.main);
                    }
                }
            };
            return service;
        }]
    });
})
