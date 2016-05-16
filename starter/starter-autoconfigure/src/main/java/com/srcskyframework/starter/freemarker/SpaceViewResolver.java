/**
 * 宝龙电商
 * com.srcskyframework.starter.freemarker
 * SpaceViewResolver.java
 * <p>
 * 2016-04-06
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.freemarker;

import com.srcskyserver.space.context.SpaceLocator;
import com.srcskyserver.space.entity.Space;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

/**
 * SpaceViewResolver
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 17:16
 * @email zhanggj@powerlong.com
 * @description Space 后缀
 */
public class SpaceViewResolver extends FreeMarkerViewResolver {
    protected String getSuffix() {
        Space space = SpaceLocator.getSpace();
        if (null != space && space.isNotEmpty("alias")) {
            return "." + space.getAlias() + super.getSuffix();
        }
        return super.getSuffix();
    }
}