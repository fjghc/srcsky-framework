/**
 * Require Config
 */
require.config({
    baseUrl: "./scripts/",
    urlArgs: "_=" + new Date().getTime(),
    paths: {
        "$app": "common/bootstrap",
        "$constants": "common/support/constants",
        "$controllers": "common/controllers/base",
        "$services": "common/services/base",
        "$directives": "common/directives/base",
        "$model": "common/model/base",
        "$model.directives": "common/model/directives/base",
        "$mFactory": "common/model/model.factory",
        "$helpers": "common/support/base",
        "$string": "common/support/string",
        "$valid": "common/support/valid",
        "$tools": "common/support/tools",
        "$data": "common/support/data",
        "$topic": "common/services/topic",
        "$url": "common/support/url",
        "$framework": "common/support/framework"
    }
});
