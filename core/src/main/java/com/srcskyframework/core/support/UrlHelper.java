/**
 * 宝龙电商
 * com.srcsky.framework.support
 * URLHelper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import com.srcskyframework.core.exception.LogicException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * URLHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description URL 辅助工具类
 */
public class UrlHelper {
    private static final Logger logger = LoggerFactory.getLogger(UrlHelper.class);
    private static final String ssoLoginUrl = ConfigHelper.getString("sso.login.address", "/sso/");
    private static final String authFailUrl = ConfigHelper.getString("auth.fail.address");
    private static final String logoutRegexParams = "&?" + Constants.SSO_LOGOUT_KEY + "=[^=&]+";
    public static ResourceUrlProvider resourceUrlProvider;

    /**
     * URL 编码
     *
     * @return
     */
    public static String encoder(String url, String charset) {
        try {
            if (null == url) {
                return url;
            }
            if (!ValidHelper.isEmpty(url)) {
                return URLEncoder.encode(url, charset);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return url;
    }

    public static String encoder(String url) {
        return encoder(url, "utf-8");
    }

    /**
     * URL 解码
     *
     * @param url
     * @return
     */
    public static String decoder(String url, String charset) {
        try {
            if (!ValidHelper.isEmpty(url)) {
                return URLDecoder.decode(url, charset);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static String decoder(String url) {
        return decoder(url, "utf-8");
    }


    /**
     * 转码 URL 中的 中文参数
     *
     * @param url
     * @param charset
     * @return
     */
    public static String encodeChineseParams(String url, String charset) {
        StringBuffer b = new StringBuffer();
        try {
            Matcher m = RegexHelper.chineseRegex.matcher(url);
            while (m.find()) {
                m.appendReplacement(b, URLEncoder.encode(m.group(0), charset));
            }
            m.appendTail(b);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return b.toString();
    }

    /**
     * 清理URl参数
     *
     * @param url
     * @param name
     * @return
     */
    public static String clearParameter(String url, String name) {
        url = url.replaceAll(name + "=[^&]+&?", "");
        //去除末尾的问号。
        if (url.endsWith("?")) {
            url = url.substring(0, url.length() - 1);
        }
        //去除末尾的&符号。
        if (url.endsWith("&")) {
            url = url.substring(0, url.length() - 1);
        }
        return url;
    }

    /**
     * 生成 SSO 登录 请求地址
     *
     * @param request
     * @return
     */
    public static String generateSsoLoginUrl(HttpServletRequest request, String redirect) {
        if (ValidHelper.isEmpty(ssoLoginUrl)) {
            throw LogicException.generateException("未配置 sso.login.url !");
        }
        // 生成 SSO 服务器 地址
        StringBuffer fullServerURL = new StringBuffer();
        fullServerURL.append(ssoLoginUrl);
        fullServerURL.append("?");
        fullServerURL.append(Constants.SSO_REDIRECT_KEY);
        fullServerURL.append("=");
        try {
            fullServerURL.append(URLEncoder.encode(redirect, "UTF-8"));
        } catch (Exception ex) {
            logger.error("Encode异常", ex);
        }
        return fullServerURL.toString();
    }

    public static String generateSsoLoginUrl(HttpServletRequest request) {
        // 生成 Callback 地址
        String redirect = request.getRequestURL().toString();
        if (!ValidHelper.isEmpty(request.getQueryString())) {
            redirect = UrlHelper.clearParameter(request.getRequestURL() + "?" + request.getQueryString(), Constants.SSO_TICKET_KEY);
        }
        return generateSsoLoginUrl(request, redirect);
    }

    /**
     * 生成 SSO 回复地址
     *
     * @return
     */
    public static String generateSsoReplyUrl(HttpServletRequest request, String redirect, String ticket) {
        if (ValidHelper.isEmpty(redirect)) {
            throw LogicException.generateException("参数错误：redirect-> " + redirect);
        }
        redirect = UrlHelper.clearParameter(UrlHelper.decoder(redirect), Constants.SSO_TICKET_KEY);
        if (redirect.indexOf("?") != -1) {
            redirect = redirect + "&" + Constants.SSO_TICKET_KEY + "=" + ticket;
        } else {
            redirect = redirect + "?" + Constants.SSO_TICKET_KEY + "=" + ticket;
        }
        return redirect;
    }

    /**
     * 生成 SSO 回复地址
     *
     * @return
     */
    public static String generateAuthFailUrl(HttpServletRequest request) {
        if (ValidHelper.isEmpty(authFailUrl)) {
            throw LogicException.generateException("未配置 security.fail.url !");
        }
        // 生成 Callback 地址
        String redirect = request.getRequestURL() + "?" + request.getQueryString();
        // 生成 SSO 服务器 地址
        StringBuffer fullServerURL = new StringBuffer();
        fullServerURL.append(authFailUrl);
        fullServerURL.append("?");
        fullServerURL.append(Constants.SSO_REDIRECT_KEY);
        fullServerURL.append("=");
        try {
            fullServerURL.append(URLEncoder.encode(redirect, "UTF-8"));
        } catch (Exception ex) {
            logger.error("Encode异常", ex);
        }
        return fullServerURL.toString();
    }


    public static int getUrlWidth(String url) {
        Matcher matcher = RegexHelper.urlWidth.matcher(url);
        if (matcher.find()) {
            return Integer.valueOf(matcher.group(1));
        }
        matcher = RegexHelper.urlWidthAndHeight.matcher(url);
        if (matcher.find()) {
            return Integer.valueOf(matcher.group(1));
        }
        return 0;
    }

    public static int getUrlHeight(String url) {
        Matcher matcher = RegexHelper.urlHeight.matcher(url);
        if (matcher.find()) {
            return Integer.valueOf(matcher.group(1));
        }
        matcher = RegexHelper.urlWidthAndHeight.matcher(url);
        if (matcher.find()) {
            return Integer.valueOf(matcher.group(2));
        }
        return 0;
    }

    /**
     * 是否是完整URL
     *
     * @param link
     * @return
     */
    public static boolean isFullUrl(String link) {
        if (link == null) {
            return false;
        }
        link = link.trim().toLowerCase();
        return link.startsWith("http://") || link.startsWith("https://") || link.startsWith("file://");
    }

    /**
     * 获取完整URL
     *
     * @param pageUrl
     * @param link
     * @return
     */
    public static String getFullUrl(String pageUrl, String link) {
        if (isFullUrl(link)) {
            return link;
        } else if (link != null && link.startsWith("?")) {
            int qindex = pageUrl.indexOf('?');
            int len = pageUrl.length();
            if (qindex < 0) {
                return pageUrl + link;
            } else if (len > qindex + 1) {
                return pageUrl.substring(0, qindex) + link;

            } else if (qindex == len - 1) {
                return pageUrl.substring(0, len - 1) + link;
            } else {
                return pageUrl + "&" + link.substring(1);
            }
        }
        boolean isLinkAbsolute = link.startsWith("/");
        if (!isFullUrl(pageUrl)) {
            pageUrl = "http://" + pageUrl;
        }
        int slashIndex = isLinkAbsolute ? pageUrl.indexOf("/", 8) : pageUrl.lastIndexOf("/");
        if (slashIndex <= 8) {
            pageUrl += "/";
        } else {
            pageUrl = pageUrl.substring(0, slashIndex + 1);
        }
        return isLinkAbsolute ? pageUrl + link.substring(1) : pageUrl + link;
    }

    /**
     * 获取 虚拟目录
     *
     * @param request
     */
    public static String getContextPath(HttpServletRequest request, String path) {
        if (ValidHelper.isEmpty(path)) {
            return request.getContextPath();
        } else {
            return request.getContextPath() + path;
        }
    }

    /**
     * 获取 虚拟目录
     *
     * @param path
     */
    public static String getContextPath(String path) {
        return getContextPath(RequestHelper.getRequest(), path);
    }

    public static String getServerUrl(HttpServletRequest request, String... postfixUrl) {
        if (null == request) {
            throw LogicException.generateException("参数异常：request=" + request);
        }
        StringBuffer url = new StringBuffer(request.getScheme());
        url.append("://");
        url.append(request.getServerName());
        if (80 != request.getServerPort()) {
            url.append(":").append(request.getServerPort());
        }
        url.append(request.getContextPath());
        if (null != postfixUrl && 0 != postfixUrl.length) {
            url.append(postfixUrl[0]);
        }
        return url.toString();
    }

    public static String getContextPath() {
        return getContextPath(RequestHelper.getRequest(), null);
    }

    public static String getForLookupPath(String url) {
        return getContextPath(resourceUrlProvider.getForLookupPath(url));
    }

    /**
     * 获取资源相对路径
     *
     * @param path
     * @return
     */
    public static String getRealPath(String path) {
        return RequestHelper.getRequest().getServletContext().getRealPath(path);
    }

    public static void main(String[] args) {
        // UrlHelper.getServerUrl(null,"/sdk/ddddd");
    }
}
