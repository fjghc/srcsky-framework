/**
 * 宝龙电商
 * com.srcskyframework.starter.dubbo
 * DubboHelper.java
 * <p>
 * 2016-03-25
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ReferenceConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import com.alibaba.dubbo.config.spring.ReferenceBean;
import org.springframework.beans.BeansException;

/**
 * DubboHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 14:45
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class DubboHelper {
    /**
     * 生成Dubbo的reference bean
     *
     * @param interfaceClazz interface class
     * @param <T>            服务接口
     * @return reference bean
     * @throws BeansException
     */
    public static <T> ReferenceBean<T> consumer(Class<T> interfaceClazz) throws BeansException {
        String canonicalName = interfaceClazz.getCanonicalName();
        ReferenceBean<T> consumerBean = new ReferenceBean<T>();
        consumerBean.setInterface(canonicalName);
        consumerBean.setId(canonicalName);
        consumerBean.setVersion("0.0.1");
        consumerBean.setCheck(false);
        consumerBean.setTimeout(3000);
        return consumerBean;
    }

    public static <T> T getReferenceService(Class<T> interfaceClazz, String version) {
        ApplicationConfig application = new ApplicationConfig();
        application.setName(ConfigHelper.getString("spring.dubbo.application.name"));
        RegistryConfig registry = new RegistryConfig();
        registry.setAddress(ConfigHelper.getString("spring.dubbo.registry.address"));
        ReferenceConfig<T> reference = new ReferenceConfig<T>();
        reference.setApplication(application);
        reference.setRegistry(registry);
        reference.setInterface(interfaceClazz);
        reference.setVersion("0.0.1");
        return reference.get();
    }

    public static <T> T getReferenceService(Class<T> interfaceClazz) {
        return getReferenceService(interfaceClazz, "0.0.1");
    }
}