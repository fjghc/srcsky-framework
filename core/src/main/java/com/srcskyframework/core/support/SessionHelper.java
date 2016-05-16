/**
 * 宝龙电商
 * com.srcsky.framework.support
 * SessionHelper.java
 * <p>
 * 2016-02-02
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

/**
 * SessionHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 17:41
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class SessionHelper {

    public static void setLogin(Model user) {
        if (null == user) {
            RequestContextHolder.getRequestAttributes().removeAttribute(Constants.WEB_SESSION_USER_KEY, RequestAttributes.SCOPE_SESSION);
        } else {
            RequestContextHolder.getRequestAttributes().setAttribute(Constants.WEB_SESSION_USER_KEY, user, RequestAttributes.SCOPE_SESSION);
        }
    }

    public static <T extends Model> T getLoginUser() {
        return (T) RequestContextHolder.getRequestAttributes().getAttribute(Constants.WEB_SESSION_USER_KEY, RequestAttributes.SCOPE_SESSION);
    }

    public static boolean isLogin() {
        return null != getLoginUser();
    }

    public static void logout() {
        setLogin(null);
    }

    public static boolean equalUser(String user) {
        Model currentUser = getLoginUser();
        return null != currentUser && currentUser.equals("id", user);
    }

    public static <T> T getAttr(String key) {
        return (T) RequestContextHolder.getRequestAttributes().getAttribute(key, RequestAttributes.SCOPE_SESSION);
    }

    public static void setAttr(String key, Object value) {
        RequestContextHolder.getRequestAttributes().setAttribute(key, value, RequestAttributes.SCOPE_SESSION);
    }
}
