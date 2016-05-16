/**
 * 宝龙电商
 * com.srcskyframework.core.spring
 * SpringLocator.java
 * <p>
 * 2016-03-13
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.spring;

import com.srcskyframework.core.support.ProfileHelper;
import org.springframework.boot.Banner;
import org.springframework.boot.ResourceBanner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.ClassPathResource;

import java.util.Map;

/**
 * SpringLocator
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 1:27
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class SpringLocator {
    private static ApplicationContext applicationContext;

    public static void run(Class application, String[] args) {
        SpringApplication app = new SpringApplication(application);
        app.setBanner(new ResourceBanner(new ClassPathResource("/META-INF/banner.txt")));
        app.setAdditionalProfiles(ProfileHelper.getProfile().split(","));
        applicationContext = app.run(args);
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    public static <T> T getBean(Class beanType) {
        return (T) applicationContext.getBean(beanType);
    }

    public static <T> T getBean(String beanName) {
        return (T) applicationContext.getBean(beanName);
    }

    public <T> Map<String, T> getBeansOfType(Class beanType) {
        return applicationContext.getBeansOfType(beanType);
    }
}
