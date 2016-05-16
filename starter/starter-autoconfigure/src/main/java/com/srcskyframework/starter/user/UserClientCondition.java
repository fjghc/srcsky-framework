/**
 * 宝龙电商
 * com.srcsky.autoconfigure
 * UserClientAutoCondition.java
 * <p>
 * 2016-03-10
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.user;

import com.alibaba.dubbo.config.spring.ReferenceBean;
import com.srcskyframework.core.exception.LogicException;
import com.srcskyframework.core.support.ConfigHelper;
import com.srcskyserver.user.service.UserService;
import org.springframework.beans.PropertyValue;
import org.springframework.beans.factory.BeanFactoryUtils;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.boot.autoconfigure.condition.ConditionOutcome;
import org.springframework.boot.autoconfigure.condition.SpringBootCondition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.context.annotation.ConfigurationCondition;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.type.AnnotatedTypeMetadata;

import java.util.ArrayList;
import java.util.List;

/**
 * UserClientAutoCondition
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 0:34
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Order(Ordered.LOWEST_PRECEDENCE)
public class UserClientCondition /*extends SpringBootCondition implements ConfigurationCondition*/ {
    /*private String[] checkClassNames = new String[]{UserService.class.getName()};

    @Override
    public ConditionOutcome getMatchOutcome(ConditionContext context, AnnotatedTypeMetadata metadata) {
        ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
        String[] propertys = new String[]{"dubbo.application.name", "dubbo.registry.address"};
        for (String property : propertys) {
            if (ConfigHelper.isEmpty(property)) {
                throw LogicException.generateException("未配置 " + property + "!");
            }
        }
        String[] referenceBeans = beanFactory.getBeanNamesForType(ReferenceBean.class);
        List<String> results = new ArrayList<String>();
        for (String referenceBean : referenceBeans) {
            PropertyValue propertyValue = beanFactory.getBeanDefinition(BeanFactoryUtils.transformedBeanName(referenceBean)).getPropertyValues().getPropertyValue("interface");
            results.add(propertyValue.getValue().toString());
        }
        for (String className : checkClassNames) {
            if (!results.contains(className)) {
                throw LogicException.generateException("未定义 " + className + "，请检查Dubbo配置，尝试导入 srcsky-module-user-client 工程下 classpath*:/spring/application-user-*.xml 配置文件");
            }
        }
        return ConditionOutcome.match();
    }

    @Override
    public ConfigurationPhase getConfigurationPhase() {
        return ConfigurationPhase.REGISTER_BEAN;
    }*/
}
