/**
 * 宝龙电商
 * com.srcsky.framework.entity
 * JsonpMessage.java
 * <p/>
 * 2016-01-29
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

/**
 * JsonpMessage
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 18:51
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class JsonHelper {
    private final static ObjectMapper objectMapper = new ObjectMapper();

    public static JsonResult build() {
        return new JsonResult();
    }

    /**
     * 序列化 java对象 为 json 字符串
     *
     * @param value
     * @return
     */
    public static String toString(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    /**
     * 从 json 字符串 生成 java 对象
     *
     * @param json
     * @param claz
     * @param <T>
     * @return
     */
    public static <T> T toObject(String json, Class<T> claz) {
        try {
            return objectMapper.readValue(json, claz);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 从 json 字符串 生成 java 对象、制定数据类型
     *
     * @param json
     * @param typeReference
     * @param <T>
     * @return
     */
    public static <T> T toObject(String json, TypeReference typeReference) {
        try {
            return objectMapper.readValue(json, typeReference);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
