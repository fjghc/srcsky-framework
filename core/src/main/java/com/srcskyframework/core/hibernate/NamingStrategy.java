/**
 * 宝龙电商
 * com.srcsky.framework.support.hibernate
 * NamingStrategy.java
 * <p/>
 * 2016-02-02
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.hibernate;

import org.hibernate.cfg.DefaultNamingStrategy;
import org.hibernate.internal.util.StringHelper;

/**
 * NamingStrategy
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 20:59
 * @email zhanggj@powerlong.com
 * @description 将表明、字段名统一转换为大写、防止数据大小写敏感问题
 */
public class NamingStrategy extends DefaultNamingStrategy {

    public String classToTableName(String className) {
        return StringHelper.unqualify(className).toUpperCase();
    }

    public String propertyToColumnName(String propertyName) {
        return StringHelper.unqualify(propertyName).toUpperCase();
    }

    public String tableName(String tableName) {
        return tableName.toUpperCase();
    }

    public String columnName(String columnName) {
        return columnName.toUpperCase();
    }

}
