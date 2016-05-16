/**
 * 宝龙电商
 * com.srcskyframework.starter.dubbo
 * EnableDubboProvider.java
 * <p>
 * 2016-03-25
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.dubbo;

import java.lang.annotation.*;

/**
 * EnableDubboProvider
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 13:05
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface EnableDubboProvider {
}