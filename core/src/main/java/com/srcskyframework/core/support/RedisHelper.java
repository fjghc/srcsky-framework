/**
 * 宝龙电商
 * com.srcskyframework.core.support
 * RedisHelper.java
 * <p>
 * 2016-04-14
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.concurrent.TimeUnit;

/**
 * RedisHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 10:28
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class RedisHelper {
    /**
     * 获取锁如果为空则设置当前服务器为 加锁服务器
     *
     * @return
     */
    public static boolean getServerLock(StringRedisTemplate stringRedisTemplate, String key, long timer) {
        ValueOperations<String, String> operations = stringRedisTemplate.opsForValue();
        String lock = operations.get(key);
        if (null == lock) {
            operations.set(key, lock = ServerHelper.SERVER_ID, timer, TimeUnit.MILLISECONDS);
        }
        return StringHelper.equalsIgnoreCase(lock, ServerHelper.SERVER_ID);
    }
}