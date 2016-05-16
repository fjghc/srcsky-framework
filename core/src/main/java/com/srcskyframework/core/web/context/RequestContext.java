/**
 * 宝龙电商
 * com.srcsky.framework.web.context
 * RequestContext.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.web.context;

import com.srcskyframework.core.exception.LogicException;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * RequestContext
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:28
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class RequestContext {
    private static ThreadLocal<RequestContext> contextThreadLocal = new ThreadLocal<RequestContext>();
    private HttpServletRequest request;
    private HttpServletResponse response;
    private static ServletContext servletContext;

    private RequestContext(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
    }

    // RequestContext
    private static RequestContext getContext() {
        RequestContext context = contextThreadLocal.get();
        if (null == context) {
            throw LogicException.generateException("ThreadLocal 中未设置 Context");
        }
        return context;
    }

    public static void setContext(HttpServletRequest request, HttpServletResponse response) {
        contextThreadLocal.set(new RequestContext(request, response));
    }

    public static void remove() {
        contextThreadLocal.remove();
    }

    // HttpServletRequest
    public static HttpServletRequest getRequest() {
        return getContext().request;
    }

    public static <T> T getRequestAttr(String key) {
        return (T) getContext().request.getAttribute(key);
    }

    public static void setRequestAttr(String key, Object value) {
        if (null == value) {
            getContext().request.removeAttribute(key);
        } else {
            getContext().request.setAttribute(key, value);
        }
    }

    // HttpServletResponse
    public static HttpServletResponse getResponse() {
        return getContext().response;
    }

    // HttpSession
    public static HttpSession getSession(boolean create) {
        return getContext().request.getSession(create);
    }

    public static <T> T getSessionAttr(String key) {
        HttpSession session = getContext().request.getSession(false);
        return null == session ? null : (T) session.getAttribute(key);
    }

    public static void setSessionAttr(String key, Object value) {
        HttpSession session = getContext().request.getSession(true);
        if (null == value) {
            session.removeAttribute(key);
        } else {
            session.setAttribute(key, value);
        }
    }

    // ServletContext
    public static ServletContext getServletContext() {
        return servletContext;
    }

    public static <T> T getServletContextAttr(String key) {
        return (T) servletContext.getAttribute(key);
    }

    public static void setServletContext(ServletContext servletContext) {
        RequestContext.servletContext = servletContext;
    }

    public static void setServletContextAttr(String key, Object value) {
        if (null == value) {
            RequestContext.servletContext.removeAttribute(key);
        } else {
            RequestContext.servletContext.setAttribute(key, value);
        }
    }
}
