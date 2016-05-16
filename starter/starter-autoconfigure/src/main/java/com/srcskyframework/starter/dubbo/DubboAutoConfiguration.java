/**
 * 宝龙电商
 * com.srcskyframework.starter.dubbo
 * DubboAutoConfiguration.java
 * <p>
 * 2016-03-25
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.dubbo;

import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ProtocolConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

/**
 * DubboAutoConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 13:10
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@ConditionalOnClass({ApplicationConfig.class})
@EnableConfigurationProperties(DubboProperties.class)
public class DubboAutoConfiguration {

    @Autowired
    private DubboProperties properties;

    @Bean
    @ConditionalOnMissingBean
    public ApplicationConfig dubboApplicationConfig() {
        return properties.getApplication();
    }

    @Bean
    @ConditionalOnBean(annotation = EnableDubboProvider.class)
    @ConditionalOnMissingBean
    public ProtocolConfig dubboProtocolConfig() {
        return properties.getProtocol();
    }

    @Bean
    @ConditionalOnMissingBean
    public RegistryConfig dubboRegistryConfig() {
        return properties.getRegistry();
    }

    @PostConstruct
    public void addHessian2SerializerFactory() {
        DubboHessionSerializerFactory.init();
    }
}