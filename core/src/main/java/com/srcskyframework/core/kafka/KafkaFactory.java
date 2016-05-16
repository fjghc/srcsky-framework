/**
 * 宝龙电商
 * com.srcskyframework.core.kafka
 * KafkaFactory.java
 * <p>
 * 2016-04-11
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.kafka;

import com.srcskyframework.core.exception.LogicException;
import com.srcskyframework.core.support.ValidHelper;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.springframework.kafka.config.SimpleKafkaListenerContainerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * KafkaFactory
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 14:45
 * @email zhanggj@powerlong.com
 * @description Kafak 工厂操作类
 */
public class KafkaFactory {

    private static Map<String, KafkaTemplate> templates = new HashMap<String, KafkaTemplate>();
    private static Map<String, SimpleKafkaListenerContainerFactory> containers = new HashMap<String, SimpleKafkaListenerContainerFactory>();

    public static SimpleKafkaListenerContainerFactory containerFactory(String name, String servers) {
        if (!containers.containsKey(name)) {
            if (ValidHelper.isEmpty(name)) {
                throw LogicException.generateException("Kafka启动失败：name 不能为空！");
            }
            if (ValidHelper.isEmpty(servers)) {
                throw LogicException.generateException("Kafka启动失败：server 不能为空！");
            }
            String groupId = name;
            Map<String, Object> props = new HashMap<String, Object>();
            props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, servers);
            props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
            props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true);
            props.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, 100);
            props.put(ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG, 15000);
            props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer");
            props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer");
            SimpleKafkaListenerContainerFactory<Integer, String> factory = new SimpleKafkaListenerContainerFactory<Integer, String>();
            factory.setConsumerFactory(new DefaultKafkaConsumerFactory<Integer, String>(props));
            factory.setConcurrency(3);
            containers.put(name, factory);
            return factory;
        }
        return containers.get(name);
    }

    public static KafkaTemplate templateFactory(String name, String servers) {
        if (!templates.containsKey(name)) {
            if (ValidHelper.isEmpty(name)) {
                throw LogicException.generateException("Kafka启动失败：name 不能为空！");
            }
            if (ValidHelper.isEmpty(servers)) {
                throw LogicException.generateException("Kafka启动失败：server 未配置！");
            }
            Map<String, Object> props = new HashMap<String, Object>();
            props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, servers);
            props.put(ProducerConfig.RETRIES_CONFIG, 10);
            props.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384);
            props.put(ProducerConfig.LINGER_MS_CONFIG, 1);
            props.put(ProducerConfig.ACKS_CONFIG, "1");
            props.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 33554432);
            props.put(ProducerConfig.REQUEST_TIMEOUT_MS_CONFIG, 1000*60);
            props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
            props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
            KafkaTemplate template = new KafkaTemplate<Integer, String>(new DefaultKafkaProducerFactory<Integer, String>(props), true);
            templates.put(name, template);
            return template;
        }
        return templates.get(name);
    }
}