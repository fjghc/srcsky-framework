/**
 * 宝龙电商
 * com.srcskyframework.starter.sso
 * SsoAutoConfiguration.java
 * <p>
 * 2016-03-13
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.auth;

import com.srcskyframework.core.exception.LogicException;
import com.srcskyframework.core.support.ConfigHelper;
import com.srcskyserver.auth.filter.AuthFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@ConditionalOnClass(AuthFilter.class)
public class AuthAutoConfiguration {
    protected Logger logger = LoggerFactory.getLogger(AuthAutoConfiguration.class);

    @Bean
    @ConditionalOnMissingBean(AuthFilter.class)
    public AuthFilter securityFilter() {
        if (ConfigHelper.isEmpty("auth.url-pattern")) {
            throw LogicException.generateException("未配置 auth.url-pattern ！");
        }
        if (ConfigHelper.isEmpty("auth.fail.address")) {
            throw LogicException.generateException("未配置 auth.fail.address ！");
        }
        return new AuthFilter();
    }
}
