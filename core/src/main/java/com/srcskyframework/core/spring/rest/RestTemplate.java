/**
 * 宝龙电商
 * com.srcsky.framework.rest
 * BaseRestTemplate.java
 * <p/>
 * 2016-02-17
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.spring.rest;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.*;

import java.util.Map;

/**
 * BaseRestTemplate
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 12:57
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class RestTemplate extends org.springframework.web.client.RestTemplate {

    private static final HttpComponentsClientHttpRequestFactory httpComponentsClientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory();

    public RestTemplate() {
        setRequestFactory(httpComponentsClientHttpRequestFactory);
    }

    public <T> ResponseEntity<T> patchForEntity(String url, Object request, Class<T> responseType, Map<String, ?> uriVariables) throws RestClientException {
        RequestCallback requestCallback = httpEntityCallback(request, responseType);
        ResponseExtractor<ResponseEntity<T>> responseExtractor = responseEntityExtractor(responseType);
        return execute(url, HttpMethod.PATCH, requestCallback, responseExtractor, uriVariables);
    }

    public <T> T patchForObject(String url, Object request, Class<T> responseType, Map<String, ?> uriVariables) throws RestClientException {
        RequestCallback requestCallback = httpEntityCallback(request, responseType);
        HttpMessageConverterExtractor<T> responseExtractor = new HttpMessageConverterExtractor<T>(responseType, getMessageConverters());
        return execute(url, HttpMethod.PATCH, requestCallback, responseExtractor, uriVariables);
    }

}
