/**
 * 宝龙电商
 * com.srcskyframework.core.support
 * ClassHelper.java
 * <p>
 * 2016-04-05
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import java.util.HashMap;
import java.util.Map;

/**
 * ClassHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 14:39
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class ClassHelper {
    private static final Map<String, Class<?>> commonClassCache = new HashMap(32);

    public static Class forName(String className) {
        Class claz = commonClassCache.get(className);
        if (commonClassCache.containsKey(className)) {
            return claz;
        } else {
            try {
                claz = Class.forName(className);
            } catch (ClassNotFoundException e) {
            }
            commonClassCache.put(className, claz);
            return claz;
        }
    }

    public static boolean exists(String className) {
        return null != forName(className);
    }
}