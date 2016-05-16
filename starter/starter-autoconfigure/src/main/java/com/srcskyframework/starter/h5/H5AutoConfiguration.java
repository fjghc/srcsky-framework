/**
 * 宝龙电商
 * com.srcskyframework.starter.h5
 * H5AutoConfiguration.java
 * <p>
 * 2016-04-16
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.h5;

import com.srcskyserver.h5.filter.ProjectFilter;
import com.srcskyserver.h5.filter.WeixinFilter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * H5AutoConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:02
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
public class H5AutoConfiguration {


    @Bean
    @ConditionalOnBean(annotation = {EnableProjectFilter.class, EnableWeixinFilter.class})
    @ConditionalOnMissingBean(ProjectFilter.class)
    public ProjectFilter projectFilter() {
        return new ProjectFilter();
    }

    @Bean
    @ConditionalOnBean(annotation = EnableWeixinFilter.class)
    @ConditionalOnMissingBean(WeixinFilter.class)
    public WeixinFilter weixinFilter() {
        return new WeixinFilter();
    }

}