/**
 * 宝龙电商
 * com.srcsky.framework.support.spring.web
 * ServletInitializer2.java
 * <p/>
 * 2016-03-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.spring.web;

import com.srcskyframework.core.support.ConfigHelper;
import org.springframework.boot.Banner;
import org.springframework.boot.ResourceBanner;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;

import java.io.PrintStream;

/**
 * ServletInitializer2
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:35
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class ServletInitializer extends SpringBootServletInitializer {
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        try {
            application.banner(new ResourceBanner(new ClassPathResource("/META-INF/banner.txt")));
            return application.sources(ConfigHelper.getString("startup.class"));
        } catch (Exception ex) {
            throw new RuntimeException("startup.class未找到");
        }
    }
}