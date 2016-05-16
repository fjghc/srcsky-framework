/**
 * 宝龙电商
 * com.srcsky.framework.support
 * BeanHelper.java
 * <p/>
 * 2016-03-07
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

/**
 * BeanHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 14:08
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class BeanHelper {
    private static Logger logger = LoggerFactory.getLogger(BeanHelper.class);

    /**
     * 直接读取对象属性值,无视private/protected修饰符,不经过getter函数.
     */
    public static <T> T get(final Object object, final String fieldName) {
        Field field = getField(object, fieldName);
        if (field == null)
            throw new IllegalArgumentException("Could not find field [" + fieldName + "] on target [" + object + "]");
        makeAccessible(field);
        T result = null;
        try {
            result = (T) field.get(object);
        } catch (IllegalAccessException e) {
            logger.error("不可能抛出的异常{}", e.getMessage());
        }
        return result;
    }

    /**
     * 直接设置对象属性值,无视private/protected修饰符,不经过setter函数.
     */
    public static void set(final Object object, final String fieldName, final Object value) {
        Field field = getField(object, fieldName);

        if (field == null)
            throw new IllegalArgumentException("Could not find field [" + fieldName + "] on target [" + object + "]");

        makeAccessible(field);

        try {
            field.set(object, value);
        } catch (IllegalAccessException e) {
            logger.error("不可能抛出的异常:{}", e.getMessage());
        }
    }

    /**
     * 循环向上转型,获取对象的DeclaredField.
     */
    protected static Field getField(final Object object, final String fieldName) {
        Assert.notNull(object, "object不能为空");
        return getField(object.getClass(), fieldName);
    }

    /**
     * 循环向上转型,获取类的DeclaredField.
     */
    @SuppressWarnings("unchecked")
    protected static Field getField(final Class clazz, final String fieldName) {
        Assert.notNull(clazz, "clazz不能为空");
        Assert.hasText(fieldName, "fieldName");
        for (Class superClass = clazz; superClass != Object.class; superClass = superClass.getSuperclass()) {
            try {
                return superClass.getDeclaredField(fieldName);
            } catch (NoSuchFieldException e) {
                // Field不在当前类定义,继续向上转型
            }
        }
        return null;
    }

    /**
     * 强制转换fileld可访问.
     */
    protected static void makeAccessible(final Field field) {
        if (!Modifier.isPublic(field.getModifiers()) || !Modifier.isPublic(field.getDeclaringClass().getModifiers())) {
            field.setAccessible(true);
        }
    }
}
