/**
 * 宝龙电商
 * com.srcsky.autoconfigure
 * JpaPagAutoConfiguration.java
 * <p>
 * 2016-03-09
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.db;

import com.srcskyframework.core.exception.LogicException;
import com.srcskyframework.core.support.ConfigHelper;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;

/**
 * JpaPagAutoConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 2:04
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@ConditionalOnClass({LocalContainerEntityManagerFactoryBean.class, EnableTransactionManagement.class, EntityManager.class})
public class DbAutoConfiguration {
    public DbAutoConfiguration() {
        if (ConfigHelper.isEmpty("spring.jpa.hibernate.naming-strategy")) {
            throw LogicException.generateException("未配置 spring.jpa.hibernate.naming-strategy ！");
        }
    }

}
