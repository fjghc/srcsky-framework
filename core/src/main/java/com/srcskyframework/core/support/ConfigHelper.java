/**
 * 宝龙电商
 * com.srcsky.framework.support
 * ConfigHelper.java
 * <p/>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternUtils;

import java.io.IOException;
import java.util.Properties;


/**
 * ConfigHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description 加载 配置信息文件      config/config.properties
 */

public class ConfigHelper {

    private static final Logger logger = LoggerFactory.getLogger(ConfigHelper.class);
    private static final Model localProperties = loadProperties("application*.properties");

    public static String getString(String property) {
        return localProperties.getString(property);
    }

    public static Integer getInt(String property, int defaultValue) {
        int value = localProperties.getInt(property);
        if (0 == value) {
            return defaultValue;
        }
        return value;
    }

    public static Integer getInt(String property) {
        return getInt(property);
    }

    public static Long getLong(String property) {
        return localProperties.getLong(property);
    }

    public static boolean getBoolean(String property) {
        return localProperties.getBoolean(property);
    }

    public static String getString(String property, String _default) {
        return localProperties.getString(property, _default);
    }

    public static Boolean equals(String property, String value) {
        return localProperties.equals(property, value);
    }

    public static boolean isEmpty(String property) {
        return localProperties.isEmpty(property);
    }

    public static boolean isNotEmpty(String property) {
        return localProperties.isNotEmpty(property);
    }

    /**
     * 加载配置文件
     *
     * @param pattern
     * @return
     */
    public static Model loadProperties(String pattern) {
        Properties properties = new Properties();
        try {
            Resource[] resources = ResourcePatternUtils.getResourcePatternResolver(new PathMatchingResourcePatternResolver()).getResources(pattern);
            for (Resource resource : resources) {
                properties.load(resource.getInputStream());
            }
        } catch (IOException ex) {
            logger.error("加载配置文件异常：", ex);
            ex.printStackTrace();
        }
        return new Model(properties);
    }

}
