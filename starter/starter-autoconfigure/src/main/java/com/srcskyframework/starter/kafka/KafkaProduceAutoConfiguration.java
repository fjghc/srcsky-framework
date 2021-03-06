/**
 * 宝龙电商
 * com.srcskyframework.starter.kafka
 * KafkaAutoConfiguration.java
 * <p>
 * 2016-04-12
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.kafka;

import com.srcskyframework.core.exception.LogicException;
import com.srcskyframework.core.kafka.KafkaFactory;
import com.srcskyframework.core.support.ConfigHelper;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.KafkaTemplate;

/**
 * KafkaAutoConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 14:10
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@ConditionalOnBean(annotation = EnableKafkaProduce.class)
public class KafkaProduceAutoConfiguration {
    @Bean
    public KafkaTemplate weixinKafkaTemplate() {
        if (ConfigHelper.isEmpty("spring.kafka.servers")) {
            throw LogicException.generateException("Kafka启动失败：spring.kafka.servers 不能为空！");
        }
        return KafkaFactory.templateFactory("weixin", ConfigHelper.getString("spring.kafka.servers"));
    }
}