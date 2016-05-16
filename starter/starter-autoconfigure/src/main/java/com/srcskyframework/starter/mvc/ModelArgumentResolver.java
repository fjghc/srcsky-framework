/**
 * 宝龙电商
 * com.srcsky.framework.support.spring
 * ModelHandlerMethodArgumentResolver.java
 * <p/>
 * 2016-03-02
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.mvc;

import com.srcskyframework.core.support.Model;
import com.srcskyframework.core.support.WebHelper;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

/**
 * ModelHandlerMethodArgumentResolver
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 17:23
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class ModelArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return Model.class.isAssignableFrom(parameter.getParameterType());
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        Model results = (Model) parameter.getParameterType().newInstance();
        results.putAll(WebHelper.getInput(webRequest.getNativeRequest(HttpServletRequest.class)));
        return results;
    }
}
