/**
 * 宝龙电商
 * com.srcsky.spring.mvc
 * JsonResultHandlerMethodReturnValueHandler.java
 * <p/>
 * 2016-03-09
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.mvc;

import com.srcskyframework.core.support.JsonResult;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.querydsl.QSort;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor;

import java.io.IOException;
import java.util.List;

/**
 * JsonResultHandlerMethodReturnValueHandler
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 2:09
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class JsonResultHandlerMethodReturnValueHandler extends RequestResponseBodyMethodProcessor {
    public JsonResultHandlerMethodReturnValueHandler(List<HttpMessageConverter<?>> converters) {
        super(converters);
    }

    public JsonResultHandlerMethodReturnValueHandler(List<HttpMessageConverter<?>> converters, ContentNegotiationManager manager) {
        super(converters, manager);
    }

    public JsonResultHandlerMethodReturnValueHandler(List<HttpMessageConverter<?>> converters, List<Object> requestResponseBodyAdvice) {
        super(converters, requestResponseBodyAdvice);
    }

    public JsonResultHandlerMethodReturnValueHandler(List<HttpMessageConverter<?>> converters, ContentNegotiationManager manager, List<Object> requestResponseBodyAdvice) {
        super(converters, manager, requestResponseBodyAdvice);
    }

    public boolean supportsReturnType(MethodParameter parameter) {
        return JsonResult.class.isAssignableFrom(parameter.getParameterType());
    }

    public void handleReturnValue(Object returnValue, MethodParameter returnType, ModelAndViewContainer mavContainer, NativeWebRequest webRequest) throws IOException, HttpMediaTypeNotAcceptableException {
        mavContainer.setRequestHandled(true);
        JsonResult jsonResult = (JsonResult) returnValue;
        if (jsonResult.getData() instanceof PageImpl) {
            PageImpl page = (PageImpl) jsonResult.getData();
            if (page.getSort() instanceof QSort) {
                jsonResult.setData(new PageImpl(page.getContent(), new PageRequest(page.getNumber(), page.getSize()), page.getTotalElements()));
            }
        }
        writeWithMessageConverters(returnValue, returnType, webRequest);
    }
}
