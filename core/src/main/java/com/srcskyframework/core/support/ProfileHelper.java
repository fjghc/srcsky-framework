/**
 * 宝龙电商
 * com.srcsky.framework.support
 * ProfileHelper.java
 * <p/>
 * 2016-02-24
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

/**
 * ProfileHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 10:44
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class ProfileHelper {

    public static boolean isDev() {
        return ConfigHelper.getString("spring.profiles.active", "").indexOf("dev") != -1;
    }

    public static boolean isTest() {
        return ConfigHelper.getString("spring.profiles.active", "").indexOf("test") != -1;

    }

    public static boolean isProduct() {
        return ConfigHelper.getString("spring.profiles.active", "").indexOf("product") != -1;
    }

    public static String getProfile() {
        return ConfigHelper.getString("spring.profiles.active", "");
    }
}
