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
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * SessionHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 17:41
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class RequestHelper {

    public static HttpServletResponse getResponse() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
    }

    public static HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

    public static <T> T getAttr(String key) {
        return (T) RequestContextHolder.getRequestAttributes().getAttribute(key, RequestAttributes.SCOPE_REQUEST);
    }

    public static void setAttr(String key, Object value) {
        RequestContextHolder.getRequestAttributes().setAttribute(key, value, RequestAttributes.SCOPE_REQUEST);
    }
}
