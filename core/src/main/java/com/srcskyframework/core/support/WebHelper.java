/**
 * 宝龙电商
 * com.srcsky.framework.entity
 * WebHelper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import com.srcskyframework.core.exception.ViewLogicException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.URLEncoder;
import java.util.*;


/**
 * WebHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description Web层辅助对象
 */
public class WebHelper {

    private static final Logger logger = LoggerFactory.getLogger(WebHelper.class);

    public final static String KEY_UPLOADER_PROGRESS = "key_uploader_progress";
    private final static DiskFileItemFactory factory = new DiskFileItemFactory();
    private final static String SCRIPT_TYPE = "<script text=\"text/javascript\">$script$</script>";


    /**
     * 强制 IE 不缓存
     */
    public static void notCache(HttpServletResponse response) {
        setContentType("text/html");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Expires", "0");
        response.setDateHeader("Expires", 0);
    }

    /**
     * 强制 IE 缓存
     */
    public static void Cache(HttpServletResponse response, int minutes) {
        setContentType("text/html");
        response.setCharacterEncoding("utf-8");
        response.addHeader("Cache-Control", "max-age=" + (1000 * 60 * minutes));
    }

    public static void setContentType(HttpServletResponse response, String contentType) {
        response.setContentType(contentType + "; charset=utf-8");
    }

    public static void setContentType(String contentType) {
        setContentType(RequestHelper.getResponse(), contentType);
    }

    public static void sendRedirect(String location) throws ViewLogicException {
        try {
            RequestHelper.getResponse().sendRedirect(location);
        } catch (Exception ex) {
            throw new ViewLogicException("WebUtility.sendRedirect异常：" + ex.getMessage());
        }
    }

    /**
     * 文件下载
     *
     * @param filename 文件名称
     * @param input    下载内容
     */
    public static void download(String filename, InputStream input) {
        try {
            HttpServletResponse response = RequestHelper.getResponse();
            response.setContentType(Constants.WEB_CONTENT_TYPE_DOWNLOAD + "; charset=utf-8");
            response.setCharacterEncoding("utf-8");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\"");
            OutputStream out = response.getOutputStream();
            FileHelper.write(input, out, true);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static void download(String filename, String content) {
        try {
            HttpServletResponse response = RequestHelper.getResponse();
            response.setContentType(Constants.WEB_CONTENT_TYPE_DOWNLOAD + "; charset=utf-8");
            response.setCharacterEncoding("utf-8");
            response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\"");
            OutputStreamWriter out = new OutputStreamWriter(response.getOutputStream(), "UTF-8");
            out.write(content);
            out.flush();
            out.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static void writeHtml(HttpServletResponse response, String html) {
        try {
            setContentType("text/html");
            response.getWriter().write(html);
            response.getWriter().flush();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public static void writeJSON(HttpServletResponse response, Object value) {
        try {
            setContentType("application/javascript");
            response.getWriter().write("(" + JsonHelper.toString(value) + ")");
            response.getWriter().flush();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public static void writeJSONP(HttpServletResponse response, String callback, Object value) {
        try {
            setContentType("application/javascript");
            response.getWriter().write(callback + "(" + JsonHelper.toString(value) + ")");
            response.getWriter().flush();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public static void writerError(String title, String message) {
        StringBuffer html = new StringBuffer();
        html.append("<!doctype html>");
        html.append("<html>");
        html.append("<head>");
        html.append("<title>");
        html.append(title);
        html.append("</title>");
        html.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>");
        html.append("</head>");
        html.append("<body style=\"\">");
        html.append("<div style=\"");
        html.append("background:#f5f5f5;position:fixed;top:45%;text-align:center;font-weight:bold;padding:20px;margin-top:-55px;line-height:32px;");
        html.append("color:#c53336;font-size:24px;left:50%;width:600px;margin-left:-300px;border:1px solid #ddd;");
        html.append("\">");
        html.append(message);
        html.append("</div>");
        html.append("</body>");
        html.append("</html>");
        writeHtml(html.toString());
    }

    public static void writeHtml(String html) {
        writeHtml(RequestHelper.getResponse(), html);
    }

    public static void writeHtmlLn(String html) {
        writeHtml(html + "<br/>");
    }

    public static void writeScript(String script) {
        writeHtml(SCRIPT_TYPE.replace("$script$", script));
    }

    /**
     * 是否POST请求
     *
     * @param request
     * @return
     */
    public static boolean isPostRequest(HttpServletRequest request) {
        return request.getMethod().equalsIgnoreCase("POST");
    }

    public static boolean isPostRequest() {
        return isPostRequest(RequestHelper.getRequest());
    }

    /**
     * 是否Ajax 请求
     *
     * @param request
     * @return
     */
    public static boolean isJsonRequest(HttpServletRequest request) {
        return request.getHeader("accept").indexOf("json") != -1;
    }

    /**
     * 是否是威信请求
     *
     * @param request
     * @return
     */
    public static boolean isWeixinRequest(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        return !ValidHelper.isEmpty(userAgent) && userAgent.toLowerCase().contains("micromessenger");
    }

    public static boolean isJsonRequest() {
        return isJsonRequest(RequestHelper.getRequest());
    }

    /**
     * 是否Get请求
     *
     * @param request
     * @return
     */
    public static boolean isGetRequest(HttpServletRequest request) {
        return request.getMethod().equalsIgnoreCase("GET");
    }

    public static boolean isGetRequest() {
        return isGetRequest(RequestHelper.getRequest());
    }


    /**
     * 封装 转换Request 为 Model DATA
     *
     * @return
     */
    public static Model getInput() {
        return getInput(RequestHelper.getRequest());
    }

    public static Model getInput(HttpServletRequest request) {
        return getInput(request, false);
    }

    /**
     * 封装 转换Request 为 Model DATA
     *
     * @param request
     * @return
     */
    public static Model getInput(HttpServletRequest request, boolean clearHistory) {
        if (null != request.getAttribute("input") && request.getAttribute("input") instanceof Model && !clearHistory) {
            return (Model) request.getAttribute("input");
        }
        Model model = new Model("REQUEST_DATA");
        for (Enumeration e = request.getParameterNames(); e.hasMoreElements(); ) {
            String key = (String) e.nextElement();
            String[] values = request.getParameterValues(key);
            for (String value : values) {
                if (model.containsKey(key) && !key.equalsIgnoreCase("id")) {
                    Object temp = model.get(key);
                    if (temp instanceof List) {
                        ((List) temp).add(value);
                    } else {
                        List temps = new ArrayList();
                        temps.add(temp);
                        temps.add(value);
                        model.put(key, temps);
                    }
                } else {
                    model.put(key, value);
                }
            }
        }
        /*if (ServletFileUpload.isMultipartContent(request)) {
            try {
                ServletFileUpload fileupload = new ServletFileUpload(factory);
                fileupload.setSizeMax(1024 * ConfigHelper.getLong("web.uploader.maxsize"));
                fileupload.setHeaderEncoding("UTF-8");
                List<FileItem> fileItem = fileupload.parseRequest(request);
                for (FileItem field : fileItem) {
                    String value = field.isFormField() ? field.getString("UTF-8") : "";
                    if (!field.isFormField() || !ValidHelper.isEmpty(value))
                        if (model.containsKey(field.getFieldName())) {
                            Object temp = model.get(field.getFieldName());
                            if (temp instanceof List) {
                                ((List) temp).add(field.isFormField() ? value : field);
                            } else {
                                List temps = new ArrayList();
                                temps.add(temp);
                                temps.add(field.isFormField() ? value : field);
                                model.put(field.getFieldName(), temps);
                            }
                        } else {
                            model.put(field.getFieldName(), field.isFormField() ? value : field);
                        }
                }
            } catch (Exception ex) {
                logger.error("上传文件读取内容异常", ex);
            }
        }*/
        request.setAttribute("input", model);
        return model;
    }

    public static String appendURL(Map<String, String> temps, String action) {
        try {
            StringBuffer strBuffer = new StringBuffer();
            Map<String, Object> params = Collections.<String, Object>emptyMap();
            try {
                params = getInput();
            } catch (Exception ex) {
                logger.error("AppendURL Error:", ex);
            }
            for (String key : params.keySet()) {
                if (!temps.containsKey(key) && !key.equalsIgnoreCase("enterprise_page_index")) {
                    if (!ValidHelper.isEmpty(strBuffer.toString())) {
                        strBuffer.append("&");
                    }
                    strBuffer.append(key).append("=").append(URLEncoder.encode(params.get(key).toString(), "utf-8"));
                }
            }
            if (!temps.keySet().isEmpty()) {
                for (String key : temps.keySet()) {
                    if (!ValidHelper.isEmpty(strBuffer.toString())) {
                        strBuffer.append("&");
                    }
                    strBuffer.append(key).append("=").append(URLEncoder.encode(temps.get(key).toString(), "utf-8"));
                }
            }
            if (!ValidHelper.isEmpty(strBuffer)) {
                return action + "?" + strBuffer.toString();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return action;
    }


    public static String getIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    public static StringBuffer getRequestFullUrl(HttpServletRequest request) {
        StringBuffer requestURL = request.getRequestURL();
        if (!ValidHelper.isEmpty(request.getQueryString())) {
            requestURL.append("?").append(request.getQueryString());
        }
        return requestURL;
    }
}
