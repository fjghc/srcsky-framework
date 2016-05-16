/**
 * 宝龙电商
 * com.srcsky.framework.spring.condition
 * DubboConfigExistsCondition.java
 * <p/>
 * 2016-03-10
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.spring.condition;

import com.srcskyframework.core.exception.LogicException;
import com.srcskyframework.core.support.ConfigHelper;
import com.srcskyframework.core.support.Model;
import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

/**
 * DubboConfigExistsCondition
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 0:42
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class DubboCheckCondition implements Condition {
    private Model dubboProperties = ConfigHelper.loadProperties("dubbo.properties");

    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        if (dubboProperties.isEmpty()) {
            throw LogicException.generateException("未配置 dubbo");
        }
        String[] propertys = new String[]{"dubbo.application.name", "dubbo.registry.address", "dubbo.protocol.name", "dubbo.protocol.port"};
        for (String property : propertys) {
            if (dubboProperties.isEmpty(property)) {
                throw LogicException.generateException("未配置 " + property + "!");
            }
        }
        return true;
    }
}
