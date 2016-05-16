define("aliyun-buy-ecs/module/common/homeConfigHelper", [], function () {
    function t() {
        if (e.GETUA) {
            var t = e.GETUA();
            return t ? t : "aliyun"
        }
        return "aliyun"
    }

    function n() {
        var e = r("UMID");
        return e ? e : "aliyun"
    }

    function r(t) {
        return t ? e[t] : ""
    }

    var e = window.ALIYUN_BUY_CONFIG ? window.ALIYUN_BUY_CONFIG : {};
    return {getUA: t, get: r, getUmid: n}
}), define("aliyun-buy-ecs/module/common/responseFormatter", [], function () {
    var e = {
        bandwidthHistory: function (e) {
            var t = {};
            e = e || [];
            var n = e.length - 1, r = new Date, i = new Date;
            r.setTime(e[0].startTime), i.setTime(e[n].endTime);
            var s = r.getFullYear(), o = i.getFullYear();
            for (var u = s; u <= o; u++) {
                t[u] = {};
                var a;
                u < o ? (a = new Date, a.setFullYear(u), a.setMonth(11), a.setDate(31)) : a = i, a.setHours(23), a.setMinutes(59), a.setSeconds(59), a.setMilliseconds(999);
                for (var f = r; f.getTime() <= a.getTime(); f.setDate(f.getDate() + 1)) {
                    var l = f.toLocaleDateString();
                    t[u][l] = {date: l}
                }
            }
            for (var c = 0; c < e.length; c++) {
                var f = new Date;
                f.setTime(e[c].startTime), f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0);
                for (; f.getTime() < e[c].endTime; f.setDate(f.getDate() + 1)) {
                    var l = f.toLocaleDateString();
                    try {
                        if (t[f.getFullYear()][l].bandwidth)continue;
                        t[f.getFullYear()][l].bandwidth = e[c].bandwidthValue
                    } catch (h) {
                        console.log(f)
                    }
                }
            }
            return t
        }
    };
    return e
}), define("aliyun-buy-ecs/lang/zh", [], function () {
    return {
        ECS_IO_OPTIMIZED: "I/O 优化",
        ECS_OPTIONS: "配置",
        ECS_BASE_OPTIONS: "基本配置",
        ECS_NETWORK: "网络",
        ECS_IMAGE: "镜像",
        ECS_STORAGE: "存储",
        ECS_PASSWORD: "密码",
        ECS_AMOUNT: "购买量",
        ECS_IMAGEMARKET_NUM: "镜像数",
        ECS_INSTANCE_UNIT: "台",
        ECS_RESTART_TIME: "重启时间",
        ECS_EXPIRATION_TIME_AFTER_RENEW_IS: "续费后到期时间为",
        ECS_RENEW_WITH_DOWNGRADE: "降配续费",
        ECS_RENEW_DURATION: "续费时长",
        ECS_SET_PASSWORD: "设置密码",
        ECS_SET_NOW: "立即设置",
        ECS_SET_AFTER_CREATED: "创建后设置",
        ECS_LOGIN_NAME: "登录名",
        ECS_LOGIN_PASSWORD: "登录密码",
        ECS_CONFIRM_PASSWORD: "确认密码",
        ECS_INSTANCE_NAME: "实例名称",
        ECS_PASSWORD_EXP_DISCRIPE: "8 - 30 个字符，且同时包含三项（大、小写字母，数字和特殊符号） ",
        ECS_PASSWORD_EXP_ERROR: "8 - 30 个字符，必须同时包含三项（大、小写字母，数字和 ()`~!@#$%^&*-+=|{}[]:;'<>,.?/ 中的特殊符号）。",
        ECS_PASSWORD_REPEAT_ERROR: "两次输入的密码不一致，请重新输入",
        ECS_INSTANCE_NAME_EXP_DISCRIPE: '长度为2-128个字符，以大小写字母或中文开头，可包含数字，"."，"_"或"-"',
        ECS_PASSWORD_LOGIN: "登录",
        ECS_PASSWORD_LOGIN_TIP: "后即可自定义设置",
        ECS_TODAY: "今天",
        ECS_OK: "确定",
        ECS_PROMPT: "提示",
        ECS_CLEAR: "清除",
        ECS_WEEK: "周",
        ECS_PUBLIC_FLOW: "公网流量",
        ECS_SELECT_FROM_INSATNCE_TYPE: "请选择实例规格",
        ECS_RESELECT_FROM_INSATNCE_TYPE: "请选择实例规格",
        ECS_SELECT_FROM_IMAGE_MARKET: "从镜像市场选择（含操作系统）",
        ECS_RESELECT_IMAGE: "重新选择镜像",
        ECS_CUSTOM_IMAGE: "自定义镜像",
        ECS_SHARED_IMAGE: "共享镜像",
        ECS_IMAGE_NAME: "镜像名称",
        ECS_PLEASE_SELECT_CUSTOM_IMAGE: "请选择自定义镜像",
        ECS_PLEASE_SELECT_SHARED_IMAGE: "请选择共享镜像",
        ECS_CHANGE_OS: "更换操作系统",
        ECS_IMAGE_TYPE: "镜像类型",
        ECS_PUBLIC_IMAGE: "公共镜像",
        ECS_VIA_FLOW: "按使用流量",
        ECS_VIA_FIXED_BANDWIDTH: "按固定带宽",
        ECS_CLASSICAL_NETWORK: "经典网络",
        ECS_PRIVATE_NETWORK: "专有网络",
        ECS_CHECKOUT_AMOUNT: "应付款",
        ECS_PAY: "去支付",
        ECS_INSTANCE_INFO: "当前配置",
        ECS_CPU: "CPU",
        ECS_MEMORY: "内存",
        ECS_CPU_AND_MEMORY: "CPU & 内存",
        ECS_INSTANCE_TYPE: "实例规格",
        ECS_INSTANCE_TYPE_ASKTIP: '系列 II 较系列 I 进行了硬件升级，采用 Haswell CPU、DDR4 内存，并默认为 I/O 优化实例，同时增加了一些新的指令集，使整数和浮点运算的性能翻倍，整体计算能力更强。<div class="bk-hr"></div>系列 I 与系列 II 之间不能互相升降配。',
        ECS_INSTANCE_TYPE_ECS1_INTRO: "系列 I 采用 Intel Xeon CPU，DDR3 的内存。",
        ECS_INSTANCE_TYPE_ECS2_INTRO: "系列 II 采用 Intel Haswell CPU、DDR4 内存，拥有更好的内存计算能力；默认为 I/O 优化实例，搭配 SSD云盘可获得更好的存储性能。",
        ECS_INSTANCE_GENERATION: "实例系列",
        ECS_BANDWIDTH_TYPE: "公网带宽",
        ECS_BANDWIDTH: "带宽",
        ECS_CURRENT_USED_BANDWIDTH: "当前使用带宽",
        ECS_BASIC_BANDWIDTH: "基础带宽",
        ECS_TARGET_BANDWIDTH: "目标带宽",
        ECS_PEAK: "峰值",
        ECS_REGION: "地域",
        ECS_ZONE: "可用区",
        ECS_NETWORK_TYPE: "网络类型",
        ECS_LAN_IP: "内网 IP",
        ECS_DATADISK: "数据盘",
        ECS_SYSDISK: "系统盘",
        ECS_WAN_IP: "公网 IP",
        ECS_OS: "操作系统",
        ECS_EXPIRATION_TIME: "当前云服务器到期时间",
        ECS_UPGRADE: "升级",
        ECS_CALCULATING_PRICE: "正在计算价格请稍候...",
        ECS_BANDWIDTH_UPGRADE_CONFLICT_TIP: "您选择的时间段里，(或部份时间)带宽已为 {0}Mbps，请重新选择；请参考【带宽变更历史】调整带宽。",
        ECS_PUBLIC_BANDWIDTH: "公网带宽",
        ECS_SERVICE_TERMS: '<a class="bk-order-pact-link" href="http://help.aliyun.com/view/13433718.html" target="_blank">《云服务器 ECS 服务条款》</a>',
        ECS_BANDWIDTH_TEMP_UPGRADE: "带宽临时升级",
        ECS_BANDWIDTH_UPGRADE_START_TIME: "宽带升级起始时间",
        ECS_BANDWIDTH_UPGRADE_END_TIME: "宽带升级结束时间",
        ECS_BANDWIDTH_TEMP_UPGRADE_CONFIRM_TITLE: "云服务器带宽临时升级温馨提示",
        ECS_BANDWIDTH_TEMP_UPGRADE_CONFIRM_CONTENT: "带宽临时升级（除首次 0Mbps 带宽临时升级）无需重启实例，支付成功即可生效。 <br/>首次进行 0Mbps 带宽升级需要您在指定升级带宽的日期当天先通过 ECS 控制台或 ECS API 重启 ECS 实例，变配带宽才能生效。 ",
        ECS_BANWIDTH_UPGRADE_FOREVER_INTRODUCE: "是否永久升级基础带宽",
        ECS_BANWIDTH_UPGRADE_FOREVER_TIP: "基础带宽：指创建实例时配置的初始带宽值。升级基础带宽后，续费时按新升级的基础带宽值进行续费。如您操作过带宽临时升级，再进行基础带宽升级时，系统会自动将本生命周期内最大带宽值作为基础带宽升级的起始值。了解带宽使用情况可点击【带宽变更历史】。 ",
        ECS_BANDWIDTH_HISTORY: "带宽变更历史",
        START_TIME_CANNOT_BE_BIGGER_THAN_END_TIME: "开始时间不能大于结束时间",
        ECS_BANDWIDTH_UPGRADE_DETAIL_TIP: "升级 {0} 天，带宽升级至 {1}Mbps，将于 {2} 00:00:00 变回至 {3}Mbps；此次升级后如云服务器续费，默认带宽为 {3}Mbps。",
        ECS_ZONE_TIP: "可用区：指在同一地域下，电力、网络隔离的物理区域，可用区之间内网互通，不同可用区之间故障隔离。如果您需要提高应用的高可用性，建议您将实例创建在不同的可用区内。",
        ECS_REGION_TIP: '不同地域之间的产品内网不互通；订购后不支持更换地域，请谨慎选择 <a href="http://help.aliyun.com/view/13433645.html" target="_blank" class=\'bk-lnk\'>教我选择&gt;&gt;</a>',
        ECS_MEMORY_512_TIP: "为保证性能体验，512MB 内存不提供 Windows 操作系统。",
        ECS_MEMORY_1024_TIP: "为了保证性能体验，Windows 2008 / 2012 系统建议选择 2GB 及以上内存。",
        ECS_NETWORKTYPE_LINK: "<a href=\"http://help.aliyun.com/view/13748516.html\" target='_blank' class='bk-lnk bk-ml1' hidefocus=''>教我选择&gt;&gt;</a>",
        ECS_NETWORKTYPE_TIP: "<span class='bk-black'>网络类型：</span>仅是 ECS 产品功能上区分，与运营商公网接入网络质量无关，任何网络类型的运营商接入均为 BGP 线路，请您放心使用，并根据自己需要进行选择。<div class=\"bk-hr\"></div><span class='bk-black'>经典网络：</span>IP地址由阿里云统一分配，配置简便，使用方便，适合对操作易用性要求比较高、需要快速使用 ECS 的用户。<div class=\"bk-hr\"></div><span class='bk-black'>专有网络：</span>是指逻辑隔离的私有网络，您可以自定义网络拓扑和 IP 地址，支持通过专线连接。适合于熟悉网络管理的用户。",
        ECS_IMAGETYPE_TIP: "<span class='bk-black'>公共镜像：</span>是由阿里云官方提供公共基础镜像，仅包括初始系统环境。请根据您的实际情况自助配置应用环境或相关软件配置。<div class=\"bk-hr\"></div><span class='bk-black'>自定义镜像：</span>基于用户系统快照生成，包括初始系统环境、 应用环境和相关软件配置 。选择自定义镜像创建云服务器，节省您的重复配置时间。<div class=\"bk-hr\"></div><span class='bk-black'>镜像市场：</span>提供经严格审核的百款优质第三方镜像，预装操作系统、应用环境和各类软件，无需配置，可一键部署云服务器。满足建站/应用开发/可视化管理等个性化需求。<a href=\"http://market.aliyun.com/imagehelp\" target='_blank'>了解镜像市场服务&gt;&gt;</a><div class=\"bk-hr\"></div><span class='bk-black'>共享镜像：</span>是其他账号的自定义镜像主动共享给您使用的镜像。阿里云不保证其他账号共享给您的镜像的完整性和安全性，使用共享镜像需要自行承担风险。<a href=\"http://help.aliyun.com/knowledge_detail.htm?knowledgeId=6527514\" target='_blank'>了解共享镜像详情&gt;&gt;</a><div class=\"bk-hr\"></div>",
        ECS_IMAGETYPE_ROW_TIP: "公共镜像即基础操作系统。镜像市场在基础操作系统上，集成了运行环境和各类软件。",
        ECS_SYSDISK_TIP: "<span class='bk-black'>普通云盘：</span>采用三副本的分布式存储技术，数据可靠性达 99.9999999%；存储性能一般在数百随机 IOPS、20 ~ 40MBps 吞吐量；订购后支持 CPU、内存的升降配置。<div class=\"bk-hr\"></div><span class='bk-black'>高效云盘：</span>采用三副本的分布式存储技术，数据可靠性达 99.9999999%；起步 1000 随机 IOPS、50MBps 吞吐性能，每 GB 增加 6 个 IOPS、0.1MBps 吞吐性能，最大 3000 随机读写 IOPS、80MBps 吞吐性能；订购后支持 CPU、内存的升降配置。例如：200GB 的高效云盘，拥有 2200 随机读写 IOPS、70MBps 的读写吞吐性能；<div class=\"bk-hr\"></div><span class='bk-black'>SSD云盘：</span>采用三副本的分布式存储技术，提供稳定的高随机 I/O、99.9999999% 数据可靠性的高性能存储；每 GB 提供 30 个随机 IOPS，单盘最大 20000 随机读写 IOPS、256MBps 吞吐性能；订购后支持 CPU、内存的升降配置；<div class=\"bk-hr\"></div><span class='bk-black'>本地SSD盘：</span>提供最大 12000 随机读写 IOPS、300MS/s 吞的高性能存储；由于存储空间来自服务器的本地SSD盘，存在单点故障风险，建议在应用层做数据冗余保证数据可用性；订购后不支持 CPU、内存及本地SSD盘的升降配置。<div class=\"bk-hr\"></div><span class='bk-black'>挂载点：</span> 是阿里云服务器上磁盘在磁盘控制器总线上的位置。您选择的挂载点，在 Linux 环境下与磁盘设备号对应；在 Windows 环境下与磁盘管理器中的磁盘顺序一致。",
        ECS_YUNDUN_TIP: "云盾可为您检测服务器的安全隐患，同时提供主流类型的网络攻击防御。",
        ECS_OS_LINK: "<a href=\"http://help.aliyun.com/view/13439155.html\" target=\"_blank\" class='bk-lnk bk-ml2' hidefocus=''>教我选择&gt;&gt;</a>",
        ECS_OS_TIP: "选 Linux 送 20GB 系统盘，选 Windows 送 40GB 系统盘。",
        ECS_OS_TIP_HONGKONG: "香港地域云服务器暂不支持 Linux 和 Windows 系统互相更换。",
        ECS_SUBTOTAL_PRICE_TIP: '实际扣费以账单为准<a href="http://help.aliyun.com/view/13433764.html" class=\'bk-lnk bk-ml2\' hidefocus target="_blank">购买和计费说明&gt;&gt;</a>',
        ECS_PREPAY_NOTICE: "若 ECS 用于网站 Web 访问，请及时备案。若 ECS 用于 SLB，请前往 SLB 新购页面购买带宽，ECS 仅需保留少量带宽以便您管理。",
        ECS_POSTPAY_NOTICE: "按量付费服务不支持备案。",
        ECS_BANDWIDTH_FINANCE: '金融云公网带宽，ECS 主动发起互联网访问才需购买。对互联网提供 Web 服务，必须通过购买 SLB 实现。<a href="http://help.aliyun.com/view/11111638_13518460.html" target="_blank">详情说明&gt;&gt;</a>',
        ECS_BANDWIDTH_0: '选择 0M 带宽不能访问公网（不分配公网 IP），如需分配公网 IP 请增加带宽值<a class="bk-lnk bk-ml1" href="http://help.aliyun.com/view/13433506.html" target="_blank">教我选择&gt;&gt;</a>',
        ECS_BANDWIDTH_RENEW_UPGRADE_0: "选择 0M 带宽后，您的公网 IP 地址仍将保留。",
        ECS_BANDWIDTH_HONGKONG: "香港地域为国际带宽，不适合国内大陆地区访问。",
        ECS_BANDWIDTH_SOUTHEAST: "新加坡为国际带宽，不适合国内大陆地区访问。",
        ECS_UNAVAILABLE_TIP: "由于管控需要，按量付费购买暂时关闭，请您稍后再来尝试。",
        ECS_PASSWORD_PRESET_TIP: "请牢记您所设置的密码，如遗忘可登录 ECS 控制台重置密码。",
        ECS_PASSWORD_AFTERSET_TIP: "购买成功后，可登录 ECS 控制台重置密码，系统将不再通过短信和邮件发送随机密码。",
        ECS_POSTPAY_NEEDCERTIFY: '开通按量付费的服务器需要先进行实名认证，<a href="https://account.aliyun.com/profile/certify.htm" target="_blank">马上认证&gt;&gt;</a>',
        ECS_PREPAY_NEEDCERTIFY: '开通包年包月的服务器需要先进行实名认证，<a href="https://account.aliyun.com/profile/certify.htm" target="_blank">马上认证&gt;&gt;</a>',
        ECS_RELEASEWITHECS_TIP: "勾选“随实例释放”则该磁盘将随实例一起释放，数据不可恢复；如果不勾选“随实例释放”，当实例释放时系统会为用户从实例上卸载该云盘，不会被释放。",
        ECS_ZHUANYUNDISK_TIP: "转换成为按量云盘时，勾选“随实例释放”则该磁盘将随实例到期后一起释放，数据不可恢复；如果不勾选“随实例释放”，当实例到期释放时系统会为用户从实例上卸载该云盘，不会被释放。",
        ECS_FLOWBANDWIDTH_TIP: "按使用流量：是先使用后付费产品，每小时扣费。为了您的服务正常运行请保证您账户余额充足。",
        ECS_BANDWIDTHTYPE_TIP: "<span class='bk-black'>按固定带宽的方式：</span>需指定带宽的大小，如 10Mbps(单位为 bit)，费用合并在包年包月实例费用中一起支付。<div class=\"bk-hr\"></div><span class='bk-black'>按使用流量的方式：</span>是按实际发生的网络流量进行收费。先使用后付费，按小时计量计费。为了防止突然爆发的流量产生较高的费用，可以指定容许的最大网络带宽进行限制<div class=\"bk-hr\"></div>",
        ECS_UPGRADE_FORBIDDEN_PEAK_TIP: "您的账户因欠费，按使用流量带宽值降为 0，不可调整。您充钱后结清欠款，系统会自动恢复带宽峰值。",
        ECS_NETWORK_VALIDATION_FALSE: "因您的账户累计欠费，导致按流量计费带宽暂停服务；您需要向账户充值并结清欠费后，系统会自动恢复带宽服务。",
        ECS_UNAVAILABLE_HAS_QUOTA_TIP: "您已经达到开通上限，不能再开通。",
        ECS_UNAVAILABLE_REGION_OPEN_TIP_POSTPAY: "由于管控，按量付费购买暂时关闭，请您稍后再来尝试。",
        ECS_UNAVAILABLE_REGION_OPEN_TIP_PREPAY: "由于管控，包年包月购买暂时关闭，请您稍后再来尝试。",
        ECS_UPGRADE_PEAK_TIP: "按流量付费是先使用后付费产品，每小时扣费。为了您的服务正常运行请保证您账户余额充足。",
        ECS_UPGRADE_PEAK_HASRENEW_TIP: "您有一个已支付且未生效的续费变配订单，续费变配生效前不支持重新调整当前带宽峰值。",
        ECS_OS_TIP_US_WEST: "美国地域云服务器暂不支持 Linux 和 Windows 系统互相更换。",
        ECS_OS_TIP_SOUTHEAST: "新加坡地域云服务器暂不支持 Linux 和 Windows 系统互相更换。",
        ECS_BANDWIDTH_US_WEST: "美国地域为国际带宽，不适合国内大陆地区访问。",
        ECS_REGION_HOT_VM_TIP: "",
        ECS_REGION_HOT_ECS_TIP: "",
        ECS_REGION_SELL_OUT_TIP: "售卖火爆，已售罄；小伙伴们正在加紧补货中。",
        ECS_REGION_SELL_OUT_TIP_US_WEST: "售卖火爆，已售罄；小伙伴们正在加紧补货中。",
        ECS_REGION__UNABLE_PURCHASE_TIP: "您选择的地域已售罄。",
        ECS_FLOW_PRICE_TIP: "公网流量费用按实际使用流量收费，每小时扣费。仅单向收取流出流量费用，流入流量免费。<br/>例如您在1小时内公网流出流量为 6.51GB，收取费用为 6.51GB * 0.8 元 / 小时 = 5.20 元",
        ECS_RENEW_CPU_RAM_DROP_TIP: "您现在的配置已经不再售卖，您可以选择继续使用当前配置续费，也可以通过变更当前售卖中的配置，点击“我需要变更配置”来进行选择。",
        ECS_RENEW_CHANGE_TIP: "提交续费降配操作后，当前剩余服务期限内将不再支持升级和降配功能，请谨慎操作。",
        ECS_UNAVAILABLE_NOT_ENOUGH_BALANCE: '开通按量付费的云服务器，您的账户余额不得少于100元，请充值后再开通，<a href="https://expense.console.aliyun.com/#/account/recharge/alipay" target="_blank">立即充值</a>',
        ECS_MARKET_IMAGE_UNAVAILABLE_NOT_ENOUGH_BALANCE: '购买按量付费的镜像，您的账户余额不得少于100元，请充值后再开通，<a href="https://expense.console.aliyun.com/#/account/recharge/alipay" target="_blank">立即充值</a>',
        ECS_PLEASE_SELECT_CONFIG: "请选择配置",
        ECS_OPERATE_FAILED: "操作失败",
        ECS_ERRORTIP_MODIFY_LOCAL_SYSTEMDISK: "挂载有本地磁盘 或 本地SSD磁盘的ECS实例不支持【升级】或【续费降配】功能；该实例支持【带宽临时升级】",
        ECS_NOT_ALLOW_DOWNGRADE_WHEN_LOCAL_SYSTEMDISK: "挂载有【本地磁盘】或【本地SSD磁盘】的 ECS 实例不支持 CPU、内存变更。",
        ECS_NOT_ALLOW_UPGRADE_WHEN_LOCAL_SYSTEMDISK: "挂载有【本地磁盘】或【本地SSD磁盘】的 ECS 实例不支持 CPU、内存变更。",
        ECS_BUY_NOT_ALLOW_CHANGE_WHEN_LOCAL_SYSTEMDISK: "选择本地SSD盘后，实例将不支持 CPU、内存变配。",
        ECS_ERRORTIP_MODIFY_UN_CERTIFIED: "续费或变配前，需要您的账户进行【实名认证】",
        ECS_ERRORTIP_SYSTEM_ERROR: "系统异常，请稍后再试",
        ECS_ERRORTIP_BANDWIDTH_TEMPUPGRADE_VPC_TYPE: "VPC 网络不支持带宽临时升级",
        ECS_ERRORTIP_BANDWIDTH_TEMPUPGRADE_FLOW_TYPE: "流量带宽不支持带宽临时升级",
        ECS_ERRORTIP_PARAMS_INVALID: "参数非法，请重新操作",
        ECS_ERRORTIP_MODIFY_RENEW_CHANGE: "您已进行过续费变配操作，至 {0} 前，不支持升级和降配功能",
        ECS_ERRORTIP_MODIFY_YUNMARKET_INSTANCE: "该实例不支持升级和降配功能",
        ECS_ERRORTIP_YUNDISK_RESIZE_RENEW_CHANGE: "非常抱歉，您操作了续费变配之后，并且还未进入续费变配期，因此当前服务周期内不能再操作磁盘扩容。",
        ECS_ERRORTIP_AFTER_PAY_CANNOT_RENEW: "非常抱歉，按量付费实例，不能进行续费操作",
        ECS_ERRORTIP_AFTER_PAY_CANNOT_CHAHNGE: "非常抱歉，按量付费实例，不能进行变配操作",
        ECS_PRICE_ERROR: "询价失败",
        ECS_BUY_YEARMONTH: "包年包月",
        ECS_BUY_POSTPAY: "按量付费",
        ECS_BUY_NETDISK: "购买云盘",
        ECS_BUY_UPDATE: "申请更高配置",
        ECS_BUY_MUSTKNOW: "购买须知",
        ECS_BUY_RECOMMEND: "选型推荐",
        ECS_RESULT_CONFIRM: "确认订单",
        ECS_RESULT_ORDERLIST: "查看订单记录",
        ECS_RESULT_CONSOLE: "管理控制台",
        ECS_RESULT_TIP: "立即签约支付宝代扣服务，在您账户余额不足时可以通过签约的支付宝账号自动扣费。",
        ECS_RESULT_TIPMORE: "更多详情",
        ECS_RESULT_TICKET: "提交工单",
        ECS_RESULT_WARMTIP: "温馨提示",
        ECS_RESULT_WTIP1: '感谢您对阿里云的支持！如您后续的操作遇到困难，您可以登录“用户中心-售后支持”提交问题。<a href="http://workorder.aliyun.com/faq/addnew?spm=5176.6660585.774526181.d4911861" class="lnk" target="_blank">快速入口&gt;&gt;</a><br>阿里云提供 7 x 24 小时的售后服务支持。',
        ECS_RESULT_WTIP2: "如您欠费未及时充值，将产生不良信用记录，影响您在阿里云官网的体验(包括但不限于购买、公测、营销活动等)和服务的正常使用。",
        ECS_RESULT_WTIP3: '阿里云为您提供 5 天无理由退款、故障 100 倍赔偿等优质的金牌服务体系。<a href="http://promotion.aliyun.com/act/jpfw.html?spm=5176.6660585.774526181.d4911873" class="lnk" target="_blank">了解详情&gt;&gt;</a> ',
        ECS_RESULT_SUCCESS: "开通成功",
        ECS_RESULT_FAIL: "开通失败",
        ECS_ORDER_RESULT: "开通结果",
        ECS_PORDER_CONFIRM: "确认订单",
        ECS_PORDER_SUCCESS: "开通成功",
        ECS_PORDER_PAY: "支付",
        ECS_ORDER_IMPORTENTTIP: '<strong>提醒</strong>：订单对应的发票信息，请在 管理控制台-费用中心-<a href="https://expense.console.aliyun.com/#/invoice/create" target="_blank">发票管理</a> 中设置。',
        ECS_ORDER_GOPAY: "去支付",
        ECS_ORDER_TERMS: "《云服务器 ECS 服务条款》",
        YUNDISK_PAY_POSTPAY: "去开通",
        ECS_BUY_APOP_NOTICE: "当前配置或台数选择不符合您的要求，请提交工单申请更高配置，提交时请注意：",
        ECS_BUY_APOP_QUESTION: "问题表述：请填写“<strong>详细的使用场景，需要的配置和台数等等</strong>”",
        ECS_BUY_APOP_COMMIT: '<a href="https://workorder.console.aliyun.com/console.htm#/ticket/add?productId=12&commonQuestionId=113" target="_blank">去提工单</a>',
        ECS_OLDPRICE: "原价:",
        ECS_REDUCE: "省:",
        ECS_TOTAL: "共计:",
        ECS_CHANGEOS_TITLE: "云服务器更换操作系统温馨提示",
        ECS_CHANGEOS_TIP: "ECS 实例更换系统盘后，磁盘 ID 会变更，原系统盘会被释放。<br/>1.更换系统盘后，原系统盘用户快照会被保留，自动快照随磁盘释放。<br/>2.为保持足够的快照数量额度完成新磁盘的自动快照策略.您可以删除不需要的快照。<br/>3.每次更换系统盘时都可以指定新的系统盘容量大小，但新的容量只能大于等于当前容量、不能小于当前容量；",
        ECS_CHANGEOS_CTIP: "因您没有备份系统相关个人数据而造成的数据丢失，阿里云不承担责任。<br/>确定更换操作系统吗？",
        ECS_DATADISK_KINDS: "磁盘种类",
        ECS_DATADISK_SIZE: "容量",
        ECS_DATADISK_SNAPSHOT: "快照创建磁盘",
        ECS_DATADISK_CSNAPSHOT: "用快照创建磁盘",
        ECS_DATADISK_MOUNTPOINT: "挂载点",
        ECS_DATADISK_PAYMETHOD: "付费方式",
        ECS_DATADISK_SUPPORTUNMOUNT: "支持卸载",
        ECS_DATADISK_UCANSELECT: "您还可选配",
        ECS_DATADISK_PIECE: "块;",
        ECS_DATADISK_REMAIN: "可配剩余容量",
        ECS_DATADISK_UNMOUNT: "卸载;",
        ECS_DATADISK_CONVERT: "转换为按量付费",
        ECS_DATADISK_RELEASE: "随实例释放",
        ECS_DATADISK_AUTO: "自动分配挂载点",
        ECS_SNAP_LIST: "快照列表",
        ECS_SNAP_MSEARCH: "进行模糊查询",
        ECS_SNAP_JSEARCH: "进行精确查询",
        ECS_SNAP_SNAPID: "快照ID",
        ECS_SNAP_SNAPNAME: "快照名称",
        ECS_SNAP_SNAME: "名称",
        ECS_SNAP_SIZE: "大小",
        ECS_SNAP_CREATETIME: "创建时间",
        ECS_SNAP_UNSELECT: "您目前还没有快照",
        ECS_SNAP_NORESULT: "未搜索到符合条件的快照",
        ECS_PREV: "上一页",
        ECS_NEXT: "下一页",
        ECS_IMG_OFFLINE_WINDOWS2003_TIP: "微软停止对 Windows Server 2003 扩展支持，请您认真阅读以下协议，充分了解风险且同意下面协议后才可以继续使用 Windows Server 2003 镜像。",
        ECS_IMG_OFFLINE_WINDOWS2003_AGREEMENT: "我已了解风险并同意<a href='http://help.aliyun.com/knowledge_detail.htm?knowledgeId=6541028&categoryId=8314835' target='_blank' class='bk-link'>《申请续用 Windows Server 2003 镜像服务协议》</a>",
        ECS_IMG_FROM_MARKET: "该镜像来源于镜像市场, 镜像价格为",
        ECS_IMG_FROM_MARKET_DETAIL: "<a href='https://help.aliyun.com/knowledge_detail/6688442.html' target='_blank' class='bk-link'>了解详情>></a>",
        ECS_IMG_NEEDLOGIN: "如有订阅镜像可以登录后查看",
        ECS_IMG_LOGIN: "立即登录",
        ECS_IMG_MARKET: "镜像市场",
        ECS_IMG_NOUSE: "当前类目下没有可用的镜像",
        ECS_IMG_BOUGHTNUM: "已购买：",
        ECS_IMG_USENUM: "在使用中：",
        ECS_IMG_LEFTNUM: "剩余可用：",
        ECS_IMG_SOURCE: "来源:",
        ECS_IMG_UNIT_HOUR: "时",
        ECS_IMG_UNIT: "个",
        ECS_IMG_AGREE: "同意并使用",
        ECS_IMG_USER: "使用",
        ECS_IMG_AGREETERMS: "同意《镜像使用协议》",
        ECS_IMG_CALCULATING: "正在计算价格请稍候...",
        ECS_IMG_ERROR: "询价失败，请重试",
        ECS_IMG_FEE: "镜像费用：",
        ECS_IMG_FEE_TIP: "您已购买过镜像有 {1} 个，已使用 {2} 个，此次还需额外购买 {3} 个镜像",
        ECS_IMG_BUY_NOW: "立即购买",
        ECS_ORDER_PNAME: "产品名称",
        ECS_ORDER_SETTING: "实例配置",
        ECS_ORDER_TIME: "购买周期",
        ECS_ORDER_QUANTITY: "数量",
        ECS_ORDER_PAYMETHOD: "付费方式",
        ECS_ORDER_COUPON: "优惠",
        ECS_ORDER_PRICE: "资费",
        ECS_ORDER_SERVER: "服务商: 阿里云计算有限公司",
        ECS_ORDER_HOSTNAME: "实例名称:",
        ECS_ORDER_PWD: "密码:",
        ECS_ORDER_FAIL_REASON: "失败原因",
        ECS_QUNIT: "台",
        ECS_ORDER_PUBLICPRICE: "公网流量费用：",
        ECS_CURRENT_IMG: "当前实例所用镜像产品 ID",
        ECS_SECURITY: "安全组 ID / 名称",
        YUNDISK_NORMAL_NOTICE: "云盘可以单独购买，按需付费，独立存在。数据可靠性达 99.999%。云盘可以在同一可用区内的不同 ECS 实例间自由挂载和卸载。",
        YUNDISK_POSTPAY_NEEDCERTIFY: '开通云盘需要先进行实名认证，<a href="https://account.aliyun.com/profile/certify.htm" target="_blank">马上认证&gt;&gt;</a>',
        YUNDISK_UNAVAILABLE_HAS_QUOTA_TIP: "您已经达到开通上限，不能再开通。",
        YUNDISK_UNAVAILABLE_NOT_ENOUGH_BALANCE: '开通按量付费云盘，您的账户余额不得少于 100 元，请充值后再开通，<a href="https://expense.console.aliyun.com/#/account/recharge/alipay" target="_blank">立即充值</a>',
        YUNDISK_RESIZE_PAY_POSTPAY: "去扩容",
        YUNDISK_RESIZE_PAY_PREPAY: "去支付",
        YUNDISK_CLOUD_DISK: "云盘",
        YUNDISK_CLOUD_BUYECS: "购买云服务器实例",
        YUNDISK_CATEGORY_INTRODUCE: '如何选择 SSD云盘 / 高效云盘 / 普通云盘，请看 <a href="http://help.aliyun.com/document_detail/ecs/product-introduction/storage/summary.html" target="_blank" class=\'bk-lnk\'>详细说明>></a>',
        ECS_IO_TIP: '选择支持 I/O 优化的实例，挂载 SSD云盘时能够获得 SSD云盘的全部存储性能，因为 I/O 优化为实例与云盘之间提供更好的网络能力，可保证 SSD云盘存储性能的发挥。<div class="bk-hr"></div>对于不支持 I/O 优化的实例，挂载 SSD云盘时，通常最高可获得 1000 左右的 IOPS 性能。',
        ECS_SECURITY_POP_TIP: "安全组类似防火墙功能，用于设置单台或多台云服务器的网络访问控制，它是重要的安全隔离手段。",
        ECS_SECURITY_TIP: "自动创建的安全组能满足大多数服务器需求, 您也可以根据需求新建安全组",
        ECS_SECURITY_NAME: "安全组名称",
        ECS_SECURITY_ID: "安全组 ID:",
        ECS_SECURITY_NAME_EXP_DISCRIPE: '名称须为 2 - 128 个字符，以大小写字母或中文开头，不支持字符 @/:="<>{[]} 和空格',
        ECS_PLEASE_SELECT_SECURITY: "选择安全组",
        ECS_AUTO_SECURITY: "自动创建安全组",
        ECS_SELECT_SECURITY: "已有安全组",
        ECS_CREATE_SECURITY: "新建安全组",
        ECS_SECURITY_SELECT_ONE: "选择安全组",
        ECS_SECURITY_USE: "使用",
        ECS_SECURITY_RESELECT: "重新选择安全组",
        ECS_SECURITY_NOUSE: "没有搜索到安全组",
        ECS_NOT_ENOUGH_SECURITY_QUOTA: '您在其他地域下已创建了 100 个安全组，该地域下已经不能再创建新的安全组了。你可以进入控制台删除不需要的安全组后再创建实例。 <a href="#">>>进入控制台</a>',
        ECS_DDOS_THRESHOLD: "阿里云免费提供最高 5Gbps 的恶意流量攻击防护，<a href='https://help.aliyun.com/knowledge_detail/5975212.html' target='_blank' class='bk-lnk'>了解更多>></a> <a href='https://www.aliyun.com/product/ddos' target='_blank' class='bk-lnk'>提升防护能力>></a>"
    }
}), define("aliyun-buy-ecs/lang/en", [], function () {
    return {
        ECS_IO_OPTIMIZED: "IO optimization",
        ECS_OPTIONS: "Configuration",
        ECS_BASE_OPTIONS: "Basic configuration",
        ECS_NETWORK: "Network",
        ECS_IMAGE: "Image",
        ECS_STORAGE: "Storage",
        ECS_PASSWORD: "Password",
        ECS_AMOUNT: "Quantity purchased",
        ECS_IMAGEMARKET_NUM: "Number of images",
        ECS_INSTANCE_UNIT: "unit(s)",
        ECS_RESTART_TIME: "Restart time",
        ECS_EXPIRATION_TIME_AFTER_RENEW_IS: "Expiration date after renewal",
        ECS_RENEW_WITH_DOWNGRADE: "Renewal for downgraded configuration",
        ECS_RENEW_DURATION: "Renewal length",
        ECS_SET_PASSWORD: "Set password",
        ECS_SET_NOW: "Set now",
        ECS_SET_AFTER_CREATED: "Set after purchase",
        ECS_LOGIN_NAME: "Login name",
        ECS_LOGIN_PASSWORD: "Login password",
        ECS_CONFIRM_PASSWORD: "Confirm password",
        ECS_INSTANCE_NAME: "Instance name",
        ECS_PASSWORD_EXP_DISCRIPE: "8-30 characters. It must contain letters in both upper and lower cases and digits. Special characters are not supported",
        ECS_PASSWORD_REPEAT_ERROR: "The two passwords do not match. Please enter them again.",
        ECS_INSTANCE_NAME_EXP_DISCRIPE: 'The name must be 2-128 characters and start with a letter (in upper or lower case) or a Chinese character. Special characters such as @/:="<>{[]} and space are not supported',
        ECS_PASSWORK_LOGIN_TIP: "After <a ng-click='login()'>Login</a>, users can customize settings",
        ECS_TODAY: "Today",
        ECS_OK: "OK",
        ECS_PROMPT: "Note",
        ECS_CLEAR: "Clear",
        ECS_WEEK: "week",
        ECS_PUBLIC_FLOW: "Public traffic",
        ECS_SELECT_FROM_IMAGE_MARKET: "Select from image market",
        ECS_RESELECT_IMAGE: "Reselect the image",
        ECS_CUSTOM_IMAGE: "Custom image",
        ECS_IMAGE_NAME: "Image name",
        ECS_PLEASE_SELECT_CUSTOM_IMAGE: "Select the custom image",
        ECS_CHANGE_OS: "Change OS",
        ECS_IMAGE_TYPE: "Image type",
        ECS_PUBLIC_IMAGE: "Public image",
        ECS_VIA_FLOW: "By traffic usage",
        ECS_VIA_FIXED_BANDWIDTH: "By fixed bandwidth",
        ECS_CLASSICAL_NETWORK: "Classic network",
        ECS_PRIVATE_NETWORK: "VPC",
        ECS_CHECKOUT_AMOUNT: "Price",
        ECS_PAY: "Go to the payment page",
        ECS_INSTANCE_INFO: "Current config",
        ECS_CPU: "CPU",
        ECS_MEMORY: "Memory",
        ECS_BANDWIDTH_TYPE: "Bandwidth type",
        ECS_BANDWIDTH: "Bandwidth",
        ECS_PEAK: "Peak value",
        ECS_REGION: "Region",
        ECS_ZONE: "Zone",
        ECS_NETWORK_TYPE: "Network type",
        ECS_LAN_IP: "Intranet IP",
        ECS_DATADISK: "Data disk",
        ECS_SYSDISK: "System disk",
        ECS_WAN_IP: "Public IP",
        ECS_OS: "OS",
        ECS_EXPIRATION_TIME: "Expiration date of current ECS",
        ECS_UPGRADE: "Upgrade",
        ECS_CALCULATING_PRICE: "Calculating price. Please wait...",
        ECS_BANDWIDTH_UPGRADE_CONFLICT_TIP: "In the period (or part of the period) you've selected, the bandwidth is already {0}Mbps. Please reselect.",
        ECS_PUBLIC_BANDWIDTH: "Public bandwidth",
        ECS_SERVICE_TERMS: '<a class="bk-order-pact-link" href="http://help.aliyun.com/view/13433718.html" target="_blank">ECS Service Terms</a>',
        ECS_BANDWIDTH_TEMP_UPGRADE: "Temporary bandwidth upgrade",
        ECS_BANDWIDTH_UPGRADE_START_TIME: "Start time of bandwidth upgrade",
        ECS_BANDWIDTH_UPGRADE_END_TIME: "End time of bandwidth upgrade",
        ECS_BANDWIDTH_TEMP_UPGRADE_CONFIRM_TITLE: "Kind reminder on temporary bandwidth upgrade of ECS",
        ECS_BANDWIDTH_TEMP_UPGRADE_CONFIRM_CONTENT: "First 0Mbps bandwidth upgrade: <br/>After payment, you need to restart the instances through ECS console or ECS API to bring the configuration change into effect. Instance restart through other methods will not be valid. ",
        ECS_BANDWIDTH_HISTORY: "Bandwidth change history",
        START_TIME_CANNOT_BE_BIGGER_THAN_END_TIME: "The start time cannot be larger than the end time",
        ECS_BANDWIDTH_UPGRADE_DETAIL_TIP: "Upgrade for {0} day(s). Bandwidth upgraded to {1}Mbps. At {2} 00:00:00, it will change back to {3}Mbps; After this upgrade, the default bandwidth will be {3}Mbps for ECS renewal. ",
        ECS_ZONE_TIP: "The zone refers to the physical zones with separate power supplies and networks in the same region. The intranet of zones is interconnected and fault isolation is adopted between different zones.  If you want to improve application availability, it is recommended you create instances in various zones. ",
        ECS_REGION_TIP: 'Product intranet of different regions is not interconnected. Once purchased, the region cannot be changed. Please select the region with caution. <a href="http://help.aliyun.com/view/13433645.html" target="_blank" class=\'bk-lnk\'>How to select&gt;&gt;</a>',
        ECS_MEMORY_512_TIP: "To ensure the performance, 512M memory does not support Windows OS. ",
        ECS_MEMORY_1024_TIP: "To ensure the performance, 2GB memory or above is recommended for Windows2008/2012. ",
        ECS_NETWORKTYPE_LINK: "<a href=\"http://help.aliyun.com/view/13748516.html\" target='_blank' class='bk-lnk bk-ml1' hidefocus=''>How to select&gt;&gt;</a>",
        ECS_NETWORKTYPE_TIP: "<span class='bk-black'>Network type: </span>it is different for different ECS features and it has nothing to do with the public network access quality by the providers. All providers' network access services are BGP lines. You can select and use the networks according to your needs.  <div class=\"bk-hr\"></div><span class='bk-black'>Classic network: </span>IP address is distributed in a unified way by Aliyun. It is easy to configure and convenient to use, and suitable for users who require ease of use and fast use of ECS.  <div class=\"bk-hr\"></div><span class='bk-black'>NPC: </span>it refers to the logically isolated private network. Users can customize network topology and IP address and it supports dedicated connections.  It is suitable for users familiar with network management. ",
        ECS_IMAGETYPE_TIP: "<span class='bk-black'>Public image: </span>it is the public basic image officially offered by Aliyun and only includes the initial system environment.  Please configure the application environment or related software based on your practical situations.  <div class=\"bk-hr\"></div><span class='bk-black'>Custom image: </span>it is generated based on the user system snapshot, including the initial system environment, application environment and related software configuration.  Selecting custom images to create ECS can save your time for repeated configuration.  <div class=\"bk-hr\"></div><span class='bk-black'>Image market: </span>it provides the image made by a third-party service provider. The image incorporates universal application environment and software on the OS, such as PHP runtime environment, and control panel to satisfy your personalized demands and save configuration time.  <a href=\"http://help.aliyun.com/view/11111494_13605249.html\" target='_blank'>Understand image market service&gt;&gt;</a>",
        ECS_IMAGETYPE_ROW_TIP: "The public image is the basic operation system.  The image market integrates the runtime environment and various software into the basic operation system. ",
        ECS_SYSDISK_TIP: "<span class='bk-black'>Generic purpose cloud disk: </span>it adopts a distributed three-copy mechanism, providing 99.999% data reliability; its storage is capable of hundreds of random I/O, and supports upgrading/downgrading of CPU and memory configurations after ordering.  <div class=\"bk-hr\"></div><span class='bk-black'>Ephemeral disk: </span>the I/O performance of the ephemeral disk is more stable and has a higher throughput than the generic purpose cloud disk; but it may have SPOF and it is recommended to sync important data to other instances or back them up to OSS. It does not support upgrading/downgrading of CPU, memory and ephemeral disk configurations after ordering.  <div class=\"bk-hr\"></div><span class='bk-black'>Ephemeral SSD disk: </span>it can offer up to 12,000 random read/write IOPS and 300MS/s storage. As its storage space is from the ephemeral SSD disk on the server, it may have SPOF. It is recommended to allocate data redundancy at the application layer to ensure data availability.  <div class=\"bk-hr\"></div><span class='bk-black'>Mounting point:  </span> Mounting point refers to the location where Aliyun ECS disk locates on the disk controller bus.  In Linux, the selected mounting point corresponds to the disk device number, and in Windows, it corresponds to the disk order in disk manager. ",
        ECS_YUNDUN_TIP: "Yundun can help you detect the safety hazards on the server while providing defense against major types of network attacks. ",
        ECS_OS_LINK: "<a href=\"http://help.aliyun.com/view/13439155.html\" target=\"_blank\" class='bk-lnk bk-ml2' hidefocus=''>How to select&gt;&gt;</a>",
        ECS_OS_TIP: "Free 20GB of system disk for Linux, and free 40GB of system disk for Windows. ",
        ECS_OS_TIP_HONGKONG: "ECS in Hong Kong region does not support interchange between the Linux and Windows for the time being. ",
        ECS_SUBTOTAL_PRICE_TIP: 'The bill shall prevail for actual charges <a href="http://help.aliyun.com/view/13433764.html" class=\'bk-lnk bk-ml2\' hidefocus target="_blank">Purchase and billing instructions&gt;&gt;</a>',
        ECS_PREPAY_NOTICE: "The monthly instances at present adopt pay-by-traffic bandwidth service by default.  If ECS is used for web access, please file the record of the website in time.  If ECS is used for SLB, go to the SLB purchase page to purchase the bandwidth. ECS only needs a little bandwidth necessary for the convenience of management. ",
        ECS_POSTPAY_NOTICE: "Volume-based purchase service does not support website record-filing. ",
        ECS_BANDWIDTH_FINANCE: 'Financial cloud public bandwidth only needs to be purchased when ECS initiates Internet accesses.  The web service for Internet must be achieved through purchasing SLB.  <a href="http://help.aliyun.com/view/11111638_13518460.html" target="_blank">Details&gt;&gt;</a>',
        ECS_BANDWIDTH_0: 'If 0M bandwidth is selected, you cannot access the public network (no public IP). Increase the bandwidth value if you want public IP<a class="bk-lnk bk-ml1" href="http://help.aliyun.com/view/13433506.html" target="_blank">How to select&gt;&gt;</a>',
        ECS_BANDWIDTH_RENEW_UPGRADE_0: "After 0M bandwidth is selected, your public IP address will be preserved.",
        ECS_BANDWIDTH_HONGKONG: "Hong Kong region adopts the international bandwidth and is not usable for access in Chinese mainland.  ",
        ECS_UNAVAILABLE_TIP: "The volume-based purchase has been closed for the time being for control purposes. Please try again later. ",
        ECS_PASSWORD_PRESET_TIP: "Please remember the password you set. If you forget the password, you can reset it on the ECS console. ",
        ECS_PASSWORD_AFTERSET_TIP: "After successful purchase, you can log in ECS console to reset your password. The system will not send the random password via messages and emails. ",
        ECS_POSTPAY_NEEDCERTIFY: 'Real-name authentication is required before opening volume-based purchase servers. <a href="https://account.aliyun.com/profile/certify.htm" target="_blank">Authenticate now&gt;&gt;</a>',
        ECS_PREPAY_NEEDCERTIFY: '开通包年包月的服务器需要先进行实名认证，<a href="https://account.aliyun.com/profile/certify.htm" target="_blank">马上认证&gt;&gt;</a>',
        ECS_RELEASEWITHECS_TIP: 'With "Release with instance" checked, the disk will be released with the instance and the data cannot be retrieved. With "Release with instance" not checked, the cloud disk will, instead of being released, be unmounted from the instance when users release the instances. ',
        ECS_ZHUANYUNDISK_TIP: 'When users change to volume-based cloud disks, with "Release with instance" checked, the disk will be released with the instance at expiration and the data cannot be retrieved. With "Release with instance" not checked, the cloud disk will, instead of being released, be unmounted from the instance when users release the instances at expiration. ',
        ECS_FLOWBANDWIDTH_TIP: "Pay by traffic: post-paid, and the charges are deducted hourly. To ensure normal operation of your services, please make sure you have enough balance in your account.",
        ECS_BANDWIDTHTYPE_TIP: "<span class='bk-black'>By fixed bandwidth: </span>you need to designate the bandwidth, such as 10Mbps (unit: bit) and the charges will be included in the bill of yearly/monthly instance fees.  <div class=\"bk-hr\"></div><span class='bk-black'>By traffic usage: </span>it charges based on the actual network traffic used.  Post-paid, and the charges are deducted hourly. To prevent high charges from sudden increase of traffic, users can designate the maximum bandwidth allowed<div class=\"bk-hr\"></div>",
        ECS_UPGRADE_FORBIDDEN_PEAK_TIP: "Your account has payments overdue and the pay-by-traffic bandwidth value has been reduced to zero. It cannot be adjusted.  After you recharge your account and pay the amount due, the system will restore the bandwidth peak automatically. ",
        ECS_NETWORK_VALIDATION_FALSE: "Your service fees are overdue and the pay-by-traffic bandwidth service is suspended. The system will resume bandwidth service for you after you recharge your account and pay the amount due. ",
        ECS_UNAVAILABLE_HAS_QUOTA_TIP: "You have reached the upper limit and cannot open more. ",
        ECS_UNAVAILABLE_REGION_OPEN_TIP: "The volume-based purchase has been closed for the time being for control purposes. Please try again later.",
        ECS_UPGRADE_PEAK_TIP: "Pay by traffic is post-paid and the charges are deducted hourly. To ensure normal operation of your services, please make sure you have enough balance in your account. ",
        ECS_UPGRADE_PEAK_HASRENEW_TIP: "You have a paid but executory order of renewal for configuration change. Before it goes effective, the system does not support adjustment to the currrent bandwidth peak. ",
        ECS_BANDWIDTH_US_WEST: "The US region adopts the international bandwidth and is not usable for access in Chinese mainland.",
        ECS_REGION_HOT_VM_TIP: "",
        ECS_REGION_HOT_ECS_TIP: "",
        ECS_REGION_SELL_OUT_TIP: "Sold out. Replenishment is underway. ",
        ECS_REGION_SELL_OUT_TIP_US_WEST: "Sold out. Replenishment is underway.",
        ECS_REGION__UNABLE_PURCHASE_TIP: "The product in the region you selected has been sold out. ",
        ECS_FLOW_PRICE_TIP: "Public traffic fees are collected based on the actual traffic used and on an hourly basis.  It only charges outflow traffic and the inflow traffic is free of charge.  <br/>E.g., if you use 6.51GB of outflow public traffic in an hour, the charges will be 6.51GB*0.8 yuan/hour=5.20 yuan. ",
        ECS_RENEW_CPU_RAM_DROP_TIP: 'Your current configuration is not for sale now. You can renew the current configuration and continue to use it, or you can change to the configuration currently available by clicking "I want to change configuration". ',
        ECS_RENEW_CHANGE_TIP: 'After you submit the renewal for configuration downgrading, the ECS cannot be changed in the current cycle. Please do it with caution. View details <a href="http://help.aliyun.com/view/13439157.html" target="_blank">The Do\'s and Don\'ts of Renewal for Configuration Downgrading</a>',
        ECS_UNAVAILABLE_NOT_ENOUGH_BALANCE: 'To open volume-based purchase ECS, your account balance should be no less than 100.00 yuan. Please recharge your account before proceeding. <a href="https://finance.aliyun.com/account/recharge.htm" target="_blank">Recharge now</a>',
        ECS_PLEASE_SELECT_CONFIG: "Select the configuration",
        ECS_OPERATE_FAILED: "Operation failed",
        ECS_ERRORTIP_SYSTEM_ERROR: "系统异常，请稍后再试",
        ECS_ERRORTIP_BANDWIDTH_TEMPUPGRADE_VPC_TYPE: "VPC does not support temporary upgrade of bandwidth",
        ECS_ERRORTIP_BANDWIDTH_TEMPUPGRADE_FLOW_TYPE: "Pay-by-traffic bandwidth does not support temporary upgrade of bandwidth",
        ECS_ERRORTIP_PARAMS_INVALID: "Illegal parameter. Please retry",
        ECS_ERRORTIP_DOWNGRADE_RENEW_CHANGE: "You have renewed for configuration change. Before {0} , the system will not support configuration upgrade/downgrade",
        ECS_ERRORTIP_DOWNGRADE_YUNMARKET_INSTANCE: "The instance does not support configuration upgrade/downgrade",
        ECS_ERRORTIP_YUNDISK_RESIZE_RENEW_CHANGE: "Sorry. You have completed the renewal for configuration change, but it has not entered the effective period. You cannot expand the disk in the current service cycle.",
        ECS_ERRORTIP_AFTER_PAY_CANNOT_RENEW: "非常抱歉，按量续费实例，不能进行续费操作",
        ECS_ERRORTIP_AFTER_PAY_CANNOT_CHAHNGE: "非常抱歉，按量续费实例，不能进行变配操作",
        ECS_PRICE_ERROR: "RFQ failed",
        ECS_BUY_YEARMONTH: "Yearly/monthly purchase",
        ECS_BUY_POSTPAY: "Volume-based purchase",
        ECS_BUY_NETDISK: "Purchase cloud disk",
        ECS_BUY_UPDATE: "Upgrade configuration",
        ECS_BUY_MUSTKNOW: "Instructions for purchase",
        ECS_BUY_RECOMMEND: "Recommended models ",
        ECS_RESULT_CONFIRM: "Confirm order",
        ECS_RESULT_ORDERLIST: "View order history",
        ECS_RESULT_CONSOLE: "Console",
        ECS_RESULT_TIP: "Sign the Alipay withholding service contract and the signed Alipay account will automatically pay the fees when there is not enough balances in your account. ",
        ECS_RESULT_TIPMORE: "More details",
        ECS_RESULT_TICKET: "Submit workorder",
        ECS_RESULT_WARMTIP: "Kind reminder",
        ECS_RESULT_WTIP1: 'Thank you for your support to Aliyun!  If you need any help in the follow-up operations, log into "User center - Aftersales support" to submit your questions.  <a href="http://workorder.aliyun.com/faq/addnew?spm=5176.6660585.774526181.d4911861" class="lnk" target="_blank">Quick entrance&gt;&gt;</a><br>Aliyun provides 7x24 aftersales support. ',
        ECS_RESULT_WTIP2: "If the overdue payments in your account are not paid in a timely manner, it may lead to a poor credit record and affect your use of Aliyun services (including but not limited to product purchase, public beta and marketing promotions). ",
        ECS_RESULT_WTIP3: 'Aliyun offers prime service systems such as refund with no reason within five days and 100 times of compensation for fault.  <a href="http://promotion.aliyun.com/act/jpfw.html?spm=5176.6660585.774526181.d4911873" class="lnk" target="_blank">Learn more&gt;&gt;</a> ',
        ECS_RESULT_SUCCESS: "Opened",
        ECS_RESULT_FAIL: "Failed",
        ECS_PORDER_CONFIRM: "Confirm order",
        ECS_PORDER_SUCCESS: "Opened",
        ECS_PORDER_PAY: "Pay",
        ECS_ORDER_IMPORTENTTIP: "Important: the paper invoice type and title for the order will be based on the information you set in User center - Invoice management center. ",
        ECS_ORDER_GOPAY: "Go to the payment page",
        ECS_ORDER_TERMS: "ECS Service Terms",
        YUNDISK_PAY_POSTPAY: "Open",
        ECS_BUY_APOP_NOTICE: "If the current configuration or quantity available do not meet your requirements, please apply for higher configurations by submitting a workorder. Note for submission: ",
        ECS_BUY_APOP_QUESTION: 'Question description: please fill in "<strong>detailed application scenarios, the configurations and quantities needed, etc</strong>"',
        ECS_BUY_APOP_COMMIT: '<a href="https://workorder.console.aliyun.com/console.htm#/ticket/add?productId=12&commonQuestionId=113" target="_blank">Submit workorder</a>',
        ECS_OLDPRICE: "Old price: ",
        ECS_REDUCE: "Saving: ",
        ECS_TOTAL: "Total: ",
        ECS_CHANGEOS_TITLE: "Kind reminder for changing ECS OS",
        ECS_CHANGEOS_TIP: "After ECS instances change the system disk, the disk ID will change and the old system disk will be released. <br/>1. After the system disk is changed, the user snapshots on the old system disk will be preserved, and auto snapshots will be released with the disk. <br/>2. To leave enough snapshot quota for fulfilling the auto snapshot policy of the new disk, you can delete the unwanted snapshots.",
        ECS_CHANGEOS_CTIP: "Aliyun is not liable for any data losses caused by your failure to backup personal data in the system. <br/>Are you sure to change the OS?",
        ECS_DATADISK_KINDS: "Disk category",
        ECS_DATADISK_SIZE: "Size",
        ECS_DATADISK_SNAPSHOT: "Create disk with snapshot",
        ECS_DATADISK_CSNAPSHOT: "Create disk with snapshot",
        ECS_DATADISK_MOUNTPOINT: "Mounting point",
        ECS_DATADISK_PAYMETHOD: "Payment method",
        ECS_DATADISK_SUPPORTUNMOUNT: "Unmount supported",
        ECS_DATADISK_UCANSELECT: "You can select another",
        ECS_DATADISK_PIECE: "disk(s); ",
        ECS_DATADISK_REMAIN: "Remaining available size: ",
        ECS_DATADISK_UNMOUNT: "Unmount; ",
        ECS_DATADISK_CONVERT: "Switch to volume-based purchase",
        ECS_DATADISK_RELEASE: "Release with instance",
        ECS_DATADISK_AUTO: "Auto configure mounting points",
        ECS_SNAP_LIST: "Snapshot list",
        ECS_SNAP_MSEARCH: "Fuzzy search",
        ECS_SNAP_JSEARCH: "Exact search",
        ECS_SNAP_SNAPID: "Snapshot ID",
        ECS_SNAP_SNAPNAME: "Snapshot name",
        ECS_SNAP_SNAME: "Name",
        ECS_SNAP_SIZE: "Size",
        ECS_SNAP_CREATETIME: "Created",
        ECS_SNAP_UNSELECT: "You have no snapshots yet",
        ECS_SNAP_NORESULT: "No conforming snapshot found",
        ECS_PREV: "Prev page",
        ECS_NEXT: "Next page",
        ECS_IMG_OFFLINE_WINDOWS2003_TIP: "微软停止对Windows Server 2003扩展支持，请您认真阅读以下协议，充分了解风险且同意下面协议后才可以继续使用Windows Server 2003镜像。",
        ECS_IMG_OFFLINE_WINDOWS2003_AGREEMENT: "我已了解风险并同意<a href='http://help.aliyun.com/knowledge_detail.htm?knowledgeId=6541028&categoryId=8314835' target='_blank' class='bk-link'>《申请续用Windows Server 2003镜像服务协议》</a>",
        ECS_IMG_FROM_MARKET: "该自定义镜像来源于镜像市场, 镜像价格为",
        ECS_IMG_FROM_MARKET_DETAIL: "<a href='http://help.aliyun.com/knowledge_detail/6675978.html' target='_blank' class='bk-link'>了解详情>></a>",
        ECS_IMG_NEEDLOGIN: "Subscribed image can be viewed after login",
        ECS_IMG_LOGIN: "Login now",
        ECS_IMG_MARKET: "Image market",
        ECS_IMG_NOUSE: "No available image in the current category",
        ECS_IMG_BOUGHTNUM: "Quantity purchased: ",
        ECS_IMG_USENUM: "Quantity used: ",
        ECS_IMG_LEFTNUM: "剩余可用:",
        ECS_IMG_SOURCE: "Source: ",
        ECS_IMG_UNIT: "个",
        ECS_IMG_AGREE: "Agree and use",
        ECS_IMG_AGREETERMS: "Agree with Image Use Agreement",
        ECS_IMG_CALCULATING: "Calculating price. Please wait...",
        ECS_IMG_ERROR: "RFQ failed. Try again",
        ECS_IMG_FEE: "Image fee: ",
        ECS_ORDER_PNAME: "Product name",
        ECS_ORDER_SETTING: "Instance configuration",
        ECS_ORDER_TIME: "Duration",
        ECS_ORDER_QUANTITY: "Quantity",
        ECS_ORDER_PAYMETHOD: "Payment method",
        ECS_ORDER_COUPON: "Discount",
        ECS_ORDER_PRICE: "Fee",
        ECS_ORDER_SERVER: "Service provider:   Aliyun.com",
        ECS_ORDER_HOSTNAME: "Instance name: ",
        ECS_ORDER_PWD: "Password: ",
        ECS_QUNIT: "unit(s)",
        ECS_ORDER_PUBLICPRICE: "Public traffic fee: ",
        YUNDISK_NORMAL_NOTICE: "The cloud disk can be separately purchased, paid on demand and independently configured.  Data reliability of up to 99.999%.  The cloud disk can be freely mounted and unmounted to different ECS instances in the same zone. ",
        YUNDISK_POSTPAY_NEEDCERTIFY: 'Real-name authentication is required before opening cloud disks. <a href="https://account.aliyun.com/profile/certify.htm" target="_blank">Authenticate now&gt;&gt;</a>',
        YUNDISK_UNAVAILABLE_HAS_QUOTA_TIP: "You have reached the upper limit and cannot open more.",
        YUNDISK_UNAVAILABLE_NOT_ENOUGH_BALANCE: 'To open cloud disks, your account balance should be no less than 100.00 yuan. Please recharge your account before proceeding. <a href="https://finance.aliyun.com/account/recharge.htm" target="_blank">Recharge now</a>',
        YUNDISK_RESIZE_PAY_POSTPAY: "Expand",
        YUNDISK_RESIZE_PAY_PREPAY: "Go to the payment page",
        YUNDISK_CLOUD_DISK: "Cloud disk",
        YUNDISK_CLOUD_BUYECS: "Buy ECS instances",
        ECS_IO_TIP: "Selecting instances that support I/O optimization can fully leverage the storage performance of SSD cloud disks with SSD cloud disks mounted, because I/O optimization can offer better network capabilities between the instances and cloud disks for SSD cloud disks to exert its storage performance. For instances that do not support I/O optimization, a maximum of 3,000 IOPS can be offered with SSD cloud disks. "
    }
}), define("aliyun-buy-ecs/lang/data/zh_ecs_prepay_subheader", [], function () {
    return {
        title: "云服务器 ECS",
        adinfo: {text: '<span class="aliyun-icon-good"></span>&nbsp;推荐购买', link: "https://www.aliyun.com/easybuy"},
        relations: [{text: "负载均衡", target: "_blank", url: "http://www.aliyun.com/product/slb"}],
        others: [{text: "云数据库 RDS", target: "_blank", url: "http://www.aliyun.com/product/rds"}, {
            text: "对象存储 OSS",
            target: "_blank",
            url: "http://www.aliyun.com/product/oss"
        }, {text: "云数据库Memcache版", target: "_blank", url: "http://www.aliyun.com/product/ocs"}]
    }
}), define("aliyun-buy-ecs/lang/data/zh_ecs_postpay_subheader", [], function () {
    return {
        title: "云服务器 ECS",
        adinfo: {text: "", link: ""},
        relations: [{text: "负载均衡", target: "_blank", url: "http://www.aliyun.com/product/slb"}],
        others: [{text: "云数据库 RDS", target: "_blank", url: "http://www.aliyun.com/product/rds"}, {
            text: "对象存储 OSS",
            target: "_blank",
            url: "http://www.aliyun.com/product/oss"
        }, {text: "云数据库Memcache版", target: "_blank", url: "http://www.aliyun.com/product/ocs"}]
    }
}), define("aliyun-buy-ecs/lang/data/zh_yundisk_subheader", [], function () {
    return {
        title: "云盘",
        relations: [{spmd: "d73500", text: "云服务器 ECS", target: "_blank", url: "https://buy.aliyun.com/ecs"}],
        others: [{
            spmd: "d73500",
            text: "开放存储服务 OSS",
            target: "_blank",
            url: "http://www.aliyun.com/product/oss"
        }, {spmd: "d73501", text: "开放缓存服务 OCS", target: "_blank", url: "http://www.aliyun.com/product/ocs"}]
    }
}), define("aliyun-buy-ecs/lang/data/banner", [], function () {
    return [{
        spmd: "d60980",
        link: "http://www.aliyun.com/act/aliyun/enterprise.html",
        target: "_blank",
        img: "//img.alicdn.com/tps/TB1A2QKIVXXXXbGapXXXXXXXXXX-1200-40.png"
    }]
}), define("aliyun-buy-ecs/module/main/remote", ["angular", "../common/homeConfigHelper", "../common/responseFormatter", "../../lang/zh", "../../lang/en", "../../lang/data/zh_ecs_prepay_subheader", "../../lang/data/zh_ecs_postpay_subheader", "../../lang/data/zh_yundisk_subheader", "../../lang/data/banner", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/utils/logger", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.local"], function (e, t, n, r, i, s, o, u, a, f, l, c, h) {
    function p(t, n, r, i) {
        i.register(t, function (t, i, s, o) {
            var u = function (e) {
                t.resolve(c.formatPriceRules(e.data))
            }, a = function (e) {
                t.reject(e)
            };
            s.invoke(["base64", function (s) {
                if (!i || !i[0] || i[0].length == 0) {
                    t.reject({code: "NO_DATA"});
                    return
                }
                var f = s.encode(e.toJson(i[0])), l = i[1] !== undefined ? "&promotionCode=" + i[1] : "", c = {
                    development: "localhost:3001",
                    test: "ecs-buy.aliyun.test",
                    production: "ecs-buy.aliyun.com"
                };
                window.location.host == c[n] ? o.post(r, "data=" + encodeURIComponent(f) + l).success(u).error(a) : o.jsonp(r + "p?callback=JSON_CALLBACK", {
                    params: {
                        data: f,
                        promotionCode: i[1]
                    }
                }).success(u).error(a)
            }])
        }, n)
    }

    function d(n, r, i, s) {
        s.register(n, function (r, s, o, u) {
            if (!s || !s[0])return;
            o.invoke(["base64", function (o) {
                var a = o.encode(e.toJson(s[0])), f = t.get("CSRF_TOKEN"), l = s[1] ? "&gmtRelease=" + s[1] : "", c = s[2] ? "&promotionCode=" + s[2] : "", h = t.getUmid(), p = t.getUA(), d = function (e) {
                    e.code == "200" && e.data ? n == "runInstances" ? r.resolve(e) : r.resolve(e.data) : r.reject(e)
                }, v = function (e) {
                    r.reject(e)
                };
                u.post(i, "data=" + encodeURIComponent(a) + "&_csrf_token=" + f + "&collina=" + p + "&umid=" + h + l + c).success(d).error(v)
            }])
        }, r)
    }

    function v(e, t, n, r) {
        r.register(e, function (t, r, i, s) {
            i.invoke(["aliyunBuyLocal", function (r) {
                require([n], function (n) {
                    t.resolve(n);
                    if (!n)return;
                    r.updateCommonText(e, n, !0)
                })
            }])
        }, t)
    }

    e.module("aliyun.buy.service.remote").config(["aliyunBuyRemoteProvider", function (t) {
        t.register("queryEcsInstanceInfo", function (e, t, n, r) {
            var i = t[0], s = t[1];
            if (!i || !s)return;
            i instanceof Array || (i = [i]), r.jsonp("http://localhost:3001/queryEcsInstanceInfo.jsonp?callback=JSON_CALLBACK", {
                params: {
                    instanceIds: i.join(","),
                    orderType: s
                }
            }).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("queryEcsInstanceInfo", function (e, t, n, r) {
            var i = t[0], s = t[1];
            if (!i || !s)return;
            i instanceof Array || (i = [i]), r.jsonp("//ecs-buy.aliyun.test/ecs/listEcsInstanceOrderInfo.jsonp?callback=JSON_CALLBACK", {
                params: {
                    instanceIds: i.join(","),
                    orderType: s
                }
            }).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("queryEcsInstanceInfo", function (e, t, n, r) {
            var i = t[0], s = t[1];
            if (!i || !s)return;
            i instanceof Array || (i = [i]), r.jsonp("//ecs-buy.aliyun.com/ecs/listEcsInstanceOrderInfo.jsonp?callback=JSON_CALLBACK", {
                params: {
                    instanceIds: i.join(","),
                    orderType: s
                }
            }).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("checkEcsOrderNotPaid", function (e, t, n, r) {
            var i = t[0];
            if (!i)return;
            i instanceof Array || (i = [i]), r.jsonp("http://localhost:3001/checkEcsOrderNotPaid.jsonp?callback=JSON_CALLBACK", {params: {instanceIds: i.join(",")}}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("checkEcsOrderNotPaid", function (e, t, n, r) {
            var i = t[0];
            if (!i)return;
            i instanceof Array || (i = [i]), r.jsonp("//ecs-buy.aliyun.test/price/checkOrderNotPaid.jsonp?callback=JSON_CALLBACK", {params: {instanceIds: i.join(",")}}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("checkEcsOrderNotPaid", function (e, t, n, r) {
            var i = t[0];
            if (!i)return;
            i instanceof Array || (i = [i]), r.jsonp("//ecs-buy.aliyun.com/price/checkOrderNotPaid.jsonp?callback=JSON_CALLBACK", {params: {instanceIds: i.join(",")}}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("queryEcsSnapshot", function (e, t, n, r) {
            var i = t[3], s = t[4], o = {region: t[0], pageSize: t[1], offset: t[2]};
            i && (o[i] = s), r.jsonp("http://localhost:3001/querySnapshot.jsonp?callback=JSON_CALLBACK", {params: o}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("queryEcsSnapshot", function (e, t, n, r) {
            var i = t[3], s = t[4], o = {region: t[0], pageSize: t[1], offset: t[2]};
            i && (o[i] = s), r.jsonp("//ecs-buy.aliyun.test/snapshot/querySnapshots.jsonp?callback=JSON_CALLBACK", {params: o}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("queryEcsSnapshot", function (e, t, n, r) {
            var i = t[3], s = t[4], o = {region: t[0], pageSize: t[1], offset: t[2]};
            i && (o[i] = s), r.jsonp("//ecs-buy.aliyun.com/snapshot/querySnapshots.jsonp?callback=JSON_CALLBACK", {params: o}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("queryMarketImageCategory", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/queryMarketImageCategory.jsonp?callback=JSON_CALLBACK").success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("queryMarketImageCategory", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/image/queryMarketImageCategory.jsonp?callback=JSON_CALLBACK").success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("queryMarketImageCategory", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/image/queryMarketImageCategory.jsonp?callback=JSON_CALLBACK").success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("queryMarketImages", function (e, t, n, r) {
            n.invoke(["base64", function (n) {
                r.jsonp("http://localhost:3001/queryMarketImages.jsonp?callback=JSON_CALLBACK", {
                    params: {
                        page: t[0],
                        category: t[1],
                        pageSize: t[2],
                        region: t[3],
                        instanceType: t[4],
                        supportIoOptimized: t[5] == "optimized" ? !0 : undefined
                    }
                }).success(function (t) {
                    e.resolve(t)
                }).error(function (t) {
                    e.reject(t)
                })
            }])
        }, "development"), t.register("queryMarketImages", function (e, t, n, r) {
            n.invoke(["base64", function (n) {
                r.jsonp("//ecs-buy.aliyun.test/image/queryMarketImages.jsonp?callback=JSON_CALLBACK", {
                    params: {
                        page: t[0],
                        category: t[1],
                        pageSize: t[2],
                        region: t[3],
                        instanceType: t[4],
                        supportIoOptimized: t[5] == "optimized" ? !0 : undefined
                    }
                }).success(function (t) {
                    e.resolve(t)
                }).error(function (t) {
                    e.reject(t)
                })
            }])
        }, "test"), t.register("queryMarketImages", function (e, t, n, r) {
            n.invoke(["base64", function (n) {
                r.jsonp("//ecs-buy.aliyun.com/image/queryMarketImages.jsonp?callback=JSON_CALLBACK", {
                    params: {
                        page: t[0],
                        category: t[1],
                        pageSize: t[2],
                        region: t[3],
                        instanceType: t[4],
                        supportIoOptimized: t[5] == "optimized" ? !0 : undefined
                    }
                }).success(function (t) {
                    e.resolve(t)
                }).error(function (t) {
                    e.reject(t)
                })
            }])
        }, "production"), t.register("getOrderInfoOfImageMarket", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/getOrderInfoOfImageMarket.jsonp?callback=JSON_CALLBACK", {params: {mirrorType: t[0]}}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("getOrderInfoOfImageMarket", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/imageMarket/getOrderInfo.jsonp?callback=JSON_CALLBACK", {params: {mirrorType: t[0]}}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("getOrderInfoOfImageMarket", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/imageMarket/getOrderInfo.jsonp?callback=JSON_CALLBACK", {params: {mirrorType: t[0]}}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("describeImages", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/describeImages.jsonp?callback=JSON_CALLBACK", {
                params: {
                    regionId: t[0],
                    pageNumber: t[1],
                    pageSize: t[2],
                    imageOwnerAlias: t[3],
                    instanceType: t[4],
                    isSupportIoOptimized: t[5] == "optimized" ? "True" : undefined,
                    oSType: t[6]
                }
            }).success(function (t) {
                t.code == "200" ? setTimeout(function () {
                    e.resolve(t.data)
                }, 500) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("describeImages", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/api/ecsImage/describeImages.jsonp?callback=JSON_CALLBACK", {
                params: {
                    regionId: t[0],
                    pageNumber: t[1],
                    pageSize: t[2],
                    imageOwnerAlias: t[3],
                    instanceType: t[4],
                    isSupportIoOptimized: t[5] == "optimized" ? "True" : undefined,
                    oSType: t[6]
                }
            }).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("describeImages", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/api/ecsImage/describeImages.jsonp?callback=JSON_CALLBACK", {
                params: {
                    regionId: t[0],
                    pageNumber: t[1],
                    pageSize: t[2],
                    imageOwnerAlias: t[3],
                    instanceType: t[4],
                    isSupportIoOptimized: t[5] == "optimized" ? "True" : undefined,
                    oSType: t[6]
                }
            }).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("queryEcsVpc", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/queryEcsVpc.jsonp?callback=JSON_CALLBACK", {
                params: {
                    regionNo: t[0],
                    iz: t[1]
                }
            }).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("queryEcsVpc", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/vpc/queryVPCList.jsonp?callback=JSON_CALLBACK", {
                params: {
                    regionNo: t[0],
                    iz: t[1]
                }
            }).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("queryEcsVpc", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/vpc/queryVPCList.jsonp?callback=JSON_CALLBACK", {
                params: {
                    regionNo: t[0],
                    iz: t[1]
                }
            }).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("queryEcsVpcIp", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/queryEcsVpcIp.jsonp?callback=JSON_CALLBACK", {params: {vswitchId: t[0]}}).success(function (t) {
                e.resolve(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("queryEcsVpcIp", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/vpc/getAvailableIpCount.jsonp?callback=JSON_CALLBACK", {params: {vswitchId: t[0]}}).success(function (t) {
                e.resolve(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("queryEcsVpcIp", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/vpc/getAvailableIpCount.jsonp?callback=JSON_CALLBACK", {params: {vswitchId: t[0]}}).success(function (t) {
                e.resolve(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("getEcsCommodity", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/getEcsCommodity.jsonp?callback=JSON_CALLBACK", {
                params: {
                    commodityCode: t[0],
                    orderType: t[1] || "BUY",
                    instanceId: t[2],
                    token: t[3] || undefined
                }
            }).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("getEcsCommodity", function (e, t, n, r) {
            var i = t[2], s = i && i.indexOf(",") != -1, o = s ? "//ecs-buy.aliyun.test/ecs/listCommodity.jsonp?callback=JSON_CALLBACK" : "//ecs-buy.aliyun.test/ecs/getCommodity.jsonp?callback=JSON_CALLBACK", u = {
                commodityCode: t[0],
                orderType: t[1] || "BUY",
                token: t[3] || undefined
            };
            u[s ? "instanceIds" : "instanceId"] = i, r.jsonp(o, {params: u}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("getEcsCommodity", function (e, t, n, r) {
            var i = t[2], s = i && i.indexOf(",") != -1, o = s ? "//ecs-buy.aliyun.com/ecs/listCommodity.jsonp?callback=JSON_CALLBACK" : "//ecs-buy.aliyun.com/ecs/getCommodity.jsonp?callback=JSON_CALLBACK", u = {
                commodityCode: t[0],
                orderType: t[1] || "BUY",
                token: t[3] || undefined
            };
            u[s ? "instanceIds" : "instanceId"] = i, r.jsonp(o, {params: u}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("checkToken4Ecs", function (e, t, n, r) {
            if (!t || !t[0])return;
            var i = t[0];
            r.post("/checkToken4Ecs.json", "_csrf_token=" + i).success(function (t) {
                t.code == "200" ? e.resolve(t) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("checkToken4Ecs", function (e, t, n, r) {
            if (!t || !t[0])return;
            var i = t[0];
            r.post("//ecs-buy.aliyun.test/risk/checkToken.json", "_csrf_token=" + i).success(function (t) {
                t.code == "200" ? e.resolve(t) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("checkToken4Ecs", function (e, t, n, r) {
            if (!t || !t[0])return;
            var i = t[0];
            r.post("//ecs-buy.aliyun.com/risk/checkToken.json", "_csrf_token=" + i).success(function (t) {
                t.code == "200" ? e.resolve(t) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("queryDiskInfo", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/queryDiskInfo.jsonp?callback=JSON_CALLBACK", {params: {diskId: t[0]}}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("queryDiskInfo", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/disk/queryDiskInfo.jsonp?callback=JSON_CALLBACK", {params: {diskId: t[0]}}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("queryDiskInfo", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/disk/queryDiskInfo.jsonp?callback=JSON_CALLBACK", {params: {diskId: t[0]}}).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("getEcsLang", function (e, t, n, i) {
            var s = t[0];
            e.resolve(r), n.invoke(["aliyunBuyLocal", function (e) {
                e.updateCommonText("getEcsLang", r)
            }])
        }, "development"), t.register("getEcsLang", function (e, t, n, i) {
            var s = t[0];
            e.resolve(r), n.invoke(["aliyunBuyLocal", function (e) {
                e.updateCommonText("getEcsLang", r)
            }])
        }, "test"), t.register("getEcsLang", function (e, t, n, i) {
            var s = t[0];
            e.resolve(r), n.invoke(["aliyunBuyLocal", function (e) {
                e.updateCommonText("getEcsLang", r)
            }])
        }, "production"), t.register("linkToOrderPayPage", function (e, t) {
            var n = t[0];
            n.split(",").length > 1 ? window.location.href = "/order/list_pay?order_id=" + n : window.location.href = "/order/pay?order_id=" + n
        }, "development"), t.register("linkToOrderPayPage", function (e, t) {
            var n = t[0];
            n.split(",").length > 1 ? window.location.href = "//finance.aliyun.test/order/list_pay?order_id=" + n : window.location.href = "//finance.aliyun.test/order/pay?order_id=" + n
        }, "test"), t.register("linkToOrderPayPage", function (e, t) {
            var n = t[0];
            n.split(",").length > 1 ? window.location.href = "//finance.aliyun.com/order/list_pay?order_id=" + n : window.location.href = "//finance.aliyun.com/order/pay?order_id=" + n
        }, "production"), t.register("linkToEcsInstancePage", function (e, t) {
            window.location.href = "//localhost:3000/#/server/region/"
        }, "development"), t.register("linkToEcsInstancePage", function (e, t) {
            window.location.href = "//ecs.console.aliyun.test/#/server/region/"
        }, "test"), t.register("linkToEcsInstancePage", function (e, t) {
            window.location.href = "//ecs.console.aliyun.com/#/server/region/"
        }, "production"), t.register("linkToCertifiedPage", function (e, t) {
            window.open("//localhost:3000/#/auth/home")
        }, "development"), t.register("linkToCertifiedPage", function (e, t) {
            window.open("//account.console.aliyun.test/#/auth/home")
        }, "test"), t.register("linkToCertifiedPage", function (e, t) {
            window.open("//account.console.aliyun.com/#/auth/home")
        }, "production"), t.register("linkToEcsDiskPage", function (e, t) {
            window.location.href = "//localhost:3000/#/disk/region/"
        }, "development"), t.register("linkToEcsDiskPage", function (e, t) {
            window.location.href = "//ecs.console.aliyun.test/#/disk/region/"
        }, "test"), t.register("linkToEcsDiskPage", function (e, t) {
            window.location.href = "//ecs.console.aliyun.com/#/disk/region/"
        }, "production"), t.register("queryAllIzName", function (e, t, n, r) {
            r.jsonp("//localhost:3001/queryAllIzName.jsonp?callback=JSON_CALLBACK").success(function (t) {
                e.resolve(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("queryAllIzName", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/iz/queryAllIzName.jsonp?callback=JSON_CALLBACK").success(function (t) {
                e.resolve(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("queryAllIzName", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/iz/queryAllIzName.jsonp?callback=JSON_CALLBACK").success(function (t) {
                e.resolve(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("getEcsBandwidthHistory", function (e, t, r, i) {
            i.jsonp("http://localhost:3001/queryBandwidthHistory.jsonp?callback=JSON_CALLBACK", {params: {instanceId: t[0]}}).success(function (t) {
                e.resolve(n.bandwidthHistory(t.data))
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("getEcsBandwidthHistory", function (e, t, r, i) {
            i.jsonp("//ecs-buy.aliyun.test/ecs/queryBandwidthHistory.jsonp?callback=JSON_CALLBACK", {params: {instanceId: t[0]}}).success(function (t) {
                e.resolve(n.bandwidthHistory(t.data))
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("getEcsBandwidthHistory", function (e, t, r, i) {
            i.jsonp("//ecs-buy.aliyun.com/ecs/queryBandwidthHistory.jsonp?callback=JSON_CALLBACK", {params: {instanceId: t[0]}}).success(function (t) {
                e.resolve(n.bandwidthHistory(t.data))
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("queryImageByImageId", function (t, n, r, i) {
            var s = n[0], o = n[1], u = n[2] == "optimized" ? !0 : !1;
            o = o instanceof Array ? o : [o];
            var a = [];
            e.forEach(o, function (e) {
                a.push(encodeURIComponent(e))
            }), i.jsonp("http://localhost:3001/queryImageByImageId.jsonp?callback=JSON_CALLBACK", {
                params: {
                    region: s,
                    id: a.join(","),
                    supportIoOptimized: u ? u : undefined
                }
            }).success(function (e) {
                t.resolve(e.data)
            }).error(function (e) {
                t.reject(e)
            })
        }, "development"), t.register("queryImageByImageId", function (t, n, r, i) {
            var s = n[0], o = n[1], u = n[2] == "optimized" ? !0 : !1;
            o = o instanceof Array ? o : [o];
            var a = [];
            e.forEach(o, function (e) {
                a.push(encodeURIComponent(e))
            }), i.jsonp("//ecs-buy.aliyun.test/image/queryImageByImageId.jsonp?callback=JSON_CALLBACK", {
                params: {
                    region: s,
                    id: a.join(","),
                    supportIoOptimized: u ? u : undefined
                }
            }).success(function (e) {
                t.resolve(e.data)
            }).error(function (e) {
                t.reject(e)
            })
        }, "test"), t.register("queryImageByImageId", function (t, n, r, i) {
            var s = n[0], o = n[1], u = n[2] == "optimized" ? !0 : !1;
            o = o instanceof Array ? o : [o];
            var a = [];
            e.forEach(o, function (e) {
                a.push(encodeURIComponent(e))
            }), i.jsonp("//ecs-buy.aliyun.com/image/queryImageByImageId.jsonp?callback=JSON_CALLBACK", {
                params: {
                    region: s,
                    id: a.join(","),
                    supportIoOptimized: u ? u : undefined
                }
            }).success(function (e) {
                t.resolve(e.data)
            }).error(function (e) {
                t.reject(e)
            })
        }, "production"), t.register("queryImageIdByRegion", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/queryImageIdByRegion.jsonp?callback=JSON_CALLBACK", {
                params: {
                    region: t[0],
                    version: t[1],
                    imageProductCode: t[2]
                }
            }).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("queryImageIdByRegion", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/image/queryImageIdByRegion.jsonp?callback=JSON_CALLBACK", {
                params: {
                    region: t[0],
                    version: t[1],
                    imageProductCode: t[2]
                }
            }).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("queryImageIdByRegion", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/image/queryImageIdByRegion.jsonp?callback=JSON_CALLBACK", {
                params: {
                    region: t[0],
                    version: t[1],
                    imageProductCode: t[2]
                }
            }).success(function (t) {
                e.resolve(t.data)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("getEcsFlowPrice", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/getEcsFlowPrice.jsonp?callback=JSON_CALLBACK", {
                params: {
                    commodityCode: t[0],
                    region: t[1]
                }
            }).success(function (t) {
                var n = c.formatPriceRules(t.data);
                e.resolve(n), h.log("[getEcsFlowPrice data]", n)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("getEcsFlowPrice", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/price/getFlowPrice.jsonp?callback=JSON_CALLBACK", {
                params: {
                    commodityCode: t[0],
                    region: t[1]
                }
            }).success(function (t) {
                var n = c.formatPriceRules(t.data);
                e.resolve(n), h.log("[getEcsFlowPrice data]", n)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("getEcsFlowPrice", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/price/getFlowPrice.jsonp?callback=JSON_CALLBACK", {
                params: {
                    commodityCode: t[0],
                    region: t[1]
                }
            }).success(function (t) {
                var n = c.formatPriceRules(t.data);
                e.resolve(n)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("getEcsListFlowPriceMap", function (e, t, n, r) {
            if (!(t[1] instanceof Array) || !t[0])return;
            r.jsonp("http://localhost:3001/getEcsListFlowPriceMap.jsonp?callback=JSON_CALLBACK", {
                params: {
                    commodityCode: t[0],
                    regions: t[1].join(",")
                }
            }).success(function (t) {
                e.resolve(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("getEcsListFlowPriceMap", function (e, t, n, r) {
            if (!(t[1] instanceof Array) || !t[0])return;
            r.jsonp("//ecs-buy.aliyun.test/price/listFlowPriceMap.jsonp?callback=JSON_CALLBACK", {
                params: {
                    commodityCode: t[0],
                    regions: t[1].join(",")
                }
            }).success(function (t) {
                e.resolve(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("getEcsListFlowPriceMap", function (e, t, n, r) {
            if (!(t[1] instanceof Array) || !t[0])return;
            r.jsonp("//ecs-buy.aliyun.com/price/listFlowPriceMap.jsonp?callback=JSON_CALLBACK", {
                params: {
                    commodityCode: t[0],
                    regions: t[1].join(",")
                }
            }).success(function (t) {
                e.resolve(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("getNeedKeepUsingOfflineImage", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/getNeedKeepUsingOfflineImage.jsonp?callback=JSON_CALLBACK", {}).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("getNeedKeepUsingOfflineImage", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/image/getNeedKeepUsingOfflineImage.jsonp?callback=JSON_CALLBACK", {}).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("getNeedKeepUsingOfflineImage", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/image/getNeedKeepUsingOfflineImage.jsonp?callback=JSON_CALLBACK", {}).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("keepUsingOfflineImage", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/keepUsingOfflineImage.jsonp?callback=JSON_CALLBACK", {params: {platform: t[0]}}).success(function (t) {
                t.code == "200" ? e.resolve(t) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("keepUsingOfflineImage", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/image/keepUsingOfflineImage.jsonp?callback=JSON_CALLBACK", {params: {platform: t[0]}}).success(function (t) {
                t.code == "200" ? e.resolve(t) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("keepUsingOfflineImage", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/image/keepUsingOfflineImage.jsonp?callback=JSON_CALLBACK", {params: {platform: t[0]}}).success(function (t) {
                t.code == "200" ? e.resolve(t) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("queryEcsSecurityGroupList", function (e, t, n, r) {
            var i = t[0];
            r.jsonp("http://localhost:3001/queryEcsSecurityGroupList.jsonp?callback=JSON_CALLBACK", {params: i}).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("queryEcsSecurityGroupList", function (e, t, n, r) {
            var i = t[0];
            r.jsonp("//ecs-buy.aliyun.test/security/queryEcsSecurityGroupList.jsonp?callback=JSON_CALLBACK", {params: i}).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("queryEcsSecurityGroupList", function (e, t, n, r) {
            var i = t[0];
            r.jsonp("//ecs-buy.aliyun.com/security/queryEcsSecurityGroupList.jsonp?callback=JSON_CALLBACK", {params: i}).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("queryLimitation", function (e, t, n, r) {
            r.jsonp("http://localhost:3001/queryLimitation.jsonp?callback=JSON_CALLBACK", {params: {limitation: t[0]}}).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("queryLimitation", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/security/queryLimitation.jsonp?callback=JSON_CALLBACK", {params: {limitation: t[0]}}).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("queryLimitation", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/security/queryLimitation.jsonp?callback=JSON_CALLBACK", {params: {limitation: t[0]}}).success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("inWhiteUidList", function (e, t, n, r) {
            r.jsonp("//localhost:3001/inWhiteUidList.jsonp?callback=JSON_CALLBACK").success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "development"), t.register("inWhiteUidList", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.test/abTest/inWhiteUidList.jsonp?callback=JSON_CALLBACK").success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "test"), t.register("inWhiteUidList", function (e, t, n, r) {
            r.jsonp("//ecs-buy.aliyun.com/abTest/inWhiteUidList.jsonp?callback=JSON_CALLBACK").success(function (t) {
                t.code == "200" ? e.resolve(t.data) : e.reject(t)
            }).error(function (t) {
                e.reject(t)
            })
        }, "production"), t.register("getEcsPrepaySubheaderData", function (e, t, n, r) {
            e.resolve(s)
        }, "development"), t.register("getEcsPrepaySubheaderData", function (e, t, n, r) {
            e.resolve(s)
        }, "test"), t.register("getEcsPrepaySubheaderData", function (e, t, n, r) {
            e.resolve(s)
        }, "production"), t.register("getEcsPostpaySubheaderData", function (e, t, n, r) {
            e.resolve(o)
        }, "development"), t.register("getEcsPostpaySubheaderData", function (e, t, n, r) {
            e.resolve(o)
        }, "test"), t.register("getEcsPostpaySubheaderData", function (e, t, n, r) {
            e.resolve(o)
        }, "production"), t.register("getEcsBannerData", function (e, t, n, r) {
            e.resolve(a)
        }, "development"), t.register("getEcsBannerData", function (e, t, n, r) {
            e.resolve(a)
        }, "test"), t.register("getEcsBannerData", function (e, t, n, r) {
            e.resolve(a)
        }, "production"), t.register("getYundiskSubheaderData", function (e, t, n, r) {
            e.resolve(u)
        }, "development"), t.register("getYundiskSubheaderData", function (e, t, n, r) {
            e.resolve(u)
        }, "test"), t.register("getYundiskSubheaderData", function (e, t, n, r) {
            e.resolve(u)
        }, "production"), p("getEcsBuyPrice", "development", "http://localhost:3001/getEcsBuyPrice.json", t), p("getEcsBuyPrice", "test", "//ecs-buy.aliyun.test/price/queryForOrder.json", t), p("getEcsBuyPrice", "production", "//ecs-buy.aliyun.com/price/queryForOrder.json", t), p("getEcsImageBuyPrice", "development", "http://localhost:3001/getEcsImageBuyPrice.json", t), p("getEcsImageBuyPrice", "test", "//ecs-buy.aliyun.test/price/queryForOrder.json", t),p("getEcsImageBuyPrice", "production", "//ecs-buy.aliyun.com/price/queryForOrder.json", t),p("getEcsRenewPrice", "development", "http://localhost:3001/getEcsRenewPrice.json", t),p("getEcsRenewPrice", "test", "//ecs-buy.aliyun.test/price/listForOrder.json", t),p("getEcsRenewPrice", "production", "//ecs-buy.aliyun.com/price/listForOrder.json", t),p("getEcsUpgradePrice", "development", "http://localhost:3001/getEcsUpgradePrice.json", t),p("getEcsUpgradePrice", "test", "//ecs-buy.aliyun.test/price/queryForOrder.json", t),p("getEcsUpgradePrice", "production", "//ecs-buy.aliyun.com/price/queryForOrder.json", t),p("getYundiskResizePrice", "development", "http://localhost:3001/getYundiskResizePrice.json", t),p("getYundiskResizePrice", "test", "//ecs-buy.aliyun.test/price/queryForResizeDisk.json", t),p("getYundiskResizePrice", "production", "//ecs-buy.aliyun.com/price/queryForResizeDisk.json", t),d("orderAndCreateEcs", "development", "http://localhost:3001/orderAndCreateEcs.json", t),d("orderAndCreateEcs", "test", "//ecs-buy.aliyun.test/order/orderAndCreateEcs.json", t),d("orderAndCreateEcs", "production", "//ecs-buy.aliyun.com/order/orderAndCreateEcs.json", t),d("runInstances", "development", "http://localhost:3001/runInstances.json", t),d("runInstances", "test", "//ecs-buy.aliyun.test/api/ecsOrder/runInstances.json", t),d("runInstances", "production", "//ecs-buy.aliyun.com/api/ecsOrder/runInstances.json", t),d("orderAndCreateCloudDisk", "development", "http://localhost:3001/orderAndCreateCloudDisk.json", t),d("orderAndCreateCloudDisk", "test", "//ecs-buy.aliyun.test/order/orderAndCreateCloudDisk.json", t),d("orderAndCreateCloudDisk", "production", "//ecs-buy.aliyun.com/order/orderAndCreateCloudDisk.json", t)
    }])
}), define("aliyun-buy-ecs/module/common/constants/ecsBuyCons", ["angular"], function () {
    var e = {
        development: "localhost:3000",
        test: "ecs.console.aliyun.test",
        production: "ecs.console.aliyun.com"
    }, t = {
        development: "localhost:3001",
        test: "ecs-buy.aliyun.test",
        production: "ecs-buy.aliyun.com"
    }, n = {
        development: "buy.alyun.test",
        test: "buy.aliyun.test",
        production: "buy.aliyun.com"
    }, r = {AfterPay: "AfterPay", PrePay: "PrePaid"}, i = {
        ephemeral: "ephemeral",
        ephemeralSSD: "ephemeral_ssd",
        cloud: "cloud",
        cloudSSD: "cloud_ssd",
        cloudEfficiency: "cloud_efficiency"
    }, s = {
        "ecs.n1": 'CPU / 内存比为 1:2。<div class="bk-hr"></div>Intel Xeon E5-2680 v3（Haswell）处理器，2.5GHZ 的主频。<div class="bk-hr"></div>适合小型 Web 应用、中小型数据库',
        "ecs.n2": 'CPU / 内存比为 1:4。<div class="bk-hr"></div>Intel Xeon E5-2680 v3（Haswell）处理器，2.5GHZ 的主频。<div class="bk-hr"></div>适合小型 Web 应用、中小型数据库',
        "ecs.e3": 'CPU / 内存比为 1:8。<div class="bk-hr"></div>Intel Xeon E5-2680 v3（Haswell）处理器，2.5GHZ 的主频。<div class="bk-hr"></div>适合需要大量的内存操作、查找和计算的应用'
    }, o = {x86_64: "64", i386: "32"}, u = {
        custom: "self",
        "public": "system",
        shared: "others",
        market: "marketplace"
    }, a = {
        "1c512": {instanceType: "ecs.t1.xsmall", instanceGeneration: "ecs-1"},
        "1c4096": {instanceType: "ecs.s1.medium", instanceGeneration: "ecs-1"},
        "1c1536": {instanceType: "ecs.s1.xsmall", instanceGeneration: "ecs-1"},
        "1c8192": {instanceType: "ecs.s1.large", instanceGeneration: "ecs-1"},
        "1c2048": {instanceType: "ecs.s1.small", instanceGeneration: "ecs-1"},
        "1c1024": {instanceType: "ecs.t1.small", instanceGeneration: "ecs-1"},
        "2c1536": {instanceType: "ecs.s2.xsmall", instanceGeneration: "ecs-1"},
        "2c2560": {instanceType: "ecs.s2.medium", instanceGeneration: "ecs-1"},
        "2c2048": {instanceType: "ecs.s2.small", instanceGeneration: "ecs-1"},
        "2c16384": {instanceType: "ecs.s2.2xlarge", instanceGeneration: "ecs-1"},
        "2c8192": {instanceType: "ecs.s2.xlarge", instanceGeneration: "ecs-1"},
        "2c4096": {instanceType: "ecs.s2.large", instanceGeneration: "ecs-1"},
        "4c12288": {instanceType: "ecs.m1.small", instanceGeneration: "ecs-1"},
        "4c32768": {instanceType: "ecs.m2.medium", instanceGeneration: "ecs-1"},
        "4c4096": {instanceType: "ecs.s3.medium", instanceGeneration: "ecs-1"},
        "4c16384": {instanceType: "ecs.m1.medium", instanceGeneration: "ecs-1"},
        "4c8192": {instanceType: "ecs.s3.large", instanceGeneration: "ecs-1"},
        "8c32768": {instanceType: "ecs.m1.xlarge", instanceGeneration: "ecs-1"},
        "8c8192": {instanceType: "ecs.c1.small", instanceGeneration: "ecs-1"},
        "8c24576": {instanceType: "ecs.m1.large", instanceGeneration: "ecs-1"},
        "8c65536": {instanceType: "ecs.m2.xlarge", instanceGeneration: "ecs-1"},
        "8c16384": {instanceType: "ecs.c1.large", instanceGeneration: "ecs-1"},
        "8c12288": {instanceType: "ecs.c1.medium", instanceGeneration: "ecs-1"},
        "16c16384": {instanceType: "ecs.c2.medium", instanceGeneration: "ecs-1"},
        "16c32768": {instanceType: "ecs.c2.large", instanceGeneration: "ecs-1"},
        "16c65536": {instanceType: "ecs.c2.xlarge", instanceGeneration: "ecs-1"}
    }, f = {chargeSize: 40};
    return {
        hostMapOfEcsConsole: e,
        hostMapOfEcsBuy: t,
        hostMapOfEcsOldBuy: n,
        ChargeType: r,
        DiskCategory: i,
        InstanceTypefamliyIntroMap: s,
        CpuMemoryMap: a,
        OSBitMap: o,
        ImageType: u,
        SystemDisk: f
    }
}), define("aliyun-buy-ecs/module/main/order", ["angular", "../common/constants/ecsBuyCons", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/utils/logger", "aliyun-buy/base/services/service.order"], function (e, t, n, r, i, s) {
    e.module("aliyun.buy.service.order").config(["aliyunBuyOrderModelProvider", function (s) {
        function o(t, n, r) {
            var s = e.copy(n.data), o = e.copy(n.components);
            return o || (o = {}), s || (s = {}), e.extend(o, s), i.config({
                region: o.vm_region_no,
                zone: o.vm_iz,
                instanceType: g(t, o),
                instanceTypeFamily: y(t, o),
                instanceGeneration: b(t, o),
                io: o.iooptimized,
                networkType: o["vm_web_type"] == "1" ? "1" : "0",
                vpc: w(t, o),
                bandwidthType: E(t, o),
                bandwidth: S(t, o),
                sysdisk: m(t, o),
                datadisk: v(t, o),
                amount: s ? s.quantity : undefined,
                duration: x(t, n, r),
                orderSource: o.orderSource
            }, u(t, n, r))
        }

        function u(t, n, r) {
            var i = n.data, s = n.components;
            if (!s)return null;
            var o = n[r.imageType];
            o || (o = s.vm_os && s.vm_os[0] ? s.vm_os[0].vm_os_type : undefined);
            var u = s[r.os] ? s[r.os][0] : null, a;
            o == "public" ? a = "os" : o == "custom" ? a = "customImage" : o == "shared" ? a = "sharedImage" : o == "market" ? a = "imageMarket" : a = "os";
            var f = {};
            return f.imageType = o, f.imageId = u && u.vm_os, u && (f[a] = e.toJson([u.vm_os, u.vm_os_kind, u.vm_os_bit], !0)), f
        }

        function a(t, n, r) {
            var i = [];
            if (n.datadisk) {
                var s = e.fromJson(n.datadisk);
                e.forEach(s, function (e) {
                    e[1] && parseInt(e[1]) > 0 && !e[4] && e[7] !== !0 && i.push({
                        type: e[0],
                        size: e[1].toString(),
                        vm_snapshot_id: e[2],
                        disk_type: e[5],
                        mount_point: e[3]
                    })
                })
            }
            return i
        }

        function f(t, n, r) {
            var i = n[r.os_type], s;
            return i == "public" ? s = n[r.vm_os] : i == "custom" ? s = n[r.custom_os] : i == "market" ? s = n[r.market_os] : i == "shared" && (s = n[r.shared_os]), s ? e.fromJson(s) || [] : []
        }

        function l(t, i, s, o) {
            if (!i.datadisk)return null;
            var u = [], a = e.fromJson(i.datadisk);
            for (var f = 0; f < a.length; f++) {
                var l = a[f];
                if (!l[1])return;
                var c = l[5] ? "True" : "False", h = r.reverseMap(n.DISK_TYPE_MAP), p = r.mapping(l[0], h);
                if (p == "ephemeral_ssd" || p == "ephemeral")c = "True";
                u.push({
                    category: p,
                    size: l[1].toString(),
                    snapshotId: l[2] ? l[2] : "",
                    device: o ? undefined : l[3] ? l[3] : "",
                    deletewithinstance: c
                })
            }
            return u
        }

        function c(t, i, s, o) {
            if (!i.datadisk)return null;
            var u = [], a = e.fromJson(i.datadisk);
            for (var f = 0; f < a.length; f++) {
                var l = a[f];
                if (!l[1])return;
                if (t && t.config && t.config.spec_code == "vm" && t.config.orderType == "RENEW" && l[6] === !1)continue;
                var c = l[5] ? l[5].toString() : "false";
                t && t.config && t.config.spec_code == "vm" && t.config.orderType == "BUY" && (c = "true");
                var h = r.reverseMap(n.DISK_TYPE_MAP), p = r.mapping(l[0], h);
                u.push({
                    datadisk_category: p,
                    datadisk_size: l[1].toString(),
                    datadisk_snapshot: l[2] ? l[2] : "",
                    datadisk_device: o ? undefined : l[3] ? l[3] : "",
                    datadisk_deletewithinstance: c,
                    datadisk_converttopostpay: l[6] ? l[6] : undefined,
                    datadisk_instanceId: l[4]
                })
            }
            return u
        }

        function h(t, n, r) {
            if (n.needBuyImageMarketNum > 0) {
                if (!n.imageFromMarket || n["needBuyImageMarketNum"] == null)return undefined;
                var i = e.fromJson(n.imageFromMarket);
                return [{
                    commodityCode: i[9],
                    specCode: i[10],
                    data: {
                        orderType: "BUY",
                        spQuantity: "1",
                        quantity: n.needBuyImageMarketNum.toString(),
                        duration: "1",
                        pricingCycle: "Hour",
                        orderSource: n.orderSource
                    },
                    components: {img_region: n[r.vm_region_no], img_id: i[0], instance_type: n[r.instance_type]}
                }]
            }
            return undefined
        }

        function p(t, n, r) {
            if (!n.security)return undefined;
            var i = e.fromJson(n.security);
            return i[2]
        }

        function d(e, t, n) {
            var r = t.networkType, i = r == "1", s = t[n.vm_bandwidth], o = t[n.vm_is_flow_type], u = t.bandwidthUpgradeForever, a = undefined;
            return i ? a = [{vm_bandwidth: "0"}] : o == "1" ? a = [{
                vm_bandwidth: (s * 1024).toString(),
                vm_is_flow_type: o
            }] : o == "5" && u ? a = [{
                vm_bandwidth: (s * 1024).toString(),
                vm_is_flow_type: o
            }] : o == "5" && !u && (a = undefined), a
        }

        function v(t, n) {
            if (!n)return null;
            var r = n.datadisk;
            if (r instanceof Array) {
                var i = [];
                for (var s = 0; s < r.length; s++) {
                    var o = r[s];
                    if (!o)continue;
                    t && t.config && t.config["spec_code"] == "vm" && t.config.orderType == "RENEW" && o && o.datadisk_chargeType === "Prepaid" ? i.push([o.datadisk_category, o.datadisk_size, o.datadisk_snapshot, o.datadisk_device, o.datadisk_instanceId, o.datadisk_deletewithinstance === "true" ? !0 : !1, !1, o.datadisk_inConvertableBlackList]) : t && t.config && t.config["spec_code"] == "vm" && t.config.orderType == "BUY" && o && o.datadisk_chargeType == "Prepaid" ? i.push([o.datadisk_category, o.datadisk_size, o.datadisk_snapshot, null, null, !1, !1, o.datadisk_inConvertableBlackList]) : t && t.config && t.config["spec_code"] == "ecs" && t.config.orderType == "BUY" && i.push([o.datadisk_category, o.datadisk_size, o.datadisk_snapshot, null, null, o.datadisk_deletewithinstance === "true" ? !0 : !1, !1, o.datadisk_inConvertableBlackList])
                }
                return e.toJson(i, !0)
            }
            return null
        }

        function m(t, n) {
            if (!n)return null;
            var r = n.systemdisk;
            if (r instanceof Array && !!r[0]) {
                var i = [r[0].systemdisk_category, r[0].systemdisk_size];
                return e.toJson(i, !0)
            }
            return null
        }

        function g(n, r) {
            if (!r)return null;
            var i = r.instance_type;
            if (i && i instanceof Array && i[0])return i[0].instance_type;
            if (r.vm_cpu && r.vm_ram) {
                var s = r.vm_cpu + "c" + r.vm_ram, o = t.CpuMemoryMap[s];
                if (e.isObject(o))return o.instanceGeneration
            }
        }

        function y(e, t) {
            if (!t)return null;
            var n = t.instance_type;
            return !!n && n instanceof Array && !!n[0] ? n[0].instance_type_family : null
        }

        function b(n, r) {
            if (!r)return null;
            var i = r.instance_type;
            if (i && i instanceof Array && i[0])return i[0].instance_generation;
            if (r.vm_cpu && r.vm_ram) {
                var s = r.vm_cpu + "c" + r.vm_ram, o = t.CpuMemoryMap[s];
                if (e.isObject(o))return o.instanceGeneration
            }
        }

        function w(t, n) {
            if (!n)return null;
            var r = [], i = n.vm_vpc_switch_id;
            return (i || i == 0) && r.push(i), e.toJson(r, !0)
        }

        function E(e, t) {
            if (!t)return undefined;
            var n = t.vm_bandwidth;
            return n instanceof Array && !!n[0] ? n[0].vm_is_flow_type : null
        }

        function S(e, t) {
            if (!t)return undefined;
            var n = t.vm_bandwidth;
            return n instanceof Array && !!n[0] ? parseInt(n[0].vm_bandwidth) / 1024 : null
        }

        function x(t, n, r) {
            if (!n.data)return;
            var i = n.data, s = i.pricingCycle ? i.pricingCycle : i.pricing_cycle;
            return !s || typeof s != "string" ? null : s.toLowerCase() != "year" && s.toLowerCase() != "month" || !i.duration ? null : e.toJson([i.duration, s.toLowerCase()], !0)
        }

        function T(t, n) {
            if (!n)return t;
            var r = n.instanceIds;
            if (r instanceof Array) {
                var i = [], s;
                for (var o = 0, u = r.length; o < u; o++)s = e.copy(t), s.data && (s.data.instanceId = r[o]), i[o] = s;
                return i
            }
            return t
        }

        function N(t, i) {
            var s = e.fromJson(i.sysdisk), o = r.reverseMap(n.DISK_TYPE_MAP), u = r.mapping(s[0], o), a = s[1] || 0;
            return a = a > 40 ? a : 40, [{
                systemdisk_category: u,
                systemdisk_size: a.toString(),
                systemdisk_device: t && t.components && t.components.systemdisk ? t.components.systemdisk.systemdisk_device[0].value : null
            }]
        }

        function C(e, t, n) {
            var r = N(e, t), i = f(e, t, n), s = e.instanceDetail ? e.instanceDetail : undefined, o = {
                systemdisk: r,
                vm_os: [{vm_os: i[0], vm_os_kind: i[1], vm_os_bit: i[2]}]
            };
            return o
        }

        s.registerOrderModels("ecs.BUY", function (e, t, n) {
            var r = f(e, t, n), s = l(e, t, n), o = t.networkType, u = t[n["vm_is_flow_type"]] == "1" ? "PayByTraffic" : "PayByBandwidth", a = i.parseJsonSafe(t.vpc), c = i.parseJsonSafe(t.password), d = N(e, t), v = h(e, t, n), m = p(e, t, n);
            return {
                regionId: t[n.vm_region_no],
                zoneId: t[n.vm_iz],
                instanceType: t[n.instance_type],
                vm_web_type: o,
                ioOptimized: t[n["iooptimized"]] == "optimized" ? "True" : "False",
                vSwitchId: o == "1" && a ? a[0] : undefined,
                internetChargeType: u,
                internetMaxBandwidthOut: o == "1" ? undefined : t[n.vm_bandwidth].toString(),
                imageId: r[0],
                systemdisk: {
                    category: d[0].systemdisk_category,
                    size: d[0].systemdisk_size,
                    device: d[0].systemdisk_device
                },
                imageMarket: v,
                datadisks: s,
                password: c && c[1] ? c[1] : undefined,
                instanceName: c && c[2] ? c[2] : undefined,
                securityGroupId: m,
                maxAmount: t[n.order_num].toString(),
                data: {quantity: t[n.order_num].toString()},
                orderSource: t.orderSource
            }
        }), s.registerPriceModels("ecs.BUY", function (e, t, n) {
            var r = f(e, t, n), s = c(e, t, n, !0), o = t.networkType, u = i.parseJsonSafe(t.vpc), a = i.parseJsonSafe(t.password), l = N(e, t), p = h(e, t, n);
            return {
                commodityCode: "ecs",
                data: {
                    duration: "1",
                    orderType: "BUY",
                    pricingCycle: "Hour",
                    quantity: t[n.order_num].toString(),
                    os_type: t[n.os_type]
                },
                imageMarket: p,
                components: {
                    vm_region_no: t[n.vm_region_no],
                    vm_iz: t[n.vm_iz],
                    instance_type: [{instance_type: t[n.instance_type], instance_generation: t[n.instance_generation]}],
                    vm_web_type: o,
                    iooptimized: t[n.iooptimized],
                    vm_vpc_switch_id: o == "1" && u ? u[0] : undefined,
                    vm_bandwidth: [{
                        vm_bandwidth: o == "1" ? "0" : (t[n.vm_bandwidth] * 1024).toString(),
                        vm_is_flow_type: o != "1" ? t[n.vm_is_flow_type] : undefined
                    }],
                    vm_os: [{vm_os: r[0], vm_os_kind: r[1], vm_os_bit: r[2]}],
                    systemdisk: l,
                    datadisk: s
                }
            }
        }), s.registerViewModels("ecs.BUY", o), s.registerOrderModels("vm.BUY", function (e, t, n) {
            var r = f(e, t, n), s = c(e, t, n), o = t.networkType, u = i.parseJsonSafe(t.vpc), a = i.parseJsonSafe(t.password), l = N(e, t), d = i.parseJsonSafe(t.duration), v = d && d[1] && d[1] == "month" ? "Month" : "Year", m = h(e, t, n), g = p(e, t, n);
            return {
                commodityCode: "vm",
                data: {
                    produceParams: {
                        passwd: a && a[1] ? a[1] : undefined,
                        hostname: a && a[2] ? a[2] : undefined,
                        securityid: g
                    },
                    orderSource: t.orderSource,
                    duration: d && d[0] ? d[0].toString() : undefined,
                    pricingCycle: v,
                    orderType: "BUY",
                    quantity: t[n.order_num].toString(),
                    os_type: t[n.os_type]
                },
                imageMarket: m,
                components: {
                    vm_region_no: t[n.vm_region_no],
                    vm_iz: t[n.vm_iz],
                    instance_type: [{instance_type: t[n.instance_type], instance_generation: t[n.instance_generation]}],
                    vm_web_type: o,
                    iooptimized: t[n.iooptimized],
                    vm_vpc_switch_id: o == "1" && u ? u[0] : undefined,
                    vm_bandwidth: [{
                        vm_bandwidth: o == "1" ? "0" : (t[n.vm_bandwidth] * 1024).toString(),
                        vm_is_flow_type: o != "1" ? t[n.vm_is_flow_type] : undefined
                    }],
                    vm_os: [{vm_os: r[0], vm_os_kind: r[1], vm_os_bit: r[2]}],
                    systemdisk: l,
                    datadisk: s,
                    vm_yundun_monitor: "1",
                    vm_yundun_service: "1"
                }
            }
        }), s.registerPriceModels("vm.BUY", function (e, t, n) {
            var r = f(e, t, n), s = c(e, t, n, !0), o = t.networkType, u = i.parseJsonSafe(t.vpc), a = i.parseJsonSafe(t.password), l = N(e, t), h = i.parseJsonSafe(t.duration), p = h && h[1] && h[1] == "month" ? "Month" : "Year";
            return {
                commodityCode: "vm",
                data: {
                    duration: h && h[0] ? h[0].toString() : undefined,
                    pricingCycle: p,
                    orderType: "BUY",
                    quantity: t[n.order_num].toString(),
                    os_type: t[n.os_type]
                },
                components: {
                    vm_region_no: t[n.vm_region_no],
                    instance_type: [{instance_type: t[n.instance_type], instance_generation: t[n.instance_generation]}],
                    vm_iz: t[n.vm_iz],
                    vm_web_type: o,
                    iooptimized: t[n.iooptimized],
                    vm_vpc_switch_id: o == "1" && u ? u[0] : undefined,
                    vm_bandwidth: [{
                        vm_bandwidth: o == "1" ? "0" : (t[n.vm_bandwidth] * 1024).toString(),
                        vm_is_flow_type: o != "1" ? t[n.vm_is_flow_type] : undefined
                    }],
                    vm_os: [{vm_os: r[0], vm_os_kind: r[1], vm_os_bit: r[2]}],
                    systemdisk: l,
                    datadisk: s
                }
            }
        }), s.registerViewModels("vm.BUY", o), s.registerOrderModels("vm.RENEW", function (e, t, n) {
            var r = c(e, t, n), s = i.parseJsonSafe(t.duration), o = s && s[1] && s[1] == "month" ? "Month" : "Year", u = t.networkType, a = t.renewOnly, f = t[n["vm_bandwidth"]] == undefined ? undefined : (t[n.vm_bandwidth] * 1024).toString();
            return {
                commodityCode: "vm",
                data: {
                    instanceId: t.instanceId,
                    restartTime: t.restartTime,
                    duration: s[0].toString(),
                    orderType: "RENEW",
                    pricingCycle: o
                },
                components: {
                    instance_type: a ? undefined : [{instance_type: t[n.instance_type]}],
                    vm_bandwidth: a ? undefined : [{
                        vm_bandwidth: u == "1" ? "0" : f,
                        vm_is_flow_type: u != "1" ? t[n.vm_is_flow_type] : undefined
                    }],
                    datadisk: a ? undefined : r
                }
            }
        }, T), s.registerPriceModels("vm.RENEW", function (e, t, n) {
            var r = c(e, t, n), s = i.parseJsonSafe(t.duration), o = s && s[1] && s[1] == "month" ? "Month" : "Year", u = t.networkType, a = t.renewOnly, f = t[n["vm_bandwidth"]] == undefined ? undefined : (t[n.vm_bandwidth] * 1024).toString();
            return {
                commodityCode: "vm",
                data: {instanceId: t.instanceId, duration: s[0].toString(), pricingCycle: o, orderType: "RENEW"},
                components: {
                    instance_type: a ? undefined : [{instance_type: t[n.instance_type]}],
                    vm_bandwidth: a ? undefined : [{
                        vm_bandwidth: u == "1" ? "0" : f,
                        vm_is_flow_type: u != "1" ? t[n.vm_is_flow_type] : undefined
                    }],
                    datadisk: a ? undefined : r
                }
            }
        }, T), s.registerViewModels("vm.RENEW", o), s.registerOrderModels("vm.UPGRADE", function (e, t, n) {
            var r = t.networkType, i = d(e, t, n);
            return {
                commodityCode: "vm",
                data: {instanceId: t.instanceId, orderType: "UPGRADE"},
                components: {instance_type: [{instance_type: t[n.instance_type]}], vm_bandwidth: i}
            }
        }, T), s.registerPriceModels("vm.UPGRADE", function (e, t, n) {
            var r = t.networkType, i = d(e, t, n);
            return {
                commodityCode: "vm",
                data: {instanceId: t.instanceId, orderType: "UPGRADE"},
                components: {instance_type: [{instance_type: t[n.instance_type]}], vm_bandwidth: i}
            }
        }, T), s.registerViewModels("vm.UPGRADE", o), s.registerOrderModels("bandwidth_increce.INCREASE_UPGRADE", function (e, t, n) {
            var r = c(e, t, n), s = i.parseJsonSafe(t.duration), o = t.networkType;
            return {
                commodityCode: "bandwidth_increce",
                components: {
                    vm_bandwidth: [{
                        vm_bandwidth: o == "1" ? "0" : (t[n.vm_bandwidth] * 1024).toString(),
                        vm_is_flow_type: o != "1" ? t[n.vm_is_flow_type] : undefined
                    }]
                },
                data: {
                    instanceId: t.instanceId,
                    orderType: "INCREASE_UPGRADE",
                    startTime: t.upgradeStartTime instanceof Date ? t.upgradeStartTime.getTime() : null,
                    endTime: t.upgradeEndTime instanceof Date ? t.upgradeEndTime.getTime() : null
                }
            }
        }, T), s.registerPriceModels("bandwidth_increce.INCREASE_UPGRADE", function (e, t, n) {
            var r = c(e, t, n), s = i.parseJsonSafe(t.duration), o = t.networkType;
            return {
                commodityCode: "bandwidth_increce",
                components: {
                    vm_bandwidth: [{
                        vm_bandwidth: o == "1" ? "0" : (t[n.vm_bandwidth] * 1024).toString(),
                        vm_is_flow_type: o != "1" ? t[n.vm_is_flow_type] : undefined
                    }]
                },
                data: {
                    instanceId: t.instanceId,
                    orderType: "INCREASE_UPGRADE",
                    startTime: t.upgradeStartTime instanceof Date ? t.upgradeStartTime.getTime() : null,
                    endTime: t.upgradeEndTime instanceof Date ? t.upgradeEndTime.getTime() : null
                }
            }
        }, T), s.registerViewModels("bandwidth_increce.INCREASE_UPGRADE", o), s.registerOrderModels("vm.CHANGEOS", function (e, t, n) {
            var r = i.parseJsonSafe(t.password), s = h(e, t, n), o = C(e, t, n), u = e.instanceDetail.instanceInfo, a = u.chargeType, f = a == "AfterPay" ? "ecs" : "vm";
            return {
                commodityCode: f,
                data: {
                    instanceId: t.instanceId,
                    orderType: "CHANGEOS",
                    produceParams: {passwd: r && r[1] ? r[1] : undefined}
                },
                imageMarket: s,
                components: o
            }
        }), s.registerPriceModels("vm.CHANGEOS", function (e, t, n) {
            var r = i.parseJsonSafe(t.password), s = f(e, t, n), o = h(e, t, n), u = C(e, t, n);
            return {
                commodityCode: "vm",
                data: {instanceId: t.instanceId, orderType: "CHANGEOS"},
                imageMarket: o,
                components: u
            }
        }), s.registerViewModels("vm.CHANGEOS", o), s.registerViewModels("yundisk.BUY", function (e, t, n) {
            var r = t.data, s = r.display_info;
            return i.config({}, function () {
                var e = {region: r[n.region], zone: r[n.zone], yundisk: r.yundisk, amount: r.quantity, duration: "1"};
                return e
            }())
        }), s.registerOrderModels("yundisk.BUY", function (t, i, s) {
            var o = i, u = i.yundisk ? e.fromJson(i.yundisk) : undefined;
            if (u && u[1] && parseInt(u[1]) > 0) {
                var a = r.reverseMap(n.DISK_TYPE_MAP), f = r.mapping(u[0], a);
                return {
                    commodityCode: "yundisk",
                    data: {duration: "1", orderType: "BUY", pricingCycle: "Hour", quantity: o[s.order_num].toString()},
                    components: {
                        datadisk: [{
                            datadisk_category: f,
                            datadisk_size: u[1].toString(),
                            datadisk_snapshot: u[2] ? u[2] : undefined
                        }], vm_region_no: o[s.vm_region_no], vm_iz: o[s.vm_iz]
                    }
                }
            }
        }), s.registerPriceModels("yundisk.BUY", function (t, i, s) {
            var o = i, u = i.yundisk ? e.fromJson(i.yundisk) : undefined;
            if (u && u[1] && parseInt(u[1]) > 0) {
                var a = r.reverseMap(n.DISK_TYPE_MAP), f = r.mapping(u[0], a);
                return {
                    commodityCode: "yundisk",
                    data: {duration: "1", orderType: "BUY", pricingCycle: "Hour", quantity: o[s.order_num].toString()},
                    components: {
                        datadisk: [{
                            datadisk_category: f,
                            datadisk_size: u[1].toString(),
                            datadisk_snapshot: u[2] ? u[2] : undefined
                        }], vm_region_no: o[s.vm_region_no], vm_iz: o[s.vm_iz]
                    }
                }
            }
        }), s.registerOrderModels("yundisk.RESIZE", function (e, t, n) {
            var r = i.parseJsonSafe(t.datadisk), s = t.diskId;
            if (s && r && r[0] && parseInt(r[0]) > 0)return {
                commodityCode: "yundisk",
                data: {instanceId: s, orderType: "RESIZE", duration: "1", pricingCycle: "Hour", quantity: "1"},
                components: {datadisk: [{datadisk_size: r[0].toString(), datadisk_category: r[1]}]}
            }
        }), s.registerPriceModels("yundisk.RESIZE", function (e, t, n) {
            var r = i.parseJsonSafe(t.datadisk), s = t.diskId;
            if (s && r && r[0] && parseInt(r[0]) > 0)return {
                commodityCode: "yundisk",
                data: {instanceId: s, duration: "1", orderType: "RESIZE", pricingCycle: "Hour", quantity: "1"},
                components: {datadisk: [{datadisk_size: r[0].toString(), datadisk_category: r[1]}]}
            }
        })
    }])
}), define("aliyun-buy-ecs/module/main/map", ["angular", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/utils/logger", "aliyun-buy/base/services/service.parser"], function (e, t, n, r, i) {
    e.module("aliyun.buy.service.parser").config(["aliyunBuyParserProvider", function (e) {
        var t = {
            cpu: "vm_cpu",
            memory: "vm_ram",
            instanceGeneration: "instance_generation",
            instanceType: "instance_type",
            instanceTypeFamily: "instance_type_family",
            instanceTypeGroup: "instance_type_group",
            region: "vm_region_no",
            os: "vm_os",
            imageId: "image_id",
            OSType: "vm_os_kind",
            imageMarket: "market_os",
            customImage: "custom_os",
            sharedImage: "shared_os",
            imageType: "os_type",
            zone: "vm_iz",
            bandwidthType: "vm_is_flow_type",
            sysdisk: "systemdisk_category",
            datadiskCategory: "datadisk_category",
            amount: "order_num",
            bandwidth: "vm_bandwidth",
            security: "vm_security",
            flowPrice: "flow_price",
            networkType: "vm_web_type",
            vpc: "vm_vpc",
            password: "vm_password",
            upgradeType: "vm_upgradeType",
            upgradeStartTime: "vm_upgradeStartTime",
            upgradeEndTime: "vm_upgradeEndTime",
            io: "iooptimized",
            ioAmount: "io_optiomized_order_num"
        }, n = {region: "vm_region_no", amount: "order_num", zone: "vm_iz"};
        e.registerMap("ecs", t), e.registerMap("vm", t), e.registerMap("bandwidth_increce", t), e.registerMap("yundisk", n)
    }])
}), define("aliyun-buy-ecs/module/common/stringHelper", [], function () {
    function e(e) {
        for (var t in e)return !1;
        return !0
    }

    function t(e) {
        return !e || e === ""
    }

    return {isEmptyObj: e, isEmptyString: t}
}), define("aliyun-buy-ecs/module/main/validation", ["angular", "jQuery", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/logger", "../common/stringHelper"], function (e, t, n, r, i, s) {
    e.module("aliyun.buy.service.parser").config(["aliyunBuyParserProvider", function (t) {
        t.validationRules.push(function (n, i) {
            function m(t) {
                if (!t)return !0;
                var n = e.fromJson(t);
                if (n instanceof Array) {
                    if (n.length == 0)return !0;
                    if (!e.isString(n[0]) && s.isEmptyObj(n[0]))return !0
                }
                return !1
            }

            var o = n.config, u = o.spec_code, a = o.orderType;
            if (u == "ecs" || u == "vm" || u == "vm" && a == "CHANGEOS") {
                var f = r.reverseMap(t.getMap(n)), l = i[f.os_type], c = i[f.vm_os], h = i[f.custom_os], p = i[f.shared_os], d = i[f.market_os], v = i[f.vm_security];
                return l == "public" && m(c) ? {field: "vm_os"} : l == "custom" && !h ? {field: "custom_os"} : l == "market" && !d ? {field: "market_os"} : l == "shared" && !p ? {field: "shared_os"} : !0
            }
            return !0
        }), t.validationRules.push(function (n, i) {
            function l(e) {
                return !/^[a-zA-Z\u4e00-\u9fa5][^\s"@\/:=<>{\[\]}]{1,127}$/.test(e)
            }

            var s = n.config, o = s.spec_code, u = s.orderType;
            if (o == "ecs" || o == "vm" || o == "vm" && u == "CHANGEOS") {
                var a = r.reverseMap(t.getMap(n)), f = e.fromJson(i[a.vm_security]) || "", c = f[0], h = f[1], p = f[2];
                return c == "3" && l(h) || c == "2" && p == null ? {field: "vm_security"} : !0
            }
            return !0
        }), t.validationRules.push(function (n, i) {
            var s = n.config, o = s.spec_code, u = s.orderType;
            if (o != "ecs" && o != "vm" && (o != "vm" || u != "CHANGEOS"))return !0;
            var a = r.reverseMap(t.getMap(n)), f = i.password;
            f = f ? e.fromJson(f) : undefined;
            if (f && f[0] == "1" && !f[1])return {field: "vm_password"};
            if (f && f[0] == "1" && f[2] === !1)return {field: "vm_password"}
        }), t.validationRules.push(function (n, i) {
            var s = n.config.spec_code, o = n.config.orderType;
            if (s == "ecs" && o == "BUY" || s == "vm" && o == "BUY") {
                var u = r.reverseMap(t.getMap(n)), a = i[u.order_num], f = i[u.vm_web_type], l = i[u.vm_vpc] ? i[u.vm_vpc] : undefined;
                if (l)var c = e.fromJson(l), h = c[1], p = c[0];
                if (f == "1") {
                    if (!p)return {field: "vm_vpc"};
                    if (typeof h == "number" && a > h)return {
                        field: "order_num",
                        message: "您选择的虚拟交换机的可用私有IP为" + h + "个，可购买云服务器不能超过" + h + "台。"
                    }
                }
                return !0
            }
            return !0
        }), t.validationRules.push(function (i, s) {
            var o = i.config.spec_code;
            if (o != "ecs" && o != "vm")return !0;
            var u = r.reverseMap(t.getMap(i)), a = s.datadisk;
            a = n.parseJsonSafe(a);
            if (!a)return !0;
            var f = !0;
            return e.forEach(a, function (e) {
                e = n.parseJsonSafe(e);
                var t;
                e && (t = e[1]), t || (f = {field: "datadisk"})
            }), f
        }), t.validationRules.push(function (e, n) {
            function h(e) {
                var t = e.getDay(), n = e.getHours();
                return t < 2 || t > 5 ? !1 : (t == 2 || t == 4) && n >= 12 ? !0 : (t == 3 || t == 5) && n <= 12 ? !0 : !1
            }

            var i = e.config, s = i.spec_code, o = i.orderType, u = e.instanceDetail;
            if (!u)return !0;
            var a = u.orderInfo;
            if (!a)return !0;
            if (s != "vm" || o != "RENEW")return !0;
            var f = r.reverseMap(t.getMap(e)), l = n.restartTime, c = n.requireRestart;
            return c && !l ? {field: "restartTime", message: "请选择重启时间"} : l && h(new Date(l)) ? {
                field: "restartTime",
                message: "周二和周四的12:00至次日12:00是发布窗口，重启实例会失败，请重新选择重启时间"
            } : !0
        }), t.validationRules.push(function (e, t) {
            var n = e.config, r = n.spec_code, i = n.orderType, s = e.instanceDetail;
            if (r != "bandwidth_increce" || i != "INCREASE_UPGRADE")return !0;
            var o = new Date(t.upgradeStartTime), u = new Date(t.upgradeEndTime);
            return o >= u ? {field: "bandwidth", message: "开始时间不能大于或等于结束时间"} : !0
        }), t.validationRules.push(function (e, t) {
            var n = e.config, r = n.spec_code, i = n.orderType;
            if (r == "ecs" && i == "BUY" || r == "vm" && i == "BUY" || r == "vm" && i == "CHANGEOS") {
                var s = t.imageOffline;
                return s == "show" ? {field: "imageOffline", message: "请同意该协议"} : !0
            }
            return !0
        })
    }])
}), define("aliyun-buy-ecs/module/main/subtotal", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/utils/logger", "aliyun-buy/base/ui/ui.subtotal"], function (e, t, n) {
    function r(t, n, r, i) {
        t.context = {}, t.$watch("data", function (n) {
            var r = n.value, s = n.detail, o = n.options;
            if (!r || !s)return "";
            var u = t.context = {
                region: s.region ? s.region.text : undefined,
                zone: s.zone ? s.zone.text : undefined,
                randomZone: r.zone == "random",
                io: r.io ? r.io : undefined,
                instanceGeneration: s.instanceGeneration ? s.instanceGeneration : undefined,
                instanceType: s.instanceType ? s.instanceType : undefined,
                instanceTypeFamily: s.instanceTypeFamily ? s.instanceTypeFamily : undefined,
                imageType: r.imageType ? r.imageType : undefined,
                os: s.os ? s.os.text : undefined,
                customImage: s.customImage ? s.customImage.text : undefined,
                sharedImage: s.sharedImage ? s.sharedImage.text : undefined,
                imageMarket: s.imageMarket ? s.imageMarket.text : undefined,
                networkType: s.networkType ? s.networkType.text : undefined,
                duration: r.duration ? r.duration : undefined,
                amount: r.amount || r.amount !== 0 ? r.amount : undefined,
                needBuyImageMarketNum: r.needBuyImageMarketNum
            };
            o && o.imageFromMarket && (u.imageMarketPrice = u.imageMarketPrice ? u.imageMarketPrice : {}, i.config(u.imageMarketPrice, o.imageFromMarket.imageMarketPrice)), r.bandwidth || r.bandwidth == 0 ? r.networkType == 1 ? u.bandwidth = 0 : u.bandwidth = r.bandwidth : u.bandwidth = undefined, u.image = "", u.imageType && (u.imageType == "custom" ? u.image = u.customImage : u.imageType == "shared" ? u.image = u.sharedImage : u.imageType == "market" ? u.image = u.imageMarket : u.imageType == "public" && (u.image = u.os)), u.datadisk = function () {
                var t = r.datadisk, n = s.datadisk;
                t = t ? e.fromJson(t) : null;
                var i = {};
                e.forEach(t, function (e, t) {
                    var r = e[1], s = e[0], o = n[t];
                    if (!r || !s || !o || !o.type || !o.size)return;
                    var u = i[s] || {};
                    u.type = o.type.text, u.sizes || (u.sizes = []), u.sizes.push(o.size.text), i[s] = u
                });
                var o = [];
                for (var u in i)o.push(i[u]);
                return o
            }()
        }, !0)
    }

    function i(t, n, r) {
        t.context = {}, t.$watch("data", function (n) {
            var r = n.value, i = n.detail;
            if (!r || !i)return "";
            var s = r.yundisk ? e.fromJson(r.yundisk) : null;
            t.context = {
                region: i.region ? i.region.text : undefined,
                zone: i.zone ? i.zone.text : undefined,
                amount: r.amount || r.amount !== 0 ? r.amount : undefined,
                size: s && s[1] ? s[1] : undefined,
                diskTypeText: i.yundisk ? i.yundisk.text : undefined
            }
        }, !0)
    }

    e.module("aliyun.buy.ui.subtotal").config(["aliyunBuySubtotalModelItemProvider", function (e) {
        e.register(function () {
            return {
                vm: {templateUrl: "partials/aliyunBuyEcsPrepaySubtotalModel.html", link: r},
                ecs: {templateUrl: "partials/aliyunBuyEcsPostpaySubtotalModel.html", link: r},
                yundisk: {templateUrl: "partials/aliyunBuyEcsYundiskSubtotalModel.html", link: i}
            }
        })
    }])
}), define("aliyun-buy-ecs/module/main/lang", ["angular", "aliyun-buy/base/services/service.dict"], function (e) {
    e.module("aliyun.buy.service.dict").run(["aliyunBuyTextServices", "aliyunBuyPriceUnitMap", function (e, t) {
        e.push("getEcsLang"), t.ecs = "/小时", t.vm = ""
    }])
}), define("aliyun-buy-ecs/module/main/index", ["angular", "aliyun-buy/aliyun.buy", "./remote", "./order", "./map", "./validation", "./subtotal", "./lang"], function (e) {
}), define("aliyun-buy-ecs/module/common/renewHelper", ["angular", "aliyun-buy/base/utils/moduleHelper"], function (e, t) {
    function r(e, n) {
        if (!e || !n)return;
        e = t.parseJsonSafe(e);
        var r = e[0], i = e[1], s = new Date(n), o;
        return i == "year" ? o = new Date(s.getFullYear() + r, s.getMonth(), s.getDate()) : i == "month" && (o = new Date(s.getFullYear(), s.getMonth() + r, s.getDate())), o.getDate() != s.getDate() ? new Date((new Date(o.getFullYear(), o.getMonth(), 1)).getTime() - 864e5) : o
    }

    function i(e) {
        if (!e || !e.instanceDetail || !e.instanceDetail.instanceInfo)return;
        var t = e.instanceDetail.instanceInfo, n = t.currentTime, r = t.instanceExpireTime;
        return n > r ? n : r
    }

    var n = {getRenewStartTime: i, calculateNewExpirationTime: r};
    return n
}), define("aliyun-buy-ecs/module/common/commodityHelper", ["angular", "aliyun-buy/base/utils/moduleHelper", "./constants/ecsBuyCons"], function (e, t, n) {
    function r(e) {
        if (!e)return;
        var t = e.constraint ? e.constraint : {}, n = t.iooptimized ? t.iooptimized : {}, r = n["vm_region_no|vm_iz"] ? n["vm_region_no|vm_iz"] : {}
    }

    function i(t, n) {
        var r = "";
        return e.forEach(n, function (e, n) {
            e.value == t && (r = e.text)
        }), r
    }

    return {constraintForIooptimized: r, getTextFromCollection: i}
}), define("aliyun-buy-ecs/module/common/instanceHelper", ["angular", "aliyun-buy/base/utils/moduleHelper", "./constants/ecsBuyCons", "./commodityHelper"], function (e, t, n, r) {
    function i(e, n, r) {
        if (!e || typeof e != "object" || !n || !n.config)return null;
        r || (r = {});
        var i = n.config.orderType, s = n.config.spec_code;
        if (!i || !s)return null;
        var o = e.orderInfo, u = e.instanceInfo, a = h && h[1] && h[1] == "month" ? "Month" : "Year", f = o.vm_web_type, l = o.vm_bandwidth && o.vm_bandwidth[0] && o.vm_bandwidth[0].vm_bandwidth, c = o.vm_bandwidth && o.vm_bandwidth[0] && o.vm_bandwidth[0].vm_is_flow_type;
        if (s == "vm" && i == "RENEW") {
            var h = r.duration ? t.parseJsonSafe(r.duration) : undefined;
            return {
                commodityCode: s,
                data: {
                    instanceId: u.instanceId ? u.instanceId : undefined,
                    duration: h ? h[0].toString() : undefined,
                    orderType: i,
                    pricingCycle: a
                },
                components: {
                    vm_cpu: o.vm_cpu ? o.vm_cpu : undefined,
                    vm_ram: o.vm_ram ? o.vm_ram : undefined,
                    vm_bandwidth: [{vm_bandwidth: f == "1" ? "0" : l, vm_is_flow_type: f != "1" ? c : undefined}]
                }
            }
        }
        if (s == "vm" && i == "UPGRADE")return {
            commodityCode: s,
            data: {instanceId: u.instanceId ? u.instanceId : undefined, orderType: i},
            components: {
                vm_cpu: o.vm_cpu ? o.vm_cpu : undefined,
                vm_ram: o.vm_ram ? o.vm_ram : undefined,
                vm_bandwidth: [{vm_bandwidth: f == "1" ? "0" : l, vm_is_flow_type: f != "1" ? c : undefined}]
            }
        };
        if (s == "bandwidth_increce" && i == "INCREASE_UPGRADE") {
            var p = r.startTime, d = r.endTime;
            return {
                commodityCode: "bandwidth_increce",
                components: {
                    vm_bandwidth: [{
                        vm_bandwidth: f == "1" ? "0" : l,
                        vm_is_flow_type: f != "1" ? c : undefined
                    }]
                },
                data: {
                    instanceId: u.instanceId ? u.instanceId : undefined,
                    orderType: "INCREASE_UPGRADE",
                    startTime: p,
                    endTime: d
                }
            }
        }
    }

    function s(e) {
        if (!e || typeof e != "object")return !1;
        var t = e.orderInfo ? e.orderInfo : {}, r = t.datadisk, i = n.DiskCategory;
        if (!r || Object.prototype.toString.call(r) != "[object Array]")return !1;
        for (var s = 0; s < r.length; s++) {
            var o = r[s];
            if (o.datadisk_category == i.cloudSSD)return !0
        }
        return !1
    }

    function o(e) {
        if (!e)return;
        var t = e.constraint ? e.constraint : {}, n = t.vm_ram ? t.vm_ram : {}, r = n["vm_cpu|vm_cpu|vm_ram"];
        for (key in r) {
            if (!key)continue;
            var i = key.split("|");
            if (Object.prototype.toString.call(i) != "[object Array]")continue;
            var s = key.split("|")[0], o = r[key];
            n.vm_cpu[s] = o
        }
    }

    function u(t, n, i) {
        if (!t || !e.isObject(i) || !e.isObject(n))return;
        var s = n.vm_region_no.vm_region_no, o = n.instance_type.instance_type, u = n.vm_web_type.vm_web_type, a = n.systemdisk.systemdisk_category, f = n.datadisk.datadisk_category, l = "{size}GB（{category}，{deleteWithInstance}）", c = "1", h = "0", p = "5";
        i.networkType = i.vSwitchId ? c : h;
        var d = [{name: "地域", text: r.getTextFromCollection(i.regionId, s)}, {
            name: "实例规格",
            text: r.getTextFromCollection(i.instanceType, o)
        }, {name: "网络类型", text: r.getTextFromCollection(i.networkType, u)}, {
            name: "带宽",
            text: i.internetMaxBandwidthOut == null || e.isUndefined(i.internetMaxBandwidthOut) ? undefined : i.internetMaxBandwidthOut + "Mbps"
        }, {name: "系统盘", text: r.getTextFromCollection(i.systemdisk.category, a)}];
        return e.forEach(i.datadisks, function (e) {
            if (e && e.category) {
                var t = e.deleteWithInstance == "True" ? "随实例释放" : "不随实例释放";
                d.push({
                    name: "数据盘",
                    text: l.replace("{size}", e.size).replace("{category}", r.getTextFromCollection(e.category, f)).replace("{deleteWithInstance}", t)
                })
            }
        }), d
    }

    function a(e, t) {
        var n = "";
        t = isNaN(t) ? 0 : t;
        switch (e) {
            case"cloud":
                n = "200～500";
                break;
            case"cloud_efficiency":
                n = Math.min(1e3 + t * 6, 3e3);
                break;
            case"cloud_ssd":
                n = Math.min(t * 30, 2e4);
                break;
            case"ephemeral_ssd":
                n = 3e3;
                break;
            default:
                n = "200～500"
        }
        return n
    }

    return {parseOrder: i, hasCloudSSD: s, formatConstraintOfRam: o, getViewComponents: u, calculateIOPS: a}
}), define("aliyun-buy-ecs/module/common/service.ecs.filters", ["angular", "aliyun-buy/base/utils/moduleHelper"], function (e, t) {
    function r(e, t) {
        if (t == "bandwidth")return i(e);
        if (t == "cpu")return s(e);
        if (t == "memory")return o(e)
    }

    function i(e) {
        return parseInt(e) / 1024 + "Mbps"
    }

    function s(e) {
        return e + "核"
    }

    function o(e) {
        return e = parseInt(e), e < 1024 ? e + "MB" : e / 1024 + "GB"
    }

    function u(e) {
        var t = e.replace("T", " ").replace("Z", " ");
        return t
    }

    var n = e.module("aliyun.buy.service.ecs.filters", t.getModuleNames(arguments));
    return n.filter("aliyunBuyEcsShowComponent", [function () {
        return r
    }]), n.filter("replaceTimeString", [function () {
        return u
    }]), n
}), define("aliyun-buy-ecs/ui.ecs.tpl", ["angular"], function (e) {
    e.module("aliyun.buy.ui.ecs.tpl", ["views/buy.html", "views/orderResult.html", "views/postpay.html", "views/postpayOrder.html", "views/prepay.html", "views/prepayOrder.html", "views/yundisk.html", "views/yundiskOrder.html", "partials/aliyunBuyEcsAdvancedPopup.html", "partials/aliyunBuyEcsBandwidth.html", "partials/aliyunBuyEcsBandwidthHistory.html", "partials/aliyunBuyEcsBandwidthTempUpgrade.html", "partials/aliyunBuyEcsBandwidthTempUpgradeConfimDlg.html", "partials/aliyunBuyEcsBandwidthTempUpgradeOptions.html", "partials/aliyunBuyEcsBandwidthUpgradeForevey.html", "partials/aliyunBuyEcsCart.html", "partials/aliyunBuyEcsChangeOs.html", "partials/aliyunBuyEcsChangeOsConfimDlg.html", "partials/aliyunBuyEcsChangeOsOptions.html", "partials/aliyunBuyEcsChangeOsPrice.html", "partials/aliyunBuyEcsDatadisk.bak.html", "partials/aliyunBuyEcsDatadisk.html", "partials/aliyunBuyEcsDatadiskItem.html", "partials/aliyunBuyEcsDatadiskItemMount.html", "partials/aliyunBuyEcsDatadiskItemMountList.html", "partials/aliyunBuyEcsDatadiskItemSnapshot.html", "partials/aliyunBuyEcsDatadiskItemSnapshotList.html", "partials/aliyunBuyEcsDowngrade.html", "partials/aliyunBuyEcsDowngradeOptions.html", "partials/aliyunBuyEcsImage.html", "partials/aliyunBuyEcsImageFromMarket.html", "partials/aliyunBuyEcsImageMarket.html", "partials/aliyunBuyEcsImageMarketDialog.html", "partials/aliyunBuyEcsImageMarketPrice.html", "partials/aliyunBuyEcsImageOffline.html", "partials/aliyunBuyEcsInstanceDetail.html", "partials/aliyunBuyEcsInstanceType.html", "partials/aliyunBuyEcsInstanceTypeDialog.html", "partials/aliyunBuyEcsIo.html", "partials/aliyunBuyEcsOrderResultView.html", "partials/aliyunBuyEcsOrderView.html", "partials/aliyunBuyEcsOs.html", "partials/aliyunBuyEcsPassword.html", "partials/aliyunBuyEcsPasswordInput.html", "partials/aliyunBuyEcsPasswordLogin.html", "partials/aliyunBuyEcsPostpay.html", "partials/aliyunBuyEcsPostpayCartItem.html", "partials/aliyunBuyEcsPostpayOptions.html", "partials/aliyunBuyEcsPostpayOrderPreview.html", "partials/aliyunBuyEcsPostpaySubtotalModel.html", "partials/aliyunBuyEcsPrepay.html", "partials/aliyunBuyEcsPrepayCartItem.html", "partials/aliyunBuyEcsPrepayOptions.html", "partials/aliyunBuyEcsPrepayOrderPreview.html", "partials/aliyunBuyEcsPrepaySubtotalModel.html", "partials/aliyunBuyEcsPrice.html", "partials/aliyunBuyEcsRenew.html", "partials/aliyunBuyEcsRenewConfimDlg.html", "partials/aliyunBuyEcsRenewOptions.html", "partials/aliyunBuyEcsSecurity.html", "partials/aliyunBuyEcsSecurityDialog.html", "partials/aliyunBuyEcsSysdisk.html", "partials/aliyunBuyEcsUpgrade.html", "partials/aliyunBuyEcsUpgradeConfimDlg.html", "partials/aliyunBuyEcsUpgradeOptions.html", "partials/aliyunBuyEcsYundisk.html", "partials/aliyunBuyEcsYundiskCartItem.html", "partials/aliyunBuyEcsYundiskOptions.html", "partials/aliyunBuyEcsYundiskOrderPreview.html", "partials/aliyunBuyEcsYundiskResize.html", "partials/aliyunBuyEcsYundiskResizeOptions.html", "partials/aliyunBuyEcsYundiskResizeOrderTipDlg.html", "partials/aliyunBuyEcsYundiskResizePopViewOfEcsInstance.html", "partials/aliyunBuyEcsYundiskSelect.html", "partials/aliyunBuyEcsYundiskSubtotalModel.html", "partials/aliyunBuyEcsYundun.html", "partials/aliyunBuyEcsZone.html", "partials/prepayOrder.html"]), e.module("views/buy.html", []).run(["$templateCache", function (e) {
        e.put("views/buy.html", '<div><div data-spm="8001"><div class="y-page-title"><div class="y-row"><div class="y-span12 y-last"><div ng-if="currentTab==\'prepay\'" aliyun-buy-subheader product="ecs" service="getEcsPrepaySubheaderData"></div><div ng-if="currentTab==\'postpay\'" aliyun-buy-subheader product="ecs" service="getEcsPostpaySubheaderData"></div></div></div></div><!-- <div class="y-row y-mt4">\n      <div aliyun-buy-delay-directive="aliyun-buy-banner" product="ecs" service="getEcsBannerData"></div>\n    </div> --><div class="y-row y-mt5"><div class="y-span12 y-last"><div class="y-tab"><ul><li class="y-first" ng-class="{\'y-current\':currentTab==\'prepay\'}"><a ui-sref="buy.prepay" class="y-item" data-spm-click="gostr=/aliyun;locaid=d00001" hidefocus>包年包月</a></li><li ng-class="{\'y-current\':currentTab==\'postpay\'}"><a ui-sref="buy.postpay" class="y-item" data-spm-click="gostr=/aliyun;locaid=d00002" hidefocus>按量付费</a></li><li><a ui-sref="clouddisk" class="lnk-autonomous-disk bk-ml5 bk-pl5 bk-pt1" hidefocus>购买云盘</a></li><li class="y-more"><a ng-if="currentTab==\'postpay\'" href="javascript:;" data-spm-click="gostr=/aliyun;locaid=d00003" class="y-lnk-gray lnk-more" hidefocus aliyun-buy-tooltip="{templateUrl:\'partials/aliyunBuyEcsAdvancedPopup.html\', maxWidth:280, offsetY:0}">申请更高配置</a> <a target="_blank" href="http://help.aliyun.com/view/13439104.html" class="y-lnk-gray" hidefocus>购买须知</a></li></ul></div></div></div></div><div class="y-row y-mt5 bk-theme-mini"><div ui-view></div></div></div>')
    }]), e.module("views/orderResult.html", []).run(["$templateCache", function (e) {
        e.put("views/orderResult.html", '<div style="background: #FBFAF8" data-spm="orderResult"><div ng-if="commodityCode == \'ecs\'"><div aliyun-buy-ecs-order-result-view commodity-code="ecs" config="config"></div></div><div ng-if="commodityCode != \'ecs\'"><!-- 标题 --><div><div class="y-page-title"><div class="y-row"><div class="y-span12 y-last"><div class="bk-scope bk-subheader"><div class="gx"><h1>{{orderResult.title}}</h1></div></div></div></div></div></div><div class="y-row y-mt5" ng-if="commodityCode==\'yundisk\'"><div class="bk-process"><span class="unit past w49">{{\'ECS_RESULT_CONFIRM\'|aliyunBuyText}}</span> <span class="arrow-complete"><span class="next"></span> <span class="prev"></span></span> <span class="unit current w49" ng-if="orderResult.isSuccess">{{\'ECS_RESULT_SUCCESS\'|aliyunBuyText}}</span> <span class="unit current w49" ng-if="!orderResult.isSuccess">{{\'ECS_RESULT_FAIL\'|aliyunBuyText}}</span></div></div><div class="y-row y-mt5" ng-if="commodityCode==\'vm\'"><div class="bk-process"><span class="unit past w49">{{\'ECS_RESULT_CONFIRM\'|aliyunBuyText}}</span> <span class="arrow-complete"><span class="next"></span> <span class="prev"></span></span> <span class="unit current w49" ng-if="orderResult.isSuccess">{{\'ECS_RESULT_SUCCESS\'|aliyunBuyText}}</span> <span class="unit current w49" ng-if="!orderResult.isSuccess">{{\'ECS_RESULT_FAIL\'|aliyunBuyText}}</span></div></div><!--成功--><div ng-if="orderResult.isSuccess" class="bk-scope y-row"><div class="bk-status-box"><!-- 成功状态 S --><div class="bk-status-row"><i class="bk-icon-yes3 aliyun-icon-yes3"></i><span>{{orderResult.info}}</span></div><div class="bk-message-row"><span ng-bind-html="orderResult.infoMore"></span></div><div><div class="bk-message-row"><a href="https://order.aliyun.com/order" class="lnk">{{\'ECS_RESULT_ORDERLIST\'|aliyunBuyText}}</a> <a href="//ecs.console.aliyun.com" class="lnk m10">{{\'ECS_RESULT_CONSOLE\'|aliyunBuyText}}</a></div><!-- 成功状态 E --><div class="bk-message-row" style="font-size: 12px; color: #000; margin: 10px auto; border-top: 1px #999 dashed; width: 45%; line-height: 24px;background: url(https://static.aliyun.com/images/user-center/sign_icon.png) 272px 14px no-repeat;text-align: left;padding: 10px 12% 0 25%">{{\'ECS_RESULT_TIP\'|aliyunBuyText}}&nbsp;&nbsp;<br><a class="y-blue" href="http://help.aliyun.com/list/11114483.html" target="_blank">{{\'ECS_RESULT_TIPMORE\'|aliyunBuyText}}</a></div></div></div></div><!--失败--><div ng-if="orderResult.isSuccess==false" class="bk-scope y-row"><div class="bk-status-box"><!-- 状态 S --><div class="bk-status-row"><i class="aliyun-icon-info" style="color:#00a2ca"></i><span>{{orderResult.info}}</span></div><div class="bk-message-row"><span>{{orderResult.infoMore}}</span></div><div><div class="bk-message-row"><a href="https://workorder.console.aliyun.com/console.htm#/ticket/add?productId=12" class="link">{{\'ECS_RESULT_TICKET\'|aliyunBuyText}}</a> <a href="https://order.aliyun.com/order" class="lnk">{{\'ECS_RESULT_ORDERLIST\'|aliyunBuyText}}</a> <a href="//ecs.console.aliyun.com" class="lnk ml10">{{\'ECS_RESULT_CONSOLE\'|aliyunBuyText}}</a></div></div></div></div></div><!--温馨提示--><div class="bk-scope y-row"><div class="bk-other-box"><strong>{{\'ECS_RESULT_WARMTIP\'|aliyunBuyText}}：</strong><ul><li class="fn-clear"><span>1、</span> <span ng-bind-html="\'ECS_RESULT_WTIP1\' | aliyunBuyText"></span></li><li class="fn-clear"><span>2、</span><span ng-bind-html="\'ECS_RESULT_WTIP2\' | aliyunBuyText"></span></li><li class="fn-clear"><span>3、</span> <span ng-bind-html="\'ECS_RESULT_WTIP3\' | aliyunBuyText"></span></li></ul></div><div style="height:1px"></div></div></div>')
    }]), e.module("views/postpay.html", []).run(["$templateCache", function (e) {
        e.put("views/postpay.html", '<div aliyun-buy-ecs-postpay aliyun-buy-dom-cache="{id:\'ecs.buy.postpay\', trigger:\'initialized\'}" options-default="defaultValue" data-spm="ecsPostpaySelect"></div>')
    }]), e.module("views/postpayOrder.html", []).run(["$templateCache", function (e) {
        e.put("views/postpayOrder.html", '<div style="background: #FBFAF8; padding-bottom: 20px" data-spm="ecsPostpayConfirm"><div><div class="y-page-title"><div class="y-row"><div class="y-span12 y-last"><div class="bk-scope bk-subheader"><div class="bk-subheader-box"><h1 ng-bind-html="\'ECS_PORDER_CONFIRM\'|aliyunBuyText"></h1></div></div></div></div></div></div><div class="y-row y-mt5"><div class="bk-process"><span class="unit current w49" ng-bind-html="\'ECS_PORDER_CONFIRM\'|aliyunBuyText"></span> <span class="arrow-current"><span class="next"></span> <span class="prev"></span></span> <span class="unit w49" ng-bind-html="\'ECS_PORDER_SUCCESS\'|aliyunBuyText"></span></div></div><div class="y-row y-mt5"><div aliyun-buy-ecs-postpay-order-preview order-data="orderData" price-order="priceOrder" ready="ready"></div></div></div>')
    }]), e.module("views/prepay.html", []).run(["$templateCache", function (e) {
        e.put("views/prepay.html", '<div aliyun-buy-ecs-prepay aliyun-buy-dom-cache="{id:\'ecs.buy.prepay\', trigger:\'initialized\'}" options-default="defaultValue" data-spm="ecsPrepaySelect"></div>')
    }]), e.module("views/prepayOrder.html", []).run(["$templateCache", function (e) {
        e.put("views/prepayOrder.html", '<div style="background: #FBFAF8; padding-bottom: 20px" data-spm="ecsPrepayConfirm"><div><div class="y-page-title"><div class="y-row"><div class="y-span12 y-last"><div class="bk-scope bk-subheader"><div class="bk-subheader-box"><h1>{{\'ECS_PORDER_CONFIRM\'|aliyunBuyText}}</h1></div></div></div></div></div></div><div class="y-row y-mt5"><div class="bk-process"><span class="unit current">{{\'ECS_PORDER_CONFIRM\'|aliyunBuyText}}</span> <span class="arrow-current"><span class="next"></span> <span class="prev"></span></span> <span class="unit">{{\'ECS_PORDER_PAY\'|aliyunBuyText}}</span> <span class="arrow"><span class="next"></span> <span class="prev"></span></span> <span class="unit">{{\'ECS_PORDER_SUCCESS\'|aliyunBuyText}}</span></div></div><div class="y-row y-mt5"><div aliyun-buy-ecs-prepay-order-preview order-data="orderData" price-order="priceOrder" ready="ready"></div></div></div>')
    }]), e.module("views/yundisk.html", []).run(["$templateCache", function (e) {
        e.put("views/yundisk.html", '<div><div data-spm="8002"><div class="y-page-title"><div class="y-row"><div class="y-span12 y-last"><div aliyun-buy-subheader product="yundisk" service="getYundiskSubheaderData"></div></div></div></div><div class="y-row y-mt5"><div class="y-span12 y-last"><div class="y-tab"><ul><li class="y-first y-current"><a class="y-item" hidefocus>{{\'YUNDISK_CLOUD_DISK\'|aliyunBuyText}}</a></li><li><a ui-sref="buy.prepay" class="lnk-autonomous-disk bk-ml5 bk-pl5 bk-pt1" hidefocus>{{\'YUNDISK_CLOUD_BUYECS\'|aliyunBuyText}}</a></li><li class="y-more"><a target="_blank" href="http://help.aliyun.com/view/13439104.html" class="y-lnk-gray" hidefocus>{{\'ECS_BUY_MUSTKNOW\'|aliyunBuyText}}</a></li></ul></div></div></div></div><div class="y-row y-mt5 bk-theme-mini" data-spm="clouddiskPostpaySelect"><div aliyun-buy-ecs-yundisk aliyun-buy-dom-cache="{id:\'ecs.buy.clouddisk\', trigger:\'initialized\'}" options-default="defaultValue"></div></div></div>')
    }]), e.module("views/yundiskOrder.html", []).run(["$templateCache", function (e) {
        e.put("views/yundiskOrder.html", '<div style="background: #FBFAF8; padding-bottom: 20px" data-spm="clouddiskPostpayConfirm"><div><div class="y-page-title"><div class="y-row"><div class="y-span12 y-last"><div class="bk-scope bk-subheader"><div class="bk-subheader-box"><h1>{{\'ECS_RESULT_CONFIRM\'|aliyunBuyText}}</h1></div></div></div></div></div></div><div class="y-row y-mt5"><div class="bk-process"><span class="unit current w49">{{\'ECS_RESULT_CONFIRM\'|aliyunBuyText}}</span> <span class="arrow-current"><span class="next"></span> <span class="prev"></span></span> <span class="unit w49">{{\'ECS_PORDER_SUCCESS\'|aliyunBuyText}}</span></div></div><div class="y-row y-mt5"><div aliyun-buy-ecs-yundisk-order-preview order-data="orderData" ready="ready"></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsAdvancedPopup.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsAdvancedPopup.html", '<div style="line-height:1.8"><span>{{\'ECS_BUY_APOP_NOTICE\'|aliyunBuyText}}</span><div class="y-mt1" ng-bind-html="\'ECS_BUY_APOP_QUESTION\' | aliyunBuyText"></div><div class="y-mt2" style="border-top: solid 1px #dedede; padding-top:8px; margin-top:8px" ng-bind-html="\'ECS_BUY_APOP_COMMIT\' | aliyunBuyText"></div></div>')
    }]), e.module("partials/aliyunBuyEcsBandwidth.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsBandwidth.html", '<div class="bk-form-row" ng-show="options.visible!==false"><label class="bk-form-row-name" ng-if="options.isShowLabel">{{options.name | aliyunBuyText}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li"><div aliyun-buy-slider class="bk-slider" step-option="options.stepOption" value="value" max-value="options.max" min-value="options.min" unit="options.unit" formatter="options.formatter" is-disabled="options.isDisabled"></div><div aliyun-buy-number-stepper class="bk-number bk-ml2" value="value" min="options.min" max="options.max" unit="options.unit" ng-show="options.visible!==false" is-disabled="options.isDisabled"></div></div><div class="bk-form-row-txt" ng-hide="!options.tip"><div ng-bind-html="options.tip | aliyunBuyText"></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsBandwidthHistory.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsBandwidthHistory.html", '<div><div class="bk-dialog-head"><span class="bk-dialog-close" data-dismiss="modal" aria-hidden="true" ng-click="$close()"><span class="aliyun-icon-wrong"></span></span><h5 class="bk-dialog-title" ng-bind-html="title"></h5></div><div class="bk-dialog-body" aliyun-buy-preloader="!isReady"><div ng-show="allData.length==0 && loadingWrong"><div style="margin: 50px 0; text-align: center"><div ng-bind-html="loadWrongMsg"></div></div></div><div ng-show="allData.length!=0" aliyun-buy-preloader="isLoading"><div aliyun-buy-simple-chart options="options" settings="settings"></div><div style="text-align: center"><span ng-repeat="info in allData" class="bk-ml1"><input id="chart-radio-{{$index}}" type="radio" name="year" ng-click="checkIndex($index)" ng-checked="$index==index"><label for="chart-radio-{{$index}}" class="bk-ml1">{{info.year}}</label></span></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsBandwidthTempUpgrade.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsBandwidthTempUpgrade.html", '<div class="bk-scope" aliyun-buy-preloader="ready() === false"><div aliyun-buy-ecs-bandwidth-temp-upgrade-options options="options" value="optionsValue" handle="optionsHandle" price="optionsPrice" detail="optionsDetail" instance-id="instanceId()"></div><div aliyun-buy-ecs-price data="optionsPrice"></div><div class="bk-order-pact"><a href="javascript:;" class="bk-order-pact-box" ng-click="termsChecked=!termsChecked" ng-class="{\'bk-order-pact-box-select\':termsChecked, \'\':!termsChecked}"><span class="dis-inline-block" ng-class="{\'aliyun-icon-yes2\':termsChecked, \'\':!termsChecked}"></span></a> <span ng-bind-html="\'ECS_SERVICE_TERMS\' | aliyunBuyText"></span></div><div class="bk-items-price-control bk-order-price-control bk-order-renew-price-wrap"><div aliyun-buy-button ng-click="pay()" is-disabled="{{payDisabled}}">{{\'ECS_PAY\'|aliyunBuyText}}</div></div></div>')
    }]), e.module("partials/aliyunBuyEcsBandwidthTempUpgradeConfimDlg.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsBandwidthTempUpgradeConfimDlg.html", '<div><div class="bk-dialog-head"><span class="bk-dialog-close" data-dismiss="modal" aria-hidden="true" ng-click="$close()"><span class="aliyun-icon-wrong"></span></span><h5 class="bk-dialog-title">{{\'ECS_BANDWIDTH_TEMP_UPGRADE_CONFIRM_TITLE\'|aliyunBuyText}}</h5></div><div class="bk-dialog-body"><div class="bk-box" style="width: 600px;border:0 none;padding-top:15px; height: auto; line-height: 20px"><p ng-bind-html="\'ECS_BANDWIDTH_TEMP_UPGRADE_CONFIRM_CONTENT\'|aliyunBuyText"></p></div></div><div class="bk-dialog-foot ng-scope"><button aliyun-buy-button ng-click="confirmPurchase()" theme="blue">{{\'ECS_UPGRADE\'|aliyunBuyText}}</button></div></div>')
    }]), e.module("partials/aliyunBuyEcsBandwidthTempUpgradeOptions.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsBandwidthTempUpgradeOptions.html", '<div class="bk-scope" aliyun-buy-preloader="!ready" aliyun-buy-disable-ng-animate><div aliyun-buy-ecs-instance-detail data="instanceRaw" ng-if="options.global.showInstanceInfo"></div><div ng-class="{\'bk-order-renew-wrap bk-mt5\':options.global.showInstanceInfo}"><div class="bk-order-renew-title" ng-show="options.global.showInstanceInfo">{{\'ECS_BANDWIDTH_TEMP_UPGRADE\'|aliyunBuyText}}</div><div ng-class="{\'bk-order-renew-body\':options.global.showInstanceInfo}"><div aliyun-buy-ecs-bandwidth style="float:left" options="options.bandwidth" value="value.bandwidth" config="config().bandwidth"></div><span class="bk-form-row-li"><span class="bk-form-row-li-info bk-lnk bk-ml2"><span ng-hide="options.global.showBandwidthHistory === false" aliyun-buy-ecs-bandwidth-history instance-id="instanceId()"></span></span></span><div class="bk-clearfix"></div><!--选择时间,提示--><div class="bk-form-row-cell" aliyun-buy-anchor="validate, options.bandwidth.state == \'error\'"><div class="bk-form-row"><div class="bk-form-row-li" style="height: 38px"><span class="bk-form-row-li-info">{{\'ECS_BANDWIDTH_UPGRADE_START_TIME\'|aliyunBuyText}}：</span> <span class="bk-number"><input class="bk-number-input" style="width:110px; padding:0 20px 0 0; font-size:12px;line-height:36px;height:36px" type="text" readonly="readonly" min="currentTime" max="upgradeEndTimePrevDay" show-weeks="false" show-button-bar="false" toggle-weeks-text="{{\'ECS_WEEK\'|aliyunBuyText}}" datepicker-mode current-text="{{\'ECS_TODAY\'|aliyunBuyText}}" clear-text="{{\'ECS_CLEAR\'|aliyunBuyText}}" close-text="{{\'ECS_CLEAR\'|aliyunBuyText}}" aliyun-buy-datepicker-popup="yyyy-MM-dd" ng-model="value.upgradeStartTime"> <span class="bk-number-unit" style="left:100px; line-height: 38px"><span class="aliyun-icon-calendar"></span></span></span> <span class="bk-form-row-li-info bk-ml2">{{\'ECS_BANDWIDTH_UPGRADE_END_TIME\'|aliyunBuyText}}：</span> <span class="bk-number" style="width:220px"><input class="bk-number-input" style="width:110px; padding:0 20px 0 0; font-size:12px;line-height:36px;height:36px" type="text" readonly="readonly" min="upgradeStartTimeNextDay" max="bandwidthTempUpgradeEndTime" show-weeks="false" show-button-bar="false" toggle-weeks-text="{{\'ECS_WEEK\'|aliyunBuyText}}" datepicker-mode current-text="{{\'ECS_TODAY\'|aliyunBuyText}}" clear-text="{{\'ECS_CLEAR\'|aliyunBuyText}}" close-text="{{\'ECS_CLEAR\'|aliyunBuyText}}" aliyun-buy-datepicker-popup="yyyy-MM-dd" ng-model="value.upgradeEndTime"> <span class="bk-number-unit" style="left:100px; line-height: 38px"><span class="aliyun-icon-calendar"></span></span> <span class="bk-form-row-txt bk-ml1" style="line-height:36px"><span>00:</span> <span>00</span></span></span></div><div style="height: 24px"><!--<div class="bk-form-row-txt" ng-show="bandwidthError">\n              <span class="bk-form-status bk-form-error">\n                <i class="bk-form-status-icon aliyun-icon-no3"></i><span class="bk-form-status-message">您选择的时间段里，(或部份时间)带宽已为{{value.bandwidth}}Mbps，请重新选择。</span>\n              </span>\n            </div> --><div class="bk-form-row-txt" ng-show="options.state == \'error\'"><span class="bk-form-status bk-form-error"><i class="bk-form-status-icon aliyun-icon-no3"></i><span class="bk-form-status-message">{{options.stateMessage | aliyunBuyText}}</span></span></div><div class="bk-form-row-txt" ng-show="options.state != \'error\' && (originalValue.bandwidth != value.bandwidth) && !options.global.batchMode"><span class="bk-form-status bk-form-success"><span class="bk-form-status-message" ng-bind-html="\'ECS_BANDWIDTH_UPGRADE_DETAIL_TIP\' | aliyunBuyText:upgradeDays:value.bandwidth:formatDate(value.upgradeEndTime):originalValue.bandwidth"></span></span></div></div></div></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsBandwidthUpgradeForevey.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsBandwidthUpgradeForevey.html", '<div class="bk-form-row" ng-hide="options.visible===false"><label class="bk-form-row-name"></label><div class="bk-form-row-cell"><div class="bk-form-row-li"><span aliyun-buy-checkbox value="value" display="display | aliyunBuyText" style="cursor: pointer"></span> <a class="bk-lnk bk-ml1" href="javascript:;" data-spm-click="gostr=/aliyun;locaid=bandwidthUpgradeForever" aliyun-buy-tooltip="{{\'ECS_BANWIDTH_UPGRADE_FOREVER_TIP\' | aliyunBuyText}}"><i class="aliyun-icon-help"></i></a></div><div class="bk-form-row-text" ng-bind-html="options.tip" ng-show="options.tip"></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsCart.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsCart.html", '<div class="bk-scope bk-orders-wrap" aliyun-buy-disable-ng-animate><div ng-show="amount>0" class="bk-items bk-mb4 bk-items-cart"><div class="bk-items-title bk-clearfix" style="cursor:pointer" ng-click="showOrders=true">{{\'COMMON_CART_TITLE\'|aliyunBuyText}}<span class="bk-orange bk-ml3">{{detail.cartUnit ? (amount + detail.cartUnit):(amount | aliyunBuyAccy:\'amount\')}}</span><div class="bk-items-price bk-mt1" style="float:right;padding:0"><div ng-if="config().priceShow"><div class="bk-items-price-title"><span ng-show="calculating" class="bk-orange">{{\'COMMON_CART_CALCULATING\'|aliyunBuyText}}</span><div ng-show="!calculating && price==null" class="bk-orange">{{\'COMMON_CART_CALCULATING_PRICE_FAILED\'|aliyunBuyText}}</div><span ng-show="!calculating && price!=null" class="bk-orange"><span class="bk-cny">&yen;</span><span class="bk-items-price-money">{{price.trade + (imageMarketPrice.trade?imageMarketPrice.trade:0) | aliyunBuyPriceValue}}</span> <span class="bk-items-price-unit">{{priceUnit|aliyunBuyText}}</span></span></div></div></div></div><div class="bk-clearfix bk-pb3"><div style="float:left" class="bk-pt2 bk-pr3 bk-ml4"><!-- <div aliyun-buy-button class="bk-button-s" ng-click="showOrders=true">查看</div> --><div aliyun-buy-button class="bk-button-s" ng-click="purchase()" data-spm-click="gostr=/aliyun;locaid=batchpurchasetopbar" is-disabled="{{(calculating&&config().priceShow) || price==null}}">{{\'COMMON_CART_BATCH_PURCHASE\'|aliyunBuyText}}</div><div aliyun-buy-button theme="default" class="bk-button-s bk-ml2" data-spm-click="gostr=/aliyun;locaid=showdetailtopbar" ng-click="showOrders=true">{{\'COMMON_CART_VIEW_DETAIL\'|aliyunBuyText}}</div></div></div></div><div ng-show="amount==0" class="bk-orders-menu bk-orders-menu-no-hover bk-mb4"><span class="bk-orders-menu-name">{{\'COMMON_CART_TITLE\'|aliyunBuyText}}</span> <span class="bk-orders-menu-quantity bk-pale">{{detail.cartUnit ? (amount + detail.cartUnit):(amount | aliyunBuyAccy:\'amount\')}}</span></div><div class="bk-orders" ng-init="showOrders =false" ng-hide="showOrders==false"><div class="bk-orders-title"><span class="bk-orders-title-txt">{{\'COMMON_CART_TITLE\'|aliyunBuyText}}（{{detail.cartUnit ? (amount + detail.cartUnit):(amount | aliyunBuyAccy:\'amount\')}}）</span> <span class="bk-orders-title-close" ng-click="showOrders=false" data-spm-click="gostr=/aliyun;locaid=closecart"><i class="aliyun-icon-wrong-thin" style="color: #666"></i></span></div><div class="bk-orders-list"><div aliyun-buy-ecs-cart-item tpl="{{config().itemTpl}}" collection="value" collectiondetail="detail" price-unit="priceUnit" product-id="config().productId"></div></div><div ng-show="value.length>0"><div class="bk-items-price"><div ng-if="config().priceShow"><div class="bk-items-price-title">{{\'ECS_TOTAL\' | aliyunBuyText}}</div><div class="bk-items-price-settle"><div ng-show="calculating" class="bk-items-price-calculating">{{\'COMMON_CART_CALCULATING\'|aliyunBuyText}}</div><div ng-show="!calculating && price==null" class="bk-items-price-calculating">{{\'COMMON_CART_CALCULATING_PRICE_FAILED\'|aliyunBuyText}}</div><span ng-show="!calculating && price!=null"><span class="bk-cny">&yen;</span><span class="bk-items-price-money">{{price.trade | aliyunBuyPriceValue}}</span> <span class="bk-items-price-unit">{{priceUnit|aliyunBuyText}}</span></span></div><div class="bk-items-price-offer" ng-if="price.trade < price.origin"><span class="sedi-buy-cart-submit-cost">{{\'ECS_OLDPRICE\' | aliyunBuyText}} <span class="bk-cny">&yen;</span><span>{{price.origin | aliyunBuyPriceValue}}</span> <span>{{priceUnit|aliyunBuyText}}</span></span> <span class="bk-items-price-rebate">{{\'ECS_REDUCE\' | aliyunBuyText}} <span class="bk-cny">&yen;</span><span>{{price.discount | aliyunBuyPriceValue}}</span> <span>{{priceUnit|aliyunBuyText}}</span></span></div></div></div><div class="bk-orders-control"><form class="" target="_self"><input name="" type="hidden" class="orders-data" value=""><div aliyun-buy-button data-spm-click="gostr=/aliyun;locaid=batchpurchase" ng-click="purchase()" is-disabled="{{(calculating&&config().priceShow) || price==null}}">{{\'COMMON_CART_BATCH_PURCHASE\'|aliyunBuyText}}</div></form></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsChangeOs.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsChangeOs.html", '<div class="bk-scope bk-theme-mini" aliyun-buy-preloader="ready() === false"><div aliyun-buy-ecs-change-os-options value="optionsValue" handle="optionsHandle" options="optionsChangeOs" price="optionsPrice" detail="optionsDetail" instance-id="instanceId()" token="token()" raw="raw"></div><div class="bk-order-renew-price-wrap"><div class="bk-scope"><div aliyun-buy-ecs-change-os-price value="optionsValue" price="optionsPrice"></div></div></div><div class="bk-order-pact"><a href="javascript:;" class="bk-order-pact-box" ng-click="termsChecked=!termsChecked" ng-class="{\'bk-order-pact-box-select\':termsChecked, \'\':!termsChecked}"><span class="dis-inline-block" ng-class="{\'aliyun-icon-yes2\':termsChecked, \'\':!termsChecked}"></span></a> <span ng-bind-html="\'ECS_SERVICE_TERMS\'|aliyunBuyText"></span></div><div class="bk-items-price-control bk-order-price-control bk-order-renew-price-wrap"><div aliyun-buy-button ng-click="pay()" is-disabled="{{payDisabled}}">{{\'ECS_PAY\'|aliyunBuyText}}</div></div><div style="float:right" ng-if="optionsChangeOs.imageFromMarket.imageMarketPrice.price.extraCode" class="bk-items-price-info bk-red bk-pt3 bk-mb5 bk-pb5" ng-bind-html="\'ECS_MARKET_IMAGE_UNAVAILABLE_NOT_ENOUGH_BALANCE\' | aliyunBuyText"></div></div>')
    }]), e.module("partials/aliyunBuyEcsChangeOsConfimDlg.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsChangeOsConfimDlg.html", '<div><div class="bk-dialog-head"><span class="bk-dialog-close" data-dismiss="modal" aria-hidden="true" ng-click="$close()"><span class="aliyun-icon-wrong"></span></span><h5 class="bk-dialog-title" ng-bind-html="\'ECS_CHANGEOS_TITLE\' | aliyunBuyText"></h5></div><div class="bk-dialog-body"><div class="bk-box" style="width: 600px;border:0 none;padding-top:15px;height:100px"><div><div><div class="bk-order-time-color" ng-bind-html="\'ECS_CHANGEOS_TIP\' | aliyunBuyText"></div><div ng-bind-html="\'ECS_CHANGEOS_CTIP\' | aliyunBuyText"></div></div></div></div></div><div class="bk-dialog-foot ng-scope"><button aliyun-buy-button ng-click="confirmPurchase()" theme="blue">{{\'ECS_OK\'|aliyunBuyText}}</button></div></div>')
    }]), e.module("partials/aliyunBuyEcsChangeOsOptions.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsChangeOsOptions.html", '<div class="bk-scope" aliyun-buy-preloader="!ready" aliyun-buy-disable-ng-animate><div aliyun-buy-ecs-instance-detail data="raw" ng-if="options.global.showInstanceInfo"></div><div class="bk-order-renew-wrap bk-mt5"><div class="bk-order-renew-title" ng-show="options.global.showInstanceInfo">{{\'ECS_CHANGE_OS\'|aliyunBuyText}}</div><div class="bk-order-renew-body"><div aliyun-buy-bricks-tabs options="options.imageType" value="value.imageType" detail="detail.imageType" config="config().imageType"></div><div aliyun-buy-ecs-os options="options.os" value="value.os" detail="detail.os" config="config().os" value-all="value"></div><div aliyun-buy-ecs-image options="options.customImage" value="value.customImage" detail="detail.customImage" config="config().customImage" value-all="value" image-type="custom"></div><div aliyun-buy-ecs-image options="options.sharedImage" value="value.sharedImage" detail="detail.sharedImage" config="config().sharedImage" value-all="value" image-type="shared"></div><div aliyun-buy-ecs-image-market options="options.imageMarket" value="value.imageMarket" detail="detail.imageMarket" config="config().imageMarket" raw="raw" value-all="value"></div><div aliyun-buy-ecs-image-offline options="options.imageOffline" value="value.imageOffline"></div><div aliyun-buy-ecs-image-from-market options="options.imageFromMarket" value="value.imageFromMarket" value-all="value" raw="raw"></div><div aliyun-buy-ecs-sysdisk options="options.sysdisk" value="value.sysdisk" detail="detail.sysdisk" config="config().sysdisk"></div><div class="bk-order-update-title"><div aliyun-buy-ecs-password reversal-inst-name="true" options="options.password" value="value.password" detail="detail.password" config="config().password"></div></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsChangeOsPrice.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsChangeOsPrice.html", '<div><div class="bk-items-price-settle"><span style="font-size: 16px;color:#000" class="bk-mr2" ng-if="!price.imageMarketPrice.price.calculating">镜像费用：</span> <span class="bk-items-price-money" ng-if="!price.imageMarketPrice.price.calculating">{{price.imageMarketPrice.price.tradePrice | currency}}</span> <span class="bk-items-price-unit" ng-if="!price.imageMarketPrice.price.calculating">/时</span> <span class="small-orange-font" ng-if="price.imageMarketPrice.price.calculating">正在计算中,请稍后</span></div><div class="bk-items-price-settle txt-right" ng-if="price.needQueryPrice"><span style="font-size: 16px;color:#000" class="bk-mr2" ng-if="!price.calculating">配置费用：</span> <span class="bk-items-price-money" ng-if="!price.calculating">{{price.data.trade | currency}}</span> <span class="bk-items-price-unit" ng-if="!price.calculating && price.chargeType == \'AfterPay\' && price.success">/时</span> <span class="small-orange-font" ng-if="!price.success && !price.calculating">询价失败</span> <span class="small-orange-font" ng-if="price.calculating">正在计算中,请稍后</span></div></div>')
    }]), e.module("partials/aliyunBuyEcsDatadisk.bak.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsDatadisk.bak.html", '<div class="bk-form-row" ng-hide="options.visible===false" aliyun-buy-anchor="validate,options.state==\'error\'"><div class="bk-form-row-name">{{options.name}}：</div><div class="bk-form-row-cell"><div ng-repeat="disk in data_disk.disks" class="bk-form-row-li" style="padding-bottom: 5px"><!--<div aliyun-buy-ecs-datadisk-item  is-exist-Snapshot="data_disk.isExistSnapshot" state="options.state" size="disk.size" types="data_disk.types" quota="data_disk.quotaNum" limit-types="disk.limitTypes" type="disk.type" max="disk.max" min="disk.min" detail="disk.detail" snapshot-id="disk.snapshot_id" snapshot-name="disk.snapshot_name" snapshot="data_disk.snapshot" snapshot-disk-size="disk.snapshot_disk_size" snapshot-status="data_disk.snapshot_status"  search-config="data_disk.searchConfig" page-index-config="data_disk.pageIndexConfig" mount-point="disk.mount_point" mount="data_disk.mount" release-with-ecs="disk.release_with_ecs" tag="disk.tag" portable="disk.portable" options="options" index="$index"></div>--><div aliyun-buy-ecs-datadisk-item is-exist-snapshot="data_disk.isExistSnapshot" state="options.state" size="disk.size" types="data_disk.types" quota="data_disk.quotaNum" limit-types="disk.limitTypes" type="disk.type" max="disk.max" min="disk.min" detail="disk.detail" snapshot-id="disk.snapshot_id" snapshot-name="disk.snapshot_name" snapshot-disk-size="disk.snapshot_disk_size" mount-point="disk.mount_point" mount="data_disk.mount" release-with-ecs="disk.release_with_ecs" tag="disk.tag" portable="disk.portable" options="options" index="$index"></div></div><div class="bk-form-row-li" ng-if="!options.canRelease"><span class="bk-disk-add" style="cursor: {{(options.maxNum - data_disk.disks.length) ? \'pointer\' : \'default\'}}" ng-click="addDiskRow()" data-spm-click="gostr=/aliyun;locaid=adddisk"><i class="bk-disk-add-icon" ng-class="{\'bk-disk-add-icon-disabled\' : !(options.maxNum - data_disk.disks.length)}"><em class="bk-disk-add-icon-line"></em> <em class="bk-disk-add-icon-line-b"></em></i> <span class="bk-disk-add-txt" ng-class="{\'bk-disk-add-txt-disabled\' : !(options.maxNum - data_disk.disks.length),\'bk-lnk\':!!(options.maxNum - data_disk.disks.length)}">{{options.maxNum - data_disk.disks.length ? \'增加一块\' : \'不能再增加\'}}</span></span> <span class="bk-form-row-li-info bk-ml2"><span>您还可选配</span> <span class="bk-orange">{{options.maxNum - data_disk.disks.length}}</span> <span>块；</span> <span ng-show="options.disktype === \'vm_sata_storage\' && data_disk.showSata"><span>本地磁盘可配剩余容量</span> <span>{{options.total[options.disktype] - data_disk.count[options.disktype] > 0 ? options.total[options.disktype] - data_disk.count[options.disktype] : 0}}</span> <span>GB；</span></span> <span ng-show="options.disktype === \'vm_ssd_storage\' && data_disk.showSsdSata"><span>本地SSD磁盘可配剩余容量</span> <span>{{options.total[options.disktype] - data_disk.count[options.disktype] > 0 ? options.total[options.disktype] - data_disk.count[options.disktype] : 0}}</span> <span>GB，</span></span> <span>不支持卸载</span></span></div><div class="bk-form-row-li" ng-if="options.canRelease"><span class="bk-disk-add" style="cursor: {{(options.maxNum - data_disk.disks.length) ? \'pointer\' : \'default\'}}" ng-click="addDiskRow()" data-spm-click="gostr=/aliyun;locaid=adddisk"><i class="bk-disk-add-icon" ng-class="{\'bk-disk-add-icon-disabled\' : !(data_disk.num - data_disk.disks.length)}"><em class="bk-disk-add-icon-line"></em> <em class="bk-disk-add-icon-line-b"></em></i> <span class="bk-disk-add-txt" ng-class="{\'bk-disk-add-txt-disabled\' : !(data_disk.num - data_disk.disks.length),\'bk-lnk\':!!(data_disk.num - data_disk.disks.length)}">{{data_disk.num - data_disk.disks.length ? \'增加一块\' : \'不能再增加\'}}</span></span> <span class="bk-form-row-li-info bk-ml2" ng-if="options.quota == undefined || options.quota >= options.maxNum"><span>您还可选配</span> <span class="bk-orange">{{data_disk.num - data_disk.disks.length}}</span> <span>块；</span> <span>按量付费的云盘支持卸载，</span> <span ng-show="options.disktype === \'vm_sata_storage\' && data_disk.showSata"><span>本地磁盘可配剩余容量</span> <span>{{options.total[options.disktype] - data_disk.count[options.disktype] > 0 ? options.total[options.disktype] - data_disk.count[options.disktype] : 0}}</span> <span>GB，</span> <span>不支持卸载</span></span> <span ng-show="options.disktype === \'vm_ssd_storage\' && data_disk.showSsdSata"><span>本地SSD磁盘可配剩余容量</span> <span>{{options.total[options.disktype] - data_disk.count[options.disktype] > 0 ? options.total[options.disktype] - data_disk.count[options.disktype] : 0}}</span> <span>GB，</span> <span>不支持卸载</span></span></span> <span class="bk-form-row-li-info bk-ml2" ng-if="options.quota < options.maxNum"><span ng-if="options.disktype === \'vm_sata_storage\'"><span>您还可选配</span> <span class="bk-orange">{{data_disk.num - data_disk.disks.length}}</span> <span>块；</span> <span ng-show="options.quota < options.maxNum">按量付费的云盘还可以创建<span class="bk-orange">{{options.quota - data_disk.quotaNum}}</span>块；</span> <span ng-show="options.disktype === \'vm_sata_storage\' && data_disk.showSata"><span>本地磁盘可配剩余容量</span> <span>{{options.total[options.disktype] - data_disk.count[options.disktype] > 0 ? options.total[options.disktype] - data_disk.count[options.disktype] : 0}}</span> <span>GB，</span> <span>不支持卸载</span></span> <span ng-show="options.disktype === \'vm_ssd_storage\' && data_disk.showSsdSata"><span>本地SSD磁盘可配剩余容量</span> <span>{{options.total[options.disktype] - data_disk.count[options.disktype] > 0 ? options.total[options.disktype] - data_disk.count[options.disktype] : 0}}</span> <span>GB，</span> <span>不支持卸载</span></span></span> <span ng-if="options.disktype === \'vm_yundisk_storage\'"><span ng-if="options.quota > 0"><span>您已经创建了{{data_disk.quotaNum}}块按量付费的云盘；</span> <span ng-show="data_disk.quotaNum == options.quota ">已用完按量付费的云盘的全部额度。</span></span> <span ng-if="options.quota == 0"><span>您已用完按量付费的云盘的全部额度。</span></span></span></span></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsDatadisk.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsDatadisk.html", '<div class="bk-form-row" ng-hide="options.visible===false" aliyun-buy-anchor="validate,options.state==\'error\'"><div class="bk-form-row-name">{{options.name | aliyunBuyText}}：</div><div ng-class="{\'bk-disk-show-header\':options.showHeader}"><div class="bk-form-row-cell"><span class="bk-disk-title" ng-show="options.showHeader"><span class="bk-disk-cell bk-disk-cell-type" ng-bind-html="\'ECS_DATADISK_KINDS\' | aliyunBuyText"></span> <span class="bk-disk-cell bk-disk-cell-size bk-ml2" ng-bind-html="\'ECS_DATADISK_SIZE\' | aliyunBuyText"></span> <span class="bk-disk-cell bk-disk-cell-snapshot bk-ml2" ng-bind-html="\'ECS_DATADISK_SNAPSHOT\' | aliyunBuyText"></span> <span class="bk-disk-cell bk-disk-cell-mount bk-ml2" ng-bind-html="\'ECS_DATADISK_MOUNTPOINT\' | aliyunBuyText"></span> <span class="bk-disk-cell bk-disk-cell-payment bk-ml2" ng-bind-html="\'ECS_DATADISK_PAYMETHOD\' | aliyunBuyText"></span> <span class="bk-disk-cell bk-disk-cell-portable bk-ml2" ng-bind-html="\'ECS_DATADISK_SUPPORTUNMOUNT\' | aliyunBuyText"></span></span></div><div class="bk-form-row-cell"><div ng-repeat="disk in disks" class="bk-form-row-li" style="padding-bottom: 5px"><!-- <div aliyun-buy-ecs-datadisk-item is-exist-Snapshot="data_disk.isExistSnapshot" state="options.state" size="disk.size" types="data_disk.types" quota="data_disk.quotaNum" limit-types="disk.limitTypes" type="disk.type" max="disk.max" min="disk.min" detail="disk.detail" snapshot-id="disk.snapshot_id" snapshot-name="disk.snapshot_name" snapshot-disk-size="disk.snapshot_disk_size" mount-point="disk.mount_point" mount="data_disk.mount" release-with-ecs="disk.release_with_ecs" tag="disk.tag" portable="disk.portable" options="options" index="$index" onremove="removeDisk($index)"></div> --><div aliyun-buy-ecs-datadisk-item logged-in="options.loggedIn" region-id="options.regionId" region-name="options.regionName" show-extra-info="options.showHeader" editable="disk.options.editable" convertable="disk.options.convertable && !disk.inConvertableBlackList" types="disk.options.types" max-size="disk.options.maxSize" min-size="disk.options.minSize" portable="disk.options.portable" removable="disk.options.removable" original-payment-method="disk.options.originalPaymentMethod" mounts="mounts" size="disk.size" show-size-error="disk.showSizeError" type="disk.type" detail="disk.detail" snapshot="disk.snapshot" snapshot-size="disk.snapshotSize" mount="disk.mount" hide-release="options.hideRelease" release-with-ecs="disk.releaseWithEcs" payment-method="disk.paymentMethod" convert-to-postpay="disk.convertToPostpay" onremove="removeDisk($index)"></div></div></div><div class="bk-form-row-cell bk-form-row-li" ng-show="options.addible"><span class="bk-disk-add" ng-click="addDisk()" data-spm-click="gostr=/aliyun;locaid=adddisk"><i class="bk-disk-add-icon" ng-class="{\'bk-disk-add-icon-disabled\':!addible}"><em class="bk-disk-add-icon-line"></em> <em class="bk-disk-add-icon-line-b"></em></i> <span class="bk-disk-add-txt" ng-class="{\'bk-disk-add-txt-disabled\':!addible,\'bk-lnk\':addible}">{{addible ? \'增加一块\' : \'不能再增加\'}}</span></span> <span class="bk-form-row-li-info bk-ml2"><span ng-bind-html="\'ECS_DATADISK_UCANSELECT\' | aliyunBuyText"></span> <span class="bk-orange">{{options.diskMaxNumber - disks.length}}</span> <span ng-bind-html="\'ECS_DATADISK_PIECE\' | aliyunBuyText"></span> <span ng-repeat="(key,item) in tips"><span ng-repeat="method in options.paymentMethods"><span ng-if="method.value==item.paymentMethod">{{method.text}}&nbsp;</span></span><span ng-repeat="type in options.diskTypes"><span ng-if="type.value==item.type">{{type.text}}</span></span> <span ng-show="item.showRestSize"><span ng-bind-html="\'ECS_DATADISK_REMAIN\' | aliyunBuyText"></span> <span>{{item.restSize}}</span> <span>GB，</span></span> <span>{{item.portable?\'支持\':\'不支持\'}}</span><span ng-bind-html="\'ECS_DATADISK_UNMOUNT\' | aliyunBuyText"></span></span></span></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsDatadiskItem.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsDatadiskItem.html", '<div class="ecs-bk-disk"><div class="bk-disk" ng-class="{\'bk-disk-show-extra-info\':showExtraInfo()}"><!--类型--><span class="bk-form-row-li-info bk-disk-cell"><span class="bk-form-row-li-info" ng-if="types().length <= 1 || !!snapshot || !editable()"><span class="bk-black pd10">{{detail.type.text}}</span></span> <span aliyun-buy-select class="bk-select bk-select-l1" short="true" option="types()" detail="detail.type" ng-model="type" ng-show="types().length >= 2 && !snapshot && editable()"></span></span><!--容量--> <span class="bk-form-row-li-info bk-disk-cell bk-disk-cell-size"><span class="bk-disk-storage"><span ng-show="editable()"><input aliyun-buy-ecs-datadisk-size-input ng-model="model4placeholder" placeholder="{{sizeRange}}" class="bk-disk-input" ng-class="{\'bk-disk-input-error\': showSizeError}" data-value="size" max="maxSize()" min="minSize()" type="text" ng-focus="showSizeError=false" aliyun-buy-tooltip="{content:\'容量范围：{{sizeRange}}\', theme:\'white\', trigger:\'hover\', offsetX: 20}"> <span class="bk-disk-unit">GB</span></span></span> <span ng-show="!editable()"><span class="bk-disk-size">{{size}}</span> <span class="bk-pale">GB</span></span></span><!--IOPS--> <span class="bk-form-row-li-info bk-disk-cell bk-ml2" style="color: #000">{{iops}}</span> <span class="bk-form-row-li-info bk-disk-cell bk-iops">IOPS</span><!--快照--> <span class="bk-form-row-li-info bk-disk-cell bk-disk-cell-snapshot"><div aliyun-buy-ecs-datadisk-item-snapshot ng-show="loggedIn()" logged-in="loggedIn()" size="snapshotSize" id="snapshot" name="detail.snapshot.name" region-id="regionId()" region-name="regionName()" max-size="maxSize()" editable="editable()" show-snap-close="false"></div></span><!--挂载点--> <span class="bk-form-row-li-info bk-disk-cell bk-disk-cell-mount bk-ml2"><div aliyun-buy-ecs-datadisk-item-mount mounts="mounts()" mount="mount" editable="editable()"></div></span><!--其它信息（付费类型、是否支持卸载）--> <span ng-if="showExtraInfo()"><span class="bk-form-row-li-info bk-disk-cell bk-disk-cell-payment bk-ml2"><span ng-if="paymentMethod==\'postpay\'">{{\'ECS_BUY_POSTPAY\'|aliyunBuyText}}</span> <span ng-if="paymentMethod==\'prepay\'">{{\'ECS_BUY_YEARMONTH\'|aliyunBuyText}}</span></span> <span class="bk-form-row-li-info bk-disk-cell bk-disk-cell-portable bk-ml2">{{portable()?\'支持\':\'不支持\'}}</span></span><!--转换为按量付费--> <span class="bk-form-row-li-info bk-disk-cell bk-disk-cell-convert bk-ml2" ng-show="convertable()"><label><input class="bk-mr1" type="checkbox" ng-model="convertToPostpay"><span class="bk-lnk" ng-bind-html="\'ECS_DATADISK_CONVERT\' | aliyunBuyText"></span></label></span><!--随实例释放--> <span class="bk-form-row-li-info bk-disk-cell bk-disk-cell-release bk-ml2" ng-show="portable() && !hideRelease()==true"><label><input class="bk-mr1" type="checkbox" ng-model="releaseWithEcs"><span class="bk-lnk" ng-bind-html="\'ECS_DATADISK_RELEASE\' | aliyunBuyText"></span></label><a class="bk-lnk bk-ml1" href="javascript:;" aliyun-buy-tooltip="{{\'ECS_RELEASEWITHECS_TIP\' | aliyunBuyText}}"><i class="aliyun-icon-help"></i></a></span><!--关闭按钮--> <span ng-show="editable()" class="bk-disk-delete" data-spm-click="gostr=/aliyun;locaid=deletedisk" ng-click="remove()"><i class="aliyun-icon-wrong-thin"></i></span></div></div>')
    }]), e.module("partials/aliyunBuyEcsDatadiskItemMount.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsDatadiskItemMount.html", '<span><a ng-show="editable()" class="bk-disk-mount bk-form-row-li-info" href="javascript:;" data-spm-click="gostr=/aliyun;locaid=diskmount" aliyun-buy-tooltip="{templateUrl:\'partials/aliyunBuyEcsDatadiskItemMountList.html\',handle:\'tipHandle\', offsetY: -2}"><span class="bk-lnk" ng-if="mount">{{mount}}</span> <span class="bk-lnk" ng-if="!mount">{{\'ECS_DATADISK_AUTO\'|aliyunBuyText}}</span></a> <span ng-show="!editable()" class="bk-form-row-li-info">{{mount}}</span></span>')
    }]), e.module("partials/aliyunBuyEcsDatadiskItemMountList.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsDatadiskItemMountList.html", '<div style="min-width: 100px; height: 192px"><ul class="bk-datadisk-mount-list"><li style="padding: 5px 0" ng-class="{\'sedi-text-gray checked\' : item.checked}" ng-repeat="item in mounts()" ng-click="select(item)">{{item.text}}</li></ul></div>')
    }]), e.module("partials/aliyunBuyEcsDatadiskItemSnapshot.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsDatadiskItemSnapshot.html", '<div class="bk-snap-disk"><span class="bk-form-row-li-info bk-disk-snapshot bk-ml2"><a href="javascript:;" data-spm-click="gostr=/aliyun;locaid=disksnapshot" aliyun-buy-tooltip="{templateUrl:\'partials/aliyunBuyEcsDatadiskItemSnapshotList.html\',handle:\'listHandle\', theme:\'blank\', maxWidth :\'500px\'}" ng-show="states.visible"><span ng-show="editable()" class="bk-lnk" ng-click="open()" title="{{snapshotId ?\'快照ID:\'+id + \',快照名称:\'+( name || \'--\'):\'\'}}"><span ng-if="id" title="{{name}}">{{\'ECS_SNAP_SNAME\'|aliyunBuyText}}：{{name}}</span> <span ng-if="!id" ng-bind-html="\'ECS_DATADISK_CSNAPSHOT\' | aliyunBuyText"></span></span></a> <span ng-show="!editable()">{{name || \'无\'}}</span></span> <span ng-show="id && showSnapClose" class="bk-disk-delete" data-spm-click="gostr=/aliyun;locaid=deletedisk" ng-click="remove()"><i class="aliyun-icon-wrong-thin"></i></span></div>')
    }]), e.module("partials/aliyunBuyEcsDatadiskItemSnapshotList.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsDatadiskItemSnapshotList.html", '<div class="bk-snpshot-form"><div style="padding:0 15px; height: 306px; width: 460px"><div class="bk-title-head">{{\'ECS_SNAP_LIST\'|aliyunBuyText}}[{{regionName()}}]<div class="search-box"><input ng-if="searchModel.field==\'name\'" type="text" class="bk-ecs-snap-input" placeholder="{{\'ECS_SNAP_MSEARCH\'|aliyunBuyText}}" ng-model="searchModel.key"> <input ng-if="searchModel.field==\'id\'" type="text" style="background: #fff" placeholder="{{\'ECS_SNAP_JSEARCH\'|aliyunBuyText}}" ng-model="searchModel.key"> <input ng-if="searchModel.field==\'date\'" type="text" readonly="readonly" class="bk-number-input" style="font-size:12px;line-height:26px;height:26px;background: #fff" min="\'{{searchDate.minDate}}\'" max="\'{{searchDate.maxDate}}\'" init-date="searchDate.initDate" show-weeks="false" show-button-bar="false" toggle-weeks-text="{{\'ECS_WEEK\'|aliyunBuyText}}" datepicker-mode current-text="{{\'ECS_TODAY\'|aliyunBuyText}}" clear-text="{{\'ECS_CLEAR\'|aliyunBuyText}}" close-text="{{\'ECS_OK\'|aliyunBuyText}}" aliyun-buy-datepicker-popup="yyyy-MM-dd" placeholder="格式:YYYY-MM-DD" ng-model="searchModel.key"> <i class="aliyun-icon-wrong-thin bk-snapshot-close-icon" ng-show="!!searchModel.key" ng-click="clearKey()"></i><div class="icon-wrapper" ng-click="querySnapshots()"><span class="aliyun-icon-Search"></span></div></div><span class="bk-snapshot-select"><select class="form-control bk-ecs-snap-input" ng-model="searchModel.field" ng-options="obj.value as obj.text for obj in searchFields"></select></span></div><div class="bk-snapshot-table"><div class="table-head"><div class="td td_normal" ng-bind-html="\'ECS_SNAP_SNAPID\' | aliyunBuyText"></div><div class="td td_normal" ng-bind-html="\'ECS_SNAP_SNAPNAME\' | aliyunBuyText"></div><div class="td td_small" ng-bind-html="\'ECS_SNAP_SIZE\' | aliyunBuyText"></div><div class="td td_normal" ng-bind-html="\'ECS_SNAP_CREATETIME\' | aliyunBuyText"></div><div style="clear:both"></div></div></div><div aliyun-buy-preloader="states.searching" aliyun-buy-preloader-msg="states.searchErrorMsg" aliyun-buy-preloader-msg-trigger="states.searchError"><div class="bk-snapshot-list" style="height:200px; padding:8px 0"><div class="bk-snapshot-table"><div class="table-body"><div ng-if="searchModel.total === 0" style="text-align: center; line-height: 143px"><span ng-if="!searchModel.key" ng-bind-html="\'ECS_SNAP_UNSELECT\' | aliyunBuyText"></span> <span ng-if="!!searchModel.key" ng-bind-html="\'ECS_SNAP_NORESULT\' | aliyunBuyText"></span></div><div class="table-row" ng-repeat="item in searchModel.currentPageResult track by $index" ng-click="selectSnapshot(item)" ng-class="{\'sedi-text-gray unit-disabled\':!checkDiskSelectable(item.disk, minSize(), maxSize())}"><div class="td td_normal" title="{{\'ECS_SNAP_SNAPID\'|aliyunBuyText}} : {{item.id}}">{{item.id}}</div><div class="td td_normal" title="{{\'ECS_SNAP_SNAPNAME\'|aliyunBuyText}} : {{item.name}}">{{item.name || "无"}}</div><div class="td td_small" title="{{\'ECS_SNAP_SIZE\'|aliyunBuyText}} : {{item.disk}}">{{item.disk}}GB</div><div class="td td_normal" title="{{\'ECS_SNAP_CREATETIME\'|aliyunBuyText}} : {{item.time}}">{{item.time}}</div><div style="clear:both"></div></div></div></div><div style="margin-top: 20px"><span class="bk-paging bk-paging-rn"><span class="bk-paging-list"><span class="bk-paging-prev" ng-class="{\'bk-paging-disabled\':!pagination.previousEnabled}" ng-click="querySnapshots(\'previous\')" ng-bind-html="\'ECS_PREV\' | aliyunBuyText"></span> <span class="bk-paging-next" ng-class="{\'bk-paging-disabled\':!pagination.nextEnabled}" ng-click="querySnapshots(\'next\')" ng-bind-html="\'ECS_NEXT\' | aliyunBuyText"></span></span></span></div></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsDowngrade.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsDowngrade.html", '<div class="bk-scope" aliyun-buy-preloader="ready() === false"><div aliyun-buy-ecs-downgrade-options value="optionsValue" handle="optionsHandle" price="optionsPrice" detail="optionsDetail" instance-id="instanceId()"></div><div aliyun-buy-ecs-price data="optionsPrice"></div><div class="bk-order-pact"><a href="javascript:;" class="bk-order-pact-box" ng-click="termsChecked=!termsChecked" ng-class="{\'bk-order-pact-box-select\':termsChecked, \'\':!termsChecked}"><span class="dis-inline-block" ng-class="{\'aliyun-icon-yes2\':termsChecked, \'\':!termsChecked}"></span></a> <span ng-bind-html="\'ECS_SERVICE_TERMS\'|aliyunBuyText"></span></div><div class="bk-items-price-control bk-order-price-control bk-order-renew-price-wrap"><div aliyun-buy-button ng-click="pay()" is-disabled="{{payDisabled}}">{{\'ECS_PAY\'|aliyunBuyText}}</div></div></div>')
    }]), e.module("partials/aliyunBuyEcsDowngradeOptions.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsDowngradeOptions.html", '<div class="bk-scope" aliyun-buy-preloader="!ready" aliyun-buy-disable-ng-animate><div aliyun-buy-ecs-instance-detail data="raw" ng-if="options.global.showInstanceInfo"></div><div ng-class="{\'bk-order-renew-wrap bk-mt5\':options.global.showInstanceInfo}"><div class="bk-order-renew-title" ng-show="options.global.showInstanceInfo">{{\'ECS_RENEW_WITH_DOWNGRADE\'|aliyunBuyText}}</div><div class="update-title-intro bk-mt4" ng-bind-html=" \'ECS_RENEW_CHANGE_TIP\' | aliyunBuyText "></div><div ng-if="options.global.isLocalOfSystemDisk" aliyun-buy-notice data-text="ECS_NOT_ALLOW_DOWNGRADE_WHEN_LOCAL_SYSTEMDISK" class="bk-mt5"></div><div ng-class="{\'bk-order-renew-body\':options.global.showInstanceInfo}"><div aliyun-buy-ecs-instance-type options="options.instanceType" value="value.instanceType" detail="detail" config="config().instanceType" value-all="value" raw="raw" no-dialog="true"></div><div aliyun-buy-restart-time options="options.restartTime" value="value.restartTime" detail="detail.restartTime" config="config().restartTime"></div><div aliyun-buy-ecs-datadisk options="options.datadisk" value="value.datadisk" config="config().datadisk" detail="detail.datadisk"></div><div aliyun-buy-bricks-tabs options="options.bandwidthType" value="value.bandwidthType" detail="detail.bandwidthType" config="config().bandwidthType"></div><div aliyun-buy-ecs-bandwidth options="options.bandwidth" value="value.bandwidth" config="config().bandwidth"></div><div aliyun-buy-duration options="options.duration" value="value.duration" config="config().duration" detail="detail.duration"></div><div ng-show="!!newExpirationTime && config().duration.visible!=false" class="bk-order-renew-new-time">{{\'ECS_EXPIRATION_TIME_AFTER_RENEW_IS\'|aliyunBuyText}}<span class="bk-order-time-color" ng-bind="newExpirationTime | aliyunBuyRenewTimeFormat"></span></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsImage.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsImage.html", '<div aliyun-buy-anchor="validate,options.state===\'error\'" class="bk-form-row" ng-hide="options.visible===false"><label class="bk-form-row-name">{{options.name|aliyunBuyText}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li"><div aliyun-buy-select-dynamic ng-model="value" fetch-config="fetchConfig" detail="detail" placeholder="{{options.placeholder | aliyunBuyText}}" option="options.items" state="options.state"></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsImageFromMarket.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsImageFromMarket.html", '<div aliyun-buy-anchor="validate,options.state===\'error\'" class="bk-form-row" ng-hide="options.visible===false"><label class="bk-form-row-name"></label><div class="bk-form-row-cell" style="position:relative;top:-15px;line-height:22px"><!-- <div style="position:relative;top:5px;">\n      <span ng-if="options.showTipPrice"><span ng-bind-html="\'ECS_IMG_FROM_MARKET\' | aliyunBuyText"></span><span class="bk-ml2">{{options.imageMarketPrice.price.messagePrice | currency}} / {{\'ECS_IMG_UNIT\'|aliyunBuyText}}</span></span>\n      <span ng-if="options.useTip">{{options.useTip}}</span>\n      <span class="bk-ml2" ng-bind-html="\'ECS_IMG_FROM_MARKET_DETAIL\' | aliyunBuyText"></span>\n    </div> --><div class="bk-form-row-txt" ng-show="options.state==\'error\'"><span class="bk-form-status bk-form-error"><i class="bk-form-status-icon aliyun-icon-no3"></i><span class="bk-form-status-message" ng-if="options.errorTip" ng-bind-html="options.errorTip"></span><span class="bk-form-status-message" ng-if="!options.errorTip" ng-bind-html="options.stateMessage"></span></span></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsImageMarket.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsImageMarket.html", '<div aliyun-buy-anchor="validate,options.state===\'error\'" class="bk-form-row" ng-hide="options.visible===false"><label class="bk-form-row-name">{{options.name|aliyunBuyText}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-text" ng-if="value">{{detail.text}}</div><div class="bk-form-row-li"><span class="bk-rect-select" ng-click="openImageMarket()"><i class="bk-rect-select-icon" ng-class="{\'bk-button-error\':options.state==\'error\'}"><em class="bk-rect-select-icon-rect"></em> <em class="bk-rect-select-icon-rect"></em> <em class="bk-rect-select-icon-rect"></em> <em class="bk-rect-select-icon-rect"></em></i> <span class="bk-rect-select-txt bk-click-link" ng-class="{\'bk-rect-select-txt-error\':options.state==\'error\'}">{{value?\'ECS_RESELECT_IMAGE\':\'ECS_SELECT_FROM_IMAGE_MARKET\' | aliyunBuyText}}</span></span> <span class="bk-form-row-li-info bk-ml2" ng-if="options.needLogin" ng-bind-html="\'ECS_IMG_NEEDLOGIN\' | aliyunBuyText"><a ng-click="login()" style="cursor: pointer" ng-bind-html="\'ECS_IMG_LOGIN\' | aliyunBuyText"></a></span></div></div><div class="bk-form-row-txt" ng-bind-html="options.tip" ng-show="options.tip"></div></div>')
    }]), e.module("partials/aliyunBuyEcsImageMarketDialog.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsImageMarketDialog.html", '<div><div class="bk-dialog-head bk-drag-head" aliyun-buy-drag box-class="bk-dialog" fill-left-px="340"><span class="bk-dialog-close bk-dialog-close-thin" data-dismiss="modal" aria-hidden="true" ng-click="$close()"><span class="aliyun-icon-wrong-thin"></span></span><h5 class="bk-dialog-title">{{\'ECS_IMG_MARKET\' | aliyunBuyText}}[{{regionName}}]</h5></div><div class="bk-dialog-body" aliyun-buy-preloader="!isReady"><div class="bk-menu"><span ng-repeat="type in image.imageTypes" ng-click="menuChange(type.marketImageCategoryId)" ng-class="{\'bk-current\': type.marketImageCategoryId==currentCategoryId}" class="bk-items">{{type.marketImageCategoryName}}</span></div><!-- <div class="sedi-buy-image-loading" ng-show="isLoading">\n        </div> --><div ng-if="currentCategoryId == \'purchased\'" class="bk-orange bk-ml5 bk-mt2" style="float:left">当剩余可用镜像大于 0 时，优先使用按次镜像，用完按次镜像后才会开通按量付费镜像。</div><div ng-if="currentCategoryId != \'purchased\'" class="bk-orange bk-ml5 bk-mt2" style="float:left">如需使用按次镜像，请先点击镜像名称到云市场购买，然后在已购镜像中选择使用。</div><div class="bk-box" style="height: 458px; padding-top:28px" aliyun-buy-preloader="isLoading"><div ng-show="image.imageList.length==0"><div style="margin: 50px 0; text-align: center"><div ng-bind-html="\'ECS_IMG_NOUSE\' | aliyunBuyText"></div></div></div><div class="bk-items-min" ng-show="image.imageList.length!=0"><!-- 硬代码，数据库推荐 start--><div data-spm="marketplaceDialogForMySQL" ng-if="currentCategoryId == \'56024006\'" class="bk-items bk-clearfix" style="padding-bottom: 10px"><div class="bk-content bk-pull-left"><div class="break-title bk-font-14"><label style="width:370px"><a class="bk-lnk-black" href="https://www.aliyun.com/act/aliyun/rds_for_mysql/demo.php" target="_blank"><span class="bk-orange">【推荐】</span>MySQL服务</a></label></div><div class="bk-font-l bk-pd1">自动部署主备双机，提供读写分离、数据压缩、实例智能调优及<br>专业源码维护等专业数据库自动化运维方案。</div><div class="break-line bk-font-l bk-pd1" title="{{item.shortDescription}}">版本：MySQL 5.5/5.6<span class="bk-ml3">来源：云数据库RDS</span></div></div><div class="bk-operate bk-pull-left"><div class="break-line bk-pb2 bk-font-14"><span class="bk-orange bk-ml1 bk-mr1">40.8</span>元/月起</div><a class="bk-button bk-button-blue bk-button-s" style="padding:0; color:#fff" href="https://www.aliyun.com/act/aliyun/rds_for_mysql/demo.php" target="_blank" ng-bind-html="\'ECS_IMG_BUY_NOW\' | aliyunBuyText"></a></div></div><!-- 硬代码，数据库推荐 end--><div class="bk-items bk-clearfix" style="padding-bottom: 10px" ng-repeat="item in image.imageList"><div class="bk-content bk-pull-left"><div class="break-title bk-font-14"><label style="width:370px"><a class="bk-lnk-black" href="{{item.detailUrl}}" target="_blank">{{item.productName}}</a></label><select ng-model="item.versionValue" class="bk-select" ng-options="version.imageId as version.version for version in item.imageVersions"></select></div><div class="break-line bk-font-l bk-pd1">{{item.baseSystem}} {{\'ECS_IMG_SOURCE\'|aliyunBuyText}} {{item.supplierName}}</div><div class="break-line bk-font-l bk-pd1" title="{{item.shortDescription}}">{{item.shortDescription}}</div><div class="break-link bk-pb1 bk-font-l" ng-hide="!loggedIn || (item.capacity ==0 && item.used ==0 && item.quota == 0)"><span class="">{{\'ECS_IMG_BOUGHTNUM\'|aliyunBuyText}}<span class="bk-font-14 bk-black">{{item.capacity}}</span>{{\'ECS_IMG_UNIT\'|aliyunBuyText}}</span><span class="bk-ml5">{{\'ECS_IMG_USENUM\'|aliyunBuyText}}<span class="bk-font-14 bk-black">{{item.used}}</span>{{\'ECS_IMG_UNIT\'|aliyunBuyText}}</span><span class="bk-ml5">{{\'ECS_IMG_LEFTNUM\'|aliyunBuyText}}<span class="bk-font-14 bk-black">{{item.quota}}</span>{{\'ECS_IMG_UNIT\'|aliyunBuyText}}</span></div></div><div class="bk-operate bk-pull-left" ng-if="(currentCategoryId == \'purchased\' && item.quota <= 0 ) || (currentCategoryId != \'purchased\')"><div class="break-line bk-pb2 bk-font-14" ng-if="item.price"><span class="bk-orange bk-ml1 bk-mr1">{{item.price | currency}}</span>/{{\'ECS_IMG_UNIT_HOUR\'|aliyunBuyText}}</div><button class="bk-button bk-button-blue bk-button-s" style="padding:0" ng-click="useImage(item)" ng-bind-html="\'ECS_IMG_AGREE\' | aliyunBuyText"></button><br><a class="bk-lnk" href="{{item.agreementUrl}}" target="_blank" ng-bind-html="\'ECS_IMG_AGREETERMS\' | aliyunBuyText"></a></div><div class="bk-operate bk-pull-left" ng-if="currentCategoryId == \'purchased\' && item.quota > 0"><button class="bk-button bk-button-blue bk-button-s" style="padding:0" ng-click="useImage(item)" ng-bind-html="\'ECS_IMG_USER\' | aliyunBuyText"></button></div></div></div><div class="bk-paging-index-min"><div ng-show="isReady && image.imageList.length" aliyun-buy-pagination total-items="totalItems" ng-model="image.currentPage" items-per-page="itemsPerPage" max-size="8" previous-text="{{\'ECS_PREV\'|aliyunBuyText}}" next-text="{{\'ECS_NEXT\'|aliyunBuyText}}"></div></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsImageMarketPrice.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsImageMarketPrice.html", '<div ng-hide="options.visible===false" class="bk-scope bk-items"><div class="bk-items-price" style="padding-left: 0;margin-left: 0"><div class="bk-items-price-title bk-pale"><span ng-bind-html="\'ECS_IMG_FEE\' | aliyunBuyText"></span> <a class="bk-lnk bk-ml1" href="javascript:;" data-spm-click="gostr=/aliyun;locaid=bandwidthUpgradeForever" aliyun-buy-tooltip="{{options.imgFeeTip}}"><i class="aliyun-icon-help"></i></a></div><div class="bk-items-price-settle"><div ng-if="price.calculating" class="bk-items-price-calculating" ng-bind-html="\'ECS_IMG_CALCULATING\' | aliyunBuyText"></div><div ng-if="!price.calculating && price.tradePrice===null" class="bk-items-price-calculating" ng-bind-html="\'ECS_IMG_ERROR\' | aliyunBuyText"></div><div ng-if="!price.calculating && price.tradePrice!==null"><span class="bk-cny">&yen;</span><span class="bk-items-price-money">{{price.tradePrice | aliyunBuyPriceValue}}</span><span class="bk-items-price-unit">{{config().priceUnit}}</span></div></div><div class="bk-items-price-offer" ng-if="price.tradePrice < price.originalPrice"><span class="bk-items-price-cost bk-mr1">{{\'ECS_OLDPRICE\'|aliyunBuyText}}<span class="bk-cny">&yen;</span>{{price.originalPrice | aliyunBuyPriceValue}}{{config().priceUnit}}</span> <span class="bk-items-price-rebate">{{\'ECS_REDUCE\'|aliyunBuyText}}<span class="bk-cny">&yen;</span>{{price.discountPrice | aliyunBuyPriceValue}}{{config().priceUnit}}</span></div><div class="bk-items-price-tag" ng-if="price.strategies.length > 0"><i class="bk-items-price-tag-title aliyun-icon-giving"></i><div class="bk-items-price-tag-list"><span ng-repeat="strategy in price.strategies" class="bk-ploy" title="{{strategy.title}}">{{strategy.name}}</span></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsImageOffline.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsImageOffline.html", '<div aliyun-buy-anchor="validate,options.state===\'error\'" class="bk-form-row" ng-hide="options.visible===false"><label class="bk-form-row-name"></label><div class="bk-form-row-cell" style="position:relative;top:-15px;line-height:22px"><div ng-bind-html="\'ECS_IMG_OFFLINE_WINDOWS2003_TIP\' | aliyunBuyText"></div><div style="position:relative;top:5px"><input ng-hide="value==\'agree\'" class="bk-mr1 ng-pristine ng-valid" ng-click="agree()" type="checkbox" ng-checked="value!=\'show\'"> <span ng-bind-html="\'ECS_IMG_OFFLINE_WINDOWS2003_AGREEMENT\' | aliyunBuyText"></span></div><div class="bk-form-row-txt" ng-show="options.state==\'error\'"><span class="bk-form-status bk-form-error"><i class="bk-form-status-icon aliyun-icon-no3"></i><span class="bk-form-status-message" ng-if="options.errorTip" ng-bind-html="options.errorTip"></span><span class="bk-form-status-message" ng-if="!options.errorTip" ng-bind-html="options.stateMessage"></span></span></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsInstanceDetail.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsInstanceDetail.html", '<div class="bk-scope"><div class="bk-order-info"><div class="bk-order-renew-title">{{\'ECS_INSTANCE_INFO\'|aliyunBuyText}}</div><div class="bk-info-name"><span>{{\'ECS_INSTANCE_NAME\'|aliyunBuyText}}：</span><span ng-bind="context.instanceName"></span></div><div class="bk-info-row"><table><tbody><tr><td><label>{{\'ECS_REGION\'|aliyunBuyText}}：</label><span ng-bind="context.region|aliyunBuyText"></span></td><td><label>实例系列：</label><span>{{context.instanceGeneration}}</span></td><td><label>实例规格：</label><span>{{context.instanceTypeText}}（{{context.instanceTypeFamily}}，{{context.instanceTypeValue}}）</span></td><td><label>I/O 优化：</label><span>{{context.iooptimized}}</span></td></tr><tr><td ng-show="context.bandwidthType !== undefined"><label>{{\'ECS_BANDWIDTH_TYPE\'|aliyunBuyText}}：</label><span ng-bind="context.bandwidthType|aliyunBuyText"></span></td><td><label>{{\'ECS_NETWORK_TYPE\'|aliyunBuyText}}：</label><span ng-bind="context.networkType|aliyunBuyText"></span></td><td ng-show="context.bandwidthType !== undefined && context.bandwidthType == \'ECS_VIA_FIXED_BANDWIDTH\'"><label><span>{{\'ECS_BASIC_BANDWIDTH\'|aliyunBuyText}}</span>：</label><span ng-bind="context.baseBandWidth | aliyunBuyEcsShowComponent:\'bandwidth\'"></span></td><td ng-show="context.bandwidthType !== undefined"><label>{{\'ECS_CURRENT_USED_BANDWIDTH\'|aliyunBuyText}} <span ng-if="context.bandwidthByFlow">{{\'ECS_PEAK\'|aliyunBuyText}}</span>：</label><span ng-bind="context.bandwidth | aliyunBuyEcsShowComponent:\'bandwidth\'"></span></td></tr><tr><td ng-if="context.privateIp"><span><label>{{\'ECS_LAN_IP\'|aliyunBuyText}}：</label><span ng-bind="context.privateIp"></span></span></td><td ng-if="context.publicIp"><span><label>{{\'ECS_WAN_IP\'|aliyunBuyText}}：</label><span ng-bind="context.publicIp"></span></span></td><td colspan="2"><label>{{\'ECS_DATADISK\'|aliyunBuyText}}：</label><span ng-if="context.datadisk.length === 0">无</span> <span ng-if="context.datadisk.length > 0" ng-repeat="disk in context.datadisk track by $index">{{disk}};</span></td></tr><tr><td colspan="2"><label>{{\'ECS_OS\'|aliyunBuyText}}：</label><span ng-bind="context.os|aliyunBuyText"></span></td></tr><tr ng-if="context.imageProduct"><td colspan="4"><label>{{\'ECS_CURRENT_IMG\'|aliyunBuyText}}：</label><span ng-bind="context.imageProduct"></span></td></tr></tbody></table></div><div class="bk-order-time-row"><span>{{\'ECS_EXPIRATION_TIME\'|aliyunBuyText}}：</span><span class="bk-order-time-color" ng-bind="context.expiration"></span></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsInstanceType.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsInstanceType.html", '<div aliyun-buy-anchor="validate,options.state===\'error\'" class="bk-form-row" ng-hide="options.visible===false"><label class="bk-form-row-name">{{options.name|aliyunBuyText}}：</label><div class="bk-form-row-cell {{noDialog? \'bk-form-row-cell-nodialog\':\'\'}}"><div class="bk-form-row-text {{noDialog && !hideOptionsItems ? \'bk-form-row-text-nodialog\':\'bk-form-row-text-dialog\'}}" ng-if="value">{{detail.instanceType.text}}（{{detail.instanceTypeFamily.text}} , {{detail.instanceType.value}}）</div><div class="bk-instancetype-row-li" ng-hide="hideOptionsItems == true"><div class="bk-form-row-li"><span class="bk-rect-select" ng-click="openInstanceTypeDialog()"><i class="bk-rect-select-icon" ng-class="{\'bk-button-error\':options.state==\'error\'}"><em class="bk-rect-select-icon-rect"></em> <em class="bk-rect-select-icon-rect"></em> <em class="bk-rect-select-icon-rect"></em> <em class="bk-rect-select-icon-rect"></em></i> <span class="bk-rect-select-txt bk-click-link">{{value?\'ECS_RESELECT_FROM_INSATNCE_TYPE\': \'ECS_SELECT_FROM_INSATNCE_TYPE\' | aliyunBuyText}}</span></span></div></div></div><div class="bk-form-row-txt" ng-bind-html="options.tip" ng-show="options.tip"></div></div>')
    }]), e.module("partials/aliyunBuyEcsInstanceTypeDialog.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsInstanceTypeDialog.html", '<div class="bk-theme-mini" ng-drag="true"><div ng-if="!noDialog" class="bk-dialog-head bk-drag-head" aliyun-buy-drag box-class="bk-dialog" fill-left-px="340"><span class="bk-dialog-close bk-dialog-close-thin" data-dismiss="modal" aria-hidden="true" ng-click="$close()"><span class="aliyun-icon-wrong-thin"></span></span><h5 class="bk-dialog-title">{{detail.instanceGeneration.text}}</h5></div><div class="bk-dialog-body"><!-- <div ng-if="!noDialog" class="bk-instance-intro">\n            <span ng-if="valueAll.instanceGeneration == \'ecs-1\'">\n                <li>采用 Intel Xeon IvyBridge CPU</li>\n                <li>采用 DDR3 的内存。</li></span>\n            <span ng-if="valueAll.instanceGeneration == \'ecs-2\'">\n                <li>采用 Haswell CPU，用户可以获得更大的实例规格，同时增加了一些新的指令集，使整数和浮点运算的性能翻倍</li>\n                <li>采用 DDR4 的内存，内存访问速度更快。</li>\n                <li>全部为 IO 优化实例，配合 SSD 云盘使用获得更高更好的 IO 性能</li></span>\n             \n        </div> --><div class="bk-instance-box" ng-if="valueAll.instanceGeneration !== \'ecs-1\'"><div ng-repeat="item in options.familyItems" class="bk-shift-buttontype-group"><div ng-if="item.instanceTypeItems.length > 0"><div class="bk-shift-buttontab-name">{{item.text}}<span class="bk-instancefamily-help" aliyun-buy-tooltip="{{getInstanceTypeFamilyIntroduce(item.value)}}"><i class="aliyun-icon-help"></i></span></div><div class="bk-buttontab {{noDialog ? \'bk-shift-buttontab-nodialog\': \'bk-shift-buttontab\'}}"><button aliyun-buy-button ng-repeat="option in item.instanceTypeItems track by $index" ng-click="select(option)" tip="{{option.tip}}" tip-class="{{option.tipClass}}" is-selected="{{value==option.value}}" is-disabled="{{option.disabled==true}}" show-tip="{{!!option.tip}}">{{option.text | aliyunBuyText}}</button></div></div></div></div><!-- 一代规格族需要单独展示 --><div class="bk-instance-box" ng-if="valueAll.instanceGeneration == \'ecs-1\'"><div ng-repeat="item in options.groupItems" class="bk-shift-buttontype-group"><div ng-if="item.instanceTypeItems.length > 0"><div class="bk-shift-buttontab-name">{{item.text}}</div><div class="bk-buttontab {{noDialog ? \'bk-shift-buttontab-nodialog\': \'bk-shift-buttontab\'}} bk-shift-buttontab-ecs1"><button aliyun-buy-button ng-repeat="option in item.instanceTypeItems track by $index" ng-click="select(option)" tip="{{option.tip}}" tip-class="{{option.tipClass}}" is-selected="{{value==option.value}}" is-disabled="{{option.disabled==true}}" show-tip="{{!!option.tip}}">{{option.text | aliyunBuyText}}</button></div></div></div></div></div><div class="bk-dialog-footer"><div class="bk-dialog-footer-info"><!-- <h3 ng-if="!noDialog">{{detail.instanceType.text}}（{{detail.instanceTypeFamily.text}} , {{detail.instanceType.value}}）</h3>\n            <div class="bk-form-row-txt">{{getInstanceTypeFamilyIntroduce(detail.instanceTypeFamily.value)}}</div>\n            <div ng-if="valueAll.instanceGeneration != \'ecs-1\'" class="bk-mt1 bk-instancetype-properties">\n                <span class="bk-mr1 {{getPropertyValue(\'supportIooptimized\', detail.instanceType.value) ? \'aliyun-icon-yes2 bk-gray\' : \'aliyun-icon-wrong bk-gray\'}}"></span>I/O 优化</div> --><div ng-if="!noDialog" aliyun-buy-button class="bk-button-ensure bk-mt4" theme="blue" data-spm-click="gostr=/aliyun;locaid=ensureInstanceType" ng-click="$close()">{{\'ECS_OK\'|aliyunBuyText}}</div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsIo.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsIo.html", '<div class="bk-form-row" ng-hide="options.visible===false"><label class="bk-form-row-name">{{options.name}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li"><span aliyun-buy-checkbox value="_value" display="display" read-only="options.readOnly"></span> <a class="bk-lnk bk-ml1" href="javascript:;" data-spm-click="gostr=/aliyun;locaid=iohelp" aliyun-buy-tooltip="{{\'ECS_IO_TIP\' | aliyunBuyText}}"><i class="aliyun-icon-help"></i></a></div><div class="bk-form-row-text" ng-bind-html="options.tip" ng-show="options.tip"></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsOrderResultView.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsOrderResultView.html", '<div class="" data-spm="orderResult"><!-- 标题 --><div><div class="y-page-title" ng-hide="config.hideTitle"><div class="y-row"><div class="y-span12 y-last"><div class="bk-scope bk-subheader"><div class="bk-subheader-box"><h1>{{orderResult.successInfo.title ? orderResult.successInfo.title: orderResult.failInfo.title}}</h1></div></div></div></div></div></div><!--进度条--><div class="y-row y-mt5" ng-hide="config.hideProcess"><div class="bk-process"><span class="unit past w49">{{\'ECS_RESULT_CONFIRM\'|aliyunBuyText}}</span> <span class="arrow-complete"><span class="next"></span> <span class="prev"></span></span> <span class="unit current w49" ng-if="orderResult.isSuccess">{{\'ECS_RESULT_SUCCESS\'|aliyunBuyText}}</span> <span class="unit current w49" ng-if="!orderResult.isSuccess">{{\'ECS_ORDER_RESULT\'|aliyunBuyText}}</span></div></div><!--成功--><div ng-if="orderResult.failCount == 0" class="bk-scope y-row"><div class="bk-status-box"><!-- 成功状态 S --><div class="bk-status-row"><i class="bk-icon-yes3 aliyun-icon-yes3"></i><span>{{orderResult.successInfo.info}}</span></div><div class="bk-message-row-spec"><span class="bk-message-row-spec-span" ng-bind-html="orderResult.successInfo.infoMore"></span></div><div><div class="bk-message-row-spec"><a href="https://order.aliyun.com/order" class="lnk">{{\'ECS_RESULT_ORDERLIST\'|aliyunBuyText}}</a> <a href="//ecs.console.aliyun.com" class="lnk m10">{{\'ECS_RESULT_CONSOLE\'|aliyunBuyText}}</a></div><!-- 成功状态 E --><div class="bk-message-row-spec" style="font-size: 12px; color: #000; margin: 10px auto; border-top: 1px #999 dashed; width: 45%; line-height: 24px;background: url(https://static.aliyun.com/images/user-center/sign_icon.png) 272px 14px no-repeat;text-align: left;padding: 10px 12% 0 25%">{{\'ECS_RESULT_TIP\'|aliyunBuyText}}&nbsp;&nbsp;<br><a class="y-blue" href="http://help.aliyun.com/list/11114483.html" target="_blank">{{\'ECS_RESULT_TIPMORE\'|aliyunBuyText}}</a></div></div></div></div><!--失败--><div ng-if="orderResult.failCount > 0 || orderResult.code !=\'200\'" class="bk-scope y-row"><div class="bk-status-box"><div class="bk-status-row"><i class="aliyun-icon-info bk-status-row-icon"></i><span class="bk-ml2">{{orderResult.failInfo.info | aliyunBuyText:orderResult.successCount:orderResult.failCount}}</span></div><div class="bk-message-row-spec"><span class="bk-message-row-spec-span">{{orderResult.failInfo.infoMore}}</span></div><div><div class="bk-message-row-spec"><a href="https://workorder.console.aliyun.com/console.htm#/ticket/add?productId=12" class="link">{{\'ECS_RESULT_TICKET\'|aliyunBuyText}}</a> <a href="https://order.aliyun.com/order" class="lnk">{{\'ECS_RESULT_ORDERLIST\'|aliyunBuyText}}</a> <a href="//ecs.console.aliyun.com" class="lnk ml10">{{\'ECS_RESULT_CONSOLE\'|aliyunBuyText}}</a></div></div></div></div><!--失败实例展示--><div ng-if="orderResult.failCount > 0" class="bk-scope y-row"><div aliyun-buy-preloader="!ready"><div class="bk-status-shadow bk-mb3">其中有{{orderResult.failCount}}个清单开通失败：</div><table class="bk-table" id="order-table"><tbody><tr><th width="1%"></th><th ng-bind-html="\'ECS_ORDER_PNAME\' | aliyunBuyText"></th><th ng-bind-html="\'ECS_ORDER_FAIL_REASON\' | aliyunBuyText" class="bk-table-wordbreak"></th><th ng-bind-html="\'ECS_ORDER_PAYMETHOD\' | aliyunBuyText"></th><th ng-bind-html="\'ECS_ORDER_TIME\' | aliyunBuyText"></th><th ng-bind-html="\'ECS_ORDER_QUANTITY\' | aliyunBuyText"></th></tr><tr ng-repeat="orderInfo in failOrdersInfo track by $index"><td><span class="bk-title-span">{{$index + 1}}.</span></td><td><div class="bk-title-span bk-mb3 bk-mt3" style="font-size: 16px;font-weight: bold">{{orderInfo.commodityName}}</div><div ng-repeat="item in orderInfo.items" style="line-height: 22px"><div ng-if="item.name && item.text"><span>{{item.name}}：</span><span class="bk-ml1">{{item.text}}</span></div></div></td><td><div class="bk-table-wordbreak"><span class="bk-title-span">{{orderInfo.errorMessage}}</span></div></td><td><span ng-if="commodityCode == \'ecs\' || line.commodityCode == \'yundisk\'" ng-bind-html="\'ECS_BUY_POSTPAY\' | aliyunBuyText"></span> <span ng-if="commodityCode == \'vm\'" ng-bind-html="\'ECS_BUY_YEARMONTH\' | aliyunBuyText"></span></td><td><span ng-if="commodityCode == \'vm\'">{{orderInfo.pricingCycle == \'Year\' ? orderInfo.duration+\'年\' : orderInfo.duration + \'个月\'}}</span> <span ng-if="commodityCode == \'ecs\' || commodityCode == \'yundisk\' ">-</span></td><td><span>{{orderInfo.quantity}} {{\'ECS_QUNIT\'|aliyunBuyText}}</span></td></tr></tbody></table></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsOrderView.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsOrderView.html", '<table class="bk-table" id="order-table"><tbody><tr><th width="1%"></th><th ng-bind-html="\'ECS_ORDER_PNAME\' | aliyunBuyText"></th><th ng-bind-html="\'ECS_ORDER_PAYMETHOD\' | aliyunBuyText"></th><th ng-bind-html="\'ECS_ORDER_TIME\' | aliyunBuyText"></th><th ng-bind-html="\'ECS_ORDER_QUANTITY\' | aliyunBuyText"></th><th ng-bind-html="\'ECS_ORDER_COUPON\' | aliyunBuyText"></th><th ng-bind-html="\'ECS_ORDER_PRICE\' | aliyunBuyText"></th></tr><tr><td></td><td colspan="8"><span ng-bind-html="\'ECS_ORDER_SERVER\' | aliyunBuyText"></span></td></tr><tr ng-repeat="line in orderViewData.orderLines track by $index"><td><span class="bk-title-span">{{$index + 1}}.</span></td><td><div class="bk-title-span bk-mb3 bk-mt3" style="font-size: 16px;font-weight: bold">{{line.commodityName}}</div><div><div ng-repeat="module in line.moduleInstance" ng-if="module.moduleAttrs && module.moduleAttrs.length>0" ng-init="moduleName = (module | aliyunBuyEcsOrderViewModuleInstanceModuleName:\'moduleName\':line.commodityCode)"><div ng-if="moduleName"><span>{{module | aliyunBuyEcsOrderViewModuleInstanceModuleName:\'moduleName\':line.commodityCode}}:</span> <span class="bk-ml2">{{module | aliyunBuyEcsOrderViewModuleInstanceItem:\'moduleDetail\':izNameMap:imageNameMap:line.commodityCode}}</span></div></div><div ng-if="line.hostname"><span ng-bind-html="\'ECS_ORDER_HOSTNAME\' | aliyunBuyText"></span> <span class="bk-ml2">{{line.hostname == \'\' ? \'未设置\': line.hostname}}</span></div><div ng-if="line.security"><span ng-bind-html="\'ECS_SECURITY_ID\' | aliyunBuyText"></span> <span class="bk-ml2">{{line.security == \'\' ? \'自动新建安全组\': line.security}}</span></div><div ng-if="line.isSetPasswd!=undefined"><span ng-bind-html="\'ECS_ORDER_PWD\' | aliyunBuyText"></span> <span class="bk-ml2">{{line.isSetPasswd ? \'已设置\':\'未设置\'}}</span></div></div></td><td><span ng-if="line.commodityCode == \'ecs\' || line.commodityCode == \'yundisk\'" ng-bind-html="\'ECS_BUY_POSTPAY\' | aliyunBuyText"></span> <span ng-if="line.commodityCode == \'vm\'" ng-bind-html="\'ECS_BUY_YEARMONTH\' | aliyunBuyText"></span></td><td><span ng-if="line.commodityCode == \'vm\'">{{line.pricingCycle == \'Year\' ? line.duration+\'年\' : line.duration + \'个月\'}}</span> <span ng-if="line.commodityCode == \'ecs\' || line.commodityCode == \'yundisk\' ">-</span></td><td><span>{{line.quantity}} {{\'ECS_QUNIT\'|aliyunBuyText}}</span></td><td><div ng-if="line.price == line.totalPrice && (!order.strategies || order.strategies.length == 0)">无</div><div class="bk-items-price-offer" ng-if="line.price < line.totalPrice"><span class="bk-items-price-cost bk-mr1">{{\'ECS_OLDPRICE\'|aliyunBuyText}}<span class="bk-cny">&yen;</span>{{line.totalPrice | aliyunBuyPriceValue}}{{line.commodityCode | aliyunBuyPriceUnit}}</span> <span class="bk-items-price-rebate">{{\'ECS_REDUCE\'|aliyunBuyText}}<span class="bk-cny">&yen;</span>{{line.discountPrice | aliyunBuyPriceValue}}{{line.commodityCode | aliyunBuyPriceUnit}}</span></div><div class="bk-items-price-tag" ng-if="order.strategies.length > 0"><i class="bk-items-price-tag-title aliyun-icon-giving"></i><div class="bk-items-price-tag-list"><span ng-repeat="strategy in order.strategies" class="bk-ploy" title="{{strategy.title}}">{{strategy.name}}</span></div></div></td><td><span class="bk-orange bk-items-price-money"><span class="bk-cny">&yen;</span>{{line.price}}{{line.commodityCode | aliyunBuyPriceUnit}}</span> <span><div ng-init="flowPrice = (line.moduleInstance | aliyunBuyEcsOrderViewModuleInstance:\'flowPrice\':flowPriceMap:imageNameMap)"><span ng-if="flowPrice"><span ng-bind-html="\'ECS_ORDER_PUBLICPRICE\' | aliyunBuyText"></span> <span class="bk-orange bk-items-price-money"><span class="bk-cny">&yen;</span> {{flowPrice | aliyunBuyPriceValue}}/GB</span></span></div></span></td></tr><!--TODO:镜像价钱--><tr ng-if="imageOrderViewData.orderLines"><td></td><td colspan="8" ng-init="line = imageOrderViewData.orderLines[0]"><span>服务商：{{line.moduleInstance | aliyunBuyEcsOrderViewModuleInstance:\'supplierName\': flowPriceMap: imageNameMap }}</span></td></tr><tr ng-repeat="order in imageOrderViewData.orderLines track by $index" ng-init="line=order.orderLines[\'0\']"><td><span class="bk-title-span"></span></td><td><div class="bk-title-span bk-mb3 bk-mt3" style="font-size: 16px;font-weight: bold">镜像市场</div><div>镜像名称: {{order.commodityName}}</div><div ng-repeat="module in order.moduleInstance" ng-if="module.moduleAttrs && module.moduleAttrs.length>0" ng-init="moduleName = (module | aliyunBuyEcsOrderViewModuleInstanceModuleName:\'moduleName\':order.commodityCode)"><div ng-if="moduleName"><span>{{module | aliyunBuyEcsOrderViewModuleInstanceModuleName:\'moduleName\':order.commodityCode}}:</span> <span class="bk-ml2">{{module | aliyunBuyEcsOrderViewModuleInstanceItem:\'moduleDetail\':izNameMap:imageNameMap:order.commodityCode}}</span></div></div></td><td><span>按量付费</span></td><td><span>-</span></td><td><span>{{order.quantity}} 个</span></td><td><div ng-if="order.price == order.totalPrice && (!order.strategies || order.strategies.length == 0)">无</div><div class="bk-items-price-offer" ng-if="order.price < order.totalPrice"><span class="bk-items-price-cost bk-mr1">原价<span class="bk-cny">&yen;</span>{{order.tradePrice | aliyunBuyPriceValue}}/{{\'ECS_IMG_UNIT_HOUR\' | aliyunBuyText}}</span> <span class="bk-items-price-rebate">省<span class="bk-cny">&yen;</span>{{order.discountPrice | aliyunBuyPriceValue}}/{{\'ECS_IMG_UNIT_HOUR\' | aliyunBuyText}}</span></div><div class="bk-items-price-tag" ng-if="order.strategies.length > 0"><i class="bk-items-price-tag-title aliyun-icon-giving"></i><div class="bk-items-price-tag-list"><span ng-repeat="strategy in order.strategies" class="bk-ploy" title="{{strategy.title}}">{{strategy.name}}</span></div></div></td><td><span class="bk-orange bk-items-price-money"><span class="bk-cny">&yen;</span>{{order.price}}/{{\'ECS_IMG_UNIT_HOUR\' | aliyunBuyText}}</span></td></tr></tbody></table>')
    }]), e.module("partials/aliyunBuyEcsOs.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsOs.html", '<div aliyun-buy-anchor="validate,options.state===\'error\'" class="bk-form-row" ng-hide="options.visible===false"><label class="bk-form-row-name">{{options.name|aliyunBuyText}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li"><div aliyun-buy-select ng-model="platform" placeholder="{{\'选择操作系统类别\'|aliyunBuyText}}" option="platforms" state="options.state"></div><div aliyun-buy-select long="true" ng-model="version" detail="versionDetail" placeholder="{{\'选择版本\'|aliyunBuyText}}" ng-disabled="!platform" option="versions" state="options.state"></div><span class="bk-form-row-txt" ng-bind-html="\'ECS_OS_LINK\'|aliyunBuyText"></span></div><div ng-show="options.tip" class="bk-form-row-txt" ng-bind-html="options.tip|aliyunBuyText"></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsPassword.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPassword.html", '<div class="bk-password" aliyun-buy-anchor="validate,options.state===\'error\'" ng-hide="options.visible===false"><div class="bk-form-row row-padding" ng-hide="reversalInstName"><label class="bk-form-row-name">{{options.name | aliyunBuyText}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li"><div aliyun-buy-buttontab options="options.items" value="valueObject.type" detail="detail"></div></div><div class="bk-form-row-txt" ng-show="valueObject.type==\'1\'" ng-bind-html="options.preSetTip|aliyunBuyText"></div><div class="bk-form-row-txt" ng-show="valueObject.type==\'2\'" ng-bind-html="options.afterSetTip|aliyunBuyText"></div></div></div><form ng-show="valueObject.type==\'1\'" name="setPassword" role="form" novalidate autocomplete="off"><div class="bk-form-row row-padding" ng-show="username"><label class="bk-form-row-name">{{\'ECS_LOGIN_NAME\'|aliyunBuyText}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li-info bk-font-14">{{username}}</div></div></div><div class="bk-form-row row-padding" aliyun-buy-anchor="validate,options.state == \'error\'"><label class="bk-form-row-name">{{\'ECS_LOGIN_PASSWORD\'|aliyunBuyText}}：</label><div class="bk-form-row-cell"><div error="options.state==\'error\'" aliyun-buy-ecs-password-input="" login="login" need-login="options.needLogin" passwords="password1|password2" ng-model="password1" tip="{{\'ECS_PASSWORD_EXP_DISCRIPE\'|aliyunBuyText}}" value="valueObject.password"></div></div></div><div class="bk-form-row row-padding"><label class="bk-form-row-name">{{\'ECS_CONFIRM_PASSWORD\'|aliyunBuyText}}：</label><div class="bk-form-row-cell"><div error="options.state==\'error\'" aliyun-buy-ecs-password-input="" login="login" need-login="options.needLogin" passwords="password1|password2" ng-model="password2" value="valueObject.password"></div></div></div><div class="bk-form-row" ng-hide="reversalInstName"><label class="bk-form-row-name">{{\'ECS_INSTANCE_NAME\'|aliyunBuyText}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li"><input ng-if="!options.needLogin" ng-focus="focus()" ng-blur="blur()" ng-keyup="blur()" type="text" ng-model="valueObject.instance" class="bk-form-input bk-form-input-l2" ng-class="{\'bk-form-input-error\':!instanceValidate}" placeholder="{{ options.instNamePlaceholder ? (options.instNamePlaceholder | aliyunBuyText) : \'如不填写，系统自动默认生成\'}}"><div aliyun-buy-tooltip="{templateUrl:\'partials/aliyunBuyEcsPasswordLogin.html\', theme:\'white\'}" ng-if="options.needLogin" class="bk-form-input bk-form-input-l2" style="background: #fff;cursor:text;display: inline-block"></div><span class="bk-form-row-li-info bk-ml2">{{\'ECS_INSTANCE_NAME_EXP_DISCRIPE\'|aliyunBuyText}}</span></div><div class="bk-form-status bk-form-error bk-form-row-txt" ng-if="!instanceValidate"><i class="bk-form-status-icon aliyun-icon-no3"></i><span class="bk-form-status-message">{{\'ECS_INSTANCE_NAME_EXP_DISCRIPE\'|aliyunBuyText}}</span></div></div></div></form></div>')
    }]), e.module("partials/aliyunBuyEcsPasswordInput.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPasswordInput.html", '<div><div class="bk-form-row-li"><span ng-hide="needLogin"><input ng-class="{\'bk-form-input-error\':error || _error}" class="bk-form-input bk-form-input-l2" ng-model="ngModel" type="password" ng-blur="blur()" ng-focus="_error=false" ng-trim="false"></span> <span aliyun-buy-tooltip="{templateUrl:\'partials/aliyunBuyEcsPasswordLogin.html\', theme:\'white\'}" ng-if="needLogin" class="bk-form-input bk-form-input-l2" style="background: #fff;cursor:text;display: inline-block"></span> <span class="bk-form-row-li-info bk-ml2" ng-if="tip" ng-bind="tip"></span></div><div class="bk-form-status bk-form-error bk-form-row-txt" ng-if="_error"><i class="bk-form-status-icon aliyun-icon-no3"></i><span class="bk-form-status-message" ng-bind="_error|aliyunBuyText"></span></div></div>')
    }]), e.module("partials/aliyunBuyEcsPasswordLogin.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPasswordLogin.html", "<span><a ng-click=\"login()\" ng-bind-html=\"'ECS_PASSWORD_LOGIN' | aliyunBuyText\"></a>{{'ECS_PASSWORD_LOGIN_TIP' | aliyunBuyText}}</span>")
    }]), e.module("partials/aliyunBuyEcsPostpay.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPostpay.html", '<div class="bk-layout-2col"><div class="bk-layout-2col-side" aliyun-buy-order-roll="aliyunBuyEcsPostpay:rendered"><div ng-hide="hideAddToCart == true"><div aliyun-buy-cart config="cartConfig" handle="cartHandle" value="cartValue"></div></div><div aliyun-buy-subtotal data="subtotalData" handle="subtotalHandle" options="subtotalOptions"></div></div><div class="bk-layout-2col-main"><div aliyun-buy-delay-directive="aliyun-buy-ecs-postpay-options" config="optionsConfig" value="optionsValue" handle="optionsHandle" price="optionsPrice" detail="optionsDetail" options="optionsOptions" default-value="optionsDefault()" cart-value="cartValue"></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsPostpayCartItem.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPostpayCartItem.html", '<div ng-style="{\'height\':collection.length>2?\'332px\':\'auto\',\'overflow\':\'auto\'}"><div ng-repeat="item in collection" class="bk-orders-item"><div class="bk-orders-item-title"><span class="bk-orders-item-name">ECS</span> <i class="bk-orders-item-os {{item.detail.os.icon}}"></i> <span class="bk-orders-item-delete" ng-click="remove(item)" data-spm-click="gostr=/aliyun;locaid=reomvecartitem"><i class="aliyun-icon-wrong-thin"></i></span> <span class="bk-orders-item-quantity">{{item.data.quantity}}台</span></div><div class="bk-orders-item-items"><ul><li>地域：{{item.detail.region.text}}（{{item.detail.zone.text}}）</li><li>规格：{{item.components[\'iooptimized\'] && item.components[\'iooptimized\'] ===\'optimized\'?\'I/O 优化实例、\':\'\'}} {{item.detail.instanceType.text}}（{{item.detail.instanceTypeFamily.text}}）</li><li>网络：带宽{{item.components.vm_bandwidth[0].vm_bandwidth | aliyunBuyEcsShowComponent:\'bandwidth\'}}（{{item.detail.networkType.text}}）</li><li>配置费用： <a ng-if="item.price.trade < item.price.origin" class="aliyun-icon-giving" aliyun-buy-tooltip="{templateUrl:\'partials/base/aliyunBuyCartGivingTip.html\', theme:\'orange\', trigger:\'hover\'}"></a><span class="bk-orders-item-settle" ng-bind-html="item.price.trade | aliyunBuyFullPrice:productId"><span class="bk-items-price-unit">{{priceUnit}}</span></span></li></ul></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsPostpayOptions.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPostpayOptions.html", '<div class="bk-scope" aliyun-buy-preloader="!ready" aliyun-buy-disable-ng-animate><div aliyun-buy-notice data-text="{{\'@{ECS_POSTPAY_NOTICE}\'}}" ng-show="options.global.showNotice"></div><div aliyun-buy-group data-title="{{\'ECS_BASE_OPTIONS\'|aliyunBuyText}}" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-region options="options.region" value="value.region" detail="detail.region" config="config().region"></div><div aliyun-buy-collapsable aliyun-buy-ecs-zone options="options.zone" value="value.zone" detail="detail.zone" config="config().zone"></div></div><div aliyun-buy-group ng-hide="options.networkType.visible == false && options.security.visible == false" data-title="{{\'ECS_NETWORK\'|aliyunBuyText}}" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-bricks-tabs options="options.networkType" value="value.networkType" detail="detail.networkType" config="config().networkType"></div><div aliyun-buy-vpc options="options.vpc" value="value.vpc" config="config().vpc" service="queryEcsVpcIp"></div><div aliyun-buy-ecs-security options="options.security" value="value.security" detail="detail.security" config="config().security" raw="raw" cart-value="cartValue"></div></div><div aliyun-buy-group data-title="实例" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-bricks-tabs options="options.instanceGeneration" value="value.instanceGeneration" detail="detail.instanceGeneration" config="config().instanceGeneration"></div><div aliyun-buy-ecs-io options="options.io" value="value.io" detail="detail.io" config="config().io"></div><div aliyun-buy-ecs-instance-type options="options.instanceType" value="value.instanceType" detail="detail" config="config().instanceType" raw="raw" value-all="value"></div></div><div aliyun-buy-group data-title="带宽" ng-hide="options.bandwidthType.visible == false" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-bricks-tabs options="options.bandwidthType" value="value.bandwidthType" detail="detail.bandwidthType" config="config().bandwidthType"></div><div aliyun-buy-ecs-bandwidth options="options.bandwidth" value="value.bandwidth" config="config().bandwidth"></div></div><div aliyun-buy-group data-title="{{\'ECS_IMAGE\'|aliyunBuyText}}" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-collapsable aliyun-buy-bricks-tabs options="options.imageType" value="value.imageType" detail="detail.imageType" config="config().imageType"></div><div aliyun-buy-ecs-os options="options.os" value="value.os" detail="detail.os" config="config().os" value-all="value"></div><div aliyun-buy-ecs-image options="options.customImage" value="value.customImage" detail="detail.customImage" config="config().customImage" value-all="value" image-type="custom"></div><div aliyun-buy-ecs-image options="options.sharedImage" value="value.sharedImage" detail="detail.sharedImage" config="config().sharedImage" value-all="value" image-type="shared"></div><div aliyun-buy-ecs-image-market options="options.imageMarket" value="value.imageMarket" detail="detail.imageMarket" config="config().imageMarket" value-all="value"></div><div aliyun-buy-ecs-image-offline options="options.imageOffline" value="value.imageOffline"></div><div aliyun-buy-ecs-image-from-market options="options.imageFromMarket" value="value.imageFromMarket" value-all="value" config="config().imageFromMarket"></div></div><div aliyun-buy-group data-title="{{\'ECS_STORAGE\'|aliyunBuyText}}" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-ecs-sysdisk options="options.sysdisk" value="value.sysdisk" detail="detail.sysdisk" config="config().sysdisk"></div><div aliyun-buy-ecs-datadisk options="options.datadisk" value="value.datadisk" config="config().datadisk" detail="detail.datadisk"></div></div><div aliyun-buy-group data-title="{{\'ECS_PASSWORD\'|aliyunBuyText}}" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-ecs-password options="options.password" value="value.password" detail="detail.password" config="config().password"></div></div><div aliyun-buy-group data-title="{{\'ECS_AMOUNT\'|aliyunBuyText}}" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-amount options="options.amount" value="value.amount" config="config().amount"></div></div><!-- value.imageType:{{value.imageType}}<br/>\n  value.os:{{value.os}}<br/>\n  value.customImage:{{value.customImage}}<br/>\n  value.sharedImage:{{value.sharedImage}}<br/>\n  value.imageMarket:{{value.imageMarket}}<br/><br/>\n  value.imageFromMarket:{{value.imageFromMarket}}<br/>\n  value.needBuyImageMarketNum:{{value.needBuyImageMarketNum}} --><!-- value:{{value}}<br/><br/>\n  options:{{options}}<br/><br/> --></div>')
    }]), e.module("partials/aliyunBuyEcsPostpayOrderPreview.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPostpayOrderPreview.html", '<div class="bk-scope" style="background: #FBFAF8; padding-bottom: 20px" aliyun-buy-preloader="!ready"><div aliyun-buy-ecs-order-view order-data="orderData()" price-order="priceOrder()" use-price-order="true" price-service="priceService" ready="ready"></div><div class="y-row y-mt5"><span style="display: inline-block;width: 160px;position: relative;height: 38px;line-height: 42px"><input type="checkbox" style="top: 16px;position: absolute" ng-model="isRelease"><lable ng-click="isRelease=!isRelease" style="left: 25px;position: absolute">设置自动释放服务时间</lable></span> <span class="bk-number" ng-show="isRelease"><input class="bk-number-input" style="width:110px; padding:0 20px 0 0; font-size:12px;line-height:36px;height:36px" type="text" readonly="readonly" min="minDay" max="maxDay" show-weeks="false" show-button-bar="false" toggle-weeks-text="周" aliyun-buy-datepicker-popup current-text="今天" clear-text="清除" close-text="确定" ng-model="releaseTime"> <span class="bk-number-unit" style="left:100px; line-height: 38px"><span class="aliyun-icon-calendar"></span></span></span> <span ng-model="releaseTime" ng-change="changed()" ng-show="isRelease" readonly-input="true" class="bk-timepicker"><div aliyun-buy-timepicker hour-step="hstep" minute-step="mstep" show-meridian="ismeridian" readonly-input="true"></div></span></div><div class="bk-mt5" style="text-align: right"><button class="bk-button bk-button-primary" aliyun-buy-button is-disabled="{{!checked}}" data-spm-click="gostr=/aliyun;locaid=gotoPay" ng-click="purchase()"><div><span>去开通</span></div></button></div><div class="bk-mt5" style="text-align: right"><input id="pact" type="checkbox" ng-model="checked" checked="checked" value="1"><label for="pact"><a target="_blank" href="http://help.aliyun.com/manual?helpId=688" data-spm-anchor-id="5176.6970381.0.0">《云服务器 ECS服务条款》</a></label></div></div>')
    }]), e.module("partials/aliyunBuyEcsPostpaySubtotalModel.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPostpaySubtotalModel.html", '<div class="bk-items-list"><ul><li><span class="bk-items-item-name">{{\'ECS_REGION\'|aliyunBuyText}}：</span> <span class="bk-items-item-value">{{context.region | aliyunBuyUnderline}}（{{context.randomZone?\'可用区\':\'\'}}{{context.zone | aliyunBuyUnderline}}）</span></li><li ng-if="context.io && context.io ===\'1\'"><span class="bk-items-item-name">{{\'ECS_IO_OPTIMIZED\'|aliyunBuyText}}：</span> <span class="bk-items-item-value">{{context.io && context.io === \'1\' ? \'支持\' : \'\'}}</span></li><li><span class="bk-items-item-name">规格：</span> <span class="bk-items-item-value">{{context.instanceType.text}}（{{context.instanceTypeFamily.text}}）</span></li><li><span class="bk-items-item-name">{{\'ECS_IMAGE\'|aliyunBuyText}}：</span> <span class="bk-items-item-value">{{context.image | aliyunBuyUnderline}}</span></li><li><span class="bk-items-item-name">{{\'ECS_STORAGE\'|aliyunBuyText}}：</span> <span class="bk-items-item-value" ng-if="!context.datadisk || context.datadisk.length == 0">-</span> <span class="bk-items-item-value" ng-if="context.datadisk.length > 0"><span ng-repeat="item in context.datadisk">{{item.sizes.length}}块{{item.type}}（{{item.sizes.join(\'、\')}}）；</span></span></li><li><span class="bk-items-item-name">{{\'ECS_NETWORK\'|aliyunBuyText}}：</span> <span class="bk-items-item-value">带宽{{context.bandwidth | aliyunBuyUnderline}}Mbps（{{context.networkType | aliyunBuyUnderline}}）</span></li><li><span class="bk-items-item-name">{{\'ECS_AMOUNT\'|aliyunBuyText}}：</span> <span class="bk-items-item-value">{{context.amount | aliyunBuyUnderline}}台</span></li><li ng-if="context.needBuyImageMarketNum > 0"><span class="bk-items-item-name">镜像数：</span> <span class="bk-items-item-value">{{context.needBuyImageMarketNum}}个</span></li></ul><div aliyun-buy-yundun options="options.yundun" value="context.yundun" detail="detail.yundun" config="config.yundun"></div><div aliyun-buy-ecs-image-market-price price="context.imageMarketPrice.price" options="context.imageMarketPrice.options" config="context.imageMarketPrice.config"></div></div>')
    }]), e.module("partials/aliyunBuyEcsPrepay.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPrepay.html", '<div class="bk-layout-2col"><div class="bk-layout-2col-side" aliyun-buy-order-roll="aliyunBuyEcsPrepay:rendered"><div ng-hide="hideAddToCart == true"><div aliyun-buy-cart config="cartConfig" handle="cartHandle" value="cartValue"></div></div><div aliyun-buy-subtotal data="subtotalData" handle="subtotalHandle" cart-value="cartValue" options="subtotalOptions"></div></div><div class="bk-layout-2col-main"><div aliyun-buy-delay-directive="aliyun-buy-ecs-prepay-options" config="optionsConfig" value="optionsValue" handle="optionsHandle" price="optionsPrice" detail="optionsDetail" options="optionsOptions" default-value="optionsDefault()" cart-value="cartValue"></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsPrepayCartItem.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPrepayCartItem.html", '<div ng-style="{\'height\':collection.length>2?\'332px\':\'auto\',\'overflow\':\'auto\'}"><div ng-repeat="item in collection" class="bk-orders-item"><div class="bk-orders-item-title"><span class="bk-orders-item-name">ECS</span> <i class="bk-orders-item-os {{item.detail.os.icon}}"></i> <span class="bk-orders-item-delete" ng-click="remove(item)" data-spm-click="gostr=/aliyun;locaid=reomvecartitem"><i class="aliyun-icon-wrong-thin"></i></span> <span class="bk-orders-item-quantity">{{item.data.duration}}{{item.data.pricingCycle | aliyunBuyAccy:\'pricing_cycle\'}} X {{item.data.quantity}}台</span></div><div class="bk-orders-item-items"><ul><li>地域：{{item.detail.region.text}}（{{item.detail.zone.text}}）</li><li>规格：{{item.components[\'iooptimized\'] && item.components[\'iooptimized\'] ===\'optimized\'?\'I/O 优化实例、\':\'\'}} {{item.detail.instanceType.text}}（{{item.detail.instanceTypeFamily.text}}）</li><li>网络：带宽{{item.components.vm_bandwidth[0].vm_bandwidth | aliyunBuyEcsShowComponent:\'bandwidth\'}}（{{item.detail.networkType.text}}）</li><li>配置费用： <a ng-if="item.price.trade < item.price.origin" class="aliyun-icon-giving" aliyun-buy-tooltip="{templateUrl:\'partials/base/aliyunBuyCartGivingTip.html\', theme:\'orange\', trigger:\'hover\'}"></a><span class="bk-orders-item-settle" ng-bind-html="item.price.trade | aliyunBuyFullPrice:productId"><span class="bk-items-price-unit">{{priceUnit}}</span></span></li></ul></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsPrepayOptions.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPrepayOptions.html", '<div class="bk-scope" aliyun-buy-preloader="!ready" aliyun-buy-disable-ng-animate><div aliyun-buy-notice data-text="ECS_PREPAY_NOTICE" ng-show="options.global.showNotice"></div><div aliyun-buy-group data-title="地域" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-region options="options.region" value="value.region" detail="detail.region" config="config().region"></div><div aliyun-buy-collapsable aliyun-buy-ecs-zone options="options.zone" value="value.zone" detail="detail.zone" config="config().zone"></div></div><div aliyun-buy-group ng-hide="options.networkType.visible == false && options.security.visible == false" data-title="{{\'ECS_NETWORK\'|aliyunBuyText}}" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-bricks-tabs options="options.networkType" value="value.networkType" detail="detail.networkType" config="config().networkType"></div><div aliyun-buy-vpc options="options.vpc" value="value.vpc" config="config().vpc" service="queryEcsVpcIp"></div><div aliyun-buy-ecs-security options="options.security" value="value.security" detail="detail.security" config="config().security" raw="raw" cart-value="cartValue"></div></div><div aliyun-buy-group data-title="实例" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-bricks-tabs options="options.instanceGeneration" value="value.instanceGeneration" detail="detail.instanceGeneration" config="config().instanceGeneration"></div><div aliyun-buy-ecs-io options="options.io" value="value.io" detail="detail.io" config="config().io"></div><div aliyun-buy-ecs-instance-type options="options.instanceType" value="value.instanceType" detail="detail" config="config().instanceType" raw="raw" value-all="value"></div></div><div aliyun-buy-group data-title="带宽" ng-hide="options.bandwidthType.visible == false" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-bricks-tabs options="options.bandwidthType" value="value.bandwidthType" detail="detail.bandwidthType" config="config().bandwidthType"></div><div aliyun-buy-ecs-bandwidth options="options.bandwidth" value="value.bandwidth" config="config().bandwidth"></div></div><div aliyun-buy-group data-title="镜像" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-collapsable aliyun-buy-bricks-tabs options="options.imageType" value="value.imageType" detail="detail.imageType" config="config().imageType"></div><div aliyun-buy-ecs-os options="options.os" value="value.os" detail="detail.os" config="config().os" value-all="value"></div><div aliyun-buy-ecs-image options="options.customImage" value="value.customImage" detail="detail.customImage" config="config().customImage" value-all="value" image-type="custom"></div><div aliyun-buy-ecs-image options="options.sharedImage" value="value.sharedImage" detail="detail.sharedImage" config="config().sharedImage" value-all="value" image-type="shared"></div><div aliyun-buy-ecs-image-market options="options.imageMarket" value="value.imageMarket" detail="detail.imageMarket" config="config().imageMarket" value-all="value"></div><div aliyun-buy-ecs-image-offline options="options.imageOffline" value="value.imageOffline"></div><div aliyun-buy-ecs-image-from-market options="options.imageFromMarket" value="value.imageFromMarket" value-all="value" config="config().imageFromMarket"></div></div><div aliyun-buy-group data-title="存储" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-ecs-sysdisk options="options.sysdisk" value="value.sysdisk" detail="detail.sysdisk" config="config().sysdisk"></div><div aliyun-buy-ecs-datadisk options="options.datadisk" value="value.datadisk" config="config().datadisk" detail="detail.datadisk"></div></div><div aliyun-buy-group data-title="密码" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-ecs-password options="options.password" value="value.password" detail="detail.password" config="config().password"></div></div><div aliyun-buy-group data-title="购买量" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-duration options="options.duration" value="value.duration" detail="detail.duration" config="config().duration"></div><div aliyun-buy-amount options="options.amount" value="value.amount" detail="detail.amount" config="config().amount"></div></div><!-- value.imageType:{{value.imageType}}<br/>\n  <!--value.os:{{value.os}}<br/>--><!--value.customImage:{{value.customImage}}<br/>--><!--value.sharedImage:{{value.sharedImage}}<br/>--><!--value.imageMarket:{{value.imageMarket}}<br/><br/>--><!--value.imageFromMarket:{{value.imageFromMarket}}<br/>--><!--value.needBuyImageMarketNum:{{value.needBuyImageMarketNum}}--><!-- value:{{value}}<br/><br/>\n  options:{{options}}<br/><br/> --></div>')
    }]), e.module("partials/aliyunBuyEcsPrepayOrderPreview.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPrepayOrderPreview.html", '<div class="bk-scope" style="background: #FBFAF8; padding-bottom: 20px" aliyun-buy-preloader="!ready"><div aliyun-buy-ecs-order-view order-data="orderData()" price-order="priceOrder()" price-service="priceService" ready="ready" price="price"></div><div class="bk-mt4"><span class="" ng-bind-html="\'ECS_ORDER_IMPORTENTTIP\'|aliyunBuyText"></span></div><div aliyun-buy-recommend-code recommend-validation="recommendValidation" recommend-code="recommendCode" order-data="orderData()" price-service="priceService" price="price"></div><div class="bk-mt5" style="text-align: right"><div aliyun-buy-ecs-price data="price"></div><div class="bk-mt4"><button class="bk-button bk-button-primary" aliyun-buy-button data-spm-click="gostr=/aliyun;locaid=gotoPay" is-disabled="{{!checked}}" ng-click="purchase()">{{\'ECS_ORDER_GOPAY\'|aliyunBuyText}}</button></div><div class="bk-mt4"><input id="pact" type="checkbox" ng-model="checked" checked="checked" value="1"><label for="pact"><a target="_blank" href="http://help.aliyun.com/manual?helpId=688" data-spm-anchor-id="5176.6970381.0.0">{{\'ECS_ORDER_TERMS\'|aliyunBuyText}}</a></label></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsPrepaySubtotalModel.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPrepaySubtotalModel.html", '<div class="bk-items-list"><ul><li><span class="bk-items-item-name">地域：</span> <span class="bk-items-item-value">{{context.region | aliyunBuyUnderline}}（{{context.randomZone?\'可用区\':\'\'}}{{context.zone | aliyunBuyUnderline}}）</span></li><!--<li ng-if="value.io && value.io ===\'1\'">\n      <span class="bk-items-item-name">I/O 优化：</span>\n      <span class="bk-items-item-value">{{value.io && value.io === \'1\' ? \'支持\' : \'\'}}</span>\n    </li>--><li><span class="bk-items-item-name">规格：</span> <span class="bk-items-item-value">{{context.instanceType.text}}（{{context.instanceTypeFamily.text}}）</span></li><li><span class="bk-items-item-name">镜像：</span> <span class="bk-items-item-value">{{context.image | aliyunBuyUnderline}}</span></li><li><span class="bk-items-item-name">存储：</span> <span class="bk-items-item-value" ng-if="!context.datadisk || context.datadisk.length == 0">-</span> <span class="bk-items-item-value" ng-if="context.datadisk.length > 0"><span ng-repeat="item in context.datadisk">{{item.sizes.length}}块{{item.type}}（{{item.sizes.join(\'、\')}}）；</span></span></li><li><span class="bk-items-item-name">网络：</span> <span class="bk-items-item-value">带宽{{context.bandwidth | aliyunBuyUnderline}}Mbps（{{context.networkType | aliyunBuyUnderline}}）</span></li><li><span class="bk-items-item-name">购买量：</span> <span class="bk-items-item-value">{{context.duration | aliyunBuyAccy:\'duration\' | aliyunBuyUnderline}} X {{context.amount | aliyunBuyUnderline}}台</span></li><li ng-if="context.needBuyImageMarketNum > 0"><span class="bk-items-item-name">镜像数：</span> <span class="bk-items-item-value">{{context.needBuyImageMarketNum}}个</span></li></ul><div aliyun-buy-yundun options="options.yundun" value="context.yundun" detail="detail.yundun" config="config.yundun"></div><div aliyun-buy-ecs-image-market-price price="context.imageMarketPrice.price" options="context.imageMarketPrice.options" config="context.imageMarketPrice.config"></div></div>')
    }]), e.module("partials/aliyunBuyEcsPrice.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsPrice.html", '<div class="bk-order-renew-price-wrap"><div class="bk-scope bk-items-price-settle" style="font-size: 16px;color:#000" ng-show="data().state === \'currentConfiguration\' ">{{ \'ECS_PLEASE_SELECT_CONFIG\' | aliyunBuyText }}</div><div class="bk-scope bk-items-price-settle" style="font-size: 16px;color:#000" ng-show="data().state === \'error\' ">{{ \'ECS_PRICE_ERROR\' | aliyunBuyText }}</div><div class="bk-scope" ng-show="!data().state"><div class="bk-items-price-settle"><div ng-if="data().calculating" class="bk-items-price-calculating">{{\'ECS_CALCULATING_PRICE\'|aliyunBuyText}}</div><div ng-if="!data().calculating && !data().success" class="bk-items-price-calculating">{{data().message | aliyunBuyText}}</div><div ng-if="!data().calculating  && data().success && data().data.trade!==null"><span ng-show="data().data.flow!=undefined"><span ng-show="data().data.flow!=undefined" style="font-size: 16px;color:#000" class="bk-mr2">{{\'ECS_PUBLIC_FLOW\'|aliyunBuyText}}：</span><span class="bk-cny">&yen;</span><span class="bk-items-price-money">{{data().data.flow | aliyunBuyPriceValue}}</span><span class="bk-items-price-unit">/GB</span></span> <span style="font-size: 16px;color:#000" class="bk-mr2">{{\'ECS_CHECKOUT_AMOUNT\'|aliyunBuyText}}：</span><span class="bk-cny">&yen;</span><span class="bk-items-price-money">{{data().data.trade | aliyunBuyPriceValue}}</span><span class="bk-items-price-unit">{{options.basePriceUnit}}</span></div></div><div class="bk-items-price-offer" ng-if="data().data.trade < data().data.origin "><span class="bk-items-price-cost bk-mr1">原价<span class="bk-cny">&yen;</span>{{data().data.origin | aliyunBuyPriceValue}}{{options.basePriceUnit}}</span> <span class="bk-items-price-rebate">省<span class="bk-cny">&yen;</span>{{data().data.discount | aliyunBuyPriceValue}}{{options.basePriceUnit}}</span><div class="y-mt3"></div></div><div class="bk-items-price-tag bk-order-price-tag" ng-if="data().data.trade!==null && data().data.strategies.length > 0"><div class="bk-items-price-tag-list"><i class="bk-order-price-tag-title aliyun-icon-giving"></i> <span ng-repeat="strategy in data().data.strategies" class="bk-order-ploy" title="{{strategy.title}}">{{strategy.name}}</span></div></div><div class="bk-items-price-tag bk-order-price-tag" ng-if="data().data.trade!==null && data().data.strategies.length == 0 && data().data.children[0].strategies.length > 0"><div class="bk-items-price-tag-list"><i class="bk-order-price-tag-title aliyun-icon-giving"></i> <span ng-repeat="strategy in data().data.children[0].strategies" class="bk-order-ploy" title="{{strategy.title}}">{{strategy.name}}</span></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsRenew.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsRenew.html", '<div class="bk-scope" aliyun-buy-preloader="ready() === false"><div aliyun-buy-ecs-renew-options value="optionsValue" handle="optionsHandle" price="optionsPrice" detail="optionsDetail" instance-id="instanceId()"></div><div aliyun-buy-ecs-price data="optionsPrice"></div><div class="bk-order-pact"><a href="javascript:;" class="bk-order-pact-box" ng-click="termsChecked=!termsChecked" ng-class="{\'bk-order-pact-box-select\':termsChecked, \'\':!termsChecked}"><span class="dis-inline-block" ng-class="{\'aliyun-icon-yes2\':termsChecked, \'\':!termsChecked}"></span></a> <a class="bk-order-pact-link" href="http://help.aliyun.com/view/13433718.html" target="_blank">《云服务器 ECS服务条款》</a></div><div class="bk-items-price-control bk-order-price-control bk-order-renew-price-wrap"><div aliyun-buy-button ng-click="pay()" is-disabled="{{payDisabled}}">去支付</div></div></div>')
    }]), e.module("partials/aliyunBuyEcsRenewConfimDlg.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsRenewConfimDlg.html", '<div><div class="bk-dialog-head"><span class="bk-dialog-close" data-dismiss="modal" aria-hidden="true" ng-click="$close()"><span class="aliyun-icon-wrong"></span></span><h5 class="bk-dialog-title">云服务器续费降配温馨提示</h5></div><div class="bk-dialog-body"><div class="bk-box" style="width: 600px;height:100px;border:0 none;padding-top:15px"><div><div><div style="line-height: 20px">CPU、内存的变更，实例重启后配置变更才能生效。</div></div><div style="margin-top:15px"><a href="javascript:;" class="bk-order-pact-box" ng-click="isPactSelected=!isPactSelected" ng-class="{\'bk-order-pact-box-select\':isPactSelected, \'\':!isPactSelected}"><span class="dis-inline-block" ng-class="{\'aliyun-icon-yes2\':isPactSelected, \'\':!isPactSelected}"></span></a><span style="margin-left:8px">重启会短暂中断您本实例服务的运行，您确认系统将于设定时间自动重启？</span></div></div></div></div><div class="bk-dialog-foot ng-scope"><button aliyun-buy-button is-disabled="{{!isPactSelected}}" ng-click="confirmPurchase(!isPactSelected)" theme="blue">确定</button></div></div>')
    }]), e.module("partials/aliyunBuyEcsRenewOptions.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsRenewOptions.html", '<div class="bk-scope"><div class="y-row" aliyun-buy-preloader="!ready" style="margin: 0 auto"><div aliyun-buy-ecs-instance-detail data="raw" ng-if="options.global.showInstanceInfo"></div><div ng-class="{\'bk-order-renew-wrap bk-mt5\':options.global.showInstanceInfo}"><div class="bk-order-renew-title" ng-show="options.global.showInstanceInfo">续费</div><div ng-class="{\'bk-order-renew-body\':options.global.showInstanceInfo}"><div ng-if="options.global.useCombo" aliyun-buy-combo-duration options="options.duration" value="value.duration" detail="detail.duration" config="config().duration"></div><div ng-if="!options.global.useCombo" aliyun-buy-duration options="options.duration" value="value.duration" detail="detail.duration" config="config().duration"></div><div ng-show="!options.global.minimized && !!newExpirationTime" class="bk-order-renew-new-time">续费后到期时间为<span class="bk-order-time-color" ng-bind="newExpirationTime | aliyunBuyRenewTimeFormat"></span></div></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsSecurity.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsSecurity.html", '<div ng-hide="options.visible===false" aliyun-buy-anchor="validate,options.state===\'error\'"><div class="bk-form-row" style="display: none"><label class="bk-form-row-name">{{options.name|aliyunBuyText}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li"><div aliyun-buy-buttontab options="options.types" value="options.valueObject.type"></div></div><div class="bk-form-row-txt" ng-show="options.displayAutoCreateTip"><span ng-bind-html="\'ECS_SECURITY_TIP\' | aliyunBuyText"></span></div></div></div><div class="bk-form-row" ng-show="options.valueObject.type==\'2\'"><label class="bk-form-row-name">{{\'ECS_SECURITY_NAME\'|aliyunBuyText}}：</label><div class="bk-form-row-cell bk-security-name-cell"><div class="bk-form-row-text" ng-if="detail.text && detail.text !== \'\'">{{detail.text}}<span class="bk-security-tip">&nbsp;&nbsp;(已有{{detail.EcsCount}}个实例, 还可以加入{{detail.EcsCountRemain}}个实例)</span></div><div ng-if="detail.text && detail.text !== \'\'"><div class="bk-form-row-text bk-security-tip-error">请确保此安全组开放包含 22（Linux）或者 3389（Windows）端口，否则无法远程登录ECS。您可以进入<a href="{{options.createSecurityRuleLink}}" class="bk-lnk" data-spm-click="gostr=/aliyun;locaid=gosecurityconsole" target="_blank">&nbsp;ECS控制台&nbsp;</a>设置。</div></div><div class="bk-form-row-li" ng-class="{\'bk-mt-20\':detail.text && detail.text !== \'\'}"><span class="bk-rect-select" ng-click="openSecurityGroups()"><i class="bk-rect-select-icon" ng-class="{\'bk-button-error\':options.state==\'error\'}"><em class="bk-rect-select-icon-rect"></em> <em class="bk-rect-select-icon-rect"></em> <em class="bk-rect-select-icon-rect"></em> <em class="bk-rect-select-icon-rect"></em></i> <span class="bk-rect-select-txt bk-click-link" ng-class="{\'bk-rect-select-txt-error\':options.state==\'error\'}">{{(detail.text && detail.text !== \'\')?\'ECS_SECURITY_RESELECT\':\'ECS_SECURITY_SELECT_ONE\' | aliyunBuyText}}</span></span></div><div class="bk-form-row-text bk-security-tip">安全组类似防火墙功能，用于设置网络访问控制，您也可以到管理控制台<a href="{{options.createAddSecurityLink}}" class="bk-lnk" target="_blank" data-spm-click="gostr=/aliyun;locaid=gosecuritycreate">&nbsp;创建新安全组>></a> <a class="bk-lnk bk-ml2" href="http://help.aliyun.com/knowledge_detail/6821749.html" target="_blank">教我选择&gt;&gt;</a><!-- <a  class="bk-lnk bk-ml1" href="javascript:;" data-spm-click="gostr=/aliyun;locaid=securityhelp" aliyun-buy-tooltip="{{\'ECS_SECURITY_POP_TIP\' | aliyunBuyText}}">\n          <i class="aliyun-icon-help"></i>\n        </a> --></div></div></div><div class="bk-form-row" ng-show="options.valueObject.type==\'3\'"><label class="bk-form-row-name">{{\'ECS_SECURITY_NAME\'|aliyunBuyText}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li"><input ng-if="options.securityQuotaValidate" ng-focus="focus()" ng-blur="blur()" ng-keyup="blur()" type="text" ng-model="options.newSecurityName.text" class="bk-form-input bk-form-input-l2" ng-class="{\'bk-form-input-error\':!options.securityNameValidate}" placeholder="{{ options.instNamePlaceholder ? (options.instNamePlaceholder | aliyunBuyText) : \'非必填项,若不填写自动生成安全组\'}}"> <span class="bk-form-row-li-info bk-ml2" ng-if="options.securityQuotaValidate">{{\'ECS_SECURITY_NAME_EXP_DISCRIPE\'|aliyunBuyText}}</span></div><div class="bk-form-status bk-form-error bk-form-row-txt" ng-if="!options.securityNameValidate"><i class="bk-form-status-icon aliyun-icon-no3"></i><span class="bk-form-status-message">{{\'ECS_INSTANCE_NAME_EXP_DISCRIPE\'|aliyunBuyText}}</span></div><div class="bk-form-status bk-form-error bk-form-row-txt" ng-if="!options.securityQuotaValidate"><i class="bk-form-status-icon aliyun-icon-no3"></i><span class="bk-form-status-message" ng-bind-html="\'ECS_NOT_ENOUGH_SECURITY_QUOTA\' | aliyunBuyText"></span></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsSecurityDialog.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsSecurityDialog.html", '<div id="bk-security-dialog"><div class="bk-dialog-head bk-drag-head" aliyun-buy-drag box-class="bk-dialog" fill-left-px="340"><span class="bk-dialog-close bk-dialog-close-thin" data-dismiss="modal" aria-hidden="true" ng-click="$close()"><span class="aliyun-icon-wrong-thin"></span></span><h5 class="bk-dialog-title">{{\'ECS_PLEASE_SELECT_SECURITY\' | aliyunBuyText}}[{{regionName}}]</h5></div><div class="bk-dialog-body"><!-- <div class="sedi-buy-image-loading" ng-show="isLoading">\n        </div> --><div class="bk-dialog-box" style="height: 458px"><div class="bk-items-min" aliyun-buy-preloader="isLoading"><div><span class="bk-security-select"><select class="form-control" ng-model="searchModel.type"><option value="name">安全组名称</option><option value="id">安全组ID</option></select></span> <input ng-if="searchModel.type==\'name\'" type="text" class="bk-form-input bk-form-security-input" placeholder="请输入安全组名称" ng-model="searchModel.key" ng-keypress="enterSearch($event)"> <input ng-if="searchModel.type==\'id\'" type="text" class="bk-form-input bk-form-security-input" placeholder="请输入安全组ID" ng-model="searchModel.key" ng-keypress="enterSearch($event)"> <i class="aliyun-icon-wrong-thin bk-security-close-icon" ng-if="!!searchModel.key" ng-click="clearKey()"></i><div class="search-btn" ng-click="search()"><span class="aliyun-icon-Search"></span></div></div><table class="bk-security-table"><tr><th>安全组名称/ID</th><th>创建时间</th><th>实例数（台）</th></tr><tr ng-repeat="item in security.securityList" ng-click="useSecurity(item)"><td class="big-td" title="{{item.SecurityGroupName}} / {{item.SecurityGroupId}}">{{item.SecurityGroupName}} / {{item.SecurityGroupId}}</td><td class="middle-td" title="{{item.CreationTime | replaceTimeString}}">{{item.CreationTime | replaceTimeString}}</td><td class="small-td" title="{{item.ecsCount}}">{{item.EcsCount}}</td></tr></table><div ng-show="security.securityList.length==0"><div style="height: 320px; line-height: 320px; text-align: center"><div ng-bind-html="\'ECS_SECURITY_NOUSE\' | aliyunBuyText"></div></div></div></div><div class="bk-paging-index-min"><div ng-show="isReady && security.securityList.length" aliyun-buy-pagination total-items="totalItems" ng-model="security.currentPage" items-per-page="itemsPerPage" max-size="8" previous-text="{{\'ECS_PREV\'|aliyunBuyText}}" next-text="{{\'ECS_NEXT\'|aliyunBuyText}}"></div></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsSysdisk.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsSysdisk.html", '<div class="bk-form-row" ng-hide="options.visible===false"><div class="bk-form-row-name">{{options.name | aliyunBuyText}}：</div><div class="bk-form-row-cell bk-sysdisk"><div class="bk-form-row-li"><span aliyun-buy-select class="bk-disk-cell bk-select bk-select-l1" short="true" option="options.items" detail="detail" ng-model="valueObj.diskCategory"></span> <span class="bk-form-row-li-info bk-disk-cell bk-disk-cell-size"><span class="bk-disk-storage"><span><input aliyun-buy-ecs-datadisk-size-input ng-model="model4placeholder" placeholder="{{options.sizeRange}}" class="bk-disk-input" ng-class="{\'bk-disk-input-error\': showSizeError}" data-value="valueObj.diskSize" max="options.max" min="options.min" type="text" ng-focus="showSizeError=false" aliyun-buy-tooltip="{content:\'容量范围：{{options.sizeRange}}\', theme:\'white\', trigger:\'hover\', offsetX: 20}"> <span class="bk-disk-unit">GB</span></span></span></span> <span class="bk-form-row-li-info bk-ml2" style="color: #000">{{iops}}</span> <span class="bk-form-row-li-info">IOPS</span> <span class="bk-form-row-li-info bk-ml2">系统盘挂载点：{{options.mount.text}}</span></div><div class="bk-form-row-txt"><div ng-bind-html="\'YUNDISK_CATEGORY_INTRODUCE\' | aliyunBuyText "></div><div ng-bind-html="options.tip" ng-hide="!options.tip"></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsUpgrade.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsUpgrade.html", '<div class="bk-scope" aliyun-buy-preloader="ready() === false"><div aliyun-buy-ecs-upgrade-options value="optionsValue" handle="optionsHandle" price="optionsPrice" detail="optionsDetail" instance-id="instanceId()"></div><div aliyun-buy-ecs-price data="optionsPrice"></div><div class="bk-order-pact"><a href="javascript:;" class="bk-order-pact-box" ng-click="termsChecked=!termsChecked" ng-class="{\'bk-order-pact-box-select\':termsChecked, \'\':!termsChecked}"><span class="dis-inline-block" ng-class="{\'aliyun-icon-yes2\':termsChecked, \'\':!termsChecked}"></span></a> <a class="bk-order-pact-link" href="http://help.aliyun.com/view/13433718.html" target="_blank">《云服务器 ECS服务条款》</a></div><div class="bk-items-price-control bk-order-price-control bk-order-renew-price-wrap"><div aliyun-buy-button ng-click="pay()" is-disabled="{{payDisabled}}">去支付</div></div></div>')
    }]), e.module("partials/aliyunBuyEcsUpgradeConfimDlg.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsUpgradeConfimDlg.html", '<div><div class="bk-dialog-head"><span class="bk-dialog-close" data-dismiss="modal" aria-hidden="true" ng-click="$close()"><span class="aliyun-icon-wrong"></span></span><h5 class="bk-dialog-title">云服务器配置变更温馨提示</h5></div><div class="bk-dialog-body"><div class="bk-box" style="width: 600px;border:0 none;padding-top:15px; height: auto; line-height: 20px"><p>1. CPU、内存或首次0Mbps带宽升级：<br>支付完成后您需要通过ECS控制台或ECS API重启ECS实例，配置变更才能生效；通过其他方式重启实例无效。<br>2. 带宽升级（除首次0Mbps带宽升级外）：<br>无需重启您的ECS实例，支付完成后立即生效。</p></div></div><div class="bk-dialog-foot ng-scope"><button aliyun-buy-button ng-click="confirmPurchase()" theme="blue">升级</button></div></div>')
    }]), e.module("partials/aliyunBuyEcsUpgradeOptions.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsUpgradeOptions.html", '<div class="bk-scope" aliyun-buy-preloader="!ready" aliyun-buy-disable-ng-animate><div aliyun-buy-ecs-instance-detail data="raw" ng-if="options.global.showInstanceInfo"></div><div ng-class="{\'bk-order-renew-wrap bk-mt5\':options.global.showInstanceInfo}"><div class="bk-order-renew-title" ng-show="options.global.showInstanceInfo">配置升级</div><div ng-if="options.global.isLocalOfSystemDisk" aliyun-buy-notice data-text="ECS_NOT_ALLOW_UPGRADE_WHEN_LOCAL_SYSTEMDISK" class="bk-mt5"></div><div ng-class="{\'bk-order-renew-body\':options.global.showInstanceInfo}"><div aliyun-buy-ecs-instance-type options="options.instanceType" value="value.instanceType" detail="detail" config="config().instanceType" value-all="value" raw="raw" no-dialog="true"></div><div aliyun-buy-bricks-tabs options="options.bandwidthType" value="value.bandwidthType" detail="detail.bandwidthType" config="config().bandwidthType"></div><div class="bandwidth-con bk-clear"><div aliyun-buy-ecs-bandwidth-upgrade-forever options="options.bandwidthUpgradeForever" value="value.bandwidthUpgradeForever" detail="detail.bandwidthUpgradeForever" config="config().bandwidthUpgradeForever"></div><div aliyun-buy-ecs-bandwidth options="options.bandwidth" value="value.bandwidth" config="config().bandwidth" class="band-width"></div><!--批量 和 vpc 不显示--><div ng-if="!options.global.batchMode \n                  && value.networkType != \'1\' \n                  && !(value.bandwidthType == \'5\' && !value.bandwidthUpgradeForever)\n                  " aliyun-buy-ecs-bandwidth-history data="bandwidthHistory" options="options.bandwidthHistory" class="band-history" instance-id="instanceId()"></div></div></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsYundisk.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundisk.html", '<div class="bk-layout-2col"><div class="bk-layout-2col-side" aliyun-buy-order-roll="aliyunBuyEcsYundisk:rendered"><div ng-hide="hideAddToCart == true"><div aliyun-buy-cart config="cartConfig" handle="cartHandle" value="cartValue"></div></div><div aliyun-buy-subtotal data="subtotalData" handle="subtotalHandle"></div></div><div class="bk-layout-2col-main"><div aliyun-buy-delay-directive="aliyun-buy-ecs-yundisk-options" config="optionsConfig" value="optionsValue" handle="optionsHandle" price="optionsPrice" detail="optionsDetail" options="optionsOptions" default-value="optionsDefault()"></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsYundiskCartItem.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundiskCartItem.html", '<div ng-style="{\'height\':collection.length>2?\'332px\':\'auto\',\'overflow\':\'auto\'}"><div ng-repeat="item in collection" class="bk-orders-item"><div class="bk-orders-item-title"><span class="bk-orders-item-name">云盘 （{{item.detail.yundisk.text}}）</span> <span class="bk-orders-item-delete" ng-click="remove(item)" data-spm-click="gostr=/aliyun;locaid=reomvecartitem"><i class="aliyun-icon-wrong-thin"></i></span> <span class="bk-orders-item-quantity">{{item.data.quantity}}块</span></div><div class="bk-orders-item-items"><ul><li>地域：{{item.detail.region.text}}</li><li>可用区：{{item.detail.zone.text}}</li><li>容量：{{item.components.datadisk[0].datadisk_size}}GB</li><li>快照id：{{item.components.datadisk[0].datadisk_snapshot || \'未选择快照\'}}</li><li>配置费用： <a ng-if="item.price.trade < item.price.origin" class="aliyun-icon-giving" aliyun-buy-tooltip="{templateUrl:\'partials/base/aliyunBuyCartGivingTip.html\', theme:\'orange\', trigger:\'hover\'}"></a> <span class="bk-orders-item-settle" ng-bind-html="item.price.trade | aliyunBuyFullPrice:productId"><span class="bk-items-price-unit">{{priceUnit}}</span></span></li></ul></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsYundiskOptions.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundiskOptions.html", '<div class="bk-scope" aliyun-buy-preloader="!ready" aliyun-buy-disable-ng-animate><div aliyun-buy-notice data-text="{{\'@{YUNDISK_NORMAL_NOTICE}\'}}" ng-show="options.global.showNotice"></div><div aliyun-buy-group data-title="基本配置" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-region options="options.region" value="value.region" detail="detail.region" config="config().region"></div><div aliyun-buy-collapsable aliyun-buy-ecs-zone options="options.zone" value="value.zone" detail="detail.zone" config="config().zone"></div><div aliyun-buy-ecs-yundisk-select options="options.yundisk" value="value.yundisk" detail="detail.yundisk" config="config().yundisk"></div></div><div aliyun-buy-group data-title="购买量" data-disabled="{{!options.global.grouped}}" async="false"><div aliyun-buy-amount options="options.amount" value="value.amount" config="config().amount"></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsYundiskOrderPreview.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundiskOrderPreview.html", '<div class="bk-scope" style="background: #FBFAF8; padding-bottom: 20px" aliyun-buy-preloader="!ready"><div aliyun-buy-ecs-order-view order-data="orderData()" price-service="priceService" ready="ready" price="price"></div><div class="bk-mt5" style="text-align: right"><div class="bk-mt4"><button class="bk-button bk-button-primary" aliyun-buy-button data-spm-click="gostr=/aliyun;locaid=gotoPay" is-disabled="{{!checked}}" ng-click="purchase()">{{\'YUNDISK_PAY_POSTPAY\'|aliyunBuyText}}</button></div><div class="bk-mt4"><input id="pact" type="checkbox" ng-model="checked" checked="checked" value="1"><label for="pact"><a target="_blank" href="http://help.aliyun.com/manual?helpId=688" data-spm-anchor-id="5176.6970381.0.0">{{\'ECS_ORDER_TERMS\'|aliyunBuyText}}</a></label></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsYundiskResize.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundiskResize.html", '<div class="bk-scope" aliyun-buy-preloader="ready() === false"><div aliyun-buy-ecs-yundisk-resize-options value="optionsValue" handle="optionsHandle" price="optionsPrice" detail="optionsDetail" disk-id="diskId()" options="options" instance-id="instanceId()"></div><div aliyun-buy-ecs-price data="optionsPrice" options="options"></div><div class="bk-items-price-control bk-order-price-control bk-order-renew-price-wrap"><div aliyun-buy-button ng-click="pay()" is-disabled="{{payDisabled}}">{{options.chargeType == \'AfterPay\'? (\'YUNDISK_RESIZE_PAY_POSTPAY\' | aliyunBuyText): (\'YUNDISK_RESIZE_PAY_POSTPAY\' | aliyunBuyText)}}</div></div></div>')
    }]), e.module("partials/aliyunBuyEcsYundiskResizeOptions.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundiskResizeOptions.html", '<div class="bk-scope" aliyun-buy-preloader="!ready"><div ng-if="options.chargeType == \'FreeTrial\'" style="margin-top: 50px"><div aliyun-buy-notice data-text="非常抱歉，您的ECS服务器还处于免费试用阶段，不能进行磁盘扩容。"></div></div><div ng-if="options.chargeType == \'AfterPay\' || options.chargeType == \'Prepaid\'" style="background:#FFF"><div class="bk-order-renew-wrap y-mt5"><table class="bk-table"><thead><tr><th>磁盘ID/磁盘名称</th><th>磁盘种类</th><th>支持卸载</th><th>挂载点/实例名称</th><th>磁盘计费方式</th><th>当前容量</th><th>扩容后容量</th><th>费用</th></tr></thead><tbody><tr><td><a href="https://console.aliyun.com/ecs/index.htm#/diskdetail/{{diskId}}/detail?local=false" class="bk-lnk" target="_blank" title="{{diskInfo.diskName&&diskInfo.diskName.length>18?diskInfo.diskName:\'\'}}">{{diskId}}/{{diskInfo.diskName&&diskInfo.diskName.length>18?diskInfo.diskName.substr(0,18)+\'...\':diskInfo.diskName | aliyunBuyUnderline}}</a></td><td>{{diskInfo.diskTypeName}}</td><td>{{diskInfo.portable===true?\'支持\':\'不支持\'}}</td><td><div>{{diskInfo.mountPoint}}</div><div ng-hide="!instanceInfo.instanceId"><a class="bk-lnk bk-ml1" href="javascript:;" aliyun-buy-tooltip="{templateUrl:\'partials/aliyunBuyEcsYundiskResizePopViewOfEcsInstance.html\'}"><i class="aliyun-icon-info" style="color: #007DDD"></i></a> {{instanceInfo.instanceId}}</div></td><td ng-bind-html="options.chargeType == \'AfterPay\' ? \'按量付费\' : \'<div>包年包月</dvi><div>\'+ ecsInstanceInfo.instEndDate +\'</div>\'"></td><td>{{diskInfo.diskSize}}GB</td><td aliyun-buy-tooltip="{content:\'容量范围：{{options.datadisk.min}}-{{options.datadisk.max}}\', theme:\'white\', trigger:\'hover\', offsetX: 20,offsetY: -15}"><div aliyun-buy-number-stepper value="value.size" min="options.datadisk.min" max="options.datadisk.max" unit="diskInfo.unit"></div></td><td class="bk-orange price-cell"><span class="bk-cny">&yen;</span><span class="bk-items-price-money">{{price.data.trade | aliyunBuyPriceValue}}</span><span class="bk-items-price-unit">{{options.basePriceUnit}}</span></td></tr></tbody></table></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsYundiskResizeOrderTipDlg.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundiskResizeOrderTipDlg.html", '<div><div class="bk-dialog-head"><span class="bk-dialog-close" data-dismiss="modal" aria-hidden="true" ng-click="$close()"><span class="aliyun-icon-wrong"></span></span><h5 class="bk-dialog-title">提醒</h5></div><div class="bk-dialog-body"><div class="bk-message bk-message-normal bk-message-s"><div class="bk-message-icon"><i class="aliyun-icon-info"></i></div><div class="bk-message-message"><div class="bk-message-info" ng-if="needRestartEcsInstance">您下单成功后，需要您通过ECS控制台重启本磁盘挂载的实例。</div><div class="bk-message-info" ng-if="!needRestartEcsInstance">您下单成功后，磁盘挂载到ECS实例上即可生效，无需重启实例。</div><div>扩容生效后，需要登录到VM内部，手动格式化以便扩展存储空间，<a href="http://help.aliyun.com/document_detail/ecs/operation-guide/disk-operation/resize.html" target="_blank">请见详细说明>></a></div></div></div></div><div class="bk-dialog-foot ng-scope"><button aliyun-buy-button ng-click="confirmPurchase()" theme="blue">确定</button></div></div>')
    }]), e.module("partials/aliyunBuyEcsYundiskResizePopViewOfEcsInstance.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundiskResizePopViewOfEcsInstance.html", '<div><ul><li>实例ID：{{instanceInfo.instanceId}}</li><li ng-hide="!instanceInfo.vmPublicIp">公网IP: {{instanceInfo.vmPublicIp}}</li><li ng-hide="!instanceInfo.vmPrivateIp">内网IP: {{instanceInfo.vmPrivateIp}}</li><li>镜像名称：{{instanceInfo.osName}}</li><li>实例状态：{{instanceInfo.status | aliyunBuyInstStatus}}</li></ul></div>')
    }]), e.module("partials/aliyunBuyEcsYundiskSelect.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundiskSelect.html", '<div class="bk-form-row yundisk" ng-hide="options.visible===false"><label class="bk-form-row-name">{{options.name}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li"><div aliyun-buy-select ng-model="_value.diskType" detail="detail" placeholder="请选择云盘类型" option="options.items" state="options.state" style="float:left"></div><span class="bk-form-row-li-info bk-disk-cell bk-disk-cell-size bk-ml2"><span class="bk-disk-storage"><span ng-show="options.editable"><input aliyun-buy-ecs-datadisk-size-input ng-model="model4placeholder" placeholder="{{sizeRange}}" class="bk-disk-input" ng-class="{\'bk-disk-input-error\': showSizeError}" data-value="size" max="options.max" min="options.min" type="text" ng-focus="showSizeError=false" aliyun-buy-tooltip="{content:\'容量范围：{{sizeRange}}\', theme:\'white\', trigger:\'hover\', offsetX: 20}"> <span class="bk-disk-unit">GB</span></span></span></span> <span class="bk-ml5"><div aliyun-buy-ecs-datadisk-item-snapshot ng-show="options.loggedIn" logged-in="options.loggedIn" size="size" id="snapshotId" name="snapshotName" region-id="options.regionId" region-name="options.regionName" max-size="options.max" editable="options.editable" show-snap-close="true">></div></span></div><div class="bk-form-row-txt" ng-bind-html="options.tip | aliyunBuyText" ng-show="options.tip"></div></div></div>')
    }]), e.module("partials/aliyunBuyEcsYundiskSubtotalModel.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundiskSubtotalModel.html", '<div class="bk-items-list"><ul><li><span class="bk-items-item-name">地域：</span> <span class="bk-items-item-value">{{context.region | aliyunBuyUnderline}}（{{context.randomZone?\'可用区\':\'\'}}{{context.zone | aliyunBuyUnderline}}）</span></li><li><span class="bk-items-item-name">容量：</span> <span class="bk-items-item-value">{{context.size | aliyunBuyUnderline}}GB（{{context.diskTypeText | aliyunBuyUnderline}}）</span></li><li><span class="bk-items-item-name">数量：</span> <span class="bk-items-item-value">{{context.amount | aliyunBuyAccy:\'yundiskAmount\' | aliyunBuyUnderline}}</span></li></ul></div>')
    }]), e.module("partials/aliyunBuyEcsYundun.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsYundun.html", '<div class="bk-items-yundun bk-mt2"><i class="aliyun-icon-yundun"></i> <span>免费开通云盾服务</span> <i class="aliyun-icon-help" data-spm-click="gostr=/aliyun;locaid=yundunhelp" aliyun-buy-tooltip="{content:\'\\{\\{\\\'ECS_YUNDUN_TIP\\\'|aliyunBuyText\\}\\}\', maxWidth:300}"></i></div>')
    }]), e.module("partials/aliyunBuyEcsZone.html", []).run(["$templateCache", function (e) {
        e.put("partials/aliyunBuyEcsZone.html", '<div class="bk-form-row" ng-hide="options.visible===false"><label class="bk-form-row-name">{{options.name | aliyunBuyText}}：</label><div class="bk-form-row-cell"><div class="bk-form-row-li"><div aliyun-buy-select ng-model="value" detail="detail" placeholder="请选择可用区" option="options.items" state="options.state" need-login="{{options.needLogin?\'暂无数据,请登录\':\'暂无数据\'}}"></div><a class="bk-lnk bk-ml2" ng-show="options.showLink" href="http://console.aliyun.com/ecs/index.htm#/server/region/{{options.regionMapValue}}?izNo={{(value!==\'random\')?value:\'\'}}" target="_blank">查看实例分布详情&gt;&gt;</a> <a class="bk-lnk bk-ml1" href="javascript:;" data-spm-click="gostr=/aliyun;locaid=zonehelp" aliyun-buy-tooltip="{{\'ECS_ZONE_TIP\' | aliyunBuyText}}"><i class="aliyun-icon-help"></i></a></div><div class="bk-form-row-text" ng-bind-html="options.tip" ng-show="options.tip"></div></div></div>')
    }]), e.module("partials/prepayOrder.html", []).run(["$templateCache", function (e) {
        e.put("partials/prepayOrder.html", '<div style="background: #FBFAF8; padding-bottom: 20px" aliyun-buy-preloader="!ready"><div><div class="y-page-title"><div class="y-row"><div class="y-span12 y-last"><div class="bk-scope bk-subheader"><div class="bk-subheader-box"><h1>确认订单</h1></div></div></div></div></div></div><div class="y-row y-mt5"><div class="bk-process"><span class="unit current w49">确认订单</span> <span class="arrow-current"><span class="next"></span> <span class="prev"></span></span> <span class="unit w49">开通成功</span></div></div><div class="bk-scope y-row y-mt5"><div aliyun-buy-ecs-order-view order-data="orderData" price-service="priceService" ready="ready"></div></div><div class="bk-scope bk-orange"><span class="bk-orange">重要提醒：订单对应可开发票的类型和抬头为您在用户中心-发票信息管理中设置的信息</span></div><div class="y-row y-mt5 text-align-right"><button class="bk-button bk-button-primary" aliyun-buy-button is-disabled="{{!checked}}" ng-click="purchase()"><div><span>去支付</span></div></button></div><div class="y-row y-mt5 text-align-right"><input id="pact" class="orders-pact" type="checkbox" ng-model="checked" checked="checked" value="1"><label for="pact"><a target="_blank" href="http://help.aliyun.com/manual?spm=5176.6970381.0.0.yEseLN&amp;helpId=688" data-spm-anchor-id="5176.6970381.0.0">《云服务器 ECS服务条款》</a></label></div></div>')
    }])
}), define("aliyun-buy-ecs/module/common/ui.ecs.bandwidthHistory", ["angular", "jQuery", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.dialog", "aliyun-buy/base/ui/controls/ui.simplechart", "aliyun-buy/base/services/service.remote", "../../ui.ecs.tpl"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.bandwidthHistory", n.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsBandwidthHistory", ["aliyunBuyDialog", "aliyunBuyRemote", "$timeout", function (e, n, r) {
        function s(i) {
            i.openDialog = function () {
                if (i.bandWidthDialog != undefined)return;
                var s = i.instanceId(), o, u = {
                    chart: {type: "column", fillColor: "#FF6600"},
                    title: {text: ""},
                    xAxis: {labels: !1, tickWidth: !1, lineWidth: 1, gridLineWidth: 0},
                    yAxis: {
                        min: 0,
                        title: {
                            text: "带宽(M)",
                            style: {
                                color: {
                                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                                    stops: [[0, Highcharts.getOptions().colors[0]], [1, "rgba(2,0,0,0)"]]
                                }
                            }
                        },
                        lineWidth: 1,
                        gridLineWidth: 1,
                        gridLineDashStyle: "solid"
                    },
                    legend: {enabled: !1},
                    tooltip: {
                        formatter: function () {
                            return "<b>" + this.x + "</b><br/>" + Highcharts.numberFormat(this.y, 1) + " M"
                        }
                    },
                    series: [{labels: !1, dataLabels: !1}],
                    plotOptions: {
                        column: {groupPadding: 0, pointPadding: 0, borderWidth: 0, shadow: !1},
                        series: {
                            color: {
                                linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                                stops: [[0, "#B0DFFF"], [1, "rgba(255,255,255,0)"]]
                            }, shadow: !1, cursor: "pointer", allowPointSelect: !0, dataLabels: {enabled: !0, y: -10}
                        }
                    },
                    credits: {enabled: !1}
                };
                i.bandWidthDialog = e.open({
                    backdrop: !1,
                    templateUrl: "partials/aliyunBuyEcsBandwidthHistory.html",
                    controller: ["$scope", "$http", "$timeout", function (e, r, i) {
                        e.isLoading = !1, e.isReady = !1, e.settings = {}, e.allData = [], e.index = 0, e.options = {}, e.settings = {}, e.loadWrongMsg = "带宽历史加载失败", e.title = "带宽历史", e.loadingWrong = !1;
                        var a = function (e) {
                            var n = [];
                            for (var r in e) {
                                var i = {};
                                i.data = [], i.categories = [];
                                var s = {year: r};
                                for (var o in e[r])i.data.push(parseInt(e[r][o].bandwidth, 10) / 1024), i.categories.push(e[r][o].date);
                                s.data = t.extend(!0, {
                                    xAxis: {categories: i.categories},
                                    series: [{data: i.data}]
                                }, u), n.push(s)
                            }
                            return n
                        }, f = function () {
                            e.allData.length > 0 && (e.options = e.allData[e.index].data, e.isLoading = !1, e.isReady = !0)
                        }, l = function () {
                            e.allData = a(o), f()
                        }, c = function () {
                            e.loadingWrong = !0
                        }, h = function (e, t) {
                            o && o instanceof Object ? e() : n.getEcsBandwidthHistory(s).then(function (t) {
                                t && t instanceof Object && (o = t, e())
                            }, function () {
                                t()
                            })
                        };
                        e.checkIndex = function (t) {
                            e.allData.length > t && e.index != t && (e.index = t, e.options = e.allData[t].data)
                        }, h(l, c)
                    }]
                });
                var a = function (e) {
                    var n = t(e.target);
                    n.parents(".bk-dialog-box").length <= 0 && !n.hasClass("bk-dialog-box") && i.bandWidthDialog.close()
                };
                r(function () {
                    t(document).on("click", a)
                }, 0), i.bandWidthDialog.result.then(function () {
                    t(document).off("click", a), i.bandWidthDialog = undefined
                })
            }
        }

        var i = {
            restrict: "EA",
            template: '<a href="javascript;" ng-click="openDialog()" onclick="return false;">{{\'ECS_BANDWIDTH_HISTORY\' | aliyunBuyText}}</a>',
            scope: {instanceId: "&"},
            replace: !0,
            compile: function (e, t) {
                return {post: s}
            }
        };
        return i
    }]), r
}), define("aliyun-buy-ecs/module/common/imageMarketHelper", [], function () {
    function e(e, t, n, r) {
        var i = [{
            commodityCode: e.imageProductCode,
            specCode: e.specCode,
            data: {orderType: "BUY", spQuantity: "1", quantity: t.toString(), duration: "1", pricingCycle: "Hour"},
            components: {img_region: n, img_id: e.imageId, instance_type: r}
        }];
        return i
    }

    function t(e) {
        if (e && e !== "") {
            var t = angular.fromJson(e);
            return t ? {
                imageId: t[0],
                osKind: t[1],
                osBit: t[2],
                imageSize: t[4],
                imageCategory: t[5],
                capacity: t[6],
                used: t[7],
                quota: t[8],
                imageProductCode: t[9],
                specCode: t[10],
                version: t[11]
            } : {}
        }
        return {}
    }

    function n(e) {
        return e ? [e.imageId, e.osKind, e.osBit, null, e.imageSize, e.imageCategory, e.capacity, e.used, e.quota, e.imageProductCode, e.specCode, e.version] : (e = {}, [])
    }

    return {getPriceParamFromValue: e, parseValue: t, toJsonString: n}
}), define("aliyun-buy-ecs/module/common/priceHelper", ["angular"], function (e) {
    var t = {
        sortPriceResult: function (e) {
            var t = {
                vm_region_no: 1,
                vm_iz: 2,
                systemdisk: 3,
                iooptimized: 4,
                instance_type: 5,
                vm_cpu: 6,
                vm_ram: 7,
                vm_is_flow_type: 8,
                vm_bandwidth: 9,
                vm_web_type: 10,
                vm_os: 11,
                datadisk: 12,
                hostname: 13,
                isSetPasswd: 14,
                vm_yundun_service: 15,
                vm_yundun_monitor: 16
            }, n = e.orderLines;
            for (var r in n) {
                var i = n[r];
                for (var s = 0; s < i.moduleInstance.length; s++) {
                    var o = i.moduleInstance[s];
                    o.sortIndex = t[o.moduleCode]
                }
                i.moduleInstance.sort(function (e, t) {
                    return e.sortIndex - t.sortIndex
                })
            }
        }, sortPriceResultChildren: function (t) {
            var n = this;
            e.forEach(t, function (e) {
                n.sortPriceResult(e)
            })
        }
    };
    return t
}), define("aliyun-buy-ecs/module/common/service.ecs.dialogButtonConfig", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote"], function (e, t) {
    var n = e.module("aliyun.buy.service.ecs.dialog.button.config", t.getModuleNames(arguments));
    return n.factory("aliyunBuyEcsDialogButtonConfig", ["aliyunBuyRemote", function (e) {
        function t() {
            return {
                buttons: [{
                    text: "刷新页面", theme: "blue", handler: function () {
                        window.location.reload()
                    }
                }]
            }
        }

        function n() {
            return {
                buttons: [{
                    text: "去登录", theme: "blue", handler: function () {
                        e.login()
                    }
                }]
            }
        }

        function r() {
            return {
                buttons: [{
                    text: "返回实例列表", theme: "blue", handler: function () {
                        this.close(), e.linkToEcsInstancePage()
                    }
                }]
            }
        }

        function i() {
            return {
                buttons: [{
                    text: "去实名认证", theme: "blue", handler: function () {
                        e.linkToCertifiedPage()
                    }
                }]
            }
        }

        function s() {
            return {
                buttons: [{
                    text: "返回磁盘列表", theme: "blue", handler: function () {
                        this.close(), e.linkToEcsDiskPage()
                    }
                }]
            }
        }

        return {login: n, refresh: t, linkToEcsInstancePage: r, linkToEcsDiskPage: s, linkToCertifiedPage: i}
    }]), n
}), define("aliyun-buy-ecs/module/common/ui.ecs.orderView", ["angular", "jQuery", "../common/imageMarketHelper", "../common/priceHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote", "./service.ecs.dialogButtonConfig", "../../ui.ecs.tpl"], function (e, t, n, r, i) {
    var s = e.module("aliyun.buy.ui.ecs.orderView", i.getModuleNames(arguments));
    return s.directive("aliyunBuyEcsOrderView", ["aliyunBuyRemote", "aliyunBuyMsg", "aliyunBuyEcsDialogButtonConfig", "$filter", "$q", function (n, s, o, u, a) {
        function f(i, f, l) {
            function x() {
                c(p).then(function (e) {
                    k(e), v.resolve(e)
                }, function (e) {
                    v.reject(e)
                })
            }

            function T() {
                p && p[0] && p[0].imageMarket ? h(p[0].imageMarket).then(function (e) {
                    g.resolve(e)
                }, function (e) {
                    g.reject(e)
                }) : g.resolve(undefined)
            }

            function N() {
                n.queryAllIzName().then(function (e) {
                    E.resolve(e)
                }, function (e) {
                    E.resolve(null)
                })
            }

            function C() {
                var e = L().regionListForFlowPrice, r = p[0].commodityCode;
                if (e.length == 0 || r != "vm" && r != "ecs") {
                    b.resolve(null);
                    return
                }
                t.unique(e), n.getEcsListFlowPriceMap(r, e).then(function (e) {
                    b.resolve(e)
                }, function (e) {
                    b.resolve(null)
                })
            }

            function k() {
                var r = L().regionMapForImageList;
                if (t.isEmptyObject(r))return;
                e.forEach(r, function (r, s) {
                    t.unique(r), function (t, r) {
                        n.queryImageByImageId(t, r).then(function (t) {
                            e.extend(i.imageNameMap, t)
                        })
                    }(s, r)
                })
            }

            function L() {
                var t = {}, n = [];
                return e.forEach(p, function (e) {
                    if (!e)return;
                    var r = e.components;
                    if (!r)return;
                    var i = r.vm_region_no;
                    if (!i || !r.vm_os || !r.vm_bandwidth)return;
                    var s = r.vm_os[0].vm_os;
                    t[i] || (t[i] = []), t[i].push(s);
                    if (r.vm_bandwidth[0].vm_is_flow_type != "1")return;
                    n[i] || (n[i] = []), n.push(i)
                }), {regionMapForImageList: t, regionListForFlowPrice: n}
            }

            function A(e) {
                var t = e[0], n = e[1], s = e[2], o = e[3];
                r.sortPriceResult(t), i.price = {
                    calculating: !1,
                    success: !0,
                    data: {
                        success: !0,
                        origin: t.origin,
                        trade: t.trade,
                        discount: t.discount,
                        strategies: t.strategies
                    }
                }, i.orderViewData = t, i.izNameMap = s ? s.data : undefined, i.flowPriceMap = n ? n.data : undefined, i.imageOrderViewData = o, i.ready = !0
            }

            i.price = {calculating: !0}, i.imageNameMap = {}, i.securityNameMap = {};
            var c = n[i.priceService()], h = n.getEcsImageBuyPrice, p = i.orderData();
            if (l.usePriceOrder == "true") {
                var d = i.priceOrder();
                if (!d)return;
                p = d
            }
            if (!c || !p)return;
            var v = a.defer(), m = v.promise, g = a.defer(), y = g.promise, b = a.defer(), w = b.promise, E = a.defer(), S = E.promise;
            a.all([m, w, S, y]).then(function (e) {
                A(e)
            }, function (e) {
                s.dialog(u("aliyunBuyText")("ECS_PROMPT"), e.message, o.refresh())
            }), x(), N({}), C({}), T()
        }

        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsOrderView.html",
            scope: {orderData: "&", priceOrder: "&?", usePriceOrder: "@?", priceService: "&", price: "=", ready: "="},
            replace: !0,
            compile: function (e, t) {
                return i.require(["price"], t), {post: f}
            }
        }
    }]), s.filter("aliyunBuyEcsOrderViewModuleInstanceItem", ["aliyunBuyLocal", function (t) {
        return function (t, n, r, i, s) {
            if (n == "moduleName")return t.moduleCode == "vm_yundun_monitor" ? "" : t.moduleCode == "vm_yundun_service" ? "云盾" : t.moduleName;
            if (n == "moduleDetail") {
                if (t.moduleCode == "vm_bandwidth" && t.moduleAttrs.length == 2)return t.moduleAttrs[0].value / 1024 + "Mbps（" + t.moduleAttrs[1].name + "）";
                if (t.moduleCode == "vm_yundun_service")return "是";
                if (t.moduleCode == "datadisk") {
                    var o = {
                        datadisk_size: "",
                        datadisk_category: "",
                        datadisk_device: "",
                        datadisk_category_value: "",
                        datadisk_deletewithinstance: ""
                    }, u = "", a = "", f = "";
                    e.forEach(t.moduleAttrs, function (e, t) {
                        o[e.code] = e.name, o.datadisk_category_value = e.value
                    });
                    var l = [];
                    return o.datadisk_category ? l.push(o.datadisk_category) : !0, o.datadisk_device ? l.push(o.datadisk_device) : !0, o.datadisk_category_value != "ephemeral" && o.datadisk_category_value != "ephemeral_ssd" && (o.datadisk_deletewithinstance ? l.push(o.datadisk_deletewithinstance) : !0), o.datadisk_size + "（" + l.join("，") + "）"
                }
                if (t.moduleCode == "systemdisk") {
                    var c = {systemdisk_size: "", systemdisk_category: "", systemdisk_device: ""};
                    e.forEach(t.moduleAttrs, function (e, t) {
                        c[e.code] = e.name, e.code === "systemdisk_size" && (c[e.code] = e.name)
                    });
                    var h = [];
                    return c.systemdisk_category ? h.push(c.systemdisk_category) : !0, c.systemdisk_device ? h.push(c.systemdisk_device) : !0, c.systemdisk_size + "（" + h.join("，") + "）"
                }
                if (t.moduleCode == "vm_iz") {
                    var p = t.moduleAttrs[0], d = p.value;
                    return r ? r[d] ? r[d] : d : d
                }
                if (t.moduleCode == "instance_type") {
                    var v = t.moduleAttrs, m = "{instance_type}（{instance_generation}，{instance_type_family}）";
                    return e.forEach(v, function (e) {
                        m = m.replace("{" + e.code + "}", e.name)
                    }), m
                }
                if (t.moduleCode == "vm_os") {
                    var v = t.moduleAttrs, g = null;
                    return e.forEach(v, function (e) {
                        e.code == "vm_os" && (g = e.value)
                    }), i ? i[g] ? i[g].text : g : g
                }
                if (t.moduleCode == "vm_security") {
                    var p = t.moduleAttrs[0], n = p.type.toString(), y = p.value, b = p.name, w = "";
                    switch (n) {
                        case"1":
                            w = "自动创建安全组";
                            break;
                        case"2":
                            w = b + " / " + y;
                            break;
                        case"3":
                            w = b + "(新建)"
                    }
                    return w
                }
                return t.moduleAttrs[0].name
            }
        }
    }]), s.filter("aliyunBuyEcsOrderViewModuleInstanceModuleName", [function () {
        return function (e, t, n) {
            if (t == "moduleName")return e.moduleCode == "systemdisk" || e.moduleCode == "vm_yundun_monitor" ? "" : e.moduleCode == "vm_yundun_service" ? "云盾" : e.moduleCode == "instance_type" && n != "vm" && n != "ecs" ? "" : e.moduleName
        }
    }]), s.filter("aliyunBuyEcsOrderViewModuleInstance", ["aliyunBuyLocal", function (t) {
        return function (t, n, r, i) {
            if (n == "flowPrice") {
                var s = undefined, o = !1;
                return e.forEach(t, function (e) {
                    e.moduleCode == "vm_region_no" && (s = e.moduleAttrs[0].value), e.moduleCode == "vm_bandwidth" && e.moduleAttrs[1] && e.moduleAttrs[1].value == 1 && (o = !0)
                }), o && r && r[s] && r[s].order ? r[s].order.tradeAmount : undefined
            }
            if (n == "supplierName") {
                var u = undefined;
                return e.forEach(t, function (e) {
                    if (e.moduleCode == "img_id") {
                        var t = e.moduleAttrs[0].value;
                        u = i[t] ? i[t].supplierName : ""
                    }
                }), u
            }
        }
    }]), s
}), define("aliyun-buy-ecs/module/common/service.ecs.orderResult", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote"], function (e, t) {
    var n = e.module("aliyun.buy.service.ecs.order.result", t.getModuleNames(arguments));
    return n.factory("aliyunBuyOrderResult", [function () {
        var t = {}, n = {
            success: {
                isSuccess: !0,
                title: "下单成功",
                info: "恭喜，开通成功！",
                infoMore: "正在努力创建中，一般需要1-5分钟，请您耐心等待。",
                commodityCode: "yundisk"
            }, error: {isSuccess: !1, title: "下单失败", info: "很抱歉操作失败了，请重试或提交工单"}
        };
        return t.yundisk = {
            success: {infoMore: '您购买的云盘正在努力创建中，一般需要1-5分钟，请您耐心等待。如何将云盘挂载到ECS服务器上，请看 <a href="https://help.aliyun.com/document_detail/ecs/operation-guide/disk-operation/attach.html?spm=5176.product8314827_ecs.6.119.DH3aY8" class="bk-lnk" target="_blank">详细说明>></a>'},
            error: {infoMore: "购买操作出现异常，请您提交工单，我们会尽快为您处理。"}
        }, t.ecs = {
            success: {title: "开通成功", infoMore: "您购买的ECS云服务器正在努力创建中，一般需要1-5分钟，请您耐心等待。"},
            error: {title: "开通结果", info: "您有{0}个清单开通成功，有{1}个清单开通失败", infoMore: "购买操作出现异常，请您提交工单，我们会尽快为您处理。"}
        }, t.vm = {
            success: {infoMore: "您购买的ECS云服务器正在努力创建中，一般需要1-5分钟，请您耐心等待。"},
            error: {infoMore: "购买操作出现异常，请您提交工单，我们会尽快为您处理。"}
        }, t.getOrderResultBycommodityCode = function (r) {
            var i = n.success, s = t[r].success;
            return e.extend(i, s)
        }, t.getOrderErrorResultBycommodityCode = function (r, i) {
            var s = n.error, o = t[r].error;
            return i && (o.info = i), e.extend(s, o)
        }, t
    }]), n
}), define("aliyun-buy-ecs/ui.ecs.module.styles", ["angular"], function (e) {
    return e.module("aliyun.buy.ui.ecs.module.styles", []).run(function () {
        var e = ['.bk-scope .bk-status-shadow{background:#f2f2f2;padding-left:26px !important;font-size:16px;height:38px;line-height:38px}.bk-scope .bk-message-row-spec{padding:4px 10px;line-height:2;color:#333}.bk-scope .bk-message-row-spec .bk-message-row-spec-span{line-height:2;color:#999}.bk-scope .bk-table-wordbreak{width:50%;word-wrap:break-word;word-break:break-all;white-space:normal}.bk-scope .bk-lnk-black{color:#000;display:block;padding-right:70px;height:28px;line-height:28px;overflow:hidden;word-break:break-all;text-overflow:ellipsis;white-space:nowrap}.bk-scope .bk-lnk-black,.bk-scope .bk-lnk-black:link,.bk-scope .bk-lnk-black:visited{color:#000;text-decoration:none;cursor:pointer;-webkit-transition:all .3s;-moz-transition:all .3s;-ms-transition:all .3s;-o-transition:all .3s}.bk-scope .bk-lnk-black:hover{color:#00a2ca}.bk-scope .bk-disk{padding:5px 10px;background:#eee;width:610px;height:36px;float:left}.bk-scope .bk-disk-show-extra-info{width:870px}.bk-scope .bk-disk-form-row-txt{margin-top:4px}.bk-scope .bk-disk .bk-select{float:left;display:inline}.bk-scope .bk-disk-storage{position:relative}.bk-scope .bk-disk-input{float:left;display:inline;height:14px;width:81px;padding:10px 28px 10px 4px;border:solid 1px #e8e8e8;text-align:center;line-height:20px;color:#333;font-size:14px;outline:none}.bk-scope .bk-disk-unit{position:absolute;left:82px;top:0;width:28px;height:36px;text-align:center;line-height:36px;color:#999;font-size:12px}.bk-scope .bk-disk-input:focus{border-color:#44bee5}.bk-scope .bk-disk-input-error{border-color:#ffb5b0}.bk-scope .bk-disk .bk-disk-snapshot{height:36px;overflow:hidden;text-overflow:ellipsis;margin:0!important}.bk-scope .bk-disk .bk-disk-snapshot-help{float:left;display:inline}.bk-scope .bk-disk .bk-disk-delete{float:right;display:inline;width:12px;height:12px;margin-left:10px;margin-top:8px;font-size:12px;line-height:1;color:#999;cursor:pointer;padding:2px}.bk-scope .bk-disk .bk-disk-delete:hover{color:#666;background:#ddd}.bk-scope .bk-disk .bk-disk-mount{width:84px;float:left;display:inline;cursor:pointer;margin-left:10px}.bk-scope .bk-disk .bk-disk-inst{float:left;display:inline;cursor:pointer;margin-left:15px}.bk-scope .bk-disk .bk-disk-type{float:left;display:inline;width:108px;text-align:center}.bk-scope .bk-disk .bk-disk-size{margin-right:5px;color:#333;font-size:14px}.bk-scope .bk-disk-add{cursor:pointer}.bk-scope .bk-disk-add .bk-disk-add-icon{position:relative;display:inline-block;width:36px;height:36px;background:#43bfe3;vertical-align:top}.bk-scope .bk-disk-add .bk-disk-add-icon-disabled{background:#ccc}.bk-scope .bk-disk-add .bk-disk-add-icon .bk-disk-add-icon-line,.bk-scope .bk-disk-add .bk-disk-add-icon .bk-disk-add-icon-line-b{position:absolute;top:16px;left:10px;width:16px;height:4px;background:#fff}.bk-scope .bk-disk-add .bk-disk-add-icon .bk-disk-add-icon-line-b{top:10px;left:16px;width:4px;height:16px}.bk-scope .bk-disk-add .bk-disk-add-txt{margin-left:10px;line-height:36px;font-size:14px;vertical-align:top}.bk-scope .bk-disk-add .bk-disk-add-txt-disabled{color:#ccc}.bk-scope .bk-disk .bk-disk-storage:after{display:block;height:0;visibility:hidden;clear:both;font-size:0;content:" "}.bk-scope .bk-disk .bk-disk-delete{-webkit-transition:all .3s;-moz-transition:all .3s;-ms-transition:all .3s;-o-transition:all .3s}.bk-scope .bk-disk .bk-disk-holder{color:#ccc !important}.bk-scope .bk-disk-change{float:left;display:inline-block}.bk-scope .bk-disk-cell{float:left;color:#999;min-height:15px;text-align:center}.bk-scope .bk-disk-cell-type{width:116px}.bk-scope .bk-disk-cell-size{width:110px}.bk-scope .bk-disk-cell-snapshot{width:92px}.bk-scope .bk-disk-cell-mount{width:94px}.bk-scope .bk-disk-cell-payment{width:64px}.bk-scope .bk-disk-cell-portable{width:64px}.bk-scope .bk-disk-show-header .bk-disk-title{background:#f6f6f6;height:24px;line-height:20px;padding:2px 10px;width:870px;margin-bottom:5px;display:block;overflow:hidden}.bk-scope .bk-disk-show-header .bk-disk-cell{float:left;color:#999;min-height:15px;text-align:center}.bk-scope .bk-disk-show-header .bk-disk-cell-type{width:116px}.bk-scope .bk-disk-show-header .bk-disk-cell-size{width:130px}.bk-scope .bk-disk-show-header .bk-disk-cell-snapshot{width:102px}.bk-scope .bk-disk-show-header .bk-disk-cell-mount{width:104px}.bk-scope .bk-disk-show-header .bk-disk-cell-payment{width:64px}.bk-scope .bk-disk-show-header .bk-disk-cell-portable{width:64px}.bk-scope .pd10{padding:10px 22px}.bk-scope .bk-rect-select{cursor:pointer}.bk-scope .bk-rect-select .bk-rect-select-icon{display:inline-block;width:20px;height:20px;background:#43bfe3;padding:8px 0 0 8px;vertical-align:top}.bk-scope .bk-rect-select .bk-rect-select-icon-rect{float:left;display:inline;width:1px;height:1px;overflow:hidden;border:solid 2px #fff;margin:0 2px 2px 0}.bk-scope .bk-rect-select .bk-rect-select-txt{margin-left:5px;line-height:30px;height:30px;font-size:14px;vertical-align:top}.bk-scope .bk-rect-select-txt-error{color:#ff8884 !important}.bk-scope .bk-shift-buttontab{position:relative;top:-18px;margin-left:90px;width:530px}.bk-scope .bk-shift-buttontab-nodialog{position:relative;top:-18px;margin-left:90px}.bk-scope .bk-shift-buttontab-ecs1{margin-left:50px}.bk-scope .bk-drag-head{cursor:move}.bk-scope .bk-shift-buttontab-name{position:relative;top:5px;color:#999}.bk-scope .bk-dialog-close-thin{margin-top:5px}.bk-scope .bk-shift-buttontype-group{margin-top:10px;max-width:940px}.bk-scope .bk-button-ensure{width:90px !important;line-height:30px !important;font-size:14px !important;padding:0 !important;min-width:90px !important;clear:both;display:block}.bk-scope .bk-instancefamily-help{cursor:pointer;margin-left:4px;position:relative;top:1px}.bk-scope .bk-instancefamily-help:hover{color:#00a2ca}.bk-scope .bk-dialog-footer-info{margin-left:20px}.bk-scope .bk-instance-box{background:#fafafa;overflow-x:auto;border-radius:10px;padding:20px;max-height:400px;border-left:0 none;max-width:1000px;margin-top:15px}.bk-scope .bk-instance-intro{padding:10px 8px}.bk-scope .bk-instancetype-properties{width:100px;float:left;height:32px}.bk-scope .bk-form-row-cell-nodialog{line-height:normal}.bk-scope .bk-form-row-text-dialog{position:relative;top:-3px;font-size:14px}.bk-scope .bk-form-row-text-nodialog{padding:10px;font-size:14px}.bk-scope .instancetype-backdrop{opacity:0.3 !important}.bk-scope .instancetype-dialog{left:40%}.bk-scope .imagemarket-backdrop{opacity:0.3 !important}.bk-scope .imagemarket-dialog{left:40%}.bk-scope .security-backdrop{opacity:0.3 !important}.bk-scope .security-dialog{left:40%}.bk-scope #order-table td{vertical-align:middle}.bk-scope #order-table .bk-items-price-offer{margin-top:0px}.bk-scope #order-table .bk-title-span{font-size:16px;font-weight:bold}.bk-scope .bk-snap-disk{width:615px}.bk-scope .bk-scope .bk-snap-disk .bk-disk-delete:hover{color:#666;background:#ddd}.bk-scope .bk-snap-disk .bk-disk-delete{float:right;display:inline;width:12px;height:12px;margin-left:10px;margin-top:8px;font-size:12px;line-height:1;color:#999;cursor:pointer;padding:2px}.bk-scope #bk-security-dialog .bk-dialog-body{padding:8px 0 0}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-close-icon{position:absolute;left:334px;font-size:8px;line-height:28px;cursor:pointer}.bk-scope #bk-security-dialog .bk-dialog-body .bk-form-security-input{width:195px;padding:5px}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-table{width:600px;text-align:left;background:#FFF;font-size:12px;margin-top:8px}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-table td{padding:8px 8px;overflow:hidden;word-break:break-all;text-overflow:ellipsis;white-space:nowrap}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-table th{padding:8px 8px;font-weight:normal;color:#999;background-color:#EBEBEB;text-align:left}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-table tr:hover{background-color:#F5F6FA;cursor:pointer}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-table tr:first-child{cursor:default}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-table .bk-button{width:27px}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-table .big-td{width:50%;max-width:50%}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-table .middle-td{width:35%;max-width:35%}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-table .small-td{width:15%;max-width:15%}.bk-scope #bk-security-dialog .bk-dialog-body .bk-paging-index-min{min-height:32px;text-align:left}.bk-scope #bk-security-dialog .bk-dialog-body .search-btn{padding:0 10px;height:28px;display:inline-block;z-index:2;background:#00a2ca;line-height:28px;color:#fff}.bk-scope #bk-security-dialog .bk-dialog-body .search-btn:hover{cursor:pointer}.bk-scope #bk-security-dialog .bk-dialog-body .icon-search{padding-right:4px;position:relative;top:2px}.bk-scope #bk-security-dialog .bk-dialog-body .bk-security-select select{background:#fff;border:solid 1px #e8e8e8;height:26px;display:inline-block;padding-left:5px;width:100px;line-height:26px}.bk-scope .bk-security-tip{color:#999}.bk-scope .bk-security-tip-error{color:#f60 !important;line-height:25px}.bk-scope .bk-mt-20{margin-top:20px !important}.bk-scope .bk-click-link:hover{text-decoration:underline}.bk-scope .bk-click-link{color:#00a2ca}.bk-scope html body .bk-snpshot-form .search-box .bk-ecs-snap-input{background:#fff;border:solid 1px #e8e8e8}.bk-scope html body .bk-snpshot-form .bk-snapshot-select select.bk-ecs-snap-input{background:#fff;border:solid 1px #e8e8e8}.bk-scope .ecs-bk-disk .bk-disk{min-width:650px !important}.bk-scope .bk-scope .ecs-bk-disk .bk-disk,.bk-scope .bk-sysdisk{padding:5px 10px 5px 0px}.bk-scope .bk-scope .ecs-bk-disk .bk-disk span.bk-select,.bk-scope .bk-sysdisk span.bk-select{min-width:100px !important;max-width:100px !important;width:100px !important}.bk-scope .bk-scope .ecs-bk-disk .bk-disk span.bk-select.bk-select-l1,.bk-scope .bk-sysdisk span.bk-select.bk-select-l1{width:100px !important;min-width:100px !important;max-width:100px !important}.bk-scope html div.bk-theme-mini .bk-disk-input{padding:6px 18px 6px 4px}.bk-scope html .bk-scope .bk-disk-storage span.bk-disk-unit{left:72px}.bk-scope html div.bk-theme-mini .bk-disk .bk-disk-input{padding:6px 18px 6px 4px}.bk-scope .bk-iops{margin-left:4px}.bk-scope html div.bk-theme-mini .bk-order-renew-body .bk-disk-storage .bk-disk-input{padding:6px 18px 6px 4px !important}.bk-scope .small-orange-font{font-size:18px;color:#f60}.bk-scope .txt-right{text-align:right}\n', "/*# sourceMappingURL=module.css.map */"].join(""), t = document.createElement("style");
        document.getElementsByTagName("head")[0].appendChild(t);
        if (t.styleSheet)t.styleSheet.disabled || (t.styleSheet.cssText = e); else try {
            t.innerHTML = e
        } catch (n) {
            t.innerText = e
        }
    })
}), define("aliyun-buy-ecs/module/common/ui.ecs.orderResultView", ["angular", "./instanceHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.date", "./service.ecs.orderResult", "../../ui.ecs.tpl", "../../ui.ecs.module.styles"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.orderResultView", n.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsOrderResultView", ["aliyunBuyOrderResult", "aliyunBuyRemote", function (r, i) {
        function s(s) {
            var o = s.commodityCode, u = s.failOrdersInfo = [];
            !s.orderResult && s.orderResult == {}, s.orderResult = n.parseJsonSafe(window.sessionStorage.getItem("aliyun.buy.ecs.orderRemoteResult"));
            var a = s.orderResult;
            if (a.failCount == 0) {
                s.orderResult.successInfo = r.getOrderResultBycommodityCode(s.commodityCode);
                return
            }
            a.code !== "200" ? s.orderResult.failInfo = r.getOrderErrorResultBycommodityCode(s.commodityCode, a.message) : a.failCount > 0 && (s.orderResult.failInfo = r.getOrderErrorResultBycommodityCode(s.commodityCode)), s.ready = !1, i.getEcsCommodity(o, "BUY").then(function (n) {
                s.ready = !0, s.raw = n;
                var r = n && n.components, i = n && n.config, f = i.product_name && i.product_name.value;
                if (!e.isObject(r))return;
                e.forEach(a.data, function (e, n) {
                    var i = e;
                    if (!i)return;
                    var s = i.data && i.data.failedEcs;
                    if (!s)return;
                    var a = t.getViewComponents(o, r, s);
                    if (!a)return;
                    u.push({commodityName: f, errorMessage: i.message, items: a, quantity: s.maxAmount})
                })
            }, function () {
                s.ready = !0
            })
        }

        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsOrderResultView.html",
            replace: !0,
            scope: {commodityCode: "@", config: "="},
            compile: function (e, t) {
                return n.require(["price"], t), {post: s}
            }
        }
    }]), r
}), define("aliyun-buy-ecs/module/common/ui.ecs.imageMarketPrice", ["angular", "../common/imageMarketHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote", "../../ui.ecs.tpl"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.imageMarketPrice", n.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsImageMarketPrice", ["aliyunBuyRemote", "aliyunBuyMsg", "$filter", function (e, t, r) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsImageMarketPrice.html",
            scope: {price: "=", options: "=", config: "&"},
            replace: !0,
            compile: function (e, t) {
                return n.require(["options", "value", "config", "detail"], t), {
                    post: function (e, t, n) {
                    }
                }
            }
        }
    }]), r
}), define("aliyun-buy-ecs/module/common/ui.ecs.datadisk", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/utils/constraintHelper", "./instanceHelper", "aliyun-buy/base/services/service.configurable", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/ui/controls/ui.placeholder", "aliyun-buy/base/ui/widgets/ui.snapshot", "aliyun-buy/base/services/service.date", "../../ui.ecs.tpl"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.ui.ecs.datadisk", t.getModuleNames(arguments));
    return i.directive("aliyunBuyEcsDatadisk", ["aliyunBuyConfigurable", "aliyunBuyRemote", "aliyunBuyDateParser", "$filter", "$timeout", function (r, i, s, o, u) {
        function f(i, s, o) {
            function l(e) {
                return t.config({
                    options: {editable: !0},
                    size: null,
                    paymentMethod: null,
                    type: null,
                    snapshot: null,
                    mount: null,
                    releaseWithEcs: !0,
                    showSizeError: !1,
                    convertToPostpay: !1,
                    instanceId: null,
                    inConvertableBlackList: !1
                }, e)
            }

            function c() {
                var t = !1;
                return e.forEach(i.disks, function (e, n) {
                    e.size === null && (e.showSizeError = !0, t = !0)
                }), t
            }

            function h() {
                i.options.state = ""
            }

            function p() {
                w() && (i.disks = [])
            }

            function d() {
                var e = i.disks;
                i.addible = f.diskMaxNumber > e.length, i.removable = f.diskMinNumber < e.length
            }

            function v(t, n) {
                var r = {}, s = {}, o = i.tips = {};
                e.forEach(t, function (e, i) {
                    t.length == n.length && e.type != n[i].type && (e.size = null), r[e.type] || (r[e.type] = 0), r[e.type] += e.size, e.mount && (s[e.mount] = !0)
                }), e.forEach(i.mounts, function (e) {
                    s[e.value] ? e.checked = !0 : e.checked = !1
                }), e.forEach(t, function (e, t) {
                    var n = e.options;
                    n.types = f.diskTypes, n.originalPaymentMethod = f.defaultPaymentMethod;
                    var i = e.type;
                    if (!i)return;
                    var s = f.totalMaxSizes[i] - r[i], u = f.singleDiskMaxSizes[i], a = f.singleDiskMinSizes[i], l = e.size + s;
                    e.snapshot && e.snapshotSize && a < e.snapshotSize && (a = e.snapshotSize), u > l && (u = l), n.editable ? (n.maxSize = u, n.minSize = a) : (n.maxSize = Number.MAX_VALUE, n.minSize = 0);
                    var c = e.paymentMethod + "." + e.type, h = n.portable = f.portableMap[c], p = n.originalPaymentMethod + "." + e.type, d = f.convertableMap[p];
                    n.convertable = f.showConvertOption && d, o[c] = {
                        paymentMethod: e.paymentMethod,
                        type: i,
                        showRestSize: f.totalMaxSizes[i] < f.diskMaxNumber * f.singleDiskMaxSizes[i],
                        restSize: s,
                        portable: h
                    }
                })
            }

            function m(t, n) {
                var r = [];
                e.forEach(t, function (e, t) {
                    r[t] = [e.type, e.size != null ? e.size.toString() : null, e.snapshot, e.mount, e.instanceId, e.releaseWithEcs, e.convertToPostpay, e.inConvertableBlackList]
                }), i.value = e.toJson(r, !0)
            }

            function g(t, n) {
                var r = [];
                e.forEach(t, function (e, t) {
                    r[t] = e.detail
                }), i.detail = r
            }

            function y(t) {
                var n = b(t), r = e.copy(i.disks);
                e.equals(n, r) || u(function () {
                    i.disks = n
                })
            }

            function b(n) {
                n = t.parseJsonSafe(n);
                var r = e.copy(i.disks), s = [];
                return e.forEach(n, function (n, i) {
                    var o = r[i] || {}, u = t.config(e.copy(o), {
                        type: n[0],
                        size: parseInt(n[1]) || null,
                        snapshot: n[2],
                        mount: n[3],
                        instanceId: n[4],
                        releaseWithEcs: n[5],
                        convertToPostpay: n[6],
                        inConvertableBlackList: n[7],
                        options: {editable: !n[4]}
                    });
                    s[i] = l(u)
                }), v(s, r), s
            }

            function w() {
                var e = i.value, t = i.disks, r = b(e);
                return n.intersect(t, r, ["type", "size", "snapshot", "mount", "releaseWithEcs", "convertToPostpay"]).length != t.length ? !1 : !0
            }

            r.apply(i), t.setDefault(i, {detail: [], options: {}, value: ""});
            var a = i.config(), f = i.options;
            t.setDefault(i.options, {
                name: "ECS_DATADISK",
                hideRelease: a ? a.hideRelease : undefined
            }), i.disks = [], i.tips = {}, d(), i.addDisk = function () {
                if (!i.addible)return;
                var t = e.copy(i.disks);
                i.disks.push(l()), v(i.disks, t)
            }, i.removeDisk = function (e) {
                if (!i.removable)return;
                i.disks.splice(e, 1)
            }, i.$watch("options.regionId", p, !0), i.$watch("options.diskTypes", p, !0), i.$watch("options.singleDiskMaxSizes", p, !0), i.$watch("options.singleDiskMinSizes", p, !0), i.$watch("options.totalMaxSizes", p, !0), i.$watch("options.diskMaxNumber", p, !0), i.$watch("options.diskMinNumber", p, !0), i.$watch("options.mounts", p, !0), i.$watch("disks", function (e, t) {
                h(), d(), v(e, t), m(e, t), g(e, t)
            }, !0), i.$watch("value", y), i.$watch("options.diskMaxNumber", d), i.$watch("options.diskMinNumber", d), i.$watch("options.state", function (e) {
                e == "error" && c()
            }), i.$watch("options.mounts", function (t) {
                i.mounts = e.copy(t)
            }, !0)
        }

        var a = {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsDatadisk.html",
            scope: {options: "=", value: "=", config: "&", detail: "="},
            replace: !0,
            compile: function (e, n) {
                return t.require(["options", "value", "detail"], n), {post: f}
            }
        };
        return a
    }]), i.directive("aliyunBuyEcsDatadiskItem", [function () {
        function n(e, n, i) {
            t.setDefault(e, {detail: {}}), e.remove = function () {
                var t = i.onremove, n = e.$parent;
                n.$eval(t)
            }, e.$watchCollection("types()", function (t) {
                t && !e.type && (e.type = t[0].value)
            }), e.$watch("portable()", function (t) {
                t === !1 && (e.releaseWithEcs = null)
            }), e.$watchCollection("[originalPaymentMethod(),convertToPostpay]", function (t) {
                var n = t[0], r = t[1];
                e.paymentMethod = n || null, r && (e.paymentMethod = "postpay")
            }), e.$watch("size", function (t) {
                var n = "";
                if (t != null) {
                    e.showSizeError = !1;
                    var i = parseInt(t);
                    n = r.calculateIOPS(e.type, i)
                }
                e.detail.size = {text: t + "GB", value: t}, e.iops = n
            }), e.$watchCollection("[maxSize(),minSize()]", function (t) {
                var n = t[1], r = t[0];
                n <= r ? e.sizeRange = n + " - " + r : e.sizeRange = " - "
            })
        }

        var e = {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsDatadiskItem.html",
            scope: {
                size: "=",
                showSizeError: "=",
                mount: "=",
                type: "=",
                snapshot: "=",
                snapshotSize: "=",
                releaseWithEcs: "=",
                detail: "=",
                paymentMethod: "=",
                convertToPostpay: "=",
                originalPaymentMethod: "&",
                loggedIn: "&",
                regionId: "&",
                regionName: "&",
                portable: "&",
                hideRelease: "&",
                editable: "&",
                types: "&",
                mounts: "&",
                maxSize: "&",
                minSize: "&",
                index: "&",
                convertable: "&",
                showExtraInfo: "&"
            },
            replace: !0,
            compile: function (e, r) {
                return t.require(["size", "showSizeError", "mount", "type", "snapshot", "snapshotSize", "releaseWithEcs", "detail", "paymentMethod"], r), {post: n}
            }
        };
        return e
    }]), i.directive("aliyunBuyEcsDatadiskSizeInput", [function () {
        function n(e, t, n) {
            function i(t) {
                var n = e.max(), i = e.min(), s = parseInt(r.val()) || (t ? 0 : null);
                s == null && !t || n < i ? (r.val(""), e.value = null) : (typeof n == "number" && s > n && (s = n), typeof i == "number" && s < i && (s = i), r.val(s), e.value = s)
            }

            var r = jQuery(t);
            r.on("blur", function () {
                i(!0)
            }), e.$watchCollection("[max(),min(),value]", function () {
                r.val(e.value), i()
            })
        }

        var e = {
            restrict: "A", scope: {min: "&", max: "&", value: "="}, compile: function (e, r) {
                return t.require(["value"], r), {post: n}
            }
        };
        return e
    }]), i.directive("aliyunBuyEcsDatadiskItemMount", [function () {
        function n(e, t, n) {
            e.select = function (t) {
                if (t.checked)return;
                e.mount = t.value, e.tipHandle && e.tipHandle.close()
            }
        }

        var e = {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsDatadiskItemMount.html",
            scope: {mounts: "&", editable: "&", mount: "="},
            replace: !0,
            compile: function (e, r) {
                return t.require(["mount"], r), {post: n}
            }
        };
        return e
    }]), i.directive("aliyunBuyEcsDatadiskItemSnapshot", ["aliyunBuyConfigurable", "aliyunBuyRemote", "aliyunBuyDateParser", function (n, r, i) {
        function o(n, s, o) {
            function u() {
                n.searchModel.key = "", l()
            }

            function a(e, t, n) {
                return e = parseInt(e), t = parseInt(t), n = parseInt(n), e > n || e < t ? !1 : !0
            }

            function f(e) {
                var t = e.id, r = e.name, i = parseInt(e.disk);
                if (!a(i, n.minSize(), n.maxSize()))return;
                n.id = t, n.name = r, n.size = i;
                var s = n.listHandle;
                s && s.close()
            }

            function l(e) {
                e || h();
                var t = n.pagination, r = n.searchModel, i = t.pageSize, s = n.searchModel.resultCollection.length, o;
                if (!e)o = 0; else if (e == "next") {
                    if (!t.nextEnabled)return;
                    o = r.currentOffset + i
                } else if (e == "previous") {
                    if (!t.previousEnabled)return;
                    o = r.currentOffset - i
                }
                o < 0 && (o = 0), s >= i + o || r.total && s == r.total ? (r.currentOffset = o, n.states.searchError = !1, n.states.searching = !1) : c(o)
            }

            function c(t) {
                var s = n.searchModel.field, o = n.searchModel.key;
                o instanceof Date && (o = i.formatDate("yyyy-MM-dd", o));
                var u = n.regionId(), a = n.pagination.pageSize, t = t || n.searchModel.resultCollection.length;
                n.states.searching = !0, n.states.searchError = !1, r.queryEcsSnapshot(u, a, t, s, o).then(function (r) {
                    var i = n.searchModel, u = r && r.snapshotList;
                    u.length > 0 && (e.forEach(u, function (e, n) {
                        if (n > a - 1)return;
                        i.resultCollection[n + t] = e
                    }), i.currentOffset = t, i.currentKey = o, i.currentField = s, i.currentRegion = n.regionId()), r.length < a ? (i.hasMore = !1, i.total = i.resultCollection.length) : (i.hasMore = !0, i.total = null), n.states.searchError = !1, n.states.searching = !1
                }, function (e) {
                    n.states.searchError = !0, n.states.searchErrorMsg = e ? e.message : "搜索失败，请重试", n.states.searching = !1
                })
            }

            function h() {
                var e = n.searchModel, t = !0;
                if (e.key != e.currentKey || e.field != e.currentField || e.currentRegion != n.regionId())e.resultCollection = [], e.currentPageResult = [], e.currentOffset = -1, e.hasMore = !1, e.total = null
            }

            function p(e) {
                var t = [], r = n.pagination.pageSize, i = n.searchModel.resultCollection, s = i.length;
                if (e < 0)return t;
                s > e + r && (s = e + r);
                for (var o = e; o < s; o++)t.push(i[o]);
                return t
            }

            t.setDefault(n, {
                searchModel: {
                    key: "",
                    field: "name",
                    resultCollection: [],
                    currentPageResult: [],
                    currentKey: "",
                    currentField: "",
                    currentRegion: "",
                    currentOffset: -1,
                    hasMore: !1,
                    total: null
                },
                pagination: {pageSize: 5, previousEnabled: !1, nextEnabled: !1},
                states: {visible: !0, searching: !1, searchError: !1, searchErrorMsg: ""},
                searchFields: [{text: "快照名称", value: "name"}, {text: "快照ID", value: "id"}, {
                    text: "创建时间",
                    value: "date"
                }]
            }), n.querySnapshots = l, n.clearKey = u, n.selectSnapshot = f, n.checkDiskSelectable = a, n.$watch("regionId()", function (e) {
                l()
            }), n.$watch("searchModel.currentOffset", function (e) {
                n.searchModel.currentPageResult = p(e)
            }), n.$watch("searchModel", function (e) {
                var t = n.pagination;
                t.previousEnabled = e.currentOffset >= t.pageSize, t.nextEnabled = !(e.total !== null && e.currentOffset + t.pageSize >= e.total) && e.currentOffset != -1
            }, !0), n.$watch("searchModel.field", function () {
                n.searchModel.key = ""
            }), n.$watchCollection("[id,name]", function (e, t) {
                var i = e[0], s = e[1];
                if (i != t[0] && s == t[1] || i && !s) {
                    var o = "id", u = i, a = 0, f = 1, l = n.regionId();
                    r.queryEcsSnapshot(l, f, a, o, u).then(function (e) {
                        var t = e.snapshotList;
                        t && t[0] ? n.name = t[0].name : n.snapshot = null
                    }, function (e) {
                        n.snapshot = null
                    })
                }
            }), n.remove = function () {
                n.id = "", n.name = "", n.size = ""
            }
        }

        var s = {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsDatadiskItemSnapshot.html",
            replace: !0,
            scope: {
                loggedIn: "&",
                regionId: "&",
                regionName: "&",
                maxSize: "&",
                minSize: "&",
                editable: "&",
                id: "=",
                name: "=",
                size: "=",
                showSnapClose: "=?"
            },
            compile: function (e, n) {
                return t.require(["id", "name", "size"], n), {post: o}
            }
        };
        return s
    }]), i
}), define("aliyun-buy-ecs/module/common/ui.ecs.bandwidth", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.slider", "aliyun-buy/base/services/service.configurable", "../../ui.ecs.tpl"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.bandwidth", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsBandwidth", ["aliyunBuyConfigurable", function (e) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsBandwidth.html",
            scope: {options: "=", value: "=", config: "&"},
            replace: !0,
            link: function (n) {
                e.apply(n), t.setDefault(n, {options: {}, value: 1}), t.setDefault(n.options, {
                    isShowLabel: !0,
                    name: "ECS_PUBLIC_BANDWIDTH",
                    stepOption: "auto",
                    min: 0,
                    max: 300,
                    unit: "Mbps",
                    formatter: function (e) {
                        return e + "M"
                    }
                })
            }
        }
    }]), n
}), define("aliyun-buy-ecs/module/common/securityGroupHelper", [], function () {
    function e() {
        return {
            regionId: "",
            vpcId: "",
            networkType: "",
            isQueryEcsCount: "",
            fuzzyQuery: "",
            securityGroupId: "",
            securityGroupName: "",
            pageNumber: "",
            pageSize: ""
        }
    }

    return {getObjParam: e}
}), define("aliyun-buy-ecs/module/common/ui.ecs.security", ["angular", "jQuery", "./instanceHelper", "./securityGroupHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.dialog", "aliyun-buy/base/ui/controls/ui.pagination", "aliyun-buy/base/services/service.remote", "angular-base64", "../../ui.ecs.tpl"], function (e, t, n, r, i) {
    var s = e.module("aliyun.buy.ui.ecs.security", i.getModuleNames(arguments));
    return s.directive("aliyunBuyEcsSecurity", ["$filter", "$q", "$timeout", "aliyunBuyDialog", "aliyunBuyRemote", function (t, n, s, o, u) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsSecurity.html",
            scope: {options: "=", value: "=", detail: "=", config: "&", raw: "&", cartValue: "="},
            replace: !0,
            compile: function (t, n) {
                return i.require(["options", "value", "detail", "raw", "cartValue"], n), {
                    post: function (t, n, s) {
                        function p(t, n) {
                            var r = 0;
                            return n && n.length > 0 && e.forEach(n, function (e) {
                                var n = e.components.vm_security[0];
                                n.value === t && (r += parseInt(e.data.quantity))
                            }), r
                        }

                        function d(n, r, i) {
                            f.type = n, f.text = r || null, f.value = i || null, t.value = e.toJson([f.type, f.text, f.value])
                        }

                        i.setDefault(t, {options: {}, detail: {}}), i.setDefault(t.options, {
                            name: "安全组",
                            types: [],
                            displayAutoCreateTip: !1,
                            valueObject: {},
                            securityListObject: {},
                            newSecurityName: {},
                            securityNameValidate: !0,
                            securityQuotaValidate: !0,
                            securityInstanceQuotaValidate: !0,
                            region: {},
                            quota: {}
                        });
                        var a = t.options, f = a.valueObject, l = a.securityListObject, c = a.newSecurityName, h = {
                            AUTOCREATE: "1",
                            SELECTONE: "2",
                            CREATENEW: "3"
                        };
                        u.queryLimitation("SecurityGroupMembers").then(function (e) {
                            if (!e)return;
                            a.quota = {securityGroupMembersLimit: e.Value}
                        }), t.$watch("options.valueObject.type", function (e) {
                            var n = t.cartValue;
                            switch (e) {
                                case h.AUTOCREATE:
                                    t.options.securityQuotaValidate = !0, d(h.AUTOCREATE);
                                    break;
                                case h.SELECTONE:
                                    t.options.securityQuotaValidate = !0, d(h.SELECTONE, null, l.value);
                                    break;
                                case h.CREATENEW:
                                    d(h.CREATENEW, c.text, null);
                                    break;
                                default:
                            }
                        }), t.$watch("options.securityListObject.value", function (e) {
                            if (f.type != h.SELECTONE)return;
                            d(h.SELECTONE, null, e)
                        }), t.blur = function () {
                            t.options.securityNameValidate = !0, c.text !== "" && !/^[a-zA-Z\u4e00-\u9fa5][^\s"@\/:=<>{\[\]}]{1,127}$/.test(c.text) && (t.options.securityNameValidate = !1), d(h.CREATENEW, c.text, null)
                        }, t.focus = function () {
                            t.options.securityNameValidate = !0
                        }, t.openSecurityGroups = function () {
                            t.options.state = "";
                            var e = o.open({
                                windowClass: "security-dialog",
                                backdropClass: "security-backdrop",
                                controller: ["$scope", "$http", function (n, s) {
                                    function f(e, t) {
                                        n.isLoading = !0;
                                        var i = a.vpcId ? "vpc" : "classic", s = null, o = null;
                                        e && t && (s = e == "id" ? t : null, o = e == "name" ? t : null);
                                        var f = r.getObjParam();
                                        f.regionId = a.region, f.vpcId = a.vpcId, f.networkType = i, f.fuzzyQuery = !0, f.isQueryEcsCount = !0, f.securityGroupId = s, f.securityGroupName = o, f.pageNumber = n.security.currentPage, f.pageSize = n.itemsPerPage, u.queryEcsSecurityGroupList(f).then(function (e) {
                                            n.isLoading = !1, n.isReady = !0;
                                            if (!e || !e.SecurityGroups) {
                                                n.security.securityList = [];
                                                return
                                            }
                                            n.security.securityList = e.SecurityGroups.SecurityGroup, n.totalItems = e.TotalCount
                                        })
                                    }

                                    var o;
                                    i.setDefault(n, {
                                        security: {},
                                        searchModel: {},
                                        searchFields: [{text: "安全组名称", value: "name"}, {text: "安全组ID", value: "id"}]
                                    }), i.setDefault(n.searchModel, {
                                        key: "",
                                        type: "name"
                                    }), n.loggedIn = !t.options.needLogin, n.isReady = !1, n.isLoading = !1, n.security.currentPage = 1, n.itemsPerPage = 9, n.regionName = t.options.regionName, f(), n.$watch("security.currentPage", function (e, t) {
                                        if (e == t)return;
                                        var r = n.searchModel.key, i = n.searchModel.type;
                                        f(i, r)
                                    }), n.clearKey = function () {
                                        n.searchModel.key = ""
                                    }, n.search = function () {
                                        var e = n.searchModel.key, t = n.searchModel.type;
                                        f(t, e)
                                    }, n.enterSearch = function (e) {
                                        e.which == 13 && n.search()
                                    }, n.useSecurity = function (n) {
                                        o = n, t.options.currentSecurityGroupId = n.SecurityGroupId, t.detail.access = !0, e.close(), d(h.SELECTONE, n.SecurityGroupName, n.SecurityGroupId), t.detail.text = n.SecurityGroupName + " / " + n.SecurityGroupId, a.createSecurityRuleLink = "https://ecs.console.aliyun.com/#/securityGroupDetail/region/" + a.regionMap + "/groupId/" + n.SecurityGroupId + "/rule/" + a.direction, u.queryLimitation("SecurityGroupMembers").then(function (e) {
                                            if (!e)return;
                                            t.detail.EcsCount = n.EcsCount, t.detail.EcsCountRemain = e.Value - n.EcsCount
                                        })
                                    }
                                }],
                                templateUrl: "partials/aliyunBuyEcsSecurityDialog.html"
                            })
                        }
                    }
                }
            }
        }
    }]), s
}), define("aliyun-buy-ecs/module/common/ui.ecs.zone", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.floats", "aliyun-buy/base/ui/controls/ui.select", "../../ui.ecs.tpl"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.zone", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsZone", ["aliyunBuyConfigurable", function (e) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsZone.html",
            scope: {options: "=", value: "=", detail: "=", config: "&"},
            replace: !0,
            compile: function (n, r) {
                return t.require(["options", "value", "detail"], r), {
                    post: function (n, r, i) {
                        e.apply(n), t.setDefault(n, {
                            detail: {},
                            options: {},
                            value: "",
                            showLink: !0
                        }), t.setDefault(n.options, {name: "ECS_ZONE", showLink: !0})
                    }
                }
            }
        }
    }]), n
}), define("aliyun-buy-ecs/module/common/ui.ecs.image", ["angular", "./constants/ecsBuyCons", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.selectDynamic", "../../ui.ecs.tpl"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.Image", n.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsImage", ["aliyunBuyRemote", function (r) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsImage.html",
            scope: {options: "=", value: "=", detail: "=", config: "&", imageType: "@", valueAll: "="},
            replace: !0,
            compile: function (i, s) {
                return n.require(["options", "value", "detail"], s), {
                    post: function (i, s, o) {
                        n.setDefault(i, {
                            detail: {},
                            options: {},
                            value: ""
                        }), i.$watchCollection("[valueAll.region, valueAll.io, valueAll.instanceType]", function () {
                            i.options.items = undefined
                        }), i.fetchConfig = {
                            pageSize: 10, fetchData: function (e, n) {
                                var s = t.ImageType[i.imageType], o = i.valueAll;
                                return r.describeImages(o.region, e, n, s, o.instanceType, o.io, o.supportedOSType)
                            }, resultsHandler: function (n) {
                                var r = n.Images.Image, i = {totalCount: n.TotalCount, items: []};
                                return e.forEach(r, function (n, r) {
                                    var s = t.OSBitMap[n.Architecture], o = e.toJson([n.ImageId, n.OSType, s, n.Platform, n.Size, null, null, null, null, n.ProductCode, null, null]);
                                    i.items.push({value: o, text: n.ImageName ? n.ImageName : n.ImageId})
                                }), i
                            }
                        }
                    }
                }
            }
        }
    }]), r
}), define("aliyun-buy-ecs/module/common/ui.ecs.imageOffline", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/ui.tpl", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.configurable", "aliyun-buy/base/ui/controls/ui.msg"], function (e, t) {
    var n = e.module("aliyun.buy.ecs.ui.imageOffline", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsImageOffline", ["aliyunBuyConfigurable", "aliyunBuyRemote", "aliyunBuyMsg", "$filter", function (e, n, r, i) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsImageOffline.html",
            scope: {options: "=", value: "=", config: "&"},
            replace: !0,
            compile: function (s, o) {
                return t.require(["options", "value"], o), {
                    post: function (s) {
                        e.apply(s), t.setDefault(s, {value: "hidden", options: {}});
                        var o = s.options, u = "Windows Server 2003";
                        o.visible = !1, s.$watch("options.os", function (e) {
                            o.visible = !1, s.value = "hidden";
                            if (!e)return;
                            var r = t.parseJsonSafe(e);
                            r[3] == u && n.getNeedKeepUsingOfflineImage().then(function (e) {
                                e && $.inArray(u, e) != -1 ? (o.visible = !0, s.value = "show") : (o.visible = !1, s.value = "hidden")
                            })
                        }), s.agree = function () {
                            n.keepUsingOfflineImage(u).then(function () {
                                s.value = "agree", o.state = ""
                            }, function () {
                                r.alert(i("aliyunBuyText")("ECS_PROMPT"), i("aliyunBuyText")("ECS_ERRORTIP_SYSTEM_ERROR"))
                            })
                        }
                    }
                }
            }
        }
    }]), n
}), define("aliyun-buy-ecs/module/common/ui.ecs.sysdisk", ["angular", "aliyun-buy/base/utils/moduleHelper", "./instanceHelper", "./constants/ecsBuyCons", "aliyun-buy/base/ui/controls/ui.buttontab", "aliyun-buy/base/ui/controls/ui.floats", "../../ui.ecs.tpl"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.ui.ecs.sysdisk", t.getModuleNames(arguments));
    return i.directive("aliyunBuyEcsSysdisk", ["aliyunBuyConfigurable", function (i) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsSysdisk.html",
            scope: {options: "=", value: "=", detail: "=", config: "&"},
            replace: !0,
            compile: function (s, o) {
                return t.require(["options", "value", "detail"], o), {
                    post: function (s, o, u) {
                        i.apply(s), t.setDefault(s, {detail: {}, options: {}, valueObj: {}});
                        var a = s.options, f = r.SystemDisk;
                        t.setDefault(s.options, {
                            name: "ECS_SYSDISK",
                            originDisk: f.chargeSize,
                            configMin: f.chargeSize,
                            osDisk: f.chargeSize,
                            needBuy: !1
                        }), t.setDefault(s.valueObj, {
                            diskSize: f.chargeSize,
                            diskCategory: ""
                        }), s.$watchCollection("[options.max,options.min]", function (e) {
                            var t = e[1], n = e[0];
                            t <= n ? a.sizeRange = t + " - " + n : a.sizeRange = " - "
                        }, !0), s.$watch("value", function (t) {
                            var n = e.fromJson(t);
                            if (!n)return;
                            n[0] && (s.valueObj.diskCategory = n[0]), n[1] && (s.valueObj.diskSize = n[1])
                        }, !0), s.$watch("options.os", function (t) {
                            if (!t)return;
                            var n = e.fromJson(t), r = parseInt(n[4] || f.chargeSize);
                            s.options.osDisk = r;
                            var i = s.options.originDisk, o = s.options.configMin;
                            s.valueObj.diskSize < parseInt(r) && (s.valueObj.diskSize = r), s.options.min = Math.max(f.chargeSize, r, i, o)
                        }), s.$watch("valueObj", function (t) {
                            var r = [t.diskCategory, t.diskSize];
                            s.value = e.toJson(r, !0);
                            var i = parseInt(t.diskSize);
                            s.iops = n.calculateIOPS(t.diskCategory, i)
                        }, !0)
                    }
                }
            }
        }
    }]), i
}), define("aliyun-buy-ecs/module/common/ui.ecs.os", ["angular", "./constants/ecsBuyCons", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.select", "aliyun-buy/base/ui/controls/ui.anchor", "aliyun-buy/base/services/service.configurable", "../../ui.ecs.tpl"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.os", n.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsOs", ["$filter", "aliyunBuyConfigurable", "aliyunBuyRemote", function (r, i, s) {
        function u(o, u, a) {
            function c() {
                var t = o.value;
                if (!t) {
                    o.version = "";
                    return
                }
                var r = e.fromJson(t), i = r ? r[0] : undefined;
                e.forEach(o.platforms, function (r) {
                    e.forEach(r.versions, function (e) {
                        var s = n.parseJsonSafe(e.value), u = s ? s[0] : undefined;
                        u == i && (o.platform = r.value, o.$evalAsync(function () {
                            o.version = t
                        }))
                    })
                })
            }

            i.apply(o), n.setDefault(o, {
                detail: {},
                options: {},
                value: ""
            }), n.setDefault(o.options, {name: "ECS_PUBLIC_IMAGE"});
            var f;
            o.platforms = [], o.versions = [];
            var l = function () {
                var e = o.platform;
                if (!e || !f[e]) {
                    o.versions = [];
                    return
                }
                o.versions = f[e].versions
            };
            o.$watch("platform", l), o.$watch("version", function (e) {
                o.value = e
            }), o.$watch("versionDetail", function (t) {
                o.detail = {
                    text: t ? t.fullText : undefined,
                    icon: o.platform && f[o.platform] ? f[o.platform].icon : undefined,
                    value: o.value ? e.copy(o.value) : undefined
                }
            }), o.$watchCollection("[valueAll.region, valueAll.io, valueAll.instanceType]", function () {
                var e = o.valueAll;
                if (!e || !e.region)return;
                var n = {
                    regionId: e.region,
                    pageNumber: 1,
                    pageSize: 100,
                    imageOwnerAlias: t.ImageType.public,
                    instanceType: e.instanceType,
                    ioOptimized: e.io,
                    supportedOSType: e.supportedOSType
                };
                s.describeImages(n.regionId, n.pageNumber, n.pageSize, n.imageOwnerAlias, n.instanceType, n.ioOptimized, n.supportedOSType).then(function (e) {
                    o.options.items = e.Images.Image
                })
            }), o.$watch("value", c), o.$watch("options.items", function (n) {
                f = {}, o.platforms.splice(0, o.platforms.length), e.forEach(n, function (e) {
                    var n = e.OSName, i = e.ImageId, s = n.split("  "), u = s[0], a = t.OSBitMap[e.Architecture], l = s.slice(1, s.length).join("  ");
                    if (!u || !l)return;
                    var c = f[u];
                    c || (c = {
                        icon: "bk-os-" + u.toLowerCase().replace(/ /g, "-"),
                        text: u,
                        value: u,
                        versions: []
                    }, o.platforms.push(c), f[u] = c), c.versions.push({
                        text: l,
                        value: r("json")([i, e.OSType, a, e.Platform, e.Size, e.ImageOwnerAlias]),
                        fullText: n
                    })
                }), l(), c()
            }, !0)
        }

        var o = {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsOs.html",
            scope: {options: "=", value: "=", detail: "=", config: "&", valueAll: "="},
            replace: !0,
            compile: function (e, t) {
                return n.require(["options", "value", "detail"], t), {post: u}
            }
        };
        return o
    }]), r
}), define("aliyun-buy-ecs/module/common/ui.ecs.io", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.configurable", "aliyun-buy/base/ui/controls/ui.checkbox", "aliyun-buy/base/ui/controls/ui.floats", "../../ui.ecs.tpl"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.io", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsIo", ["aliyunBuyConfigurable", function (n) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsIo.html",
            scope: {options: "=", value: "=", detail: "=", config: "&"},
            replace: !0,
            compile: function (r, i) {
                return t.require(["options", "value", "detail"], i), {
                    post: function (r, i, s) {
                        n.apply(r), t.setDefault(r, {
                            detail: {},
                            options: {},
                            display: ""
                        }), t.setDefault(r.options, {name: "I/O 优化"}), r.$watch("options.items", function (t) {
                            if (!t)return;
                            var n = r.options;
                            e.forEach(t, function (e) {
                                e.value === "optimized" && (r.display = e.text)
                            }), n.items && n.items.length == 2 ? (n.visible = !0, n.readOnly = !1) : n.items.length == 1 && n.items[0].value == "optimized" ? (n.visible = !0, n.readOnly = !0, r.value = n.items[0].value) : n.items.length == 1 && n.items[0].value == "none" ? (n.visible = !1, n.readOnly = !1, r.value = n.items[0].value) : n.visible = !1
                        }, !0), r.$watch("_value", function (e) {
                            e ? r.value = "optimized" : r.value = "none"
                        }, !0), r.$watch("value", function (e) {
                            e === "optimized" ? r._value = !0 : r._value = undefined
                        }, !0)
                    }
                }
            }
        }
    }]), n
}), define("aliyun-buy-ecs/module/common/ui.ecs.instanceType", ["angular", "jQuery", "./constants/ecsBuyCons", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.dialog", "aliyun-buy/base/ui/controls/ui.pagination", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.configurable", "angular-base64", "../../ui.ecs.tpl"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.ui.ecs.instanceType", ["ab-base64"].concat(r.getModuleNames(arguments)));
    return i.directive("aliyunBuyEcsInstanceType", ["aliyunBuyConfigurable", "aliyunBuyDialog", "aliyunBuyRemote", "aliyunBuyParser", "$templateCache", "$compile", function (t, i, s, o, u, a) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsInstanceType.html",
            scope: {options: "=", value: "=", detail: "=", raw: "=", valueAll: "=", config: "&"},
            replace: !0,
            compile: function (s, f) {
                return r.require(["options", "value", "detail"], f), {
                    post: function (s, f, l) {
                        function v(e, t) {
                            var n = h.getConfig(e, {instanceType: t});
                            return n.value
                        }

                        function m(t) {
                            if (e.isString(t)) {
                                var n = t.split(".")[0] + "." + t.split(".")[1];
                                return {value: n, text: h.getTextFromComponents("instanceTypeFamily", n)}
                            }
                        }

                        function g(e) {
                            var t = n.InstanceTypefamliyIntroMap[e];
                            return t ? t : ""
                        }

                        function y(e) {
                            return {value: e, text: h.getTextFromComponents("instanceType", e)}
                        }

                        t.apply(s), r.setDefault(s, {options: {}, detail: {}, value: ""});
                        var c = null, h = null, p = {}, d = s.config();
                        d && d.noDialog != undefined && (l.noDialog = d.noDialog), d && d.hideOptionsItems != undefined && (s.hideOptionsItems = d.hideOptionsItems), s.$watch("raw", function () {
                            if (!s.raw)return;
                            h = o.parse(s.raw);
                            if (l.noDialog) {
                                var e = u.get("partials/aliyunBuyEcsInstanceTypeDialog.html");
                                s.noDialog = !0, s.getPropertyValue = v, s.getInstanceTypeFamilyIntroduce = g, s.select = function (e) {
                                    if (e.disabled)return;
                                    s.value = e.value
                                }, e && (f.find(".bk-instancetype-row-li").html(e), a(f.contents())(s))
                            }
                        }), s.$watch("value", function () {
                            if (!s.value || !s.raw)return;
                            s.detail.instanceTypeFamily = m(s.value), s.detail.instanceType = y(s.value)
                        }), s.openInstanceTypeDialog = function () {
                            var e = i.open({
                                templateUrl: "partials/aliyunBuyEcsInstanceTypeDialog.html",
                                windowClass: "instancetype-dialog",
                                backdropClass: "instancetype-backdrop",
                                controller: ["$scope", function (e) {
                                    e.value = s.value, e.detail = s.detail, e.options = s.options, e.valueAll = s.valueAll, e.getPropertyValue = v, e.getInstanceTypeFamilyIntroduce = g, e.select = function (t) {
                                        if (t.disabled)return;
                                        s.value = e.value = t.value
                                    }
                                }]
                            })
                        }
                    }
                }
            }
        }
    }]), i
}), define("aliyun-buy-ecs/module/common/cartHelper", ["angular", "aliyun-buy/base/utils/moduleHelper", "./constants/ecsBuyCons", "./homeConfigHelper"], function (e, t, n, r) {
    var i = function (t, n, r, i, s) {
        var o = 0;
        if (!s)return !0;
        var u = s.networkType;
        if (u != "1")return !0;
        var a = s.vpc;
        a = a ? e.fromJson(a) : undefined;
        var f = a ? a[0] : undefined, l = a ? a[1] : undefined;
        if (!f || !l)return !0;
        var c = parseInt(s.amount);
        return e.forEach(r, function (e) {
            var t = e.data, n = e.vSwitchId;
            n && n == f && (o += parseInt(e.maxAmount))
        }), c + o > l ? (t.alert("提示", "您选择的虚拟交换机的可用私有IP为" + l + "个，可购买云服务器数量不能超过" + l + "台。"), !1) : !0
    }, s = function (t, n, r, i, s) {
        if (!s)return !1;
        if (!i)return !1;
        var o = i.amount.max;
        if (!o && o != 0)return !0;
        var u = 0, a = 0;
        e.forEach(r, function (e) {
            var t = e.data;
            u += parseInt(t.quantity)
        });
        var f = parseInt(s.amount);
        return f + u > o ? (t.alert("提示", "您最多只能选购 " + o + " 台"), !1) : !0
    }, o = function (t, n) {
        var r = 0;
        return n && n.length > 0 && e.forEach(n, function (e) {
            var n = e.securityGroupId;
            n === t && (r += parseInt(e.maxAmount))
        }), r
    }, u = function (t, n, r, i, s, u) {
        if (!i)return !1;
        if (!s)return !1;
        var a = i.security, f = u.security, l = a.quota.securityGroupMembersLimit, c = e.fromJson(s.security), h = o(c[2], r);
        return s.amount + h + f.EcsCount > a.quota.securityGroupMembersLimit ? (t.alert("提示", "您每个安全组最多只能创建" + l + "个实例，当前安全组已有" + f.EcsCount + "个实例。"), !1) : !0
    }, a = function (t, n, i, s, o, u) {
        var a = r.get("allowAddToCartNumber");
        return !a && (a = 5), i && e.isArray(i) && i.length >= a ? (t.alert("提示", "只允许加入" + a + " 次清单"), !1) : !0
    };
    return {vpcValidation: i, totalValidation: s, securityInstanceQuotaValidation: u, cartNumbersValidation: a}
}), define("aliyun-buy-ecs/module/common/service.ecs.constraints", ["angular", "./constants/ecsBuyCons", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "./stringHelper", "./securityGroupHelper", "./homeConfigHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.constraint", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/ui/controls/ui.msg"], function (e, t, n, r, i, s, o, u) {
    var a = e.module("aliyun.buy.service.ecs.buy.constraints", u.getModuleNames(arguments));
    return a.factory("aliyunBuyEcsConstraints", ["aliyunBuyConstraint", "aliyunBuyParser", "aliyunBuyMsg", "aliyunBuyRemote", "aliyunBuyException", "$filter", function (i, a, f, l, c, h) {
        var p = {};
        return p.apply = function (a, f) {
            function T() {
                if (!g.imageType)return;
                v ? y.region == "cn-hongkong-am4-c04" || y.region == "us-west-ot7-a01" || y.region == "ap-southeast-os30-a01" ? g.imageType.items = [n.OS_TYPE.PUBLIC, n.OS_TYPE.CUSTOM, n.OS_TYPE.SHARED] : g.imageType.items = [n.OS_TYPE.PUBLIC, n.OS_TYPE.CUSTOM, n.OS_TYPE.SHARED, n.OS_TYPE.MARKET] : y.region == "cn-hongkong-am4-c04" || y.region == "us-west-ot7-a01" || y.region == "ap-southeast-os30-a01" ? g.imageType.items = [n.OS_TYPE.PUBLIC] : g.imageType.items = [n.OS_TYPE.PUBLIC, n.OS_TYPE.MARKET]
            }

            function N(t, n) {
                var r = g.instanceType[t] = f.getCollection(n, y);
                e.forEach(r, function (t) {
                    var r = {};
                    r[n] = t.value, t.instanceTypeItems = f.getCollection("instanceType", e.extend(y, r))
                })
            }

            var c = a.raw;
            if (!c)return;
            var p = c.config;
            if (!p)return;
            var d = p.spec_code, v = !!p.aliyun_uid, m = o.get("canAccessNewConsole") || e.isUndefined(o.get("canAccessNewConsole")), g = a.options, y = a.value, b = a.detail, w = a.price, E = c.instanceDetail ? c.instanceDetail : undefined, S = E ? E.instanceInfo : undefined, x = E ? E.orderInfo : undefined;
            T(), i.add(a, ["value"], function () {
                return !0
            }, function () {
                g.region && (u.config(g.region, {
                    items: f.getCollection("region", y),
                    needLogin: !v,
                    regionMap: p.region_map,
                    displayTip: d === "vm" ? "ECS_REGION_HOT_VM_TIP" : "ECS_REGION_HOT_ECS_TIP"
                }), g.region.items && g.region.items.length > 0 && e.forEach(g.region.items, function (e) {
                    if (e.disabled !== !0)return;
                    e.tip = "ECS_REGION_SELL_OUT_TIP", e.value === "us-west-ot7-a01" && (e.tip = "ECS_REGION_SELL_OUT_TIP_US_WEST"), e.disabled = !1
                })), g.zone && (g.zone.items = y.region ? f.getCollection("zone", y) : []), g.instanceGeneration && (g.instanceGeneration.items = f.getCollection("instanceGeneration", y)), g.instanceType && (y.instanceGeneration == "ecs-1" ? (y.instanceTypeFamily = undefined, N("groupItems", "instanceTypeGroup")) : (y.instanceTypeGroup = undefined, N("familyItems", "instanceTypeFamily"))), g.networkType && (g.networkType.items = f.getCollection("networkType", y)), g.password && (g.password.needLogin = !v), g.imageMarket && (g.imageMarket.needLogin = !v), g.imageFromMarket && g.imageFromMarket.fromMarket === !0, g.sysdisk && u.config(g.sysdisk, function () {
                    var e = f.getCollection("systemdisk_category", y), t = [];
                    if (p.orderType == "CHANGEOS") {
                        var n = x.systemdisk[0];
                        for (var r = 0; r < e.length; r++)e[r].value == n.systemdisk_category && (t[0] = e[r])
                    } else t = e;
                    return {items: t, mount: f.getConfig("systemdisk_device")}
                }()), g.bandwidthType && (g.bandwidthType.items = f.getCollection("bandwidthType", y)), g.bandwidth && u.config(g.bandwidth, function () {
                    var e = f.getConfig("bandwidth", y);
                    return {max: e.max / 1024, min: e.min / 1024, step: e.step / 1024}
                }()), g.amount && u.config(g.amount, function () {
                    var e = f.config.order_num, t = p.already_has_resource_num || 0, n = parseInt(e.max) - parseInt(t) >= 0 ? parseInt(e.max) - parseInt(t) : undefined, r = n - parseInt(t);
                    return r < 0 && (r = 0), {max: n, available: r, min: e.min, has: t}
                }()), g.io && g.io && g.io instanceof Object && (g.io.items = f.getCollection("io", y)), g.datadisk && u.config(g.datadisk, function () {
                    var t, n = {}, r = {}, i = {}, s = {}, o, a, l;
                    if (y.sysdisk) {
                        var c = e.fromJson(y.sysdisk), h = e.extend(e.copy(y), {sysdisk: c[0]});
                        t = f.getCollection("datadisk_category", h)
                    } else t = f.getCollection("datadisk_category", y);
                    var m, g, w;
                    for (var E = 0, S = t.length; E < S; E++)m = t[E].value, g = u.config({datadisk_category: m}, y), w = f.getConfig("datadisk_size", g), n[m] = w.max, r[m] = w.min, i[m] = w.unit, s[m] = f.getConfig("datadisk_totalsize", g).max;
                    var x = f.getConfig("datadisk_disknumber", y);
                    return o = x.max, a = x.min, l = f.getCollection("datadisk_device", y), {
                        portableMap: {
                            "postpay.cloud": !0,
                            "postpay.cloud_ssd": !0,
                            "postpay.cloud_efficiency": !0,
                            "postpay.ephemeral": !1,
                            "postpay.ephemeral_ssd": !1,
                            "prepay.cloud": !1,
                            "prepay.cloud_ssd": !1,
                            "prepay.cloud_efficiency": !1,
                            "prepay.ephemeral": !1,
                            "prepay.ephemeral_ssd": !1
                        },
                        convertableMap: {
                            "postpay.cloud": !1,
                            "postpay.cloud_ssd": !1,
                            "postpay.cloud_efficiency": !1,
                            "postpay.ephemeral": !1,
                            "postpay.ephemeral_ssd": !1,
                            "prepay.cloud": !0,
                            "prepay.cloud_ssd": !0,
                            "prepay.cloud_efficiency": !0,
                            "prepay.ephemeral": !1,
                            "prepay.ephemeral_ssd": !1
                        },
                        paymentMethods: [{text: "包年包月", value: "prepay"}, {text: "按量付费", value: "postpay"}],
                        regionId: y.region,
                        regionName: b.region ? b.region.text : "",
                        diskTypes: t,
                        singleDiskMaxSizes: n,
                        singleDiskMinSizes: r,
                        singleDiskUnits: i,
                        totalMaxSizes: s,
                        diskMaxNumber: o,
                        diskMinNumber: a,
                        mounts: l,
                        defaultPaymentMethod: d == "ecs" ? "postpay" : "prepay",
                        showHeader: p.orderType == "RENEW" || p.orderType == "UPGRADE",
                        showConvertOption: p.orderType == "RENEW",
                        addible: p.orderType == "BUY" || p.orderType == "UPGRADE",
                        loggedIn: v
                    }
                }())
            }), i.add(a, ["options.zone", "value.zone"], function () {
                var e = g.zone, t = e ? e.items : null;
                return t instanceof Array && t.length > 0 && t[0].value && !y.zone ? !0 : !1
            }, function () {
                y.zone = g.zone.items[0].value
            }), i.add(a, ["value.bandwidthType"], function () {
                if (g.bandwidth)return !0
            }, function () {
                p["spec_code"] != "vm" || p.orderType != "RENEW" && p.orderType != "UPGRADE" ? p["spec_code"] == "bandwidth_increce" && p.orderType == "INCREASE_UPGRADE" ? g.bandwidth.name = y.bandwidthType == "1" ? "@{ECS_BANDWIDTH}@{ECS_PEAK}" : "ECS_TARGET_BANDWIDTH" : g.bandwidth.name = y.bandwidthType == "1" ? "@{ECS_BANDWIDTH}@{ECS_PEAK}" : "ECS_BANDWIDTH" : g.bandwidth.name = y.bandwidthType == "1" ? "@{ECS_BANDWIDTH}@{ECS_PEAK}" : "ECS_BASIC_BANDWIDTH"
            }), i.add(a, ["value.memory"], function () {
                return y.memory && g.memory ? !0 : !1
            }, function () {
                y.memory == "512" ? a.options.memory.tip = "ECS_MEMORY_512_TIP" : y.memory == "1024" ? a.options.memory.tip = "ECS_MEMORY_1024_TIP" : a.options.memory.tip = ""
            }), i.add(a, ["value.imageType"], function () {
                return y.imageType ? !0 : !1
            }, function () {
                var e = a.value.imageType;
                g.os && (g.os.visible = e == "public" ? !0 : !1), g.customImage && (g.customImage.visible = e == "custom" ? !0 : !1), g.sharedImage && (g.sharedImage.visible = e == "shared" ? !0 : !1), g.imageMarket && (g.imageMarket.visible = e == "market" ? !0 : !1), g.os && (g.os.state = ""), g.customImage && (g.customImage.state = ""), g.sharedImage && (g.sharedImage.state = ""), g.imageMarket && (g.imageMarket.state = "")
            }), i.add(a, ["value.os"], function () {
                if (g.os && y.os)return !0
            }, function () {
                g.os.state = ""
            }), i.add(a, ["value.os", "value.customImage", "value.sharedImage", "value.imageMarket", "value.imageType"], function () {
                return y.imageType ? !0 : !1
            }, function () {
                var e = y.imageType, t;
                e == "public" ? t = y.os : e == "custom" ? t = y.customImage : e == "shared" ? t = y.sharedImage : e == "market" && (t = y.imageMarket), g.password && (g.password.os = t), g.imageOffline && (g.imageOffline.os = t), g.imageFromMarket && (g.imageFromMarket.os = t), g.sysdisk && (g.sysdisk.os = t)
            }), i.add(a, ["value.vpc"], function () {
                if (g.vpc)return !0
            }, function () {
                g.vpc.state = "", g.amount.state = "", y.vpc && (g.amount.ipNum = e.fromJson(y.vpc)[1])
            }), i.add(a, ["value.customImage"], function () {
                if (g.customImage && y.customImage)return !0
            }, function () {
                g.customImage.state = ""
            }), i.add(a, ["value.sharedImage"], function () {
                if (g.sharedImage && y.sharedImage)return !0
            }, function () {
                g.sharedImage.state = ""
            }), i.add(a, ["value.region", "value.bandwidth", "value.bandwidthType"], function () {
                if (g && g.bandwidth && y)return !0
            }, function () {
                b.imageMarket && (b.imageMarket = b.imageMarket ? b.imageMarket : {}, b.imageMarket.regionName = b.region ? b.region.text : "");
                var e = g.bandwidth, t = [];
                y.bandwidthType == "1" && c.config.spec_code == "vm" && t.push("@{ECS_FLOWBANDWIDTH_TIP}"), c && c.config && c.config.is_finance_customer && t.push("@{ECS_BANDWIDTH_FINANCE}"), y.bandwidth == 0 && c.config.orderType != "BUY" && t.push("@{ECS_BANDWIDTH_RENEW_UPGRADE_0}");
                if (y.bandwidth == 0 && c.config.orderType == "BUY")t.push("@{ECS_BANDWIDTH_0}"); else if (y.region == "cn-hongkong-am4-c04" || y.region == "us-west-ot7-a01" || y.region == "ap-southeast-os30-a01") {
                    y.region == "cn-hongkong-am4-c04" && t.push("@{ECS_BANDWIDTH_HONGKONG}"), y.region == "ap-southeast-os30-a01" && t.push("@{ECS_BANDWIDTH_SOUTHEAST}"), y.region == "us-west-ot7-a01" && t.push("@{ECS_BANDWIDTH_US_WEST}");
                    if (!y.os && g.os && g.os.items && g.os.items.length > 0)for (var n = 0, r = g.os.items.length; n < r; n++) {
                        var i = g.os.items[n];
                        if (i.kind === "linux") {
                            y.os = h("json")([i.value, i.kind, i.bit]);
                            break
                        }
                    }
                }
                t.push("@{ECS_DDOS_THRESHOLD}"), c && c.config && c.config.orderType == "UPGRADE" && x && x.vm_bandwidth && x.vm_bandwidth[0].vm_is_flow_type == 1 && S && !S.networkValidation && (g.bandwidth.isDisabled = !0, t = ["@{ECS_NETWORK_VALIDATION_FALSE}"]), e.tip = t.join("<br />")
            }), i.add(a, ["value.region", "value.os"], function () {
                if (g && g.os && y)return !0
            }, function () {
                var e = g.os, t = [];
                y.region == "cn-hongkong-am4-c04" ? (t.push("@{ECS_OS_TIP_HONGKONG}"), g.imageType.tip = "") : y.region == "us-west-ot7-a01" ? (t.push("@{ECS_OS_TIP_US_WEST}"), g.imageType.tip = "") : y.region == "ap-southeast-os30-a01" ? (t.push("@{ECS_OS_TIP_SOUTHEAST}"), g.imageType.tip = "") : g.imageType.tip = "ECS_IMAGETYPE_ROW_TIP", e.tip = t.join("<br />")
            }), i.add(a, ["value.region"], function () {
                if (y.region)return !0
            }, function () {
                T(), g.imageMarket && (g.imageMarket.region = y.region), g.region && g.zone && (g.zone.regionMapValue = g.region.regionMap ? g.region.regionMap[y.region] : undefined)
            }), i.add(a, ["options.sysdisk.items"], function () {
                var e = g.sysdisk, t = e ? e.items : null;
                return t instanceof Array && t.length > 0 && t[0].value ? (y.sysdisk || (y.sysdisk = "[]"), !0) : !1
            }, function () {
                var t = e.fromJson(y.sysdisk);
                t[0] = g.sysdisk.items[0].value, y.sysdisk = h("json")(t)
            }), i.add(a, ["value.sysdisk", "options.sysdisk.os"], function () {
                return y.sysdisk && g && g.sysdisk ? !0 : !1
            }, function () {
                var n = t.DiskCategory, r = t.SystemDisk, i = e.fromJson(y.sysdisk), s = i[0], o = parseInt(i[1]), l = "";
                s == n.ephemeralSSD ? g.sysdisk.tip = h("aliyunBuyText")("ECS_BUY_NOT_ALLOW_CHANGE_WHEN_LOCAL_SYSTEMDISK") : g.sysdisk.tip = " ";
                var d = a.options.sysdisk, v = f.getConfig("systemdisk_size", {systemdisk_category: i[0]});
                if (!v)return;
                d.configMin = v.min, d.orderType = "BUY";
                var m = r.chargeSize;
                if (p.orderType == "CHANGEOS") {
                    m = parseInt(x.systemdisk[0].systemdisk_size), d.orderType = "CHANGEOS", d.originDisk = m;
                    var b = c.instanceDetail.instanceInfo.chargeType;
                    b == "Prepaid" && S.isRenewChange === !0 && (v.max = Math.max(r.chargeSize, m), d.max = v.max, l = " 续费降配过的ECS实例，暂不支持系统盘扩容"), b == "Prepaid" && o == Math.max(r.chargeSize, m) ? d.needBuy = !1 : b == "Prepaid" && o > Math.max(r.chargeSize, m) && (d.needBuy = !0)
                }
                v.min = Math.max(r.chargeSize, m, d.osDisk, d.configMin);
                var w = d.os && e.fromJson(d.os), E = w && w[3], T = w && w[4];
                E && E == "Windows Server 2003" && (v.max = Math.max(v.min, T)), u.config(d, v), d.sizeRange = d.min + "-" + d.max + l
            }), function () {
                var e;
                i.add(a, ["value.zone", "value.region"], function () {
                    return y.zone && y.region && g.vpc ? !0 : !1
                }, function () {
                    clearTimeout(e), e = setTimeout(function () {
                        y.zone == "random" ? (y.networkType = "0", g.vpc.zone = y.zone, g.networkType.visible = !1, g.vpc.visible = !1, g.vpc.vpcTip = "", g.vpc.vpns = [], g.vpc.region = y.region) : l.queryEcsVpc(y.region, y.zone).then(function (e) {
                            var t = e;
                            g.vpc.vpcTip = "", g.vpc.zone = y.zone, g.vpc.region = y.region, t ? (g.networkType.visible = !0, g.vpc.vpns = t, t.length == 0 && (g.vpc.vpcTip = "没有专有网络，不能创建ECS。请先<a href='http://home.console.aliyun.com/redirect.htm?productId=vpc&path=region/" + y.region + "/vpc/create' target='_blank'>创建专有网络</a>")) : (g.networkType.visible = !1, y.networkType = "0", g.vpc.visible = !1, g.vpc.vpns = [])
                        }, function () {
                            g.vpc.zone = y.zone, g.networkType.visible = !1, y.networkType = "0", g.vpc.vpns = []
                        })
                    }, 100)
                })
            }(), function () {
                var t;
                i.add(a, ["value.networkType", "value.vpc", "value.region"], function () {
                    return y.region && g.security ? !0 : !1
                }, function () {
                    g.security.state = "";
                    var n = g.region.regionMap ? g.region.regionMap[y.region] : undefined;
                    g.security.regionName = b.region ? b.region.text : "", g.security.createAddSecurityLink = "https://ecs.console.aliyun.com/#/securityGroup/region/" + n, g.security.regionMap = n, g.security.valueObject = {
                        type: "1",
                        text: null,
                        value: null
                    }, y.security = e.toJson(["1", null, null]), b.security = {
                        text: "",
                        access: !0
                    }, y.networkType == 1 && !y.vpc ? g.security.visible = !1 : (g.security.visible = !1, clearTimeout(t), t = setTimeout(function () {
                        var t = "", n = 5, r = 1;
                        if (y.vpc && y.networkType == 1) {
                            var i = e.fromJson(y.vpc);
                            t = i[2]
                        }
                        g.security.vpcId = t;
                        var o = t != "" ? "vpc" : "classic";
                        g.security.direction = t != "" ? "intranetIngress" : "internetIngress";
                        var u = s.getObjParam();
                        u.regionId = y.region, u.vpcId = t, u.networkType = o, u.fuzzyQuery = !1, u.isQueryEcsCount = !1, u.securityGroupId = null, u.securityGroupName = null, u.pageNumber = r, u.pageSize = n, v && m ? l.queryEcsSecurityGroupList(u).then(function (e) {
                            var t = e.TotalCount;
                            g.security.region = y.region;
                            var n = parseInt(t) > 0;
                            n ? (g.security.types = [{
                                text: "ECS_SELECT_SECURITY",
                                value: "2"
                            }], g.security.visible = !0) : (g.security.types = [{
                                text: "ECS_CREATE_SECURITY",
                                value: "1"
                            }], g.security.visible = !1)
                        }) : g.security.types = [{text: "ECS_CREATE_SECURITY", value: "1"}]
                    }, 100))
                })
            }(), i.add(a, ["value.networkType"], function () {
                return !g.vpc || !g.bandwidth ? !1 : !0
            }, function () {
                y.networkType == "1" ? (g.vpc && (g.vpc.visible = !0), g.bandwidth && (g.bandwidth.visible = !1)) : (g.vpc && (g.vpc.visible = !1), g.bandwidth && (g.bandwidth.visible = !0)), g.vpc && (g.vpc.state = g.bandwidth.state = g.amount.state = "")
            }), i.add(a, ["value.region", "value.bandwidthType"], function () {
                return y.region && y.bandwidthType ? !0 : !1
            }, function () {
                var e = a.price;
                if (!e)return;
                y.bandwidthType == "1" ? l.getEcsFlowPrice(d, y.region).then(function (t) {
                    u.config(e, {data: {flow: t ? t.trade : "-"}})
                }) : u.config(e, {data: {flow: null}})
            }), i.add(a, ["options.io", "value.io"], function () {
                var e = g.io, t = e ? e.items : null;
                return e instanceof Array && e.length > 0 && e[0].value && !y.io ? !0 : !1
            }, function () {
                g.io.items.length > 1 ? y.io = "none" : y.io = g.io.items[0].value
            }), i.add(a, ["value.instanceGeneration", "value.io", "value.region", "value.zone", "value.vpc"], function () {
                return !y.instanceGeneration || !g.instanceType ? !1 : d != "vm" && d != "ecs" || p.orderType != "BUY" ? !1 : !0
            }, function () {
                function t(t) {
                    var n = g.instanceType && g.instanceType[t], i = y.instanceType, s = !1, o = null;
                    if (!e.isArray(n))return;
                    for (var u = 0; u < n.length; u++) {
                        var a = n[u];
                        if (!a || !a.instanceTypeItems || !e.isArray(a.instanceTypeItems) || a.instanceTypeItems.length == 0)continue;
                        if (r.contains(a.instanceTypeItems, i, "value")) {
                            s = !0;
                            break
                        }
                        o == null && (o = a.instanceTypeItems[0].value)
                    }
                    s || (y.instanceType = o)
                }

                y.instanceGeneration == "ecs-1" ? (y.instanceTypeFamily = undefined, N("groupItems", "instanceTypeGroup"), t("groupItems"), g.instanceGeneration.tip = "ECS_INSTANCE_TYPE_ECS1_INTRO") : (y.instanceTypeGroup = undefined, N("familyItems", "instanceTypeFamily"), t("familyItems"), g.instanceGeneration.tip = "ECS_INSTANCE_TYPE_ECS2_INTRO")
            })
        }, p
    }]), a
}), define("aliyun-buy-ecs/module/postpay/service.ecs.postpay.constraints", ["angular", "./../common/cartHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.constraint", "aliyun-buy/base/services/service.parser", "../common/service.ecs.constraints"], function (e, t, n, r, i) {
    var s = e.module("aliyun.buy.service.ecs.postpay.constraints", i.getModuleNames(arguments));
    return s.factory("aliyunBuyEcsPostpayConstraints", ["aliyunBuyConstraint", "aliyunBuyParser", "aliyunBuyEcsConstraints", "aliyunBuyRemote", "aliyunBuyMsg", function (e, n, r, s, o) {
        var u = {};
        return u.apply = function (t, n) {
            r.apply(t, n);
            var s = t.raw, o = t.options, u = t.value, a = t.price, f = t.detail;
            e.add(t, ["value.networkType"], function () {
                return !0
            }, function () {
                u.networkType == 0 ? (o.vpc.visible = !1, o.bandwidthType.visible = !0, o.bandwidth.visible = !0) : (o.vpc.visible = !0, o.bandwidthType.visible = !1, o.bandwidth.visible = !1), o.vpc.state = o.bandwidth.state = ""
            }), t.$on("aliyunBuyEcsPostpayOptions:initialized", function (e, n) {
                var r = n.raw;
                r && r.config && r.config.aliyun_uid && i.config(t.options.amount, {showLimitMsg: !0})
            })
        }, u.checkBeforeAddToCart = function (e, n) {
            var r = e.cartValue, i = e.optionsValue, s = e.optionsOptions, u = e.optionsDetail, a = function () {
                return t.vpcValidation(o, n, r, s, i, u)
            }, f = function () {
                return t.securityInstanceQuotaValidation(o, n, r, s, i, u)
            }, l = function () {
                return t.cartNumbersValidation(o, n, r)
            }, c = function () {
                return t.totalValidation(o, n, r, s, i)
            };
            return l() && a() && c() && f()
        }, u.checkBeforePurchase = function (e, n) {
            var r = e.cartValue, i = e.optionsValue, s = e.optionsOptions, u = e.optionsDetail, a = function () {
                return t.securityInstanceQuotaValidation(o, n, r, s, i, u)
            };
            return a()
        }, u
    }]), s
}), define("aliyun-buy-ecs/module/postpay/ui.ecs.postpay.options", ["angular", "../common/commodityHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/ui/ui.tpl", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.handle", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.local", "aliyun-buy/base/services/service.exception", "aliyun-buy/base/ui/controls/ui.group", "aliyun-buy/base/ui/controls/ui.dialog", "aliyun-buy/base/ui/controls/ui.preloader", "aliyun-buy/base/ui/widgets/ui.region", "aliyun-buy/base/ui/widgets/ui.amount", "aliyun-buy/base/ui/widgets/ui.yundun", "aliyun-buy/base/ui/widgets/ui.orderRoll", "aliyun-buy/base/ui/controls/ui.notice", "aliyun-buy/base/ui/controls/ui.timepicker", "aliyun-buy/base/ui/widgets/ui.vpc", "aliyun-buy/base/ui/widgets/bricks/ui.tabsBrick", "../common/service.ecs.filters", "../common/ui.ecs.datadisk", "../common/ui.ecs.bandwidth", "../common/ui.ecs.security", "../common/ui.ecs.zone", "../common/ui.ecs.image", "../common/ui.ecs.imageOffline", "../common/ui.ecs.sysdisk", "../common/ui.ecs.os", "../common/ui.ecs.io", "../common/ui.ecs.instanceType", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./service.ecs.postpay.constraints"], function (e, t, n, r, i) {
    var s = e.module("aliyun.buy.ui.ecs.postpay.options", [].concat(n.getModuleNames(arguments)));
    return s.directive("aliyunBuyEcsPostpayOptions", ["aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceUpdater", "aliyunBuyEcsPostpayConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyPriceQuerier", "aliyunBuyOrderModel", "$timeout", "$filter", function (r, i, s, o, u, a, f, l, c, h, p) {
        function v(l, c, p) {
            var d, v;
            n.setDefault(l, {
                value: {},
                detail: {},
                price: {},
                options: n.createModel("global", "instanceType", "instanceGeneration", "region", "zone", "networkType", "bandwidthType", "vpc", "bandwidth", "security", "imageType", "sysdisk", "datadisk", "password", "os", "customImage", "sharedImage", "imageMarket", "imageOffline", "amount", "io")
            }), v = l.options, n.setDefault(v.global, {
                grouped: !0,
                showNotice: !0
            }), n.setDefault(v.instanceGeneration, {
                name: "ECS_INSTANCE_GENERATION",
                askTip: {tooltip: "ECS_INSTANCE_TYPE_ASKTIP", target: "_self", spm: "askTipForInstanceType"}
            }), n.setDefault(v.instanceType, {name: "ECS_INSTANCE_TYPE"}), n.setDefault(v.networkType, {
                name: "ECS_NETWORK_TYPE",
                textTip: {text: "ECS_NETWORKTYPE_LINK", spm: "textTipForNetworkType"},
                askTip: {tooltip: "ECS_NETWORKTYPE_TIP", target: "_self", spm: "askTipForNetworkType"}
            }), n.setDefault(v.bandwidthType, {
                name: "ECS_BANDWIDTH_TYPE",
                askTip: {tooltip: "ECS_BANDWIDTHTYPE_TIP", target: "_self", spm: "askTipForBandwidthType"}
            }), n.setDefault(v.imageType, {
                name: "ECS_IMAGE_TYPE",
                askTip: {tooltip: "ECS_IMAGETYPE_TIP", target: "_self", spm: "askTipForImageType"}
            }), n.setDefault(v.sharedImage, {
                name: "ECS_SHARED_IMAGE",
                placeholder: "ECS_PLEASE_SELECT_SHARED_IMAGE"
            }), n.setDefault(v.customImage, {
                name: "ECS_CUSTOM_IMAGE",
                placeholder: "ECS_PLEASE_SELECT_CUSTOM_IMAGE"
            }), n.setDefault(v.amount, {
                unit: "ECS_INSTANCE_UNIT",
                prodName: "ECS",
                showLimitMsg: !1
            }), n.setDefault(v.vpc, {prodName: "ECS"}), n.setDefault(v.imageFromMarket, {fromMarket: !1}), typeof l.config() == "object" && n.config(l.options.global, l.config().global), l.$watch("config().global", function (e) {
                if (!e)return;
                n.config(l.options.global, e)
            }), l.handle = f.create(l), l.$on("aliyunBuy:saveOptions", function (t, n) {
                var r = e.copy(l.value);
                r.password = undefined, i.saveOptions("ecs", r)
            }), l.$watch("defaultValue()", function (e) {
                e && l.handle && l.handle.restore(e)
            });
            var m = r.getEcsCommodity("ecs", "BUY").then(function (u) {
                var f = l.raw = u;
                d = a.parse(f), t.constraintForIooptimized(f), l.ready = !0, o.apply(l, d), s.apply(l, r.getEcsBuyPrice);
                var c = l.defaultValue() || undefined;
                l.handle.restore(c), i.clearOptions("ecs"), l.$emit("aliyunBuyEcsPostpayOptions:initialized", {raw: e.copy(f)}), n.setDefault(l.options.global, {isCertified: f.config.isCertified}), h(function () {
                    l.$emit("aliyunBuyEcsPostpayOptions:rendered")
                })
            }), g = l.exception();
            g instanceof Function ? m.then(null, g) : u.dialog(m)
        }

        var d = {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsPostpayOptions.html",
            replace: !0,
            scope: {
                value: "=",
                price: "=",
                handle: "=",
                detail: "=",
                options: "=",
                config: "&",
                defaultValue: "&",
                exception: "&",
                priceQueryData: "=",
                cartValue: "="
            },
            compile: function (e, t) {
                return n.require(["value", "price", "handle", "detail", "options"], t), {post: v}
            }
        };
        return d
    }]), s
}), define("aliyun-buy-ecs/module/postpay/ui.ecs.postpay", ["angular", "../common/homeConfigHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/ui.tpl", "aliyun-buy/base/ui/ui.subtotal", "aliyun-buy/base/ui/ui.cart", "aliyun-buy/base/services/service.remote", "../common/ui.ecs.imageMarketPrice", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./ui.ecs.postpay.options", "./service.ecs.postpay.constraints"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.postpay", n.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsPostpay", ["aliyunBuyEcsPostpayConstraints", "aliyunBuyRemote", function (t, r) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsPostpay.html",
            replace: !0,
            scope: {optionsConfig: "@", optionsDefault: "&"},
            link: function (i) {
                function h() {
                    var t = i.optionsValue, r = i.optionsOptions;
                    if (!t || !r)return;
                    var o = t, u = !1, h = s && s.components ? s.components.vm_region_no.vm_region_no : undefined, p = o && o.region ? o.region : undefined;
                    p && h && h.length > 0 && e.forEach(h, function (e) {
                        e.value === p && (u = e.disabled)
                    }), l = a && !u, c = !r.imageFromMarket.fromMarket;
                    var d, v = r.imageFromMarket && r.imageFromMarket.imageMarketPrice && r.imageFromMarket.imageMarketPrice.price;
                    v && v.extraCode ? d = v.extraCode == "MONEY_LESSTHAN_100" : d = !1;
                    var m, g = i.optionsPrice;
                    if (g.data && g.data.extraCode)m = g.data.extraCode == "MONEY_LESSTHAN_100"; else var m = !1;
                    var y = u === !0 ? "ECS_REGION__UNABLE_PURCHASE_TIP" : f;
                    i.subtotalData.value = o, i.subtotalData.options = r, n.config(i.subtotalData, {
                        purchaseAvailable: l && !d && !m,
                        purchaseTip: function () {
                            return l == 0 ? y : m ? "ECS_UNAVAILABLE_NOT_ENOUGH_BALANCE" : d ? "ECS_MARKET_IMAGE_UNAVAILABLE_NOT_ENOUGH_BALANCE" : ""
                        }(),
                        addCartAvailable: c
                    })
                }

                var s, o = "ecs", u = {service: "queryForOrder"}, a, f, l, c;
                r.inWhiteUidList().then(function (e) {
                    var t = i.hideAddToCart = e;
                    n.config(i, {subtotalData: {hideAddToCart: t}})
                }), n.config(i, {
                    subtotalData: {
                        productId: o,
                        purchaseAvailable: !1,
                        priceTip: "ECS_SUBTOTAL_PRICE_TIP"
                    },
                    cartConfig: {
                        productId: o,
                        itemTpl: "partials/aliyunBuyEcsPostpayCartItem.html",
                        priceShow: !1,
                        priceService: r.getEcsBuyPrice
                    }
                }), i.$on("aliyunBuyEcsPostpayOptions:rendered", function () {
                    i.$broadcast("aliyunBuyEcsPostpay:rendered"), i.$emit("aliyunBuyEcsPostpay:rendered")
                }), i.$on("aliyunBuySubtotal:purchase", function (e, n) {
                    if (!s || l === !1)return;
                    if (!s.config.aliyun_uid) {
                        i.$broadcast("aliyunBuy:saveOptions"), r.login();
                        return
                    }
                    var o = i.optionsHandle;
                    if (!o)return;
                    var u = i.optionsDetail, a = o.validate() && t.checkBeforePurchase(i, s);
                    if (!a)return;
                    i.$emit("aliyunBuyEcsPostpay:purchase", {order: [o.order()], priceOrder: [o.order(!0)]})
                }), i.$on("aliyunBuyCart:purchase", function (t, n) {
                    if (!s)return;
                    if (!s.config.aliyun_uid) {
                        i.$broadcast("aliyunBuy:saveOptions"), r.login();
                        return
                    }
                    var o = e.copy(i.cartValue), u = i.cartHandle;
                    if (!o)return;
                    e.forEach(o, function (e) {
                        e.detail && delete e.detail, e.price && delete e.price
                    }), i.$emit("aliyunBuyEcsPostpay:purchase", {order: o, priceOrder: e.copy(u.getPriceOrder())})
                }), i.$on("aliyunBuySubtotal:addToCart", function (o, u) {
                    if (!s || l === !1)return;
                    if (!s.config.aliyun_uid) {
                        i.$broadcast("aliyunBuy:saveOptions"), r.login();
                        return
                    }
                    i.raw = s;
                    var a = i.optionsHandle;
                    if (!a)return;
                    var f = i.optionsPrice, c = i.optionsValue, h = a.validate(), p = i.cartHandle, d = i.subtotalHandle, v = e.copy(i.optionsDetail);
                    if (h && p && d && t.checkBeforeAddToCart(i, s)) {
                        p.add(a.order(), f && f.data ? e.copy(f.data) : null, v ? e.copy(v) : null), p.addPriceOrder(a.order(!0)), d.add();
                        var m;
                        c && (m = n.parseJsonSafe(c.password), m && m[0] == "1" && (c.password = ""))
                    }
                }), i.$on("aliyunBuyEcsPostpayOptions:initialized", function (e, t) {
                    s = t.raw;
                    var r = s.config, o, u, l;
                    o = r.isCertified !== !1, u = r.hasEnoughQuota !== !1, l = r.regionOpen !== !1, a = o && u && l, o ? u ? l || (f = "ECS_UNAVAILABLE_REGION_OPEN_TIP_POSTPAY") : f = "ECS_UNAVAILABLE_HAS_QUOTA_TIP" : f = "ECS_POSTPAY_NEEDCERTIFY", n.config(i.subtotalData, {
                        purchaseAvailable: a,
                        purchaseTip: a === !1 ? f : ""
                    })
                }), i.$watch("optionsPrice", function (e) {
                    if (!e)return;
                    var t = e.data, r = e.calculating, s = i.subtotalData, o = e.success;
                    if (o && !t)return;
                    h(), n.config(i.subtotalData, {
                        calculating: r,
                        tradePrice: o ? t.trade : null,
                        originalPrice: o ? t.origin : null,
                        discountPrice: o ? t.discount : 0,
                        strategies: o ? t.strategies : null,
                        flowPrice: o ? t.flow : null
                    })
                }, !0), i.$watch("optionsOptions.security", function (e) {
                    h()
                }, !0), i.$watch("cartValue", function (e) {
                    h()
                }, !0), i.$watch("optionsValue", function (e) {
                    h()
                }, !0), i.$watch("optionsOptions.imageFromMarket.imageMarketPrice.price", function () {
                    h()
                }, !0), i.$watch("optionsDetail", function (e) {
                    if (!e)return;
                    i.subtotalData.detail = e
                }, !0)
            }
        }
    }]), r
}), define("aliyun-buy-ecs/module/postpay/ui.ecs.postpay.orderPreview", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.date", "../common/ui.ecs.orderView", "../../ui.ecs.tpl", "../../ui.ecs.module.styles"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.postpay.orderPreview", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsPostpayOrderPreview", ["aliyunBuyRemote", "aliyunBuyDateParser", function (e, n) {
        function r(e, t, r) {
            e.priceService = "getEcsBuyPrice", e.checked = !0, e.hstep = 1, e.mstep = 60, e.$watch("isRelease", function (t) {
                if (t) {
                    var n = new Date, r = Date.parse(n);
                    e.minDay = r, e.maxDay = Date.parse(new Date(n.getFullYear() + 3, n.getMonth(), n.getDate())), r += (59 - n.getMinutes() + 60) * 60 * 1e3, e.releaseTime = new Date(r)
                }
            }), e.$watchCollection("[isRelease, releaseTime]", function (t) {
                var n = t[0], r = t[1];
                if (n && r) {
                    var i = Date.parse(r), s = new Date, o = Date.parse(s) + 36e5;
                    if (i < o) {
                        var u = Date.parse(s);
                        u += (59 - s.getMinutes() + 60) * 60 * 1e3, e.releaseTime = new Date(u)
                    }
                } else e.releaseTime = null
            }), e.purchase = function () {
                if (!e.checked)return;
                e.$emit("aliyunBuyEcsPostpayOrderPreview:purchase", {
                    orderData: e.orderData(),
                    releaseTime: e.releaseTime ? n.getISODateString(e.releaseTime) : null
                })
            }
        }

        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsPostpayOrderPreview.html",
            replace: !0,
            scope: {orderData: "&", priceOrder: "&", ready: "="},
            compile: function (e, n) {
                return t.require(["price"], n), {post: r}
            }
        }
    }]), n
}), define("aliyun-buy-ecs/module/common/ui.ecs.cart", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/services/service.dict", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.local", "../../ui.ecs.tpl"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.cart", t.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsCart", ["$filter", "$timeout", "aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceQuerier", function (r, i, s, o, u) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsCart.html",
            replace: !0,
            scope: {config: "&", value: "=", handle: "=", detail: "="},
            compile: function (r, i) {
                return {
                    pre: function (e) {
                    }, post: function (r, i, s) {
                        function h(e, t) {
                            e.pending ? r.calculating = !0 : (r.calculating = !1, t = e.data)
                        }

                        function p(e, t, n) {
                            if (!e)return;
                            if (!n)return;
                            e.detail = n, e.price = t;
                            var i = e.data, s = r.value;
                            s instanceof Array && s.push(e)
                        }

                        function d(e) {
                            var t = e.data, n = r.value;
                            if (n instanceof Array)for (var i = 0, s = n.length; i < s; i++)n[i] === e && (n.splice(i, 1), i--, s = n.length)
                        }

                        var a = r.config().productId, f = r.config().priceService, l = new u(f), c = new u(f);
                        t.setDefault(r, {
                            amount: 0,
                            value: o.getCartItems(a) || []
                        }), r.priceUnit = n.UNITS.price[r.config().productId], r.$on("aliyunBuyEcsCartItem:remove", function (e, t) {
                            d(t.item)
                        }), l.promise.then(null, null, function (e) {
                            h(e, r.price)
                        }), c.promise.then(null, null, function (e) {
                            h(e, r.imageMarketPrice)
                        }), r.$watchCollection("value", function (t) {
                            if (!t)return;
                            r.calculating = !0;
                            var n = [], i = [], s = 0;
                            e.forEach(t, function (t) {
                                var r = e.copy(t), o = r.data.imageMarket;
                                r.detail && (r.detail = undefined), r.price && (r.price = undefined), n.push(r), o && o.data && parseInt(o.data.quantity, 10) > 0 && i.push(o), s += parseInt(t.data.quantity)
                            }), r.amount = s, l.query(n), i.length > 0 && c.query(i), o.updateCartItems(a, t)
                        }, !0), r.add = p, r.remove = d, r.purchase = function () {
                            var e = r.calculating && r.config().priceShow || r.price == null;
                            if (e === !0)return;
                            r.$emit("aliyunBuyEcsCart:purchase")
                        }, r.handle = {add: p, remove: d}, r.$watch("amount", function (e) {
                            e == 0 && (r.showOrders = !1)
                        })
                    }
                }
            }
        }
    }]), r.directive("aliyunBuyEcsCartItem", ["$templateCache", "$compile", function (e, t) {
        return {
            restrict: "EA",
            replace: !0,
            template: "<div></div>",
            scope: {collection: "=", priceUnit: "=", productId: "="},
            compile: function (n, r) {
                return {
                    pre: function (n, r, i) {
                        n.remove = function (e) {
                            n.$emit("aliyunBuyEcsCartItem:remove", {item: e})
                        };
                        var s = e.get(i.tpl);
                        s && (r.append(s), t(r.contents())(n))
                    }, post: function (e, t, n) {
                    }
                }
            }
        }
    }]), r
}), define("aliyun-buy-ecs/module/common/service.ecs.image", ["angular", "./imageMarketHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote"], function (e, t, n) {
    var r = e.module("aliyun.buy.service.ecs.image", n.getModuleNames(arguments));
    return r.factory("aliyunBuyEcsImage", ["aliyunBuyRemote", "$q", function (n, r) {
        function i(i) {
            var s = r.defer(), o, u = i.imageType, a = {
                system: i.os,
                shared: i.sharedImage,
                custom: i.customImage,
                market: i.imageMarket
            };
            o = a[u];
            if (!o)return;
            var f = t.parseValue(o), l = f.imageId, c = i.region, h = i.io;
            if (!f || !c || !l)return;
            return n.queryImageByImageId(c, l, h).then(function (t) {
                var n = t[l];
                if (!n) {
                    s.reject();
                    return
                }
                var r = e.fromJson(o);
                r[0] || (r[0] = n.value), r[1] || (r[1] = n.kind), r[2] || (r[2] = n.bit), r[4] || (r[4] = n.imageSize), r[9] || (r[9] = n.imageProductCode), r[5] = n.imageCategory, r[6] = n.capacity, r[7] = n.used, r[8] = n.quota, r[10] = n.skuCodes && n.skuCodes[0], r[11] = n.version;
                var i = e.toJson(r), u = {};
                u.value = e.copy(i), u.text = n.text, u.version = n.version, s.resolve({value: i, detail: u})
            }), s.promise
        }

        return {completeImageMarketInfo: i}
    }]), r
}), define("aliyun-buy-ecs/module/common/ui.ecs.imageMarket", ["angular", "jQuery", "./commodityHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.dialog", "aliyun-buy/base/ui/controls/ui.pagination", "aliyun-buy/base/services/service.remote", "./service.ecs.image", "../../ui.ecs.tpl"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.ui.ecs.imageMarket", r.getModuleNames(arguments));
    return i.directive("aliyunBuyEcsImageMarket", ["aliyunBuyDialog", "aliyunBuyRemote", "aliyunBuyEcsImage", "$rootScope", function (t, i, s, o) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsImageMarket.html",
            scope: {options: "=", value: "=", detail: "=", config: "&", valueAll: "=", raw: "="},
            replace: !0,
            compile: function (u, a) {
                return r.require(["options", "value", "detail"], a), {
                    post: function (u) {
                        r.setDefault(u, {
                            options: {},
                            detail: {},
                            value: ""
                        }), r.setDefault(u.options, {name: "ECS_IMAGE_NAME"}), u.login = function () {
                            u.$emit("aliyunBuy:saveOptions"), i.login()
                        };
                        var a = o.$on("aliyunBuyImageMarket:detail", function (t, n) {
                            e.extend(u.detail, n)
                        });
                        u.$watch("valueAll.region", function () {
                            var t = u.valueAll;
                            if (!t)return;
                            var n = s.completeImageMarketInfo(t);
                            n || (u.value = ""), n && e.isFunction(n.then) && n.then(function (n) {
                                u.value = n.value, u.detail = e.extend(u.detail, n.detail);
                                var r = e.fromJson(u.value), s = r[9], o = u.detail;
                                i.queryImageIdByRegion(t.region, o.version, s).then(function (t) {
                                    if (t && u.value !== "") {
                                        var n = e.fromJson(u.value);
                                        n[0] = t, u.value = e.toJson(n)
                                    } else u.value = ""
                                })
                            }, function (e) {
                                u.value = ""
                            })
                        }), u.openImageMarket = function () {
                            u.options.state = "";
                            var r = "";
                            if (u.raw) {
                                var s = u.raw.components, o = u.raw.instanceDetail;
                                if (!o)return;
                                var a = o.orderInfo;
                                r = n.getTextFromCollection(a.vm_region_no, s.vm_region_no.vm_region_no)
                            }
                            var f = t.open({
                                templateUrl: "partials/aliyunBuyEcsImageMarketDialog.html",
                                windowClass: "imagemarket-dialog",
                                backdropClass: "imagemarket-backdrop",
                                controller: ["$scope", "$http", function (t, n) {
                                    function o() {
                                        var e = u.valueAll;
                                        t.isLoading = !0, t.currentCategoryId == "56024006" ? t.itemsPerPage = 3 : t.itemsPerPage = 4, i.queryMarketImages(t.image.currentPage, t.currentCategoryId, t.itemsPerPage, e.region, e.instanceType, e.io).then(function (e) {
                                            t.isLoading = !1;
                                            if (!e.data) {
                                                t.image.imageList = [];
                                                return
                                            }
                                            t.image.imageList = e.data;
                                            for (var n = 0, r = t.image.imageList.length; n < r; n++)if (t.image.imageList[n].imageVersions) {
                                                var i = t.image.imageList[n].imageVersions.length, s = 0;
                                                if (i > 0) {
                                                    for (var o = 0; o < i; o++)t.image.imageList[n].imageVersions[o].isDefault && (s += 1, t.image.imageList[n].versionValue = t.image.imageList[n].imageVersions[o].imageId);
                                                    s === 0 && (t.image.imageList[n].versionValue = t.image.imageList[n].imageVersions[0].imageId)
                                                }
                                            }
                                            t.totalItems = e.pageInfo.total
                                        })
                                    }

                                    var s;
                                    t.image = {}, t.loggedIn = !u.options.needLogin, t.isReady = !1, t.isLoading = !1, t.totalItems = 4, t.image.currentPage = 1, t.itemsPerPage = 4, t.regionName = u.detail.regionName || r, i.queryMarketImageCategory().then(function (e) {
                                        t.isReady = !0, t.image.imageTypes = e, t.currentCategoryId = e[0].marketImageCategoryId, o()
                                    }), t.useImage = function (t) {
                                        s = t, u.options.currentImageProductCode = t.imageProductCode, f.close();
                                        for (var n = 0; n < t.imageVersions.length; n++)if (t.imageVersions[n].imageId == t.versionValue) {
                                            var r = t.skuCodes ? t.skuCodes[0] : null;
                                            u.value = e.toJson([t.imageVersions[n].imageId, t.osKind, t.osBit, null, t.imageVersions[n].imageSize, t.imageCategory, null, null, null, t.imageProductCode, r, null])
                                        }
                                    }, t.menuChange = function (e) {
                                        t.currentCategoryId = e, t.image.currentPage = 1, o()
                                    }, t.$watch("image.currentPage", function (e, t) {
                                        if (e == t)return;
                                        o()
                                    })
                                }]
                            })
                        }, u.$on("$destroy", function () {
                            e.isFunction(a) && a()
                        })
                    }
                }
            }
        }
    }]), i
}), define("aliyun-buy-ecs/module/common/ui.ecs.imageFromMarket", ["angular", "../common/imageMarketHelper", "../common/stringHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/ui.tpl", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.configurable", "aliyun-buy/base/ui/controls/ui.msg", "./service.ecs.image"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.ecs.ui.imageFromMarket", r.getModuleNames(arguments));
    return i.directive("aliyunBuyEcsImageFromMarket", ["aliyunBuyConfigurable", "aliyunBuyEcsImage", "aliyunBuyRemote", "aliyunBuyMsg", "$rootScope", "$filter", "$q", function (i, s, o, u, a, f, l) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsImageFromMarket.html",
            scope: {options: "=", value: "=", config: "&", valueAll: "=", raw: "&"},
            replace: !0,
            compile: function (u, c) {
                return r.require(["options", "value"], c), {
                    post: function (u) {
                        function v() {
                            if (!c.imageMarketPrice.options)return;
                            var e = c.imageMarketPrice, r = e.price ? e.price : {};
                            e.options = e.options ? e.options : {};
                            if (!h.imageType) {
                                e.options.visible = !1;
                                return
                            }
                            var i = t.parseValue(u.value), s = i.quota, o = h.amount || 1, a = !1, l, p = u.raw(), d = p && p.instanceDetail && p.instanceDetail.orderInfo, v = 0, w = 0;
                            c.showTipPrice = !1;
                            if (!n.isEmptyObj(i) && !n.isEmptyString(i.imageProductCode)) {
                                h.imageType === "shared" || h.imageType === "custom" ? c.visible = !0 : c.visible = !1, c.fromMarket = !0, c.useTip = "", p && d && (l = d.vm_os[0].vm_os_imageProductCode, i.imageProductCode === l && (a = !0)), s < o && !a ? (h.needBuyImageMarketNum = o - s, e.options.visible = !0, e.options.imgFeeTip = f("aliyunBuyText")("ECS_IMG_FEE_TIP", o, i.capacity, i.used, h.needBuyImageMarketNum)) : (v = s > 0 ? s : 1, c.useTip = "您已购买过该镜像, 剩余可用" + v + "个镜像", e.options.visible = !1, h.needBuyImageMarketNum = 0);
                                if (h.needBuyImageMarketNum > 0) {
                                    c.showTipPrice = !0;
                                    var E = t.getPriceParamFromValue(i, h.needBuyImageMarketNum, h.region, h.instanceType);
                                    m(E).then(function (e) {
                                        w = v > 0 ? 0 : e.trade, g(r, !1, w, e.origin, e.discount, e.strategies, e.trade, e.extraCode)
                                    }, function (e) {
                                        y(r)
                                    })
                                } else c.showTipPrice = !1, g(r)
                            } else b()
                        }

                        function m(e) {
                            if (!u.options.imageMarketPrice)return;
                            var t = l.defer();
                            return d.calculating = !0, o.getEcsBuyPrice(e).then(function (e) {
                                t.resolve(e)
                            }, function (e) {
                                t.reject(e)
                            }), t.promise
                        }

                        function g(e, t, n, i, s, o, u, a) {
                            r.config(e, {
                                extraCode: a || null,
                                calculating: t || !1,
                                tradePrice: n || 0,
                                originalPrice: i || null,
                                discountPrice: s || 0,
                                strategies: o || null,
                                messagePrice: u || null
                            })
                        }

                        function y(e) {
                            r.config(e, {
                                extraCode: null,
                                calculating: !1,
                                tradePrice: null,
                                originalPrice: null,
                                discountPrice: null,
                                strategies: null
                            })
                        }

                        function b() {
                            c.visible = !1, c.fromMarket = !1, c.showTipPrice = !1, c.useTip = "", h.needBuyImageMarketNum = 0, p.options.visible = !1, g(d)
                        }

                        i.apply(u), r.setDefault(u, {options: {}}), r.setDefault(u.options, {imageMarketPrice: {}}), r.setDefault(u.options.imageMarketPrice, {
                            options: {},
                            config: {priceUnit: "/时"},
                            price: {}
                        });
                        var c = u.options, h = u.valueAll, p = u.options.imageMarketPrice, d = p.price ? p.price : {};
                        c.visible = !1, c.fromMarket = !1, c.useTip = "", c.showTipPrice = !1, u.$watchCollection("[valueAll.imageType, valueAll.customImage, valueAll.sharedImage, valueAll.imageMarket]", function (t) {
                            if (!t[0] && !t[1] && !t[2])return;
                            b();
                            var n = s.completeImageMarketInfo(h);
                            n && e.isFunction(n.then) && n.then(function (e) {
                                u.value = e.value, h.imageType == "market" && a.$emit("aliyunBuyImageMarket:detail", e.detail), v()
                            })
                        }), u.$watchCollection("[valueAll.amount, valueAll.instanceType]", function () {
                            v()
                        })
                    }
                }
            }
        }
    }]), i
}), define("aliyun-buy-ecs/module/prepay/service.ecs.prepay.constraints", ["angular", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.constraint", "aliyun-buy/base/services/service.parser", "../common/service.ecs.constraints"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.service.ecs.prepay.constraints", r.getModuleNames(arguments));
    return i.factory("aliyunBuyEcsPrepayConstraints", ["aliyunBuyConstraint", "aliyunBuyParser", "aliyunBuyEcsConstraints", "aliyunBuyRemote", "aliyunBuyMsg", function (t, n, r, i, s) {
        function u(t, n) {
            var r = 0;
            return n && n.length > 0 && e.forEach(n, function (e) {
                var n = e.data.produceParams;
                if (n) {
                    var i = n.securityid;
                    i === t && (r += parseInt(e.data.quantity))
                }
            }), r
        }

        var o = {};
        return o.apply = function (e, n) {
            r.apply(e, n);
            var i = e.raw, s = e.options, o = e.value, u = e.price, a = e.detail;
            t.add(e, ["value.networkType"], function () {
                return !0
            }, function () {
                o.networkType == 0 ? (s.vpc.visible = !1, s.bandwidthType.visible = !0, s.bandwidth.visible = !0) : (s.vpc.visible = !0, s.bandwidthType.visible = !1, s.bandwidth.visible = !1), s.vpc.state = s.bandwidth.state = ""
            }), t.add(e, ["value.bandwidth"], function () {
                return !0
            }, function () {
                o.bandwidth == undefined && (o.bandwidth = 1)
            })
        }, o.checkBeforeAddToCart = function (t, n) {
            var r = function () {
                var n = t.optionsValue, r = 0;
                if (!n)return !0;
                var i = n.networkType;
                if (i != "1")return !0;
                var o = n.vpc;
                o = o ? e.fromJson(o) : undefined;
                var u = o ? o[0] : undefined, a = o ? o[1] : undefined;
                if (!u || !a)return !0;
                var f = parseInt(n.amount);
                return e.forEach(t.cartValue, function (e) {
                    var t = e.data, n = e.components;
                    n && n.vm_web_type == "1" && n.vm_vpc_switch_id == u && (r += parseInt(e.data.quantity))
                }), f + r > a ? (s.alert("提示", "您选择的虚拟交换机的可用私有IP为" + a + "个，可购买云服务器数量不能超过" + a + "台。"), !1) : !0
            }, i = function () {
                var n = t.optionsOptions, r = t.optionsValue, i = t.raw ? t.raw.config : undefined;
                if (!r)return !1;
                if (!n)return !1;
                var o = n.amount.max;
                if (!o && o != 0)return !0;
                var u = 0, a = 0;
                e.forEach(t.cartValue, function (e) {
                    var t = e.data;
                    u += parseInt(t.quantity)
                });
                var f = parseInt(r.amount);
                return f + u > o ? (s.alert("提示", "您最多只能选购" + o + "台"), !1) : !0
            }, o = function () {
                var n = t.optionsOptions, r = t.optionsValue;
                if (!r)return !1;
                if (!n)return !1;
                var i = n.security, o = t.optionsDetail.security, a = i.quota.securityGroupMembersLimit, f = e.fromJson(r.security), l = u(f[2], t.cartValue);
                return r.amount + l + o.EcsCount > i.quota.securityGroupMembersLimit ? (s.alert("提示", "您每个安全组最多只能创建" + a + "个实例，当前安全组已有" + o.EcsCount + "个实例。"), !1) : !0
            };
            return r() && i() && o()
        }, o.checkBeforePurchase = function (e, t) {
            var n = function () {
                var t = e.optionsOptions, n = e.optionsValue;
                if (!n)return !1;
                if (!t)return !1;
                var r = t.security, i = e.optionsDetail.security, o = r.quota.securityGroupMembersLimit;
                return n.amount + i.EcsCount > r.quota.securityGroupMembersLimit ? (s.alert("提示", "您每个安全组最多只能创建" + o + "个实例，当前安全组已存在" + i.EcsCount + "个实例。"), !1) : !0
            };
            return n()
        }, o
    }]), i
}), define("aliyun-buy-ecs/module/prepay/ui.ecs.prepay.options", ["angular", "../common/commodityHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/ui/ui.tpl", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.handle", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.local", "aliyun-buy/base/services/service.exception", "aliyun-buy/base/ui/controls/ui.group", "aliyun-buy/base/ui/controls/ui.dialog", "aliyun-buy/base/ui/controls/ui.preloader", "aliyun-buy/base/ui/widgets/ui.region", "aliyun-buy/base/ui/widgets/ui.amount", "aliyun-buy/base/ui/widgets/ui.yundun", "aliyun-buy/base/ui/widgets/ui.orderRoll", "aliyun-buy/base/ui/controls/ui.notice", "../common/service.ecs.filters", "../common/ui.ecs.datadisk", "../common/ui.ecs.bandwidth", "../common/ui.ecs.security", "../common/ui.ecs.zone", "../common/ui.ecs.image", "../common/ui.ecs.imageMarket", "../common/ui.ecs.imageOffline", "../common/ui.ecs.imageFromMarket", "../common/ui.ecs.sysdisk", "../common/ui.ecs.os", "../common/ui.ecs.io", "../common/ui.ecs.instanceType", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./service.ecs.prepay.constraints"], function (e, t, n, r, i) {
    var s = e.module("aliyun.buy.ui.ecs.prepay.options", [].concat(n.getModuleNames(arguments)));
    return s.directive("aliyunBuyEcsPrepayOptions", ["aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceUpdater", "aliyunBuyEcsPrepayConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyPriceQuerier", "aliyunBuyOrderModel", "$timeout", "$filter", function (r, i, s, o, u, a, f, l, c, h, p) {
        return {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsPrepayOptions.html",
            replace: !0,
            scope: {
                value: "=",
                price: "=",
                handle: "=",
                detail: "=",
                options: "=",
                config: "&",
                defaultValue: "&",
                exception: "&",
                cartValue: "="
            },
            compile: function (l, c) {
                return n.require(["value", "price", "handle", "detail", "options"], c), {
                    post: function (c, p, d) {
                        var v, m, g = "vm";
                        n.setDefault(c, {
                            value: {},
                            detail: {},
                            price: {},
                            options: n.createModel("global", "instanceType", "instanceGeneration", "region", "zone", "networkType", "bandwidthType", "vpc", "bandwidth", "security", "imageType", "sysdisk", "datadisk", "password", "os", "customImage", "sharedImage", "imageMarket", "imageOffline", "imageFromMarket", "amount", "duration", "io")
                        }), m = c.options, n.setDefault(m.global, {
                            grouped: !0,
                            showNotice: !0
                        }), n.setDefault(m.instanceGeneration, {
                            name: "ECS_INSTANCE_GENERATION",
                            askTip: {tooltip: "ECS_INSTANCE_TYPE_ASKTIP", target: "_self", spm: "askTipForInstanceType"}
                        }), n.setDefault(m.instanceType, {name: "ECS_INSTANCE_TYPE"}), n.setDefault(m.networkType, {
                            name: "ECS_NETWORK_TYPE",
                            textTip: {text: "ECS_NETWORKTYPE_LINK", spm: "textTipForNetworkType"},
                            askTip: {tooltip: "ECS_NETWORKTYPE_TIP", target: "_self", spm: "askTipForNetworkType"}
                        }), n.setDefault(m.bandwidthType, {
                            name: "ECS_BANDWIDTH_TYPE",
                            askTip: {tooltip: "ECS_BANDWIDTHTYPE_TIP", target: "_self", spm: "askTipForBandwidthType"}
                        }), n.setDefault(m.imageType, {
                            name: "ECS_IMAGE_TYPE",
                            askTip: {tooltip: "ECS_IMAGETYPE_TIP", target: "_self", spm: "askTipForImageType"}
                        }), n.setDefault(m.sharedImage, {
                            name: "ECS_SHARED_IMAGE",
                            placeholder: "ECS_PLEASE_SELECT_SHARED_IMAGE"
                        }), n.setDefault(m.customImage, {
                            name: "ECS_CUSTOM_IMAGE",
                            placeholder: "ECS_PLEASE_SELECT_CUSTOM_IMAGE"
                        }), n.setDefault(m.amount, {
                            unit: "ECS_INSTANCE_UNIT",
                            prodName: "ECS",
                            showLimitMsg: !1
                        }), n.setDefault(m.vpc, {prodName: "ECS"}), n.setDefault(m.imageFromMarket, {fromMarket: !1}), typeof c.config() == "object" && n.config(c.options.global, c.config().global), c.$watch("config().global", function (e) {
                            if (!e)return;
                            n.config(c.options.global, e)
                        }), c.handle = f.create(c), c.$on("aliyunBuy:saveOptions", function (t, n) {
                            var r = e.copy(c.value);
                            i.saveOptions(g, r)
                        }), c.$watch("defaultValue()", function (e) {
                            e && c.handle && c.handle.restore(e)
                        });
                        var y = r.getEcsCommodity(g, "BUY").then(function (u) {
                            var f = c.raw = u;
                            t.constraintForIooptimized(f), v = a.parse(f), c.ready = !0, o.apply(c, v), s.apply(c, r.getEcsBuyPrice);
                            var l = c.defaultValue() || undefined;
                            c.handle.restore(l), i.clearOptions(g), c.$emit("aliyunBuyEcsPrepayOptions:initialized", {raw: e.copy(f)}), n.setDefault(c.options.global, {isCertified: f.config.isCertified}), h(function () {
                                c.$emit("aliyunBuyEcsPrepayOptions:rendered")
                            })
                        }), b = c.exception();
                        b instanceof Function ? y.then(null, b) : u.dialog(y)
                    }
                }
            }
        }
    }]), s
}), define("aliyun-buy-ecs/module/prepay/ui.ecs.prepay", ["angular", "../common/homeConfigHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/ui.tpl", "aliyun-buy/base/ui/ui.subtotal", "aliyun-buy/base/services/service.remote", "../common/ui.ecs.imageMarketPrice", "../common/ui.ecs.cart", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./ui.ecs.prepay.options", "./service.ecs.prepay.constraints"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.prepay", n.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsPrepay", ["aliyunBuyEcsPrepayConstraints", "aliyunBuyRemote", function (t, r, i) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsPrepay.html",
            replace: !0,
            scope: {optionsConfig: "@", optionsDefault: "&"},
            link: function (i) {
                function h() {
                    var t = i.optionsValue, r = i.optionsOptions;
                    if (!t || !r)return;
                    var o = t, h = !1, p = s && s.components ? s.components.vm_region_no.vm_region_no : undefined, d = o && o.region ? o.region : undefined;
                    d && p && p.length > 0 && e.forEach(p, function (e) {
                        e.value === d && (h = e.disabled)
                    }), f = u && !h, l = !r.imageFromMarket.fromMarket, c = l === !1 ? "ECS_REGION_SELL_OUT_TIP" : "";
                    var v, m = r.imageFromMarket && r.imageFromMarket.imageMarketPrice && r.imageFromMarket.imageMarketPrice.price;
                    m && m.extraCode ? v = m.extraCode == "MONEY_LESSTHAN_100" : v = !1;
                    var g = h === !0 ? "ECS_REGION__UNABLE_PURCHASE_TIP" : a;
                    i.subtotalData.value = o, i.subtotalData.options = r, n.config(i.subtotalData, {
                        purchaseAvailable: f && !v,
                        purchaseTip: f === !1 ? g : v ? "ECS_MARKET_IMAGE_UNAVAILABLE_NOT_ENOUGH_BALANCE" : "",
                        addCartAvailable: l,
                        addCartTip: c
                    })
                }

                var s, o = "vm", u, a, f, l, c;
                r.inWhiteUidList().then(function (e) {
                    var t = i.hideAddToCart = e;
                    n.config(i, {subtotalData: {hideAddToCart: t}})
                }), n.config(i, {
                    subtotalData: {
                        productId: o,
                        purchaseAvailable: !1,
                        addCartAvailable: !1,
                        priceTip: "ECS_SUBTOTAL_PRICE_TIP"
                    },
                    cartConfig: {
                        productId: o,
                        itemTpl: "partials/aliyunBuyEcsPrepayCartItem.html",
                        priceShow: !0,
                        priceService: r.getEcsBuyPrice
                    }
                }), i.$on("aliyunBuyEcsPrepayOptions:rendered", function () {
                    i.$broadcast("aliyunBuyEcsPrepay:rendered"), i.$emit("aliyunBuyEcsPrepay:rendered")
                }), i.$on("aliyunBuySubtotal:purchase", function (e, n) {
                    if (!s || f === !1)return;
                    if (!s.config.aliyun_uid) {
                        i.$broadcast("aliyunBuy:saveOptions"), r.login();
                        return
                    }
                    var o = i.optionsHandle;
                    if (!o)return;
                    var u = i.optionsDetail, a = o.validate() && t.checkBeforePurchase(i, s);
                    a && i.$emit("aliyunBuyEcsPrepay:purchase", {order: [o.order()], detail: [u]})
                }), i.$on("aliyunBuyCart:purchase", function (t, n) {
                    if (!s)return;
                    if (!s.config.aliyun_uid) {
                        i.$broadcast("aliyunBuy:saveOptions"), r.login();
                        return
                    }
                    var o = i.cartValue;
                    if (!o)return;
                    var u = [];
                    e.forEach(o, function (e) {
                        e.detail && (u.push(e.detail), delete e.detail), e.price && delete e.price
                    }), i.$emit("aliyunBuyEcsPrepay:purchase", {order: o, detail: u})
                }), i.$on("aliyunBuySubtotal:addToCart", function (o, u) {
                    if (!s || f === !1)return;
                    if (!s.config.aliyun_uid) {
                        i.$broadcast("aliyunBuy:saveOptions"), r.login();
                        return
                    }
                    var a = i.optionsHandle;
                    if (!a)return;
                    var l = i.optionsPrice, c = i.optionsValue, h = a.validate(), p = i.cartHandle, d = i.subtotalHandle, v = e.copy(i.optionsDetail);
                    if (h && p && d && t.checkBeforeAddToCart(i, s)) {
                        p.add(a.order(), l && l.data ? e.copy(l.data) : null, v ? e.copy(v) : null), d.add();
                        var m;
                        c && (m = n.parseJsonSafe(c.password), m && m[0] == "1" && (c.password = ""))
                    }
                }), i.$on("aliyunBuyEcsPrepayOptions:initialized", function (e, t) {
                    s = t.raw;
                    var r = s.config, o, f, l;
                    l = r.regionOpen !== !1, o = r.isCertified !== !1, u = l && o, o ? l || (a = "ECS_UNAVAILABLE_REGION_OPEN_TIP_PREPAY") : a = "ECS_PREPAY_NEEDCERTIFY", n.config(i.subtotalData, {
                        purchaseAvailable: u,
                        purchaseTip: u === !1 ? a : ""
                    })
                }), i.$watch("optionsPrice", function (e) {
                    if (!e)return;
                    var t = e.data, r = e.calculating, s = i.subtotalData, o = e.success;
                    if (o && !t)return;
                    n.config(i.subtotalData, {
                        calculating: r,
                        tradePrice: o ? t.trade : null,
                        originalPrice: o ? t.origin : null,
                        discountPrice: o ? t.discount : 0,
                        strategies: o ? t.strategies : null,
                        flowPrice: o ? t.flow : null
                    })
                }, !0), i.$watch("optionsOptions.security", function (e) {
                    h()
                }, !0), i.$watch("cartValue", function (e) {
                    h()
                }, !0), i.$watch("optionsValue", function (e) {
                    h()
                }, !0), i.$watch("optionsOptions.imageFromMarket.imageMarketPrice.price", function () {
                    h()
                }, !0), i.$watch("optionsDetail", function (e) {
                    if (!e)return;
                    i.subtotalData.detail = e
                }, !0)
            }
        }
    }]), r
}), define("aliyun-buy-ecs/module/prepay/ui.ecs.prepay.orderPreview", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.date", "../common/ui.ecs.orderView", "../../ui.ecs.tpl", "../../ui.ecs.module.styles"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.prepay.orderPreview", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsPrepayOrderPreview", ["aliyunBuyRemote", "aliyunBuyDateParser", function (e, n) {
        function r(e, t, n) {
            e.priceService = "getEcsBuyPrice", e.checked = !0, e.purchase = function () {
                if (!e.checked || !e.recommendValidation)return;
                e.$emit("aliyunBuyEcsPrepayOrderPreview:purchase", {
                    orderData: e.orderData(),
                    promotionCode: e.recommendCode ? e.recommendCode : undefined
                })
            }
        }

        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsPrepayOrderPreview.html",
            replace: !0,
            scope: {orderData: "&", priceOrder: "&", ready: "="},
            compile: function (e, n) {
                return t.require(["price"], n), {post: r}
            }
        }
    }]), n
}), define("aliyun-buy-ecs/module/common/ui.ecs.price", ["angular", "aliyun-buy/base/utils/moduleHelper", "../../ui.ecs.tpl"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.price", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsPrice", [function () {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsPrice.html",
            scope: {data: "&", options: "=?"},
            replace: !0
        }
    }]), n
}), define("aliyun-buy-ecs/module/common/ui.ecs.instanceDetail", ["angular", "./commodityHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.date", "../../ui.ecs.tpl"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.instanceDetail", n.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsInstanceDetail", ["aliyunBuyDateParser", "$filter", function (n, r) {
        function i(e) {
            e.$watch("data()", function (t) {
                if (!t)return;
                s(e, t)
            })
        }

        function s(i, s) {
            var o = s.components, u = s.instanceDetail;
            if (!u)return;
            var a = u.instanceInfo, f = u.orderInfo, l = {}, c = i.context = {};
            f.instance_type && (l = f.instance_type && e.isArray(f.instance_type) && f.instance_type[0]), c.instanceName = a.instanceName, c.region = t.getTextFromCollection(f.vm_region_no, o.vm_region_no.vm_region_no), c.instanceTypeText = t.getTextFromCollection(l.instance_type, o.instance_type.instance_type), c.instanceTypeValue = l.instance_type, c.instanceTypeFamily = t.getTextFromCollection(l.instance_type_family, o.instance_type.instance_type_family), c.instanceGeneration = t.getTextFromCollection(l.instance_generation, o.instance_type.instance_generation), c.iooptimized = t.getTextFromCollection(f.iooptimized, o.iooptimized.iooptimized), c.networkType = t.getTextFromCollection(f.vm_web_type, o.vm_web_type.vm_web_type) || "ECS_CLASSICAL_NETWORK", c.bandwidth = f.vm_web_type == "1" ? undefined : f.vm_bandwidth && f.vm_bandwidth[0] ? f.vm_bandwidth[0].vm_bandwidth : "", c.bandwidthType = f.vm_web_type == "1" ? undefined : f.vm_bandwidth && f.vm_bandwidth[0] && f.vm_bandwidth[0].vm_is_flow_type == "1" ? "ECS_VIA_FLOW" : "ECS_VIA_FIXED_BANDWIDTH", c.privateIp = a.vmPrivateIp, c.publicIp = a.vmPublicIp, c.os = a.osName, c.expiration = n.formatDate("yyyy-MM-dd 00:00", new Date(a.instanceExpireTime)), c.imageProduct = f.vm_os[0] ? f.vm_os[0].vm_os_imageProductCode : undefined, c.baseBandWidth = a.baseBandWidth, c.zone = function () {
                var e;
                return o.vm_iz && o.vm_iz.vm_iz ? e = t.getTextFromCollection(f.vm_iz, o.vm_iz.vm_iz) : e = a.vmIzName, e
            }(), c.datadisk = function () {
                var n = [];
                return e.forEach(f.datadisk, function (e) {
                    var i = "";
                    i += e.datadisk_size + "GB", i += r("aliyunBuyText")(t.getTextFromCollection(e.datadisk_category, o.datadisk.datadisk_category)), n.push(i)
                }), n
            }()
        }

        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsInstanceDetail.html",
            scope: {data: "&"},
            replace: !0,
            link: i
        }
    }]), r
}), define("aliyun-buy-ecs/module/renew/service.ecs.renew.constraints", ["angular", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.constraint", "aliyun-buy/base/services/service.parser"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.service.ecs.renew.constraints", r.getModuleNames(arguments));
    return i.factory("aliyunBuyEcsRenewConstraints", ["aliyunBuyConstraint", "aliyunBuyParser", function (t, n) {
        var r = {};
        return r.apply = function (t, n) {
            var r = t.raw, i = t.options, s = t.value, o = t.price, u = t.detail;
            s.duration = e.toJson([1, "year"], !0), s.renewOnly = !0
        }, r
    }]), i
}), define("aliyun-buy-ecs/module/renew/ui.ecs.renew.options", ["angular", "../common/renewHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.dict", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.handle", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.exception", "aliyun-buy/base/ui/controls/ui.preloader", "aliyun-buy/base/ui/widgets/ui.duration", "aliyun-buy/base/ui/widgets/ui.comboDuration", "../common/ui.ecs.instanceDetail", "../common/service.ecs.filters", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./service.ecs.renew.constraints"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.renew.options", [].concat(n.getModuleNames(arguments)));
    return r.directive("aliyunBuyEcsRenewOptions", ["aliyunBuyRemote", "aliyunBuyDialog", "aliyunBuyPriceUpdater", "aliyunBuyEcsRenewConstraints", "aliyunBuyEcsModifyConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyOrderModel", "aliyunBuyDateParser", "$timeout", function (r, i, s, o, u, a, f, l, c, h, p) {
        function v(i, c, h) {
            var d, v, m;
            n.setDefault(i, {
                value: {},
                detail: {},
                price: {},
                options: n.createModel("global", "duration")
            }), v = i.options, m = i.value, m.instanceId = i.instanceId(), n.setDefault(v.global, {
                showNotice: !0,
                showInstanceInfo: !0,
                autoPrice: !0
            }), n.setDefault(v.duration, {name: "续费时长"}), typeof i.config() == "object" && n.config(i.options.global, i.config().global), i.$watch("config().global", function (e) {
                if (!e)return;
                n.config(i.options.global, e), e.minimized && (v.duration.minimized = !0)
            }), i.$watchCollection("[value.duration, renewStartTime]", function (e) {
                var n = e[0], r = e[1];
                if (!n || !r)return;
                i.newExpirationTime = t.calculateNewExpirationTime(n, r)
            }), i.handle = l.create(i);
            var g = r.getEcsCommodity("vm", "RENEW", i.instanceId()).then(function (n) {
                var a = i.raw = n;
                d = f.parse(a);
                if (u.notAllowRenew(a))return;
                i.ready = !0;
                var l = n.instanceDetail;
                i.instanceDetailView = l ? l.instanceInfo : null, i.renewStartTime = t.getRenewStartTime(a), o.apply(i, d), v.global.autoPrice !== !1 && s.apply(i, r.getEcsRenewPrice), i.$emit("aliyunBuyEcsRenewOptions:initialized", {raw: e.copy(a)}), p(function () {
                    i.$emit("aliyunBuyEcsRenewOptions:rendered")
                })
            }), y = i.exception();
            y instanceof Function ? g.then(null, y) : a.dialog(g)
        }

        var d = {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsRenewOptions.html",
            replace: !0,
            scope: {
                value: "=",
                price: "=",
                handle: "=",
                detail: "=",
                options: "=",
                config: "&",
                exception: "&",
                instanceId: "&"
            },
            compile: function (e, t) {
                return n.require(["value", "price", "handle", "detail", "options"], t), {post: v}
            }
        };
        return d
    }]), r
}), define("aliyun-buy-ecs/module/renew/ui.ecs.renew", ["angular", "aliyun-buy/base/utils/moduleHelper", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "../common/ui.ecs.price", "./ui.ecs.renew.options"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.renew", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsRenew", [function () {
        function n(e) {
            t.setDefault(e, {termsChecked: !0}), e.pay = function () {
                if (e.payDisabled)return;
                var t = e.optionsHandle;
                if (!t)return;
                var n = t.validate();
                if (!n)return;
                e.$emit("aliyunBuyEcsRenew:purchase", {order: [t.order()], detail: [e.optionsDetail]})
            }, e.$watchCollection("[termsChecked, optionsPrice.calculating, optionsPrice.success]", function (t) {
                var n = t[0], r = t[1], i = t[2], s = !1;
                n || (s = !0), r && (s = !0), i || (s = !0), e.payDisabled = s
            })
        }

        var e = {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsRenew.html",
            replace: !0,
            scope: {instanceId: "&", ready: "&"},
            link: n
        };
        return e
    }]), n
}), define("aliyun-buy-ecs/module/common/service.ecs.modifyConstraints", ["angular", "./homeConfigHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote", "./service.ecs.dialogButtonConfig"], function (e, t, n) {
    var r = e.module("aliyun.buy.service.ecs.modify.constraints", n.getModuleNames(arguments));
    return r.factory("aliyunBuyEcsModifyConstraints", ["aliyunBuyMsg", "aliyunBuyEcsDialogButtonConfig", "$filter", function (e, t, n) {
        function r(e) {
            var t = e.config ? e.config : {};
            return t.isCertified === !1 ? !1 : !0
        }

        function i() {
            e.dialog(n("aliyunBuyText")("ECS_PROMPT"), n("aliyunBuyText")("ECS_ERRORTIP_MODIFY_UN_CERTIFIED"), t.linkToCertifiedPage())
        }

        function s(s) {
            if (!s || !s.instanceDetail || !s.instanceDetail.instanceInfo)return !1;
            var o = s.instanceDetail.instanceInfo;
            if (!r(s))return i(), !0;
            if (o.isRenewChange) {
                var u = n("aliyunBuyRenewTimeFormat")(new Date(o.vmRenewChangeEffectiveTime));
                return e.dialog(n("aliyunBuyText")("ECS_PROMPT"), n("aliyunBuyText")("ECS_ERRORTIP_MODIFY_RENEW_CHANGE", u), t.linkToEcsInstancePage()), !0
            }
            return o.chargeType == "AfterPay" ? (e.dialog(n("aliyunBuyText")("ECS_PROMPT"), n("aliyunBuyText")("ECS_ERRORTIP_AFTER_PAY_CANNOT_CHANGE"), t.linkToEcsInstancePage()), !0) : o.isProdFromYunMarket ? (e.dialog(n("aliyunBuyText")("ECS_PROMPT"), n("aliyunBuyText")("ECS_ERRORTIP_MODIFY_YUNMARKET_INSTANCE"), t.linkToEcsInstancePage()), !0) : !1
        }

        function o(s) {
            if (!s || !s.instanceDetail || !s.instanceDetail.instanceInfo)return !1;
            var o = s.instanceDetail.instanceInfo;
            return r(s) ? o.isRenewChange ? (e.dialog(n("aliyunBuyText")("ECS_PROMPT"), n("aliyunBuyText")("ECS_ERRORTIP_YUNDISK_RESIZE_RENEW_CHANGE"), t.linkToEcsDiskPage()), !0) : !1 : (i(), !0)
        }

        function u(s) {
            if (!s || !s.instanceDetail || !s.instanceDetail.orderInfo)return !1;
            var o = s.instanceDetail.orderInfo;
            return r(s) ? o.vm_bandwidth && o.vm_bandwidth[0].vm_is_flow_type == "1" ? (e.dialog(n("aliyunBuyText")("ECS_PROMPT"), n("aliyunBuyText")("ECS_ERRORTIP_BANDWIDTH_TEMPUPGRADE_FLOW_TYPE"), t.linkToEcsInstancePage()), !0) : o.vm_web_type && o.vm_web_type == "1" ? (e.dialog(n("aliyunBuyText")("ECS_PROMPT"), n("aliyunBuyText")("ECS_ERRORTIP_BANDWIDTH_TEMPUPGRADE_VPC_TYPE"), t.linkToEcsInstancePage()), !0) : !1 : (i(), !0)
        }

        function a(s) {
            if (!s || !s.instanceDetail)return !0;
            var o = s.instanceDetail.instanceInfo;
            return r(s) ? o.chargeType == "AfterPay" ? (e.dialog(n("aliyunBuyText")("ECS_PROMPT"), n("aliyunBuyText")("ECS_ERRORTIP_AFTER_PAY_CANNOT_RENEW"), t.linkToEcsInstancePage()), !0) : !1 : (i(), !0)
        }

        return {
            notAllowDowngradeAndUpgrade: s,
            notAllowYundiskResize: o,
            notAllowBandwidthTempUpgrade: u,
            notAllowRenew: a
        }
    }]), r
}), define("aliyun-buy-ecs/module/downgrade/service.ecs.downgrade.constraints", ["angular", "../common/constants/ecsBuyCons", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.constraint", "aliyun-buy/base/services/service.parser", "../common/service.ecs.constraints"], function (e, t, n, r, i) {
    function o(e) {
        return e < 10 ? "0" + e : e
    }

    var s = e.module("aliyun.buy.service.ecs.downgrade.constraints", i.getModuleNames(arguments));
    return s.factory("aliyunBuyEcsDowngradeConstraints", ["aliyunBuyConstraint", "aliyunBuyParser", "aliyunBuyEcsConstraints", "aliyunBuyRemote", "aliyunBuyMsg", function (n, r, i, s, o) {
        var u = {};
        return u.apply = function (r, s) {
            i.apply(r, s);
            var o = r.raw, u = o.instanceDetail, a = u ? u.instanceInfo : undefined, f = u ? u.orderInfo : undefined, l = r.options, c = r.value, h = r.price, p = r.detail, d = t.DiskCategory;
            c.duration = e.toJson([1, "year"], !0), c.renewOnly = !1, function () {
                if (f && f.datadisk && f.datadisk.length >= 0) {
                    var t = 0;
                    e.forEach(f.datadisk, function (e) {
                        if (e.datadisk_category == d.cloud || e.datadisk_category == d.cloudSSD || e.datadisk_category == d.cloudEfficiency)t = 1
                    }), t || (l.datadisk.visible = !1)
                }
            }(), u && u.orderInfo && u.orderInfo.vm_web_type == 1 ? (l.bandwidth.visible = !1, l.bandwidthType.visible = !1, c.networkType = 1) : (l.bandwidth.visible = !0, l.bandwidthType.visible = !0, c.networkType = 0), a && a.isLocalOfSystemDisk && (l.instanceType.visible = !1, l.global.isLocalOfSystemDisk = !0);
            if (a) {
                var v = a.renewRestartStartTime, m = a.renewRestartEndTime;
                v && m && (l.restartTime.min = new Date(v), l.restartTime.max = new Date(m))
            }
            n.add(r, ["value.bandwidth", "value.bandwidthType"], function () {
                return !c || c.bandwidth == undefined ? !1 : f ? c.bandwidthType == "1" ? !1 : r.originalValue ? !0 : !1 : !1
            }, function () {
                var e = a.baseBandWidth / 1024;
                c.bandwidth > e && (l.bandwidth.max = e)
            }), n.add(r, ["value.instanceType", "value.bandwidth", "originalValue"], function () {
                return r.originalValue ? !0 : !1
            }, function () {
                var e = r.originalValue;
                c.instanceType != e.instanceType ? (l.restartTime.visible = !0, c.requireRestart = !0) : (l.restartTime.visible = !1, c.restartTime = null, c.requireRestart = !1)
            })
        }, u
    }]), s
}), define("aliyun-buy-ecs/module/downgrade/ui.ecs.downgrade.options", ["angular", "../common/renewHelper", "../common/instanceHelper", "../common/constants/ecsBuyCons", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.handle", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.exception", "aliyun-buy/base/ui/controls/ui.preloader", "aliyun-buy/base/ui/widgets/ui.amount", "aliyun-buy/base/ui/controls/ui.notice", "aliyun-buy/base/ui/controls/ui.timepicker", "aliyun-buy/base/ui/widgets/bricks/ui.tabsBrick", "aliyun-buy/base/ui/widgets/ui.duration", "aliyun-buy/base/ui/widgets/ui.restartTime", "../common/service.ecs.filters", "../common/ui.ecs.datadisk", "../common/ui.ecs.instanceDetail", "../common/service.ecs.modifyConstraints", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./service.ecs.downgrade.constraints"], function (e, t, n, r, i, s, o) {
    var u = e.module("aliyun.buy.ui.ecs.downgrade.options", [].concat(i.getModuleNames(arguments)));
    return u.directive("aliyunBuyEcsDowngradeOptions", ["aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceUpdater", "aliyunBuyEcsDowngradeConstraints", "aliyunBuyEcsModifyConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyOrderModel", "aliyunBuyMsg", "$timeout", "$filter", function (s, o, u, a, f, l, c, h, p, d, v, m) {
        function y(o, p, d) {
            var m, g, y;
            i.setDefault(o, {
                value: {},
                detail: {},
                price: {},
                options: i.createModel("global", "instanceType", "bandwidthType", "bandwidth", "datadisk", "duration", "restartTime")
            }), g = o.options, y = o.value, y.instanceId = o.instanceId(), i.setDefault(g.instanceType, {name: "ECS_INSTANCE_TYPE"}), i.setDefault(g.global, {
                showNotice: !0,
                showInstanceInfo: !0,
                autoPrice: !0
            }), i.setDefault(g.bandwidthType, {name: "ECS_BANDWIDTH_TYPE"}), i.setDefault(g.duration, {name: "ECS_RENEW_DURATION"}), i.setDefault(g.restartTime, {name: "ECS_RESTART_TIME"}), typeof o.config() == "object" && i.config(o.options.global, o.config().global), o.$watch("config().global", function (e) {
                if (!e)return;
                i.config(o.options.global, e)
            }), o.$watchCollection("[value.duration, renewStartTime]", function (e) {
                var n = e[0], r = e[1];
                if (!n || !r)return;
                o.newExpirationTime = t.calculateNewExpirationTime(n, r)
            }), o.handle = h.create(o);
            var b = s.getEcsCommodity("vm", "RENEW", o.instanceId()).then(function (i) {
                var l = o.raw = i;
                m = c.parse(l);
                if (f.notAllowDowngradeAndUpgrade(l))return;
                var h = n.hasCloudSSD(l.instanceDetail), p = r.DiskCategory;
                y.datadiskCategory = h ? p.cloudSSD : undefined, o.ready = !0;
                var d = i.instanceDetail;
                o.instanceDetailView = d ? d.instanceInfo : null, o.renewStartTime = t.getRenewStartTime(l), a.apply(o, m), g.global.autoPrice !== !1 && u.apply(o, s.getEcsRenewPrice), o.$emit("aliyunBuyEcsDowngradeOptions:initialized", {raw: e.copy(l)});
                if (d) {
                    var b = {components: d.orderInfo};
                    o.originalValue = c.parseView(l, b)
                }
                v(function () {
                    o.handle.restore(b), o.$emit("aliyunBuyEcsDowngradeOptions:rendered")
                })
            }), w = o.exception();
            w instanceof Function ? b.then(null, w) : l.dialog(b)
        }

        var g = {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsDowngradeOptions.html",
            replace: !0,
            scope: {
                value: "=",
                price: "=",
                handle: "=",
                detail: "=",
                options: "=",
                config: "&",
                defaultValue: "&",
                exception: "&",
                instanceId: "&"
            },
            compile: function (e, t) {
                return i.require(["value", "price", "handle", "detail", "options"], t), {post: y}
            }
        };
        return g
    }]), u
}), define("aliyun-buy-ecs/module/downgrade/ui.ecs.downgrade", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.dialog", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "../common/ui.ecs.price", "./ui.ecs.downgrade.options"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.downgrade", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsDowngrade", ["aliyunBuyDialog", function (e) {
        function r(n) {
            t.setDefault(n, {termsChecked: !0}), n.pay = function () {
                if (n.payDisabled)return;
                var t = n.optionsHandle;
                if (!t)return;
                var r = t.validate();
                if (!r)return;
                var i = n.optionsValue;
                if (!i)return;
                if (i.requireRestart)var s = e.open({
                    templateUrl: "partials/aliyunBuyEcsRenewConfimDlg.html",
                    controller: ["$scope", function (e) {
                        e.confirmPurchase = function () {
                            n.$emit("aliyunBuyEcsDowngrade:purchase", {
                                order: [t.order()],
                                detail: [n.optionsDetail]
                            }), s.close()
                        }
                    }]
                }); else n.$emit("aliyunBuyEcsDowngrade:purchase", {order: [t.order()], detail: [n.optionsDetail]})
            }, n.$watchCollection("[termsChecked, optionsPrice.calculating, optionsPrice.success]", function (e) {
                var t = e[0], r = e[1], i = e[2], s = !1;
                t || (s = !0), r && (s = !0), i || (s = !0), n.payDisabled = s
            })
        }

        var n = {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsDowngrade.html",
            replace: !0,
            scope: {instanceId: "&", ready: "&"},
            link: r
        };
        return n
    }]), n
}), define("aliyun-buy-ecs/module/upgrade/ui.ecs.bandwidthUpgradeForever", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.configurable", "aliyun-buy/base/ui/controls/ui.checkbox", "aliyun-buy/base/ui/controls/ui.floats", "../../ui.ecs.tpl"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.bandwidthUpgradeForever", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsBandwidthUpgradeForever", ["aliyunBuyConfigurable", "$filter", function (e, n) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsBandwidthUpgradeForevey.html",
            scope: {options: "=", value: "=", detail: "=", config: "&"},
            replace: !0,
            compile: function (n, r) {
                return t.require(["options", "value", "detail"], r), {
                    post: function (n, r, i) {
                        e.apply(n), t.setDefault(n, {
                            detail: {},
                            options: {},
                            display: "ECS_BANWIDTH_UPGRADE_FOREVER_INTRODUCE"
                        }), t.setDefault(n.options, {name: ""})
                    }
                }
            }
        }
    }]), n
}), define("aliyun-buy-ecs/module/upgrade/service.ecs.upgrade.constraints", ["angular", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.constraint", "aliyun-buy/base/services/service.parser", "../common/service.ecs.constraints"], function (e, t, n, r) {
    function s(e) {
        return e < 10 ? "0" + e : e
    }

    var i = e.module("aliyun.buy.service.ecs.upgrade.constraints", r.getModuleNames(arguments));
    return i.factory("aliyunBuyEcsUpgradeConstraints", ["aliyunBuyConstraint", "aliyunBuyParser", "aliyunBuyEcsConstraints", "aliyunBuyRemote", "aliyunBuyMsg", function (e, t, n, r, i) {
        var s = {};
        return s.apply = function (t, r) {
            n.apply(t, r);
            var i = t.raw, s = i.instanceDetail, o = s ? s.instanceInfo : undefined, u = s ? s.orderInfo : undefined, a = t.options, f = t.value, l = t.price, c = t.detail, h = u && u.vm_web_type == "1";
            o && o.isLocalOfSystemDisk && (a.instanceType.visible = !1, a.global.isLocalOfSystemDisk = !0), e.add(t, ["value.bandwidth"], function () {
                return !f || f.bandwidth == undefined ? !1 : f.bandwidthType == "1" ? !1 : o ? !0 : !1
            }, function () {
                var e = o.maxBandWidth / 1024;
                f.bandwidth < e && (a.bandwidth.min = e)
            }), e.add(t, ["value.bandwidthType"], function () {
                return f.bandwidthType ? !0 : !1
            }, function () {
                f.bandwidthType == "1" ? a.bandwidthUpgradeForever.visible = !1 : a.bandwidthUpgradeForever.visible = !0
            }), e.add(t, ["value.bandwidthType"], function () {
                return !0
            }, function () {
                h ? (a.bandwidthUpgradeForever.visible = !1, a.bandwidth.visible = !1, f.networkType = 1) : f.bandwidthType == 1 ? (a.bandwidthUpgradeForever.visible = !1, a.bandwidth.visible = !0, f.networkType = 0) : f.bandwidthType == 5 && (a.bandwidthUpgradeForever.visible = !0, a.bandwidth.visible = !1, f.networkType = 0)
            }), e.add(t, ["value.bandwidthUpgradeForever"], function () {
                return h ? !1 : !0
            }, function () {
                f.bandwidthUpgradeForever ? a.bandwidth.visible = !0 : a.bandwidth.visible = !1
            }), e.add(t, ["value.instanceType", "value.bandwidth", "originalValue"], function () {
                return t.originalValue ? !0 : !1
            }, function () {
                var e = t.originalValue;
                f.instanceType != e.instanceType || !o.vmPublicIp && f.bandwidth > 0 ? f.requireRestart = !0 : f.requireRestart = !1
            })
        }, s
    }]), i
}), define("aliyun-buy-ecs/module/upgrade/ui.ecs.upgrade.options", ["angular", "../common/renewHelper", "../common/instanceHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.handle", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.exception", "aliyun-buy/base/ui/controls/ui.preloader", "aliyun-buy/base/ui/widgets/ui.amount", "aliyun-buy/base/ui/controls/ui.notice", "aliyun-buy/base/ui/controls/ui.timepicker", "aliyun-buy/base/ui/widgets/bricks/ui.tabsBrick", "aliyun-buy/base/ui/widgets/ui.duration", "aliyun-buy/base/ui/widgets/ui.restartTime", "../common/service.ecs.filters", "../common/ui.ecs.datadisk", "../common/ui.ecs.instanceDetail", "../common/service.ecs.modifyConstraints", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./ui.ecs.bandwidthUpgradeForever", "./service.ecs.upgrade.constraints"], function (e, t, n, r, i, s) {
    var o = e.module("aliyun.buy.ui.ecs.upgrade.options", [].concat(r.getModuleNames(arguments)));
    return o.directive("aliyunBuyEcsUpgradeOptions", ["aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceUpdater", "aliyunBuyEcsUpgradeConstraints", "aliyunBuyEcsModifyConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyOrderModel", "$timeout", function (n, i, s, o, u, a, f, l, c, h) {
        function d(i, c, p) {
            function y() {
                var e = i.originalValue;
                if (!e)return;
                var t = !1;
                i.originalValue.bandwidth == m.bandwidth && i.originalValue.instanceType == m.instanceType && (t = !0), t ? i.price.state = "currentConfiguration" : i.price.state = null
            }

            var d, v, m;
            r.setDefault(i, {
                value: {},
                detail: {},
                price: {},
                options: r.createModel("global", "instanceType", "bandwidthType", "bandwidth", "datadisk", "duration", "bandwidthUpgradeForever", "restartTime")
            }), v = i.options, m = i.value, m.instanceId = i.instanceId(), r.setDefault(v.instanceType, {name: "ECS_INSTANCE_TYPE"}), r.setDefault(v.global, {
                showNotice: !0,
                showInstanceInfo: !0,
                autoPrice: !0,
                batchMode: !1
            }), r.setDefault(v.bandwidthType, {
                name: "带宽类型",
                visible: !1
            }), r.setDefault(v.duration, {name: "续费时长"}), r.setDefault(v.restartTime, {name: "预约重启时间"}), typeof i.config() == "object" && r.config(i.options.global, i.config().global), i.$watch("config().global", function (e) {
                if (!e)return;
                r.config(i.options.global, e)
            }), i.$watchCollection("[value.duration, renewStartTime]", function (e) {
                var n = e[0], r = e[1];
                if (!n || !r)return;
                i.newExpirationTime = t.calculateNewExpirationTime(n, r)
            }), i.handle = l.create(i);
            var g = n.getEcsCommodity("vm", "UPGRADE", i.instanceId()).then(function (r) {
                var a = i.raw = r;
                d = f.parse(a);
                if (u.notAllowDowngradeAndUpgrade(a))return;
                i.ready = !0;
                var l = r.instanceDetail;
                i.instanceDetailView = l ? l.instanceInfo : null, i.renewStartTime = t.getRenewStartTime(a), o.apply(i, d), v.global.autoPrice !== !1 && s.apply(i, n.getEcsUpgradePrice), i.$emit("aliyunBuyEcsUpgradeOptions:initialized", {raw: e.copy(a)});
                if (l) {
                    var c = {components: l.orderInfo};
                    i.originalValue = f.parseView(a, c)
                }
                h(function () {
                    i.handle.restore(c), i.$emit("aliyunBuyEcsUpgradeOptions:rendered")
                })
            });
            i.$watch("value", y, !0);
            var b = i.exception();
            b instanceof Function ? g.then(null, b) : a.dialog(g)
        }

        var p = {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsUpgradeOptions.html",
            replace: !0,
            scope: {
                value: "=",
                price: "=",
                handle: "=",
                detail: "=",
                options: "=",
                config: "&",
                defaultValue: "&",
                exception: "&",
                instanceId: "&"
            },
            compile: function (e, t) {
                return r.require(["value", "price", "handle", "detail", "options"], t), {post: d}
            }
        };
        return p
    }]), o
}), define("aliyun-buy-ecs/module/upgrade/ui.ecs.upgrade", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.dialog", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "../common/ui.ecs.price", "./ui.ecs.upgrade.options"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.upgrade", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsUpgrade", ["aliyunBuyDialog", function (e) {
        function r(n) {
            t.setDefault(n, {termsChecked: !0}), n.pay = function () {
                if (n.payDisabled)return;
                var t = n.optionsHandle;
                if (!t)return;
                var r = t.validate();
                if (!r)return;
                var i = n.optionsValue;
                if (!i)return;
                var s = e.open({
                    templateUrl: "partials/aliyunBuyEcsUpgradeConfimDlg.html",
                    controller: ["$scope", function (e) {
                        e.confirmPurchase = function () {
                            n.$emit("aliyunBuyEcsUpgrade:purchase", {
                                order: [t.order()],
                                detail: [n.optionsDetail]
                            }), s.close()
                        }
                    }]
                })
            }, n.$watchCollection("[termsChecked, optionsPrice.calculating, optionsPrice.success, optionsPrice.state]", function (e) {
                var t = e[0], r = e[1], i = e[2], s = e[3], o = !1;
                t || (o = !0), r && (o = !0), i || (o = !0), s && (o = !0), n.payDisabled = o
            })
        }

        var n = {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsUpgrade.html",
            replace: !0,
            scope: {instanceId: "&", ready: "&"},
            link: r
        };
        return n
    }]), n
}), define("aliyun-buy-ecs/module/bandwidthTempUpgrade/service.ecs.bandwidthTempUpgrade.constraints", ["angular", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.constraint", "aliyun-buy/base/services/service.parser", "../common/service.ecs.constraints"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.service.ecs.bandwidthTempUpgrade.constraints", r.getModuleNames(arguments));
    return i.factory("aliyunBuyEcsBandwidthTempUpgradeConstraints", ["aliyunBuyConstraint", "aliyunBuyParser", "aliyunBuyEcsConstraints", "aliyunBuyRemote", "aliyunBuyMsg", function (e, t, n, r, i) {
        var s = {};
        return s.apply = function (t, r) {
            n.apply(t, r);
            var i = t.raw, s = i.instanceDetail, o = s ? s.instanceInfo : undefined, u = s ? s.orderInfo : undefined, a = t.options, f = t.value, l = t.price, c = t.detail;
            e.add(t, ["value.bandwidth"], function () {
                return o.vmPublicIp ? !1 : !0
            }, function () {
                f.bandwidth > 0 ? f.requireRestart = !0 : f.requireRestart = !1
            })
        }, s
    }]), i
}), define("aliyun-buy-ecs/module/bandwidthTempUpgrade/ui.ecs.bandwidthTempUpgrade.options", ["angular", "../common/renewHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.handle", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.exception", "aliyun-buy/base/ui/controls/ui.preloader", "aliyun-buy/base/ui/widgets/ui.amount", "aliyun-buy/base/ui/controls/ui.notice", "aliyun-buy/base/ui/controls/ui.timepicker", "aliyun-buy/base/ui/widgets/bricks/ui.tabsBrick", "aliyun-buy/base/services/service.date", "../common/service.ecs.filters", "../common/ui.ecs.datadisk", "../common/ui.ecs.instanceDetail", "../common/ui.ecs.bandwidthHistory", "../common/service.ecs.modifyConstraints", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./service.ecs.bandwidthTempUpgrade.constraints"], function (e, t, n, r, i) {
    var s = e.module("aliyun.buy.ui.ecs.bandwidthTempUpgrade.options", [].concat(n.getModuleNames(arguments)));
    return s.directive("aliyunBuyEcsBandwidthTempUpgradeOptions", ["aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceUpdater", "aliyunBuyEcsBandwidthTempUpgradeConstraints", "aliyunBuyEcsModifyConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyOrderModel", "aliyunBuyDateParser", "$timeout", "$filter", function (t, r, i, s, o, u, a, f, l, c, h, p) {
        function v(r, l, d) {
            function y() {
                if (!value.upgradeStartTime || !value.upgradeEndTime)return;
                r.upgradeDays = Math.floor((value.upgradeEndTime.getTime() - value.upgradeStartTime.getTime()) / 864e5), r.upgradeStartTimeNextDay = new Date(value.upgradeStartTime.getTime() + 864e5), r.upgradeEndTimePrevDay = new Date(value.upgradeEndTime.getTime() - 864e5), r.upgradeDays <= 0 ? (m.state = "error", m.stateMessage = "START_TIME_CANNOT_BE_BIGGER_THAN_END_TIME") : r.price.code == "BANDWIDTH_NOT_ALLOW_LESSTHEN_EXISTED" && r.price.calculating == 0 ? (m.state = "error", m.stateMessage = p("aliyunBuyText")("ECS_BANDWIDTH_UPGRADE_CONFLICT_TIP", value.bandwidth)) : (m.state = "", r.price.state = "", m.stateMessage = "")
            }

            var v, m;
            n.setDefault(r, {
                value: {},
                detail: {},
                price: {},
                options: n.createModel("global", "bandwidth")
            }), m = r.options, value = r.value, value.instanceId = r.instanceId(), n.setDefault(m.global, {
                showNotice: !0,
                showInstanceInfo: !0,
                showBandwidthHistory: !0,
                autoPrice: !0,
                batchMode: !1
            }), typeof r.config() == "object" && n.config(r.options.global, r.config().global), r.$watch("config().global", function (e) {
                if (!e)return;
                n.config(r.options.global, e)
            }), r.handle = f.create(r), r.formatDate = function (e) {
                return e ? c.formatDate("yyyy-MM-dd", e) : ""
            }, r.$watchCollection("[value.upgradeStartTime, value.upgradeEndTime, value.bandwidth]", y), r.$watch("price", y, !0);
            var g = t.getEcsCommodity("bandwidth_increce", "INCREASE_UPGRADE", r.instanceId()).then(function (n) {
                var u = r.raw = n;
                v = a.parse(u);
                if (r.options.global.batchMode) {
                    r.ready = !0;
                    return
                }
                if (o.notAllowBandwidthTempUpgrade(u))return;
                r.ready = !0;
                var f = n.instanceDetail, l = f ? f.instanceInfo : null;
                if (l) {
                    var c = new Date(l.currentTime) || "";
                    r.currentTime = new Date(c.getFullYear(), c.getMonth(), c.getDate()), r.bandwidthTempUpgradeEndTime = new Date(l.bandwidthTempUpgradeEndTime) || "", value.upgradeStartTime = r.currentTime, value.upgradeEndTime = r.bandwidthTempUpgradeEndTime
                }
                s.apply(r, v), m.global.autoPrice !== !1 && i.apply(r, t.getEcsUpgradePrice), r.$emit("aliyunBuyEcsBandwidthTempUpgradeOptions:initialized", {raw: e.copy(u)});
                var p = {components: f.orderInfo};
                r.originalValue = a.parseView(u, p), h(function () {
                    r.handle.restore(p), r.$emit("aliyunBuyEcsBandwidthTempUpgradeOptions:rendered")
                })
            });
            t.getEcsCommodity("vm", "UPGRADE", r.instanceId()).then(function (e) {
                r.instanceRaw = e
            });
            var b = r.exception();
            b instanceof Function ? g.then(null, b) : u.dialog(g)
        }

        var d = {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsBandwidthTempUpgradeOptions.html",
            replace: !0,
            scope: {
                value: "=",
                price: "=",
                handle: "=",
                detail: "=",
                options: "=",
                currentTime: "=?",
                bandwidthTempUpgradeEndTime: "=?",
                currentTimeNextDay: "=?",
                bandwidthTempUpgradeEndTimePrevDay: "=?",
                config: "&",
                defaultValue: "&",
                exception: "&",
                instanceId: "&"
            },
            compile: function (e, t) {
                return n.require(["value", "price", "handle", "detail", "options"], t), {post: v}
            }
        };
        return d
    }]), s
}), define("aliyun-buy-ecs/module/bandwidthTempUpgrade/ui.ecs.bandwidthTempUpgrade", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.dialog", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "../common/ui.ecs.price", "./ui.ecs.bandwidthTempUpgrade.options"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.bandwidthTempUpgrade", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsBandwidthTempUpgrade", ["aliyunBuyDialog", function (e) {
        function r(n) {
            t.setDefault(n, {termsChecked: !0}), n.pay = function () {
                if (n.payDisabled)return;
                var t = n.optionsHandle;
                if (!t)return;
                var r = t.validate();
                if (!r)return;
                var i = n.optionsValue;
                if (!i)return;
                var s = e.open({
                    templateUrl: "partials/aliyunBuyEcsBandwidthTempUpgradeConfimDlg.html",
                    controller: ["$scope", function (e) {
                        e.confirmPurchase = function () {
                            n.$emit("aliyunBuyEcsBandwidthTempUpgrade:purchase", {
                                order: [t.order()],
                                detail: [n.optionsDetail]
                            }), s.close()
                        }
                    }]
                })
            }, n.$watchCollection("[termsChecked, optionsPrice.calculating, optionsPrice.success, optionsPrice.state, options.state]", function (e) {
                var t = e[0], r = e[1], i = e[2], s = e[3], o = e[4], u = !1;
                t || (u = !0), s && (u = !0), o && (u = !0), r && (u = !0), i || (u = !0), n.payDisabled = u
            })
        }

        var n = {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsBandwidthTempUpgrade.html",
            replace: !0,
            scope: {instanceId: "&", ready: "&"},
            link: r
        };
        return n
    }]), n
}), define("aliyun-buy-ecs/module/common/ui.ecs.passwordInput", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.tip"], function (e, t) {
    return e.module("aliyun.buy.ui.ecs.passwordInput", []).directive("aliyunBuyEcsPasswordInput", [function () {
        return {
            restrict: "AE",
            replace: !0,
            scope: {passwords: "@", needLogin: "=", ngModel: "=", tip: "@", value: "=", error: "=", login: "="},
            templateUrl: "partials/aliyunBuyEcsPasswordInput.html",
            link: function (t, n, r) {
                e.extend(t, {
                    blur: function () {
                        t.$emit("todoPasswordChange")
                    }
                }), t.$on("passowdChange", function () {
                    var n = t.passwords.split("|"), i = t.$parent[n[0]], s = /^[a-zA-Z\d-&:;'<>,=%`~!@#\(\)\$\^\*\+\|\{\}\[\]\.\?\/]{8,30}$/, o = 3, u = {
                        reg_number: /(?=.*[0-9].*)/,
                        reg_capital: /(?=.*[A-Z].*)/,
                        reg_lowercase: /(?=.*[a-z].*)/,
                        reg_character: /(?=.*[-&:;'<>,=%`~!@#\(\)\$\^\*\+\|\{\}\[\]\.\?\/].*)/
                    }, a = 0;
                    e.forEach(u, function (e, t) {
                        e.test(i) && a++
                    });
                    var f = a >= o;
                    !s.test(i) || !f ? (r.ngModel == n[0] && (t._error = "ECS_PASSWORD_EXP_ERROR"), t.value = undefined) : t.$parent[n[0]] != t.$parent[n[1]] && (r.ngModel == n[1] && (t._error = "ECS_PASSWORD_REPEAT_ERROR"), t.value = undefined), s.test(i) && f && t.$parent[n[0]] == t.$parent[n[1]] && !e.isUndefined(t.$parent[n[0]]) && !e.isUndefined(t.$parent[n[1]]) && (t._error = !1, t.value = t.ngModel)
                })
            }
        }
    }])
}), define("aliyun-buy-ecs/module/common/ui.ecs.password", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.buttontab", "aliyun-buy/base/ui/controls/ui.passwordInput", "aliyun-buy/base/services/service.configurable", "./ui.ecs.passwordInput", "../../ui.ecs.tpl"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.password", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsPassword", ["$filter", "aliyunBuyRemote", "aliyunBuyConfigurable", function (n, r, i) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsPassword.html",
            scope: {value: "=", options: "=", config: "&", reversalInstName: "@"},
            replace: !0,
            link: function (s) {
                i.apply(s), t.setDefault(s, {
                    valueObject: {},
                    options: {}
                }), t.setDefault(s.options, {
                    name: "ECS_SET_PASSWORD",
                    items: [{text: "ECS_SET_NOW", value: "1"}, {text: "ECS_SET_AFTER_CREATED", value: "2"}],
                    preSetTip: "ECS_PASSWORD_PRESET_TIP",
                    afterSetTip: "ECS_PASSWORD_AFTERSET_TIP"
                }), s.$watch("valueObject", function (e) {
                    var t = e.type == "1" ? e.password : undefined, r = e.type == "1" ? e.instance : undefined;
                    s.value = n("json")([e.type, t, r])
                }, !0), s.$watch("value", function (t) {
                    if (!t || t == "[]")s.valueObject.type = "1", s.password1 = "", s.password2 = "", s.valueObject.password = "", s.valueObject.instance = "", s.value = e.toJson(["1", null, null], !0);
                    s.options.state = ""
                }), s.login = function () {
                    s.$emit("aliyunBuy:saveOptions"), r.login()
                }, s.$watch("options.os", function (e) {
                    e = t.parseJsonSafe(e);
                    var n = e ? e[1] : "";
                    n == "windows" ? s.username = "administrator" : n == "linux" ? s.username = "root" : n || (s.username = "")
                }), s.instanceValidate = !0, s.blur = function () {
                    s.instanceValidate = !0;
                    if (!s.valueObject.instance || s.valueObject.instance.length == 0)return s.value = n("json")([s.valueObject.type, s.valueObject.password, undefined]);
                    /^[a-zA-Z\u4e00-\u9fa5][\u4e00-\u9fa5\d\.\w\-]{1,127}$/.test(s.valueObject.instance) || (s.instanceValidate = !1, s.value = n("json")([s.valueObject.type, s.valueObject.password, !1]))
                }, s.focus = function () {
                    s.instanceValidate = !0
                }, s.$on("todoPasswordChange", function () {
                    s.options.state = "", s.$broadcast("passowdChange")
                })
            }
        }
    }]), n
}), define("aliyun-buy-ecs/module/changeOs/service.ecs.changeOs.constraints", ["angular", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.constraint", "aliyun-buy/base/services/service.parser", "../common/service.ecs.constraints"], function (e, t, n, r) {
    function s(e) {
        return e < 10 ? "0" + e : e
    }

    var i = e.module("aliyun.buy.service.ecs.changeOs.constraints", r.getModuleNames(arguments));
    return i.factory("aliyunBuyEcsChangeOsConstraints", ["aliyunBuyConstraint", "aliyunBuyParser", "aliyunBuyEcsConstraints", "aliyunBuyRemote", "aliyunBuyMsg", function (t, n, r, i, s) {
        var o = {};
        return o.apply = function (n, i) {
            r.apply(n, i);
            var s = n.raw, o = s.instanceDetail, u = o ? o.orderInfo : undefined, a = n.options, f = n.value, l = n.price, c = n.detail;
            t.add(n, ["value.region", "value.os"], function () {
                return f.region && f.os ? !0 : !1
            }, function () {
                var t = e.copy(f), n = e.fromJson(t.os)[1];
                t.OSType = n;
                var r = i.getCollection("OSType", t);
                e.isArray(r) && r.length == 1 && (f.supportedOSType = r[0] && r[0].value)
            })
        }, o
    }]), i
}), define("aliyun-buy-ecs/module/changeOs/ui.ecs.changeOs.options", ["angular", "../common/renewHelper", "../common/imageMarketHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.handle", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.exception", "aliyun-buy/base/ui/controls/ui.preloader", "aliyun-buy/base/ui/widgets/ui.amount", "aliyun-buy/base/ui/controls/ui.notice", "aliyun-buy/base/ui/widgets/bricks/ui.tabsBrick", "../common/service.ecs.filters", "../common/ui.ecs.password", "../common/ui.ecs.instanceDetail", "../common/ui.ecs.image", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./service.ecs.changeOs.constraints"], function (e, t, n, r, i, s) {
    var o = e.module("aliyun.buy.ui.ecs.changeOs.options", [].concat(r.getModuleNames(arguments)));
    return o.directive("aliyunBuyEcsChangeOsOptions", ["aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceUpdater", "aliyunBuyEcsChangeOsConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyOrderModel", "$timeout", "$filter", function (n, i, s, o, u, a, f, l, c, h) {
        function d(i, l, h) {
            var p, d, v, m;
            r.setDefault(i, {
                value: {},
                detail: {},
                price: {},
                options: r.createModel("global", "imageType", "os", "customImage", "imageMarket", "imageFromMarket", "sharedImage", "imageOffline", "password", "sysdisk")
            }), d = i.options, v = i.value, i.price = d.imageFromMarket, v.instanceId = i.instanceId(), v.token = i.token(), r.setDefault(d.global, {
                showNotice: !0,
                showInstanceInfo: !0
            }), r.setDefault(d.imageType, {name: "ECS_IMAGE_TYPE"}), r.setDefault(d.sharedImage, {
                name: "ECS_SHARED_IMAGE",
                placeholder: "ECS_PLEASE_SELECT_SHARED_IMAGE"
            }), r.setDefault(d.customImage, {
                name: "ECS_CUSTOM_IMAGE",
                placeholder: "ECS_PLEASE_SELECT_CUSTOM_IMAGE"
            }), typeof i.config() == "object" && r.config(i.options.global, i.config().global), i.$watch("config().global", function (e) {
                if (!e)return;
                r.config(i.options.global, e)
            }), i.$watchCollection("[value.duration, renewStartTime]", function (e) {
                var n = e[0], r = e[1];
                if (!n || !r)return;
                i.newExpirationTime = t.calculateNewExpirationTime(n, r)
            }), i.handle = f.create(i);
            var g = n.getEcsCommodity("vm", "CHANGEOS", i.instanceId(), i.token()).then(function (t) {
                var r = i.raw = t;
                p = a.parse(r), i.ready = !0, o.apply(i, p);
                var u = r.instanceDetail.instanceInfo;
                i.price.chargeType = u.chargeType;
                var f = !0;
                u.chargeType == "Prepaid" && u.isRenewChange === !0 && (f = !1), i.price.needQueryPrice = f, f && s.apply(i, n.getEcsBuyPrice), i.$emit("aliyunBuyEcsChangeOsOptions:initialized", {raw: e.copy(r)});
                var l = t.instanceDetail, h = {components: l.orderInfo};
                i.originalValue = a.parseView(r, h), c(function () {
                    i.handle.restore(h), i.$emit("aliyunBuyEcsChangeOsOptions:rendered")
                })
            }), y = i.exception();
            y instanceof Function ? g.then(null, y) : u.dialog(g)
        }

        var p = {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsChangeOsOptions.html",
            replace: !0,
            scope: {
                value: "=",
                price: "=",
                handle: "=",
                detail: "=",
                options: "=",
                config: "&",
                defaultValue: "&",
                exception: "&",
                instanceId: "&",
                token: "&",
                raw: "="
            },
            compile: function (e, t) {
                return r.require(["value", "price", "handle", "detail", "options"], t), {post: d}
            }
        };
        return p
    }]), o
}), define("aliyun-buy-ecs/module/changeOs/ui.ecs.changeOs.price", ["angular", "../common/imageMarketHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote", "../../ui.ecs.tpl"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.changeOsPrice", n.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsChangeOsPrice", ["aliyunBuyRemote", "aliyunBuyMsg", "$filter", function (e, t, n) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsChangeOsPrice.html",
            scope: {options: "=", config: "&", price: "="},
            replace: !0,
            link: function (e, t, n) {
            }
        }
    }]), r
}), define("aliyun-buy-ecs/module/changeOs/ui.ecs.changeOS", ["angular", "aliyun-buy/base/utils/moduleHelper", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "../common/ui.ecs.price", "./ui.ecs.changeOs.options", "./ui.ecs.changeOs.price"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.changeOs", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsChangeOs", ["aliyunBuyDialog", function (e) {
        function r(n) {
            t.setDefault(n, {termsChecked: !0}), n.pay = function () {
                if (n.payDisabled)return;
                var t = n.optionsHandle;
                if (!t)return;
                var r = t.validate();
                if (!r)return;
                var i = e.open({
                    templateUrl: "partials/aliyunBuyEcsChangeOsConfimDlg.html",
                    controller: ["$scope", function (e) {
                        e.confirmPurchase = function () {
                            n.$emit("aliyunBuyEcsChangeOs:purchase", {
                                order: [t.order()],
                                detail: [n.optionsDetail],
                                needBuy: [n.optionsChangeOs.sysdisk.needBuy]
                            }), i.close()
                        }
                    }]
                })
            }, n.$watchCollection("[termsChecked, optionsPrice.calculating, optionsPrice.success, optionsPrice.needQueryPrice, optionsChangeOs.imageFromMarket.imageMarketPrice.price.extraCode]", function (e) {
                var t = e[0], r = e[1], i = e[2], s = e[3], o = e[4], u = !1;
                if (!t || r || !i || o)u = !0;
                s || (u = !1), n.payDisabled = u
            })
        }

        var n = {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsChangeOs.html",
            replace: !0,
            scope: {instanceId: "&", token: "&", ready: "&"},
            link: r
        };
        return n
    }]), n
}), define("aliyun-buy-ecs/module/changeOs/ui.ecs.changeOS.options", ["angular", "../common/renewHelper", "../common/imageMarketHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.handle", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.exception", "aliyun-buy/base/ui/controls/ui.preloader", "aliyun-buy/base/ui/widgets/ui.amount", "aliyun-buy/base/ui/controls/ui.notice", "aliyun-buy/base/ui/widgets/bricks/ui.tabsBrick", "../common/service.ecs.filters", "../common/ui.ecs.password", "../common/ui.ecs.instanceDetail", "../common/ui.ecs.image", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./service.ecs.changeOs.constraints"], function (e, t, n, r, i, s) {
    var o = e.module("aliyun.buy.ui.ecs.changeOs.options", [].concat(r.getModuleNames(arguments)));
    return o.directive("aliyunBuyEcsChangeOsOptions", ["aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceUpdater", "aliyunBuyEcsChangeOsConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyOrderModel", "$timeout", "$filter", function (n, i, s, o, u, a, f, l, c, h) {
        function d(i, l, h) {
            var p, d, v, m;
            r.setDefault(i, {
                value: {},
                detail: {},
                price: {},
                options: r.createModel("global", "imageType", "os", "customImage", "imageMarket", "imageFromMarket", "sharedImage", "imageOffline", "password", "sysdisk")
            }), d = i.options, v = i.value, i.price = d.imageFromMarket, v.instanceId = i.instanceId(), v.token = i.token(), r.setDefault(d.global, {
                showNotice: !0,
                showInstanceInfo: !0
            }), r.setDefault(d.imageType, {name: "ECS_IMAGE_TYPE"}), r.setDefault(d.sharedImage, {
                name: "ECS_SHARED_IMAGE",
                placeholder: "ECS_PLEASE_SELECT_SHARED_IMAGE"
            }), r.setDefault(d.customImage, {
                name: "ECS_CUSTOM_IMAGE",
                placeholder: "ECS_PLEASE_SELECT_CUSTOM_IMAGE"
            }), typeof i.config() == "object" && r.config(i.options.global, i.config().global), i.$watch("config().global", function (e) {
                if (!e)return;
                r.config(i.options.global, e)
            }), i.$watchCollection("[value.duration, renewStartTime]", function (e) {
                var n = e[0], r = e[1];
                if (!n || !r)return;
                i.newExpirationTime = t.calculateNewExpirationTime(n, r)
            }), i.handle = f.create(i);
            var g = n.getEcsCommodity("vm", "CHANGEOS", i.instanceId(), i.token()).then(function (t) {
                var r = i.raw = t;
                p = a.parse(r), i.ready = !0, o.apply(i, p);
                var u = r.instanceDetail.instanceInfo;
                i.price.chargeType = u.chargeType;
                var f = !0;
                u.chargeType == "Prepaid" && u.isRenewChange === !0 && (f = !1), i.price.needQueryPrice = f, f && s.apply(i, n.getEcsBuyPrice), i.$emit("aliyunBuyEcsChangeOsOptions:initialized", {raw: e.copy(r)});
                var l = t.instanceDetail, h = {components: l.orderInfo};
                i.originalValue = a.parseView(r, h), c(function () {
                    i.handle.restore(h), i.$emit("aliyunBuyEcsChangeOsOptions:rendered")
                })
            }), y = i.exception();
            y instanceof Function ? g.then(null, y) : u.dialog(g)
        }

        var p = {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsChangeOsOptions.html",
            replace: !0,
            scope: {
                value: "=",
                price: "=",
                handle: "=",
                detail: "=",
                options: "=",
                config: "&",
                defaultValue: "&",
                exception: "&",
                instanceId: "&",
                token: "&",
                raw: "="
            },
            compile: function (e, t) {
                return r.require(["value", "price", "handle", "detail", "options"], t), {post: d}
            }
        };
        return p
    }]), o
}), define("aliyun-buy-ecs/module/common/ui.ecs.yundisk.select", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/controls/ui.floats", "aliyun-buy/base/ui/controls/ui.select", "../../ui.ecs.tpl"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.yundisk.select", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsYundiskSelect", ["aliyunBuyConfigurable", "$filter", "aliyunBuyRemote", function (n, r, i) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsYundiskSelect.html",
            scope: {options: "=", value: "=", detail: "=", config: "&"},
            replace: !0,
            compile: function (i, s) {
                return t.require(["options", "value", "detail"], s), {
                    post: function (i, s, o) {
                        var u = i.options;
                        n.apply(i), t.setDefault(i, {
                            detail: {},
                            _value: {},
                            showLink: !0,
                            defaultSize: 20
                        }), t.setDefault(i.options, {name: "云盘", showLink: !0});
                        var a = function () {
                            i.size = i.size ? Math.floor(i.size) : i.itemSize;
                            var e = i.size, t = i.options.min, n = i.options.max;
                            e && e !== 0 ? (e -= 0, e ? e < t ? i.size = t : e > n && (i.size = n) : i.size = t) : !e && e !== 0 && (i.size = t), i.snapshotId && (i.size = i.snapshotDiskSize > i.size ? i.snapshotDiskSize : i.size), i._value.size = i.size
                        };
                        i.$watch("value", function (t) {
                            var n = e.fromJson(t);
                            if (!n)return;
                            n[0] && (i._value.diskType = n[0]), n[1] && (i._value.size = n[1], i.size = n[1]), i.snapshotId = n[2]
                        }, !0), i.$watch("snapshotId", function (t) {
                            if (!i.value)return;
                            var n = e.fromJson(i.value);
                            n[1] = i.size ? i.size : i.options.min, n[2] = t, i.value = r("json")(n), i.options.min = i.size
                        }, !0), i.$watch("_value.diskType", function (t) {
                            if (!i.value)return;
                            var n = e.fromJson(i.value);
                            n[0] = t, i.value = r("json")(n)
                        }, !0), i.$watch("_value.size", function (t) {
                            if (!i.value)return;
                            var n = e.fromJson(i.value);
                            n[1] = t, i.value = r("json")(n)
                        }, !0), i.$watch("options.regionId", function (e) {
                            i.snapshotId = undefined, i.size = undefined, i.name = undefined, i.$broadcast("aliyunBuySnapshot:reset")
                        }), i.$watch("size", function (t) {
                            t != null && (i.showSizeError = !1);
                            if (!i.value)return;
                            var n = e.fromJson(i.value);
                            n[1] = t, i.value = r("json")(n)
                        }), i.$watchCollection("[options.min,options.max]", function (e) {
                            var t = e[0], n = e[1];
                            t <= n ? i.sizeRange = t + " - " + n : i.sizeRange = " - ", i.snapshotId && (i.options.min = i.size)
                        })
                    }
                }
            }
        }
    }]), n
}), define("aliyun-buy-ecs/module/yundisk/service.ecs.yundisk.constraints", ["angular", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.constraint", "aliyun-buy/base/services/service.parser"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.service.ecs.yundisk.constraints", r.getModuleNames(arguments));
    return i.factory("aliyunBuyEcsYundiskConstraints", ["aliyunBuyConstraint", "aliyunBuyParser", "aliyunBuyRemote", "aliyunBuyMsg", "$filter", function (i, s, o, u, a) {
        var f = {};
        return f.apply = function (t, n) {
            var s = t.raw;
            if (!s)return;
            var o = s.config;
            if (!o)return;
            var u = o.spec_code, f = !!o.aliyun_uid, l = t.options, c = t.value, h = t.detail, p = t.price;
            i.add(t, ["value"], function () {
                return !0
            }, function () {
                l.region && r.config(l.region, {
                    items: n.getCollection("region", c),
                    needLogin: !f,
                    regionMap: o.region_map
                }), l.zone && (l.zone.items = c.region ? n.getCollection("zone", c) : []), l.yundisk && r.config(l.yundisk, {
                    items: n.getCollection("datadisk_category", c),
                    loggedIn: f,
                    regionId: c.region,
                    regionName: h.region.text
                }), l.amount && r.config(l.amount, function () {
                    var e = n.config.order_num, t = o.already_has_resource_num || 0, r = parseInt(e.max) - parseInt(t) >= 0 ? parseInt(e.max) - parseInt(t) : undefined, i = r - parseInt(t);
                    return i < 0 && (i = 0), {max: r, available: i, min: e.min, has: t}
                }())
            }), i.add(t, ["options.zone", "value.zone"], function () {
                var e = l.zone, t = e ? e.items : null;
                return t instanceof Array && t.length > 0 && t[0].value && !c.zone ? !0 : !1
            }, function () {
                c.zone = l.zone.items[0].value
            }), i.add(t, ["value.region"], function () {
                if (l.region && c.region)return !0
            }, function () {
                l.zone.regionMapValue = l.region.regionMap ? l.region.regionMap[c.region] : undefined
            }), i.add(t, ["value.yundisk"], function () {
                if (l && l.amount)return !0
            }, function () {
                l.amount.state = ""
            }), i.add(t, ["options.yundisk.items"], function () {
                var e = l.yundisk, t = e ? e.items : null;
                return t instanceof Array && t.length > 0 && t[0].value ? (c.yundisk || (c.yundisk = "[]"), !0) : !1
            }, function () {
                var t = e.fromJson(c.yundisk);
                t[0] = l.yundisk.items[0].value, c.yundisk = a("json")(t)
            }), i.add(t, ["value.yundisk"], function () {
                return c.yundisk ? !0 : !1
            }, function () {
                var i = e.fromJson(c.yundisk), s = t.options.yundisk, o = n.getConfig("datadisk_size", {datadisk_category: i[0]});
                if (!o)return;
                r.config(s, o), s.sizeTip = s.min + "-" + s.max;
                if (!i[1] || i[1] > t.options.yundisk.max || i[1] < t.options.yundisk.min)i[1] = t.options.yundisk.min, i[2] = undefined, c.yundisk = a("json")(i)
            }), t.$on("aliyunBuyEcsYundiskOptions:initialized", function (e, n) {
                var i = n.raw;
                i && i.config && i.config.aliyun_uid && r.config(t.options.amount, {showLimitMsg: !0})
            })
        }, f.checkBeforeAddToCart = function (r) {
            var i = function () {
                var t = r.optionsOptions, n = r.optionsValue;
                if (!n)return !1;
                if (!t)return !1;
                var i = t.amount.max;
                if (!i && i != 0)return !0;
                var s = 0;
                e.forEach(r.cartValue, function (e) {
                    s += parseInt(e.data.quantity)
                });
                var o = parseInt(n.amount);
                return o + s > i ? (u.alert("提示", "您最多只能选购" + i + "块"), !1) : !0
            }, s = function () {
                var i = r.optionsOptions, s = r.optionsValue, o = r.raw ? r.raw.config : undefined;
                if (!s)return !1;
                if (!i)return !1;
                if (!o)return !1;
                var a = s.amount, f = s.yundisk ? e.fromJson(s.yundisk) : undefined;
                if (!f)return !1;
                var l = n.reverseMap(t.DISK_TYPE_MAP), c = n.mapping(f[0], l);
                if (c !== "cloud_ssd")return !0;
                var h = f[1], p = o.ecs_ssdquota ? o.ecs_ssdquota.value : undefined, d = o.already_has_cloudssd_size, v = parseInt(p) - parseInt(d), m = parseInt(a) * parseInt(h), g = 0;
                e.forEach(r.cartValue, function (t) {
                    var n = t.data, r = t.components, i = r.datadisk;
                    i && i instanceof Array && e.forEach(i, function (e) {
                        e.datadisk_category === "cloud_ssd" && (g += parseInt(e.datadisk_size))
                    })
                });
                var y = m + g, b = y - v;
                return y > v ? (u.alert("提示", "您可购买SSD云盘总容量为" + p + "GB，您已购SSD云盘（" + d + "GB）+ 当前已选购SSD云盘（" + y + "GB）已超出可购买总容量（" + b + "GB）"), !1) : !0
            };
            return i() && s()
        }, f
    }]), i
}), define("aliyun-buy-ecs/module/yundisk/ui.ecs.yundisk.options", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/ui/ui.tpl", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.handle", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.local", "aliyun-buy/base/services/service.exception", "aliyun-buy/base/ui/controls/ui.group", "aliyun-buy/base/ui/controls/ui.dialog", "aliyun-buy/base/ui/controls/ui.preloader", "aliyun-buy/base/ui/widgets/ui.region", "aliyun-buy/base/ui/widgets/ui.amount", "aliyun-buy/base/ui/widgets/ui.orderRoll", "aliyun-buy/base/ui/controls/ui.notice", "aliyun-buy/base/ui/widgets/bricks/ui.tabsBrick", "../common/service.ecs.filters", "../common/ui.ecs.zone", "../common/ui.ecs.yundisk.select", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./service.ecs.yundisk.constraints"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.ui.ecs.yundisk.options", [].concat(t.getModuleNames(arguments)));
    return i.directive("aliyunBuyEcsYundiskOptions", ["aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceUpdater", "aliyunBuyEcsYundiskConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyPriceQuerier", "aliyunBuyOrderModel", "$timeout", function (n, r, i, s, o, u, a, f, l, c) {
        function p(f, l, h) {
            var p, d;
            t.setDefault(f, {
                value: {},
                detail: {},
                price: {},
                options: t.createModel("global", "region", "zone", "amount", "yundisk")
            }), d = f.options, t.setDefault(d.global, {grouped: !0, showNotice: !0}), t.setDefault(d.amount, {
                unit: "块",
                prodName: "云盘",
                showLimitMsg: !1
            }), typeof f.config() == "object" && t.config(f.options.global, f.config().global), t.setDefault(f.options.yundisk, {
                editable: !0,
                tip: "YUNDISK_CATEGORY_INTRODUCE"
            }), f.$watch("config().global", function (e) {
                if (!e)return;
                t.config(f.options.global, e)
            }), f.handle = a.create(f), f.$on("aliyunBuy:saveOptions", function (t, n) {
                var i = e.copy(f.value);
                i.password = undefined, r.saveOptions("yundisk", i)
            }), f.$watch("defaultValue()", function (e) {
                e && f.handle && f.handle.restore(e)
            });
            var v = n.getEcsCommodity("yundisk", "BUY").then(function (o) {
                var a = f.raw = o;
                p = u.parse(a), f.ready = !0, s.apply(f, p), i.apply(f, n.getEcsBuyPrice);
                var l = f.defaultValue() || undefined;
                f.handle.restore(l), r.clearOptions("yundisk"), f.$emit("aliyunBuyEcsYundiskOptions:initialized", {raw: e.copy(a)}), t.setDefault(f.options.global, {isCertified: a.config.isCertified}), c(function () {
                    f.$emit("aliyunBuyEcsYundiskOptions:rendered")
                })
            }), m = f.exception();
            m instanceof Function ? v.then(null, m) : o.dialog(v)
        }

        var h = {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsYundiskOptions.html",
            replace: !0,
            scope: {
                value: "=",
                price: "=",
                handle: "=",
                detail: "=",
                options: "=",
                config: "&",
                defaultValue: "&",
                exception: "&",
                priceQueryData: "="
            },
            compile: function (e, n) {
                return t.require(["value", "price", "handle", "detail", "options"], n), {post: p}
            }
        };
        return h
    }]), i
}), define("aliyun-buy-ecs/module/yundisk/ui.ecs.yundisk", ["angular", "../common/homeConfigHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/ui.tpl", "aliyun-buy/base/ui/ui.subtotal", "aliyun-buy/base/ui/ui.cart", "aliyun-buy/base/services/service.remote", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "./ui.ecs.yundisk.options", "./service.ecs.yundisk.constraints"], function (e, t, n) {
    var r = e.module("aliyun.buy.ui.ecs.yundisk", n.getModuleNames(arguments));
    return r.directive("aliyunBuyEcsYundisk", ["aliyunBuyEcsYundiskConstraints", "aliyunBuyRemote", function (t, r) {
        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsYundisk.html",
            replace: !0,
            scope: {optionsConfig: "@", optionsDefault: "&"},
            link: function (i) {
                var s, o = "yundisk", u, a, f;
                r.inWhiteUidList().then(function (e) {
                    var t = i.hideAddToCart = e;
                    n.config(i, {subtotalData: {hideAddToCart: t}})
                }), n.config(i, {
                    subtotalData: {productId: o, purchaseAvailable: !1},
                    cartConfig: {
                        productId: o,
                        itemTpl: "partials/aliyunBuyEcsYundiskCartItem.html",
                        priceShow: !1,
                        priceService: r.getEcsBuyPrice
                    }
                }), n.setDefault(i, {cartDetail: {cartUnit: "块"}}), i.$on("aliyunBuyEcsYundiskOptions:rendered", function () {
                    i.$broadcast("aliyunBuyEcsYundisk:rendered"), i.$emit("aliyunBuyEcsYundisk:rendered")
                }), i.$on("aliyunBuySubtotal:purchase", function (e, t) {
                    if (!s || f === !1)return;
                    if (!s.config.aliyun_uid) {
                        i.$broadcast("aliyunBuy:saveOptions"), r.login();
                        return
                    }
                    var n = i.optionsHandle;
                    if (!n)return;
                    var o = i.optionsDetail, u = n.validate();
                    if (!u)return;
                    i.$emit("aliyunBuyEcsYundisk:purchase", {order: [n.order()], detail: [o]})
                }), i.$on("aliyunBuyCart:purchase", function (t, n) {
                    if (!s)return;
                    if (!s.config.aliyun_uid) {
                        i.$broadcast("aliyunBuy:saveOptions"), r.login();
                        return
                    }
                    var o = e.copy(i.cartValue);
                    if (!o)return;
                    var u = [];
                    e.forEach(o, function (e) {
                        e.detail && (u.push(e.detail), delete e.detail), e.price && delete e.price
                    }), i.$emit("aliyunBuyEcsYundisk:purchase", {order: o, detail: u})
                }), i.$on("aliyunBuySubtotal:addToCart", function (n, o) {
                    if (!s || f === !1)return;
                    if (!s.config.aliyun_uid) {
                        i.$broadcast("aliyunBuy:saveOptions"), r.login();
                        return
                    }
                    var u = i.optionsHandle;
                    if (!u)return;
                    i.raw = s;
                    var a = i.optionsPrice, l = i.optionsValue, c = u.validate(), h = i.cartHandle, p = i.subtotalHandle, d = e.copy(i.optionsDetail);
                    c && h && p && t.checkBeforeAddToCart(i) && (h.add(u.order(), a && a.data ? e.copy(a.data) : null, d ? e.copy(d) : null), p.add())
                }), i.$on("aliyunBuyEcsYundiskOptions:initialized", function (e, t) {
                    s = t.raw;
                    var r = s.config, o, f, l;
                    o = r.isCertified !== !1, f = r.hasEnoughQuota !== !1, u = o && f, o ? f || (a = "YUNDISK_UNAVAILABLE_HAS_QUOTA_TIP") : a = "YUNDISK_POSTPAY_NEEDCERTIFY", n.config(i.subtotalData, {
                        purchaseAvailable: u,
                        purchaseTip: u === !1 ? a : ""
                    })
                }), i.$watch("optionsPrice", function (e) {
                    if (!e)return;
                    var t = e.data, r = e.calculating;
                    if (t && t.extraCode) {
                        var s = t.extraCode == "MONEY_LESSTHAN_100", o = u && !s, f = a ? a : "YUNDISK_UNAVAILABLE_NOT_ENOUGH_BALANCE";
                        o = !!o, s && n.config(i.subtotalData, {purchaseAvailable: o, purchaseTip: o === !1 ? f : ""})
                    }
                    n.config(i.subtotalData, {
                        calculating: r,
                        tradePrice: t ? t.trade : undefined,
                        originalPrice: t ? t.origin : undefined,
                        discountPrice: t ? t.discount : 0,
                        strategies: t ? t.strategies : undefined,
                        flowPrice: t ? t.flow : undefined
                    })
                }, !0), i.$watch("optionsValue", function (t) {
                    if (!t)return;
                    var r = t, o = !1, l = s && s.components ? s.components.vm_region_no.vm_region_no : undefined, c = r && r.region ? r.region : undefined;
                    c && l && l.length > 0 && e.forEach(l, function (e) {
                        e.value === c && (o = e.disabled)
                    }), f = u && !o;
                    var h = o === !0 ? "ECS_REGION__UNABLE_PURCHASE_TIP" : a;
                    n.config(i.subtotalData, {value: r, purchaseAvailable: f, purchaseTip: f === !1 ? h : ""})
                }, !0), i.$watch("optionsDetail", function (e) {
                    if (!e)return;
                    i.subtotalData.detail = e
                }, !0)
            }
        }
    }]), r
}), define("aliyun-buy-ecs/module/yundisk/ui.ecs.yundisk.orderPreview", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.date", "../common/ui.ecs.orderView", "../../ui.ecs.tpl", "../../ui.ecs.module.styles"], function (e, t) {
    var n = e.module("aliyun.buy.ui.ecs.yundisk.orderPreview", t.getModuleNames(arguments));
    return n.directive("aliyunBuyEcsYundiskOrderPreview", ["aliyunBuyRemote", function (e) {
        function n(e, t, n) {
            e.priceService = "getEcsBuyPrice", e.checked = !0, e.purchase = function () {
                if (!e.checked)return;
                e.$emit("aliyunBuyEcsYundiskOrderPreview:purchase", {orderData: e.orderData()})
            }
        }

        return {
            restrict: "EA",
            templateUrl: "partials/aliyunBuyEcsYundiskOrderPreview.html",
            replace: !0,
            scope: {orderData: "&", ready: "="},
            compile: function (e, r) {
                return t.require(["price"], r), {post: n}
            }
        }
    }]), n
}), define("aliyun-buy-ecs/module/yundiskResize/service.ecs.yundisk.resize.constraints", ["angular", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/services/service.constraint", "aliyun-buy/base/services/service.parser"], function (e, t, n, r) {
    var i = e.module("aliyun.buy.service.ecs.yundisk.resize.constraints", r.getModuleNames(arguments));
    return i.factory("aliyunBuyEcsYundiskResizeConstraints", ["aliyunBuyConstraint", "aliyunBuyParser", function (t, n) {
        var i = {};
        return i.apply = function (n, i) {
            var s = n.raw, o = n.options, u = n.value, a = n.detail, f = n.price;
            t.add(n, ["value"], function () {
                return !0
            }, function () {
                r.config(o.datadisk, function () {
                    var t = n.diskInfo, r = t.diskCategory + "_max", s = i.config[r];
                    s && e.extend(n.options.datadisk, s)
                }())
            })
        }, i
    }]), i
}), define("aliyun-buy-ecs/module/yundiskResize/ui.ecs.yundisk.resize.options", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/constants/cons", "aliyun-buy/base/utils/constraintHelper", "aliyun-buy/base/utils/instanceInfoHelper", "aliyun-buy/base/ui/ui.tpl", "aliyun-buy/base/services/service.price", "aliyun-buy/base/services/service.parser", "aliyun-buy/base/services/service.remote", "aliyun-buy/base/services/service.local", "aliyun-buy/base/services/service.handle", "aliyun-buy/base/services/service.order", "aliyun-buy/base/services/service.date", "aliyun-buy/base/services/service.exception", "aliyun-buy/base/ui/controls/ui.dialog", "aliyun-buy/base/ui/controls/ui.preloader", "../common/service.ecs.modifyConstraints", "./service.ecs.yundisk.resize.constraints"], function (e, t, n, r, i) {
    var s = e.module("aliyun.buy.ui.ecs.yundisk.resize.options", ["ab-base64"].concat(t.getModuleNames(arguments)));
    return s.directive("aliyunBuyEcsYundiskResizeOptions", ["aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceUpdater", "aliyunBuyPriceQuerier", "aliyunBuyEcsYundiskResizeConstraints", "aliyunBuyEcsModifyConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyDateParser", "aliyunBuyDialog", "$filter", "base64", "aliyunBuyOrderModel", function (e, r, i, s, o, u, a, f, l, c, h, p, d, v) {
        return {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsYundiskResizeOptions.html",
            replace: !0,
            scope: {handle: "=", detail: "=", options: "=", price: "=", exception: "&", diskId: "=", instanceId: "="},
            compile: function (r, s) {
                return t.require(["price", "handle", "detail", "options"], s), {
                    post: function (s, c, h) {
                        function b(t) {
                            if (!t)return;
                            e.queryEcsInstanceInfo(t, "RESIZE").then(function (e) {
                                if (!e || !e[0] || !e[0].data.instanceDetail)return;
                                var t = e[0].data, n = t.instanceDetail;
                                s.instanceInfo = n.instanceInfo;
                                if (u.notAllowYundiskResize(t))return
                            })
                        }

                        var d;
                        t.setDefault(s, {
                            value: {},
                            price: {},
                            detail: {},
                            datadisk: {},
                            options: t.createModel("global", "datadisk", "notice"),
                            diskCategory: "cloud"
                        }), t.setDefault(s.options.global, {grouped: !0, showNotice: !1});
                        var v = s.price;
                        t.setDefault(v, {
                            purchaseAvailable: !0,
                            options: {}
                        }), s.$watch("config().global", function (e) {
                            if (!e)return;
                            t.config(s.options.global, e)
                        }), s.handle = l.create(s);
                        var m = s.diskId, g, y = e.queryDiskInfo(s.diskId).then(function (t) {
                            var r = s.raw = t;
                            d = f.parse(r), o.apply(s, d), s.ready = !0;
                            var u = s.instanceDetail = r && r.instanceDetail ? r.instanceDetail : {}, a = s.diskInfo = u && u.diskInfo ? u.diskInfo : {};
                            a.unit = "GB", a.diskTypeName = n.DISK_TYPE_NAME_MAP[a.diskCategory], s.options.chargeType = a.chargeType, s.options.ecsInstanceId = a.ecsInstanceId, s.options.basePriceUnit = a.chargeType == "AfterPay" ? "/时" : "", s.diskCategory = a.diskCategory, i.apply(s, e.getYundiskResizePrice), b(s.options.ecsInstanceId)
                        });
                        s.$watch("value.size", function (e) {
                            var t = s.diskCategory;
                            if (!e || !t)return;
                            var n = [e, t];
                            s.value.datadisk = p("json")(n), s.value.diskId = s.diskId, s.price.state = s.diskInfo.diskSize == e ? "currentConfiguration" : ""
                        }, !0), s.$on("aliyunBuyEcsYundiskResizeOptions:initialized", function (e, t) {
                            return
                        });
                        var w = s.exception();
                        w instanceof Function ? y.then(null, w) : a.dialog(y);
                        var E = function (e) {
                            var t = {};
                            return t.inst_id = m, t.prodSubId = g, t
                        }
                    }
                }
            }
        }
    }]), s
}), define("aliyun-buy-ecs/module/yundiskResize/ui.ecs.yundisk.resize", ["angular", "aliyun-buy/base/utils/moduleHelper", "aliyun-buy/base/ui/ui.tpl", "aliyun-buy/base/ui/ui.subtotal", "aliyun-buy/base/ui/ui.cart", "aliyun-buy/base/services/service.remote", "../../ui.ecs.tpl", "../../ui.ecs.module.styles", "../common/ui.ecs.price", "./ui.ecs.yundisk.resize.options"], function (e, t, n, r, i) {
    var s = e.module("aliyun.buy.ui.ecs.yundisk.resize", ["ab-base64"].concat(t.getModuleNames(arguments)));
    return s.directive("aliyunBuyEcsYundiskResize", ["aliyunBuyRemote", "aliyunBuyLocal", "aliyunBuyPriceUpdater", "aliyunBuyPriceQuerier", "aliyunBuyEcsYundiskResizeConstraints", "aliyunBuyException", "aliyunBuyParser", "aliyunBuyHandle", "aliyunBuyDateParser", "aliyunBuyDialog", "$filter", "base64", "aliyunBuyOrderModel", function (e, t, n, r, i, s, o, u, a, f) {
        function c(e) {
            e.pay = function () {
                if (e.payDisabled)return;
                var t = e.optionsHandle;
                if (!t)return;
                var n = t.validate();
                if (!n)return;
                var r = f.open({
                    templateUrl: "partials/aliyunBuyEcsYundiskResizeOrderTipDlg.html",
                    controller: ["$scope", function (n) {
                        n.needRestartEcsInstance = !!e.options.ecsInstanceId, n.confirmPurchase = function () {
                            e.$emit("aliyunBuyEcsYundiskResize:purchase", {
                                order: [t.order()],
                                chargeType: e.options.chargeType,
                                detail: [e.optionsDetail]
                            }), r.close()
                        }
                    }]
                })
            }, e.$watchCollection("[optionsPrice.calculating, optionsPrice.success, optionsPrice.state]", function (t) {
                var n = t[0], r = t[1], i = t[2], s = !1;
                n && (s = !0), r || (s = !0), i && (s = !0), e.payDisabled = s
            })
        }

        var l = {
            restrict: "A",
            templateUrl: "partials/aliyunBuyEcsYundiskResize.html",
            replace: !0,
            scope: {diskId: "&", instanceId: "&", ready: "&"},
            link: c
        };
        return l
    }]), s
}), define("aliyun-buy-ecs/module/ecs.modules", ["angular", "./main/index", "./common/renewHelper", "./common/instanceHelper", "./common/constants/ecsBuyCons", "./common/service.ecs.filters", "./common/ui.ecs.bandwidthHistory", "./common/ui.ecs.orderView", "./common/ui.ecs.orderResultView", "./postpay/ui.ecs.postpay", "./postpay/ui.ecs.postpay.options", "./postpay/ui.ecs.postpay.orderPreview", "./prepay/ui.ecs.prepay", "./prepay/ui.ecs.prepay.options", "./prepay/ui.ecs.prepay.orderPreview", "./renew/ui.ecs.renew", "./renew/ui.ecs.renew.options", "./downgrade/ui.ecs.downgrade", "./downgrade/ui.ecs.downgrade.options", "./upgrade/ui.ecs.upgrade", "./upgrade/ui.ecs.upgrade.options", "./bandwidthTempUpgrade/ui.ecs.bandwidthTempUpgrade", "./bandwidthTempUpgrade/ui.ecs.bandwidthTempUpgrade.options", "./changeOs/ui.ecs.changeOS", "./changeOs/ui.ecs.changeOS.options", "./yundisk/ui.ecs.yundisk", "./yundisk/ui.ecs.yundisk.options", "./yundisk/ui.ecs.yundisk.orderPreview", "./yundiskResize/ui.ecs.yundisk.resize", "./yundiskResize/ui.ecs.yundisk.resize.options"], function (e) {
    return e.module("aliyun.buy.ecs.modules", ["aliyun.buy", "aliyun.buy.service.ecs.filters", "aliyun.buy.ui.ecs.bandwidthHistory", "aliyun.buy.ui.ecs.orderView", "aliyun.buy.ui.ecs.orderResultView", "aliyun.buy.ui.ecs.tpl", "aliyun.buy.ui.ecs.postpay", "aliyun.buy.ui.ecs.postpay.options", "aliyun.buy.ui.ecs.postpay.orderPreview", "aliyun.buy.ui.ecs.prepay", "aliyun.buy.ui.ecs.prepay.options", "aliyun.buy.ui.ecs.prepay.orderPreview", "aliyun.buy.ui.ecs.renew", "aliyun.buy.ui.ecs.renew.options", "aliyun.buy.ui.ecs.downgrade", "aliyun.buy.ui.ecs.downgrade.options", "aliyun.buy.ui.ecs.upgrade", "aliyun.buy.ui.ecs.upgrade.options", "aliyun.buy.ui.ecs.bandwidthTempUpgrade", "aliyun.buy.ui.ecs.bandwidthTempUpgrade.options", "aliyun.buy.ui.ecs.changeOs", "aliyun.buy.ui.ecs.changeOs.options", "aliyun.buy.ui.ecs.yundisk", "aliyun.buy.ui.ecs.yundisk.options", "aliyun.buy.ui.ecs.yundisk.orderPreview", "aliyun.buy.ui.ecs.yundisk.resize", "aliyun.buy.ui.ecs.yundisk.resize.options"])
}), define("aliyun-buy-ecs/ecs.modules.all", ["./module/ecs.modules"], function (e) {
});