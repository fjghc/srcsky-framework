define("$constants", ["$helpers"], function ($helpers) {
    /**
     * 头部导航
     * @type {{categories: *[], navLinks: {accesskeys: {id: string, href: string, target: string, text: string, show: boolean}, assist: {id: string, icon: string, href: string, navRedirect: boolean, text: string, title: string, show: boolean, showNew: boolean}, help: {id: string, text: string, links: *[], show: boolean}, home: {text: string, icon: string, href: string, target: string, show: boolean}, i18n: {id: string, icon: string, requestUrl: string, show: boolean, showNew: boolean}, icp: {href: string, target: string, text: string, id: string, show: boolean}, logo: {icon: string, href: string, target: string, show: boolean}, message: {blankText: string, messageUrl: string, href: string, text: string, title: string, show: boolean}, product: {text: string, show: boolean}, qrcode: {text: string, icon: string, href: string, image: string, title: string, show: boolean}, search: {text: string, placeholder: string, href: string, show: boolean}, user: {id: string, links: *[], show: boolean}, workorder: {links: *[], text: string, id: string, show: boolean}, requestUrl: {updateMessageInfo: string}}}}
     */
    var topbar = {
        url: "",//"../api/nav/topbar.js",
        categories: [
            /*{
             name: "项目总况",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "两费收入", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "多经收入", openStatus: false, productId: "slb", shortName: "SLB"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "客流统计", openStatus: false, productId: "vpc", shortName: "VPC"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "开业率统计", openStatus: false, productId: "ess", shortName: "ESS"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "招商达成率", openStatus: false, productId: "ip"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "租金预算达成率", openStatus: false, productId: "ip"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "商家数据统计", openStatus: false, productId: "ip"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "会员统计", openStatus: false, productId: "ip"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "资产总值统计", openStatus: false, productId: "ip"}
             ]
             }, {
             name: "会员",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "CRM", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "企划", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "O2O中心", openStatus: false, productId: "vpc"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "在线客服", openStatus: false, productId: "ess"}
             ]
             }, {
             name: "财务",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "预算", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "收费中心", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "报表", openStatus: false, productId: "vpc"}
             ]
             }, {
             name: "成本",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "供方", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "招商采购", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "知识库", openStatus: false, productId: "vpc"}
             ]
             }, {
             name: "商户",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "商家库", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "招商计划", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "商家线上平台", openStatus: false, productId: "vpc"}
             ]
             }, {
             name: "营运",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "项目信息", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "营收", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "报表", openStatus: false, productId: "vpc"}
             ]
             }, {
             name: "工程",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "水电", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "设备平台", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "工程改造", openStatus: false, productId: "vpc"}
             ]
             }, {
             name: "基础数据",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "项目信息", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "楼层信息", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "商铺信息", openStatus: false, productId: "vpc"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "多经信息", openStatus: false, productId: "vpc"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "车厂信息", openStatus: false, productId: "vpc"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "一铺一价", openStatus: false, productId: "vpc"}
             ]
             }, {
             name: "数据采集",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "商场硬件数据采集", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "商家软件数据采集", openStatus: false, productId: "slb"}
             ]
             }, {
             name: "工作流引擎",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "表单设计", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "流程定制", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "过程跟踪", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "超时策略", openStatus: false, productId: "slb"}
             ]
             }, {
             name: "合同模板",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "合同模板", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "防伪水印", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "限时打印", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "版本追随", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "在线批注", openStatus: false, productId: "slb"}
             ]
             }, {
             name: "微信平台",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "微站", openStatus: false, productId: "ecs"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "积分", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "车场", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "活动", openStatus: false, productId: "slb"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "在线客服", openStatus: false, productId: "slb"}
             ]
             },
             {
             name: "客户关系",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "会员管理", openStatus: false, productId: "yundun"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "积分兑换", openStatus: false, productId: "cms", shortName: "CMS"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "资源访问管理", openStatus: false, productId: "ram", shortName: "RAM"}
             ]
             }, {
             name: "人事系统",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "简历管理", openStatus: false, productId: "yundun"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "招聘系统", openStatus: false, productId: "cms"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "员工档案", openStatus: false, productId: "ram"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "排版", openStatus: false, productId: "ram"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "考勤", openStatus: false, productId: "ram"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "薪酬", openStatus: false, productId: "ram"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "工资条", openStatus: false, productId: "ram"}
             ]
             },
             {
             name: "数据平台",
             products: [
             {icon: "icon-setup", link: "javascript:void(0)", name: "memcache", openStatus: false, productId: "yundun"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "mongdb", openStatus: false, productId: "cms"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "kafka", openStatus: false, productId: "ram"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "mysql", openStatus: false, productId: "ram"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "redist", openStatus: false, productId: "ram"},
             {icon: "icon-setup", link: "javascript:void(0)", name: "参数配置", openStatus: false, productId: "ram"}
             ]
             },*/
            {
                name: "信息沟通",
                products: [
                    {icon: "icon-setup", link: "#/im/chat.html", name: "问一问", openStatus: true, productId: "ask"}
                ]
            },
            {
                name: "管理系统",
                products: [
                    {
                        icon: "icon-setup",
                        link: "#/admin/index.html",
                        name: "后台",
                        openStatus: true,
                        productId: "domain",
                        shortName: "Admin Console"
                    }/*,
                     {icon: "icon-setup", link: "javascript:void(0)", name: "菜单", openStatus: false, productId: "mail", shortName: "System Menu"},
                     {icon: "icon-setup", link: "javascript:void(0)", name: "组织机构", openStatus: false, productId: "dns", shortName: "Org"},
                     {icon: "icon-setup", link: "javascript:void(0)", name: "权限", openStatus: false, productId: "host", shortName: "SECURITY"}*/
                ]
            }
        ],
        //categoryGroup: [2, 4, 3, 3, 2, 2],
        categoryGroup: [1, 1],
        navLinks: {
            logo: {icon: "icon-logo9", href: "/console/"},
            mail: {show: false},
            search: {text: "搜索", placeholder: "搜索", href: "#", show: false},
            message: {
                blankText: "您暂时没有公告消息",
                messageUrl: "javascript:void(0)",
                href: "javascript:void(0)",
                text: "查看更多",
                title: "消息通知",
                show: false
            },
            workorder: {
                id: "workorder",
                text: "网批服务",
                links: [
                    {id: "workorderOwn", text: "我的网批", href: "javascript:void(0)", target: "_self"},
                    {id: "workorderAdd", text: "发起网批", href: "javascript:void(0)", navRedirect: true, target: "_self"}
                ],
                show: false
            },
            help: {
                id: "help",
                href: "./html/help.html?",
                icon: "",
                navRedirect: true,
                show: false,
                showNew: false,
                text: "帮助文档",
                title: "帮助文档"
            },
            /*help: {
             id: "help",
             text: "帮助",
             links: [
             {id: "faq", href: "javascript:void(0)", target: "_self", text: "FAQ"},
             {id: "help", href: "javascript:void(0)", target: "_self", text: "帮助中心"},
             {id: "docs", href: "javascript:void(0)", target: "_self", text: "文档中心"},
             {id: "bbs", href: "javascript:void(0)", target: "_self", text: "论坛"}
             ],
             show: true
             },*/
            home: {text: "管理控制台", icon: "icon-home", href: "/console/"},
            i18n: {
                id: "i18n",
                icon: "",
                requestUrl: "",
                show: false,
                showNew: true,
                currentLanguage: {
                    "value": "zh",
                    "label": "简体中文",
                    "link": "https://intl.xxxx.com/api/changeLanguage?lang=zh"
                }
            },

            qrcode: {
                text: "手机版",
                icon: "icon-qrcode",
                href: "javascript:void(0)",
                image: "https://g.alicdn.com/xxx/console/1.3.21/styles/images/qrcode.png",
                title: "扫码下载APP",
                show: true
            },
            user: {
                id: "user",
                links: [{
                    href: "https://account.xxxx.com/logout/logout.htm?oauth_callback=",
                    target: "_self",
                    text: "退出"
                }],
                show: true
            },
            requestUrl: {updateMessageInfo: "http://home.console.xxx.com/center/updateMessageInfo.js"}
        },
        "messages": {
            "messageList": [
                {
                    "className": "公告",
                    "formatCreatedTime": "2015-12-28",
                    "msgId": "8200432720",
                    "title": "关于对宿迁商业公司的通报表扬"
                },
                {
                    "className": "用户反馈",
                    "formatCreatedTime": "2015-12-23",
                    "msgId": "8200413764",
                    "title": "关于同意李建明先生离职的通知"
                },
                {
                    "className": "新闻",
                    "formatCreatedTime": "2015-12-15",
                    "msgId": "8200388825",
                    "title": "2016增长预期可见 花旗持续看好宝龙地产"
                },
                {
                    "className": "新闻",
                    "formatCreatedTime": "2015-12-09",
                    "msgId": "8200380459",
                    "title": "商业集团新闻集锦2015年12月第四周"
                },
                {
                    "className": "新闻",
                    "formatCreatedTime": "2015-12-01",
                    "msgId": "8200368445",
                    "title": "商业集团新闻集锦2015年11月第四周"
                }
            ], "total": 55
        }, "account": {"id": "zhanggj@powerlong.com"}
    }
    /**
     * 左侧导航
     * @type {{navConfig: {product: {title: *, popover: *, dialogTitle: *, folded: boolean, show: boolean, showManageButton: boolean}, service: {title: *, popover: *, dialogTitle: *, folded: boolean, show: boolean, showManageButton: boolean}, requestUrl: {setUserPreference: string}}, products: *[], productPreference: string[], services: *[], servicePreference: string[]}}
     */
    var sidebar = {
        url: "",//"./api/nav/sidebar.js",
        navConfig: {
            product: {
                title: "我的定制",
                popover: "自定义服务",
                dialogTitle: "自定义应用快捷入口",
                folded: false,
                show: true,
                showManageButton: true
            },
            service: {
                title: "用户中心",
                popover: "自定义用户中心",
                dialogTitle: "自定义用户中心快捷入口",
                folded: false,
                show: true,
                showManageButton: true
            },
            requestUrl: {setUserPreference: "http://home.console.xxxx.com/center/setUserPreference.js"}
        },
        products: [
            {icon: "icon-setup", productId: "ecs", name: "网批", link: "javascript:void(0)"},
            {icon: "icon-setup", productId: "rds", name: "收费中心", link: "javascript:void(0)"},
            {icon: "icon-setup", productId: "slb", name: "CRM", link: "javascript:void(0)"},
            {icon: "icon-setup", productId: "oss", name: "工程改造", link: "javascript:void(0)"},
            {icon: "icon-setup", productId: "osa", name: "项目信息", link: "javascript:void(0)"},
            {icon: "icon-setup", productId: "osb", name: "财务报表", link: "javascript:void(0)"},
            {icon: "icon-setup", productId: "vpc", name: "测试应用", link: "javascript:void(0)"}
        ],
        productPreference: ["ecs", "rds", "slb", "oss", "osa"/*, "osb","vpc"*/],
        services: [
            {icon: "icon-account-2", productId: "account", name: "账号管理", link: "javascript:void(0)"},
            {icon: "icon-invite", productId: "msc", name: "消息中心", link: "javascript:void(0)"},
            {icon: "icon-invite", productId: "workorder", name: "测试应用", link: "javascript:void(0)"}
        ],
        servicePreference: ["account", "msc"]
    };

    /**
     * 相应编码
     * @type {{SUCCESS: string, SESSION_TIMEOUT: string, NEED_LOGIN: string, HTTP_SUCCESS: number}}
     */
    var response = {
        success: 200,
        error: 500,
        sessionTimeout: -99,
        needLogin: -100,
        httpSuccess: 200
    };

    /**
     * 事件
     * @type {{SHOW_RESPONSE_ERROR_MESSAGE: string, SESSION_TIMEOUT: string}}
     */
    var event = {
        showResponseErrorMessage: "showResponseErrorMessage",
        sessionTimeout: "sessionTimeout"
    }

    var constants = {
        topbar: topbar,
        response: response,
        sidebar: sidebar,
        event: event,
        sideBarFoldCookieName: "sidebar-type"
    };
    $helpers.run(["$rootScope", function ($rootScope) {
        $rootScope.$constants = constants;
        $rootScope.$const = constants;
    }])
    return constants;
})
define("common/support/constants", ["$constants"], function ($constants) {
    return $constants;
})