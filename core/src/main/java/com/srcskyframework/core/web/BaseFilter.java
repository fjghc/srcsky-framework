/**
 * 宝龙电商
 * com.srcskyframework.core.web
 * BaseFilter.java
 * <p>
 * 2016-03-17
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.web;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Pattern;

/**
 * BaseFilter
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 18:42
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public abstract class BaseFilter extends OncePerRequestFilter {
    private Pattern pattern = Pattern.compile("(?i)^/.+\\.(ico|css|jpg|png|gif|jpeg|xml|js|ico|map)$");


    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (pattern.matcher(request.getRequestURI()).find()) {
            filterChain.doFilter(request, response);
        } else {
            doFilter(request, response, filterChain);
        }
    }

    protected abstract void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException;
}
