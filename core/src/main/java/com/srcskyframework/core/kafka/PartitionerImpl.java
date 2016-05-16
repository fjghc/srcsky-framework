/**
 * 宝龙电商
 * com.srcskyframework.core.kafka
 * PartitionerImpl.java
 * <p>
 * 2016-04-11
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.kafka;

import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;

import java.util.Map;

/**
 * PartitionerImpl
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 19:05
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class PartitionerImpl implements Partitioner {
    @Override
    public int partition(String s, Object o, byte[] bytes, Object o1, byte[] bytes1, Cluster cluster) {
        return 0;
    }

    @Override
    public void close() {

    }

    @Override
    public void configure(Map<String, ?> map) {

    }
}