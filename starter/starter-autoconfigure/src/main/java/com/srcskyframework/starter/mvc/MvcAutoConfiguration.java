/**
 * 宝龙电商
 * com.srcsky.autoconfigure
 * MvcAutoConfiguration.java
 * <p>
 * 2016-03-08
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.mvc;

import com.srcskyframework.core.spring.web.BaseMvcConfigurerAdapter;
import com.srcskyframework.core.support.BeanHelper;
import com.srcskyframework.core.support.Constants;
import com.srcskyframework.core.support.Model;
import com.srcskyframework.core.support.UrlHelper;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.boot.autoconfigure.web.ErrorMvcAutoConfiguration;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.core.annotation.Order;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.querydsl.binding.QuerydslBindingsFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolverComposite;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.HandlerMethodReturnValueHandlerComposite;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

import javax.annotation.PostConstruct;
import javax.servlet.Servlet;
import java.util.ArrayList;
import java.util.List;

/**
 * MvcAutoConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 17:22
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@ConditionalOnClass({Servlet.class, DispatcherServlet.class})
@ConditionalOnWebApplication
@AutoConfigureBefore(ErrorMvcAutoConfiguration.class)
public class MvcAutoConfiguration extends BaseMvcConfigurerAdapter {

    @Autowired
    private ServerProperties properties;

    @Autowired
    private ResourceUrlProvider resourceUrlProvider;

    @Autowired
    @Qualifier("mvcConversionService")
    private ObjectFactory<ConversionService> conversionService;

    /**
     * 暴露 classpath 内静态资源
     */
    @PostConstruct
    public void initialized() {
        UrlHelper.resourceUrlProvider = resourceUrlProvider;
        addResourceHandlers("/scripts/**", "classpath:/scripts/");
        addResourceHandlers("/styles/**", "classpath:/styles/");
        addResourceHandlers("/scripts/**", "/scripts/");
        addResourceHandlers("/styles/**", "/styles/");
    }

    @Configuration
    @ControllerAdvice
    public static class ControllerBodyAdvice extends AbstractJsonpResponseBodyAdvice {
        public ControllerBodyAdvice() {
            super(Constants.WEB_JSONP_CALLBACK_PARAMS_NAME);
        }
    }


    /**
     * 错误处理
     *
     * @param errorAttributes
     * @return
     */
    @Bean
    public ErrorHandleController basicErrorController(ErrorAttributes errorAttributes) {
        return new ErrorHandleController(errorAttributes, this.properties.getError());
    }

    /**
     * 处理 Model类型输入参数、JsonResult类
     * 型返回参数
     *
     * @param requestMappingHandlerAdapter
     * @return
     */
    @Bean
    @Order(0)
    @ConditionalOnClass(Model.class)
    public ModelArgumentResolver mvcModelArgumentResolver(RequestMappingHandlerAdapter requestMappingHandlerAdapter) {
        ModelArgumentResolver modelArgumentResolver = new ModelArgumentResolver();
        // 输入参数解析
        HandlerMethodArgumentResolverComposite handlerMethodArgumentResolverComposite = BeanHelper.get(requestMappingHandlerAdapter, "argumentResolvers");
        List<HandlerMethodArgumentResolver> handlerMethodArgumentResolvers = new ArrayList<HandlerMethodArgumentResolver>();
        handlerMethodArgumentResolvers.add(modelArgumentResolver);
        handlerMethodArgumentResolvers.addAll(requestMappingHandlerAdapter.getArgumentResolvers());
        BeanHelper.set(handlerMethodArgumentResolverComposite, "argumentResolvers", handlerMethodArgumentResolvers);
        // 返回参数解析
        HandlerMethodReturnValueHandlerComposite handlerMethodReturnValueHandlerComposite = BeanHelper.get(requestMappingHandlerAdapter, "returnValueHandlers");
        List<HandlerMethodReturnValueHandler> handlerMethodReturnValueHandlers = new ArrayList<HandlerMethodReturnValueHandler>();
        handlerMethodReturnValueHandlers.add(new JsonResultHandlerMethodReturnValueHandler(requestMappingHandlerAdapter.getMessageConverters(), (List) BeanHelper.get(requestMappingHandlerAdapter, "requestResponseBodyAdvice")));
        handlerMethodReturnValueHandlers.addAll(requestMappingHandlerAdapter.getReturnValueHandlers());
        BeanHelper.set(handlerMethodReturnValueHandlerComposite, "returnValueHandlers", handlerMethodReturnValueHandlers);
        return modelArgumentResolver;
    }

    /**
     * 处理 User 类型输入参数
     *
     * @param requestMappingHandlerAdapter
     * @return
     */
    @Bean
    @Order(1)
    @ConditionalOnClass(name = "com.srcskyserver.user.entity.User")
    public UserArgumentResolver mvcUserArgumentResolver(RequestMappingHandlerAdapter requestMappingHandlerAdapter) {
        // 输入参数解析
        UserArgumentResolver userArgumentResolver = new UserArgumentResolver();
        HandlerMethodArgumentResolverComposite handlerMethodArgumentResolverComposite = BeanHelper.get(requestMappingHandlerAdapter, "argumentResolvers");
        List<HandlerMethodArgumentResolver> handlerMethodArgumentResolvers = new ArrayList<HandlerMethodArgumentResolver>();
        handlerMethodArgumentResolvers.add(userArgumentResolver);
        handlerMethodArgumentResolvers.addAll(requestMappingHandlerAdapter.getArgumentResolvers());
        BeanHelper.set(handlerMethodArgumentResolverComposite, "argumentResolvers", handlerMethodArgumentResolvers);
        return userArgumentResolver;
    }

    /**
     * 处理 Space 类型输入参数
     *
     * @param requestMappingHandlerAdapter
     * @return
     */
    @Bean
    @Order(2)
    @ConditionalOnClass(name = "com.srcskyserver.space.entity.Space")
    public SpaceArgumentResolver mvcSpaceArgumentResolver(RequestMappingHandlerAdapter requestMappingHandlerAdapter) {
        // 输入参数解析
        SpaceArgumentResolver spaceArgumentResolver = new SpaceArgumentResolver();
        HandlerMethodArgumentResolverComposite handlerMethodArgumentResolverComposite = BeanHelper.get(requestMappingHandlerAdapter, "argumentResolvers");
        List<HandlerMethodArgumentResolver> handlerMethodArgumentResolvers = new ArrayList<HandlerMethodArgumentResolver>();
        handlerMethodArgumentResolvers.add(spaceArgumentResolver);
        handlerMethodArgumentResolvers.addAll(requestMappingHandlerAdapter.getArgumentResolvers());
        BeanHelper.set(handlerMethodArgumentResolverComposite, "argumentResolvers", handlerMethodArgumentResolvers);
        return spaceArgumentResolver;
    }

    /**
     * 处理 Server 类型输入参数
     *
     * @param requestMappingHandlerAdapter
     * @return
     */
    @Bean
    @Order(3)
    @ConditionalOnClass(name = "com.srcskyserver.space.entity.Server")
    public ServerArgumentResolver mvcServerArgumentResolver(RequestMappingHandlerAdapter requestMappingHandlerAdapter) {
        // 输入参数解析
        ServerArgumentResolver serverArgumentResolver = new ServerArgumentResolver();
        HandlerMethodArgumentResolverComposite handlerMethodArgumentResolverComposite = BeanHelper.get(requestMappingHandlerAdapter, "argumentResolvers");
        List<HandlerMethodArgumentResolver> handlerMethodArgumentResolvers = new ArrayList<HandlerMethodArgumentResolver>();
        handlerMethodArgumentResolvers.add(serverArgumentResolver);
        handlerMethodArgumentResolvers.addAll(requestMappingHandlerAdapter.getArgumentResolvers());
        BeanHelper.set(handlerMethodArgumentResolverComposite, "argumentResolvers", handlerMethodArgumentResolvers);
        return serverArgumentResolver;
    }


    /**
     * 处理 Server 类型输入参数
     *
     * @param requestMappingHandlerAdapter
     * @return
     */
    @Bean
    @Order(4)
    @ConditionalOnClass(name = "com.querydsl.core.types.Predicate")
    public QuerydslPredicateArgumentResolver mvcQuerydslPredicateArgumentResolver(QuerydslBindingsFactory querydslBindingsFactory, RequestMappingHandlerAdapter requestMappingHandlerAdapter) {
        // 输入参数解析
        QuerydslPredicateArgumentResolver querydslPredicateArgumentResolver = new QuerydslPredicateArgumentResolver(querydslBindingsFactory, conversionService.getObject());
        HandlerMethodArgumentResolverComposite handlerMethodArgumentResolverComposite = BeanHelper.get(requestMappingHandlerAdapter, "argumentResolvers");
        List<HandlerMethodArgumentResolver> handlerMethodArgumentResolvers = new ArrayList<HandlerMethodArgumentResolver>();
        handlerMethodArgumentResolvers.add(querydslPredicateArgumentResolver);
        handlerMethodArgumentResolvers.addAll(requestMappingHandlerAdapter.getArgumentResolvers());
        BeanHelper.set(handlerMethodArgumentResolverComposite, "argumentResolvers", handlerMethodArgumentResolvers);
        return querydslPredicateArgumentResolver;
    }
}
