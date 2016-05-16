/**
 * 宝龙电商
 * com.srcsky.framework.support
 * ConfigHelper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

/**
 * Constants
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description 通用 常量类
 */

public class Constants {

    /**
     * Tools
     */
    /*================== 工具 =============================================================================================*/
    public final static String LINE = "=====================================================================";
    public final static String LINE_HALF = "=================================";

    /**
     * 逻辑常量
     */
    /*================== YES,NO =============================================================================================*/
    public final static Integer YES = 1;
    public final static Integer NO = 2;

    /**
     * Web Model Params Key
     */
    public final static String WEB_PARAMS_ORDER_BY_FIELD = "orderby";
    /**
     * Web层
     */
    /*================== Web Session 中常量：当前登录用户，当前登录管理员,记住用户选项，验证码 ==================*/
    public final static String WEB_SESSION_USER_KEY = "web_session_user_key";
    public final static String WEB_SESSION_ADMIN_KEY = "web_session_admin_key";
    public final static String WEB_SESSION_MERCHANT_KEY = "web_session_merchant_key";
    public final static String WEB_SESSION_UNION_KEY = "web_session_union_key";
    public final static String WEB_SESSION_COOKIE_REMEMBER_USER_KEY = "web_session_cookie_remember_user_key";
    public final static String WEB_SESSION_VERIFY_NUMBER = "web_session_verify_number";
    public final static String WEB_SESSION_CITY_KEY = "web_session_city_key";
    // 授权信息
    public final static String WEB_SESSION_CAS_AUTHORIZATION = "web_session_cas_authorization";

    // SSO
    public final static String SSO_TICKET_KEY = "_stk_";
    public final static String SSO_REDIRECT_KEY = "_srk_";
    public final static String SSO_LOGOUT_KEY = "_slk_";
    public static final String SSO_REDIS_TICKET_PREFIX_KEY = "sso:ticket:%s";
    public final static String SSO_REDIS_USER_SESSION_KEY = "spring:session:users:%s";

    /*================== Web Request 中常量：当前所在城市 ==================*/
    public final static String WEB_REQUEST_CITY_KEY = "web_request_city_key";
    public final static String WEB_REQUEST_SHOW_MSG_BOX_KEY = "web_session_show_msg_box_key";
    /*================== Web ContentType==================*/
    public final static String WEB_CONTENT_TYPE_DOWNLOAD = "application/octet-stream";
    public final static String WEB_CONTENT_TYPE_WORD = "application/msword";
    /*================== 应用路径*/
    public static String WEB_ROOT_ABSOLUTE_PATH = "";
    public static String WEB_CONTENT_PATH = "";

    /*===================================*/
    public static String WEB_JSONP_CALLBACK_PARAMS_NAME = "jsonp_callback";
    public static String PAGE_INDEX_KEY = "page_index";
    public static String PAGE_SIZE_KEY = "page_size";


    /**
     * 业务审核常量
     */
    /*================== 审核状态：未开始审核(草稿)/开始审核(定稿)/待定/二次审核/审核通过/审核不通过==================*/
    /*================== 第一种：INIT->SUCCESS 或 FIAL */
    /*================== 第二种：INIT->SECOND  或 SUCCESS  或 FIAL  */
    /*================== 第三种：INIT->START-> SUCCESS  或 FIAL  */
    public final static Integer AUDITING_STATUS_INIT = 1;
    public final static Integer AUDITING_STATUS_START = 2;
    public final static Integer AUDITING_STATUS_PENDING = 3;
    public final static Integer AUDITING_STATUS_SECOND = 4;
    public final static Integer AUDITING_STATUS_SUCCESS = 5;
    public final static Integer AUDITING_STATUS_SUCCESS_SECOND = 55;
    public final static Integer AUDITING_STATUS_FAIL = 6;

    /**
     * 男女常量
     */
    /*================== 女，男=======================================================================================*/
    public final static Integer USER_SEX_WOMAN = 1;
    public final static Integer USER_SEX_MAN = 2;

    /**
     * 用户类型
     */
    /*================== 普通用户,商家,管理员=========================================================================*/
    public final static Integer USER_TYPE_USER = 1;
    public final static Integer USER_TYPE_MERCHANT = 2;
    public final static Integer USER_TYPE_ADMIN = 3;

    /**
     * 用户信息 来源 定义
     */
    /*================== 后台添加，通过网站注册，采集生成，联合登录来的=========================================================*/
    public final static Integer USER_SOURCE_WEB_REGISTER = 1;
    public final static Integer USER_SOURCE_MOBILE_REGISTER = 2;
    public final static Integer USER_SOURCE_QQ = 3;
    public final static Integer USER_SOURCE_SINA = 4;
    public final static Integer USER_SOURCE_FETCH = 5;
    public final static Integer USER_SOURCE_CONSOLE_ADD = 6;

    /**
     * 状态 定义
     */
    /*================== 启用，禁用，删除=============================================================================*/
    public final static Integer STATUS_ENABLE = 1, STATUS_SUCCESS = 1;
    public final static Integer STATUS_DISABLED = 2, STATUS_FINAL = 2;
    public final static Integer STATUS_DELETE = 3;
    /*================== 处理状态=====================================================================================*/
    public final static Integer STATUS_PROCCESS_INIT = 1;/*未处理*/
    public final static Integer STATUS_PROCCESS_IN = 2;/*处理中*/
    public final static Integer STATUS_PROCCESS_SUCCESS = 3;/*处理完成*/
    public final static Integer STATUS_PROCCESS_FAIL = 4;/*处理失败*/


    /**
     * 验证常量
     */
    /*================== DAO开启 修改验证==================*/
    public final static String VALIDATION_BY_DAO_UPDATE = "validation_by_dao_update_";

    /**
     * Log日志 分类
     */
    /*================== 添加记录，删除记录,修改记录，登录 ===========================================================*/
    public final static Integer LOG_TYPE_ADD = 1001;
    public final static Integer LOG_TYPE_DROP = 1002;
    public final static Integer LOG_TYPE_UPDATE = 1003;
    public final static Integer LOG_TYPE_LOGIN = 1004;


    // ================================ Redis Key
    // Redis 分布式锁 前缀 Key
    public static final String REDIS_SERVER_LOCK_PREFIX_KEY = "lock:%s";
}
