/**
 * 宝龙电商
 * com.srcskyframework.starter.dubbo
 * DubboAnnotationConfiguration.java
 * <p>
 * 2016-03-25
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.dubbo;

import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.alibaba.dubbo.common.utils.ReflectUtils;
import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ProtocolConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import com.alibaba.dubbo.config.spring.ServiceBean;
import com.srcskyframework.core.dubbo.DubboService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.Advised;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Map;

/**
 * DubboAnnotationConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 12:43
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@ConditionalOnBean(annotation = EnableDubboProvider.class)
@EnableConfigurationProperties(DubboProperties.class)
public class DubboAnnotationConfiguration implements ApplicationContextAware {

    private Logger logger = LoggerFactory.getLogger(DubboAnnotationConfiguration.class);

    private ApplicationContext applicationContext;
    @Autowired
    private ApplicationConfig application;
    @Autowired
    private ProtocolConfig protocol;
    @Autowired
    private RegistryConfig registry;

    public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @PostConstruct
    public void init() throws Exception {
        Map<String, Object> beans = applicationContext.getBeansWithAnnotation(DubboService.class);
        for (Map.Entry<String, Object> entry : beans.entrySet()) {
            publish(entry.getValue());
        }
    }

    public void publish(Object bean) throws Exception {
        DubboService annotation = bean.getClass().getAnnotation(DubboService.class);
        Class targetClass = bean.getClass();
        if (null == annotation && bean instanceof Advised) {
            Advised advised = (Advised) bean;
            annotation = advised.getTargetSource().getTarget().getClass().getAnnotation(DubboService.class);
        }
        if (bean instanceof Advised) {
            targetClass = ((Advised) bean).getTargetClass();
        }
        ServiceBean serviceConfig = new ServiceBean();
        if (targetClass.getInterfaces().length > 0) {
            serviceConfig.setInterface(targetClass.getInterfaces()[0]);
        } else {
            throw new IllegalStateException("Failed to export remote service class " + bean.getClass().getName() + ", cause: The @Service undefined interfaceClass or interfaceName, and the service class unimplemented any interfaces.");
        }
        Method[] methods = DubboService.class.getMethods();
        for (Method method : methods) {
            if (method.getDeclaringClass() != Object.class
                    && method.getReturnType() != void.class
                    && method.getParameterTypes().length == 0
                    && Modifier.isPublic(method.getModifiers())
                    && !Modifier.isStatic(method.getModifiers())) {
                try {
                    String property = method.getName();
                    if ("interfaceClass".equals(property) || "interfaceName".equals(property)) {
                        property = "interface";
                    }
                    String setter = "set" + property.substring(0, 1).toUpperCase() + property.substring(1);
                    Object value = method.invoke(annotation, new Object[0]);
                    if (value != null && !value.equals(method.getDefaultValue())) {
                        Class<?> parameterType = ReflectUtils.getBoxedClass(method.getReturnType());
                        if ("filter".equals(property) || "listener".equals(property)) {
                            parameterType = String.class;
                            value = StringUtils.join((String[]) value, ",");
                        } else if ("parameters".equals(property)) {
                            parameterType = Map.class;
                            value = CollectionUtils.toStringMap((String[]) value);
                        }
                        try {
                            Method setterMethod = serviceConfig.getClass().getMethod(setter, new Class<?>[]{parameterType});
                            setterMethod.invoke(serviceConfig, new Object[]{value});
                        } catch (NoSuchMethodException e) {
                            // ignore
                        }
                    }
                } catch (Throwable e) {
                    logger.error(e.getMessage(), e);
                }
            }
        }
        serviceConfig.setApplicationContext(applicationContext);
        serviceConfig.setApplication(application);
        serviceConfig.setProtocol(protocol);
        serviceConfig.setRegistry(registry);
        serviceConfig.afterPropertiesSet();
        serviceConfig.setRef(bean);
        serviceConfig.export();
    }

    @PreDestroy
    public void onDestroy() throws Exception {
        // 销毁 Dubbo 服务
        ProtocolConfig.destroyAll();
        RegistryConfig.destroyAll();
    }
}