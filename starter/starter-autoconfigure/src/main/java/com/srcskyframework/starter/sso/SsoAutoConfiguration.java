/**
 * 宝龙电商
 * com.srcskyframework.starter.sso
 * SsoAutoConfiguration.java
 * <p>
 * 2016-03-13
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.sso;

import com.srcskyframework.core.exception.LogicException;
import com.srcskyframework.core.support.ConfigHelper;
import com.srcskyframework.starter.space.EnableSpaceFilter;
import com.srcskyserver.sso.filter.SingleSingOnFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * SsoAutoConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 1:41
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@ConditionalOnClass(SingleSingOnFilter.class)
public class SsoAutoConfiguration {
    protected Logger logger = LoggerFactory.getLogger(SsoAutoConfiguration.class);

    @Bean
    @ConditionalOnBean(annotation = EnableSsoFilter.class)
    @ConditionalOnMissingBean(SingleSingOnFilter.class)
    public SingleSingOnFilter singleSingOnFilter() {
        if (ConfigHelper.isEmpty("sso.exclude.url-pattern")) {
            logger.debug("未配置 sso.exclude.url-pattern ，采用默认策略全部拦截！");
        }
        return new SingleSingOnFilter();
    }
}
