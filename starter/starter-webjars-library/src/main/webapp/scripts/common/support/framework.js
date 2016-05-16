//=========================================================================
//============================= NEW 2015-12-27 ============================
//=========================================================================
define("$framework", ["$constants"], function ($constants) {
    var sidebarType;

    function init(frameworkConfig) {
        var cookieSidebarType = getSidebarTypeByCookie();
        if (frameworkConfig) {
            sidebarType = frameworkConfig.sidebar;
            if (cookieSidebarType) {
                frameworkConfig.sidebar = cookieSidebarType;
                sidebarType = cookieSidebarType;
            }
        }
    }

    function getSidebarTypeByCookie() {
        return getCookie($constants.sideBarFoldCookieName);
    }

    function getSidebarType() {
        var type = getSidebarTypeByCookie() || sidebarType;
        return (type != "mini" && type != "full") ? "mini" : type;
    }

    function isSidebarFold() {
        return getSidebarType() == "mini";
    }

    function getCookie(name) {
        if (!name)return;
        var values = document.cookie.split(";"), value;
        for (var index = 0; index < values.length; index++) {
            var i = values[index].split("=");
            i[0].trim() == name && (value = unescape(i[1]))
        }
        return value
    }

    function setCookie(name, value, domain,day) {
        if (!name)return;
        var exp = new Date();
        exp.setTime(exp.getTime() + (day ? day : 30) * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + (domain ? ";domain=" + domain : "") + "; path=/;expires=" + exp.toGMTString();
    }

    return {
        init: init,
        getCookie: getCookie,
        setCookie: setCookie,
        getSidebarType: getSidebarType,
        isSidebarFold: isSidebarFold,
        getSidebarTypeByCookie: getSidebarTypeByCookie
    }
})

define("common/support/framework", ["$framework"], function ($framework) {
    return $framework;
})
