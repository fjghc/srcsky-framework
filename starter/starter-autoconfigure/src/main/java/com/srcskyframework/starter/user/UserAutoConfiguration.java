/**
 * 宝龙电商
 * com.srcsky.autoconfigure
 * UserClientConfiguration.java
 * <p>
 * 2016-03-09
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.user;

import com.alibaba.dubbo.config.spring.ReferenceBean;
import com.srcskyframework.starter.dubbo.DubboAutoConfiguration;
import com.srcskyframework.core.support.DubboHelper;
import com.srcskyserver.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * UserClientConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 22:11
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@AutoConfigureAfter(DubboAutoConfiguration.class)
public class UserAutoConfiguration {
    protected Logger logger = LoggerFactory.getLogger(UserAutoConfiguration.class);

    @Bean
    @ConditionalOnClass(name = "com.srcskyserver.user.service.UserService")
    @ConditionalOnMissingClass("com.srcskyserver.user.service.impl.UserServiceImpl")
    public ReferenceBean<UserService> userService() {
        ReferenceBean<UserService> referenceBean = DubboHelper.consumer(UserService.class);
        return referenceBean;
    }
}
