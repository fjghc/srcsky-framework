/**
 * 宝龙电商
 * com.srcskyframework.starter.freemarker
 * SpaceViewResolver.java
 * <p>
 * 2016-04-06
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.freemarker;

import com.srcskyframework.core.support.ProfileHelper;
import com.srcskyframework.core.support.ValidHelper;
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
 * @description Profile 后缀
 */
public class ProfileViewResolver extends FreeMarkerViewResolver {
    protected String getSuffix() {
        String profile = ProfileHelper.getProfile();
        if (ValidHelper.isNotEmpty(profile)) {
            return "." + profile + super.getSuffix();
        }
        return super.getSuffix();
    }
}