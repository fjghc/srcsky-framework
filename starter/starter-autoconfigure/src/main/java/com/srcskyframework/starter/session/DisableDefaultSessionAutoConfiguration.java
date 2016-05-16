/**
 * 宝龙电商
 * com.srcskyframework.starter.session
 * DisableDefaultSessionAutoConfiguration.java
 * <p>
 * 2016-04-12
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.session;

import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * DisableDefaultSessionAutoConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 15:30
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@ComponentScan(excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = org.springframework.boot.autoconfigure.session.SessionAutoConfiguration.class)})
public class DisableDefaultSessionAutoConfiguration {
}