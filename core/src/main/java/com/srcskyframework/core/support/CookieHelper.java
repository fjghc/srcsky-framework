/**
 * 宝龙电商
 * com.srcsky.framework.support
 * CookieHelper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import com.srcskyframework.core.web.context.RequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Set;

import static java.net.URLEncoder.encode;

/**
 * CookieHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description Cookie
 */
public class CookieHelper {

    private final static Logger logger = LoggerFactory.getLogger(CookieHelper.class);

    /**
     * 获取Cookie 信息
     *
     * @param
     * @return
     */
    public static Model getCookies() {
        Model input = new Model();
        Cookie[] cookies = RequestContext.getRequest().getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                try {
                    input.set(cookie.getName(), URLDecoder.decode(cookie.getValue(), "UTF-8"));
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        }
        return input;
    }

    /**
     * 设置Cookie 信息
     *
     * @param
     * @return
     */
    public static void setCookies(Model input) {
        HttpServletResponse response = RequestContext.getResponse();
        if (response != null) {
            for (String key : (Set<String>) input.keySet()) {
                if (!key.equalsIgnoreCase("timeout")) {
                    try {
                        Cookie cookie = new Cookie(key, encode(input.isEmpty(key) ? "" : input.getString(key), "utf-8"));
                        if (!input.isEmpty("timeout")) {
                            cookie.setMaxAge(input.getInt("timeout"));
                        } else {
                            cookie.setMaxAge(ConfigHelper.getInt("web_info_in_cookie.timeout"));
                        }
                        cookie.setPath(ConfigHelper.getString("web_info_in_cookie.path"));
                        cookie.setDomain("." + ConfigHelper.getString("system.domain"));
                        response.addCookie(cookie);
                    } catch (Exception ex) {
                        logger.error("写入Cookie异常,key=" + key + ",完整参数:" + input, ex);
                    }
                }
            }
        }
    }

    /**
     * 清除 Cookies
     */
    public static void clearCookies() {
        HttpServletRequest request = RequestContext.getRequest();
        HttpServletResponse response = RequestContext.getResponse();
        //清除 Cookies
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            cookie.setMaxAge(-1);
            response.addCookie(cookie);
        }
    }

    /**
     * 获取 Cookie
     */
    public static Cookie getCookieByName(String name, HttpServletRequest request) {
        Cookie cookies[] = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    return cookie;
                }
            }
        }
        return null;
    }

    /**
     * 删除cookie
     */
    public static void removeCookieByName(String name, HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = getCookieByName(name, request);
        if (cookie != null) {
            //设置过期时间为立即。
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }
    }

    public static void writeCookie(String name, String value, HttpServletResponse response) {
        //使用URL进行编码，避免写入cookie错误。
        try {
            response.addCookie(new Cookie(name, URLEncoder.encode(value, "UTF-8")));
        } catch (Exception ex) {
            logger.error("Encode with URL error", ex);
        }
    }

}
