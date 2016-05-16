/**
 * 宝龙电商
 * com.srcskyframework.starter.space
 * SpaceAutoConfiguration.java
 * <p>
 * 2016-03-13
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.space;

import com.alibaba.dubbo.config.spring.ReferenceBean;
import com.srcskyframework.starter.dubbo.DubboAutoConfiguration;
import com.srcskyframework.core.support.DubboHelper;
import com.srcskyserver.space.filter.SpaceFilter;
import com.srcskyserver.space.service.ProjectService;
import com.srcskyserver.space.service.ServerService;
import com.srcskyserver.space.service.SpaceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * SpaceAutoConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 17:01
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@AutoConfigureAfter(DubboAutoConfiguration.class)
public class SpaceAutoConfiguration {
    protected Logger logger = LoggerFactory.getLogger(SpaceAutoConfiguration.class);

    @Bean
    @ConditionalOnClass(name = "com.srcskyserver.space.service.SpaceService")
    @ConditionalOnMissingClass("com.srcskyserver.space.service.impl.SpaceServiceImpl")
    public ReferenceBean<SpaceService> spaceService() {
        return DubboHelper.consumer(SpaceService.class);
    }

    @Bean
    @ConditionalOnClass(name = "com.srcskyserver.space.service.ProjectService")
    @ConditionalOnMissingClass("com.srcskyserver.space.service.impl.ProjectServiceImpl")
    public ReferenceBean<ProjectService> projectService() {
        return DubboHelper.consumer(ProjectService.class);
    }

    @Bean
    @ConditionalOnClass(name = "com.srcskyserver.space.service.ServerService")
    @ConditionalOnMissingClass("com.srcskyserver.space.service.impl.ServerServiceImpl")
    public ReferenceBean<ServerService> serverService() {
        return DubboHelper.consumer(ServerService.class);
    }

    @Bean
    @ConditionalOnClass(name = "com.srcskyserver.space.filter.SpaceFilter")
    @ConditionalOnBean(annotation = EnableSpaceFilter.class)
    @ConditionalOnWebApplication
    public SpaceFilter spaceFilter() {
        return new SpaceFilter();
    }
}
