/**
 * 宝龙电商
 * com.srcskyframework.starter.dubbo
 * DubboProperties.java
 * <p>
 * 2016-03-25
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.dubbo;

import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ConsumerConfig;
import com.alibaba.dubbo.config.ProtocolConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * DubboProperties
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 12:41
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@ConfigurationProperties(prefix = "spring.dubbo")
public class DubboProperties {

    // 在zookeeper注册中心暴露服务地址
    private final static RegistryConfig registry = new RegistryConfig();
    // 应用信息，用于计算依赖关系
    private final static  ApplicationConfig application = new ApplicationConfig();
    // 协议端口号
    private final static  ProtocolConfig protocol = new ProtocolConfig();
    // 服务消费者缺省值配置
    private final static  ConsumerConfig consumer = new ConsumerConfig();

    public RegistryConfig getRegistry() {
        return registry;
    }

    public ApplicationConfig getApplication() {
        return application;
    }

    public ProtocolConfig getProtocol() {
        return protocol;
    }

    public ConsumerConfig getConsumer() {
        return consumer;
    }
}
