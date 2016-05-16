/**
 * 宝龙电商
 * com.srcsky.framework.support.spring.web
 * ServletInitializer2.java
 * <p/>
 * 2016-03-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.spring.web;

import com.srcskyframework.core.support.ProfileHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.servlet.config.annotation.ResourceChainRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.AppCacheManifestTransformer;
import org.springframework.web.servlet.resource.GzipResourceResolver;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ServletInitializer2
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:35
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class BaseMvcConfigurerAdapter extends WebMvcConfigurerAdapter {

    @Autowired
    private ApplicationContext applicationContext;

    public static Map<String, List<String>> resourceHandlers = new HashMap();

    public void addResourceHandlers(String pattern, String location) {
        List<String> values = resourceHandlers.get(pattern);
        if (null == values) {
            resourceHandlers.put(pattern, values = new ArrayList<String>());
        }
        if (!values.contains(location)) {
            values.add(location);
        }
    }

    public void addDevStaticDirectory(String dynamicAppName, String staticAppName) {
        String file = "file://" + BaseMvcConfigurerAdapter.class.getResource("/").getFile().split(dynamicAppName)[0] + staticAppName + "/src/main/webapp";
        addResourceHandlers("/scripts/**", file + "/scripts/");
        addResourceHandlers("/styles/**", file + "/styles/");
    }

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        for (Map.Entry<String, List<String>> rs : resourceHandlers.entrySet()) {
            ResourceHandlerRegistration registration = registry.addResourceHandler(rs.getKey());
            for (String location : rs.getValue()) {
                registration.addResourceLocations(location);
            }
            if (!ProfileHelper.isDev()) {
                registration.setCachePeriod(60 * 60 * 24 * 365);
                ResourceChainRegistration chain = registration.resourceChain(true);
                chain.addResolver(new GzipResourceResolver());
                chain.addTransformer(new AppCacheManifestTransformer());
                chain.addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));
            }
        }
    }
}