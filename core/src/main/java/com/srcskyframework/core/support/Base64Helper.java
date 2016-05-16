/**
 * 宝龙电商
 * com.srcsky.framework.support
 * Base64Helper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import org.apache.commons.codec.binary.Base64;

/**
 * Base64Helper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description
 */
public class Base64Helper {
    /**
     * 编码
     *
     * @param data
     * @return String
     */
    public static String encrypt(byte[] data) {
        return new Base64().encodeBase64URLSafeString(data);
    }

    /**
     * 解码
     *
     * @param value
     * @return string
     */
    public static byte[] decrypt(String value) {
        return new Base64().decodeBase64(value);
    }

    public static byte[] decrypt(byte[] value) {
        return new Base64().decodeBase64(value);
    }
}
