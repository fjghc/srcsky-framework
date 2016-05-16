/**
 * 宝龙电商
 * com.srcskyframework.core.support
 * ModelHelper.java
 * <p>
 * 2016-04-14
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

/**
 * ModelHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:45
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class ModelHelper {
    public static Model build(String key, Object value) {
        return new Model().set(key, value);
    }
}