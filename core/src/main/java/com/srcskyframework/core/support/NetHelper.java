/**
 * 宝龙电商
 * com.srcsky.framework.support
 * NetHelper.java
 * <p/>
 * 2016-02-20
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import com.srcskyframework.core.exception.LogicException;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.ByteArrayBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.net.NetworkInterface;
import java.nio.charset.Charset;
import java.util.*;

import static org.apache.http.Consts.UTF_8;

/**
 * NetHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 18:28
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class NetHelper {
    private static final Logger logger = LoggerFactory.getLogger(NetHelper.class);

    /**
     * 获取MAC地址
     *
     * @return
     */
    public static String getMacAddress() {
        StringBuffer macAddress = new StringBuffer();
        try {
            Enumeration<NetworkInterface> networks = NetworkInterface.getNetworkInterfaces();
            while (networks.hasMoreElements()) {
                NetworkInterface network = networks.nextElement();
                byte[] mac = network.getHardwareAddress();
                if (null != mac && mac.length > 0) {
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < mac.length; i++) {
                        macAddress.append(String.format("%02X%s", mac[i], (i < mac.length - 1) ? "-" : ""));
                    }
                    break;
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        if (macAddress.length() == 0) {
            macAddress.append(UUID.randomUUID().toString());
        }
        logger.debug("本机MacAddress：->" + macAddress);
        return macAddress.toString();
    }

    /**
     * 文件上传
     *
     * @param url
     * @param parameter
     * @param files
     * @return
     */
    public static String uploader(String url, Map<String, String> parameter, Map<String, File> files) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        HttpPost post = new HttpPost(url);
        try {
            RequestConfig config = RequestConfig.custom()
                    .setConnectionRequestTimeout(60000)
                    .setConnectTimeout(60000)
                    .setSocketTimeout(60000).build();
            MultipartEntityBuilder builder = MultipartEntityBuilder.create();
            builder = builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
            for (Map.Entry<String, String> params : parameter.entrySet()) {
                builder = builder.addTextBody(params.getKey(), params.getValue(), ContentType.create("text/plain", UTF_8));
            }
            for (Map.Entry<String, File> params : files.entrySet()) {
                builder = builder.addBinaryBody(params.getKey(), params.getValue(), ContentType.MULTIPART_FORM_DATA, params.getValue().getName());
            }
            post.setEntity(builder.build());
            post.setConfig(config);
            response = httpClient.execute(post);
            // 打印响应状态
            HttpEntity resEntity = response.getEntity();
            String result = EntityUtils.toString(resEntity, Charset.forName("UTF-8"));
            // 销毁
            EntityUtils.consume(resEntity);
            return result;
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                response.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }

    /**
     * 多文件上传
     *
     * @param url
     * @param tokens
     * @param filename
     * @param files
     * @return
     */
    public static String uploader(String url, List<String> tokens, List<String> filename, List<byte[]> files) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        HttpPost post = new HttpPost(url);
        try {
            RequestConfig config = RequestConfig.custom()
                    .setConnectionRequestTimeout(10000)
                    .setConnectTimeout(10000)
                    .setSocketTimeout(10000).build();
            MultipartEntityBuilder builder = MultipartEntityBuilder.create();
            builder = builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
            if (tokens.size() != filename.size() || filename.size() != files.size()) {
                throw LogicException.generateException("三个参数数量必须一致：tokens,names,files");
            }
            for (int i = 0; i < tokens.size(); i++) {
                builder = builder.addTextBody("tokens", tokens.get(i), ContentType.create("text/plain", UTF_8));
                builder = builder.addBinaryBody("files", files.get(i), ContentType.MULTIPART_FORM_DATA, filename.get(i));
            }
            post.setEntity(builder.build());
            post.setConfig(config);
            response = httpClient.execute(post);
            // 打印响应状态
            HttpEntity resEntity = response.getEntity();
            String result = EntityUtils.toString(resEntity, UTF_8);
            // 销毁
            EntityUtils.consume(resEntity);
            return result;
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (null != response) {
                    response.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return null;
    }

    /**
     * @param url
     * @param token
     * @param filename
     * @param file
     * @return
     */
    public static String uploader(String url, String token, String filename, byte[] file) {
        return uploader(url, Arrays.asList(token), Arrays.asList(filename), Arrays.asList(file));
    }


    public static String post(String url, Map<String, String> parameter) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        HttpPost post = new HttpPost(url);
        try {
            RequestConfig config = RequestConfig.custom()
                    .setConnectionRequestTimeout(10000)
                    .setConnectTimeout(10000)
                    .setSocketTimeout(10000).build();
            List<NameValuePair> params = new ArrayList<NameValuePair>();
            for (Map.Entry<String, String> entry : parameter.entrySet()) {
                params.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }
            UrlEncodedFormEntity entity = new UrlEncodedFormEntity(params, UTF_8);
            post.setEntity(entity);
            post.setConfig(config);
            response = httpClient.execute(post);
            // 打印响应状态
            HttpEntity resEntity = response.getEntity();
            String result = EntityUtils.toString(resEntity, UTF_8);
            // 销毁
            EntityUtils.consume(resEntity);
            return result;
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (null != response) {
                    response.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }

    public static String get(String url) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        HttpGet get = new HttpGet(url);
        try {
            RequestConfig config = RequestConfig.custom()
                    .setConnectionRequestTimeout(10000)
                    .setConnectTimeout(10000)
                    .setSocketTimeout(10000).build();
            get.setConfig(config);
            response = httpClient.execute(get);
            // 打印响应状态
            HttpEntity resEntity = response.getEntity();
            String result = EntityUtils.toString(resEntity, UTF_8);
            // 销毁
            EntityUtils.consume(resEntity);
            return result;
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (null != response) {
                    response.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }
}
