/**
 * 宝龙电商
 * com.srcskyframework.starter.freemarker
 * FreemarkerAutoConfiguration.java
 * <p>
 * 2016-03-18
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.freemarker;

import com.srcskyframework.core.support.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfig;

/**
 * FreemarkerAutoConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 17:08
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@ConditionalOnClass({freemarker.template.Configuration.class})
@AutoConfigureAfter(FreeMarkerAutoConfiguration.class)
@EnableConfigurationProperties(FreeMarkerProperties.class)
public class FreemarkerAutoConfiguration {
    private BeanWrapper beanWrapper = new BeanWrapper();
    @Autowired
    protected FreeMarkerProperties properties;

    @Bean
    public freemarker.template.Configuration freeMarkerConfiguration(FreeMarkerConfig configurer) throws Exception {
        freemarker.template.Configuration configuration = configurer.getConfiguration();
        configuration.setTemplateExceptionHandler(new TemplateExceptionHandler());
        configuration.setSharedVariable("math", beanWrapper.getStaticModels().get(Math.class.getName()));
        configuration.setSharedVariable("const", beanWrapper.getStaticModels().get(Constants.class.getName()));
        configuration.setSharedVariable("stringHelper", beanWrapper.getStaticModels().get(StringHelper.class.getName()));
        configuration.setSharedVariable("urlHelper", beanWrapper.getStaticModels().get(UrlHelper.class.getName()));
        configuration.setSharedVariable("dateHelper", beanWrapper.getStaticModels().get(DateHelper.class.getName()));
        configuration.setSharedVariable("configHelper", beanWrapper.getStaticModels().get(ConfigHelper.class.getName()));
        configuration.setSharedVariable("fileHelper", beanWrapper.getStaticModels().get(FileHelper.class.getName()));
        configuration.setObjectWrapper(beanWrapper);
        return configuration;
    }

    @Bean
    public SpaceViewResolver spaceViewResolver() {
        SpaceViewResolver spaceViewResolver = new SpaceViewResolver();
        this.properties.applyToViewResolver(spaceViewResolver);
        spaceViewResolver.setOrder(2147483640);
        return spaceViewResolver;
    }

    @Bean
    public ProfileViewResolver profileViewResolver() {
        ProfileViewResolver profileViewResolver = new ProfileViewResolver();
        this.properties.applyToViewResolver(profileViewResolver);
        profileViewResolver.setOrder(2147483641);
        return profileViewResolver;
    }
}
