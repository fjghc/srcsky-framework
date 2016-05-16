/**
 * 宝龙电商
 * com.srcskyframework.core.exception
 * RepositoryException.java
 * <p>
 * 2016-04-10
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.exception;

/**
 * RepositoryException
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 21:29
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class ServiceException extends BaseException {

    public ServiceException() {
    }

    public ServiceException(String message) {
        super(message);
    }

    public ServiceException(Integer code, String message) {
        super(code, message);
    }

    public ServiceException(String message, Throwable rootCause) {
        super(message, rootCause);
    }

    public ServiceException(Integer code, Throwable rootCause) {
        super(code, rootCause);
    }

    public ServiceException(Integer code, String key, String message) {
        super(code, message);
        getInput().set(key, message);
    }

    public ServiceException(Integer code, String message, Throwable rootCause) {
        super(code, message, rootCause);
    }

    public ServiceException(Throwable rootCause) {
        super(rootCause);
    }

    /**
     * 生成异常消息
     *
     * @param exception
     * @return
     */
    public static ServiceException generateException(String exception) {
        return new ServiceException(exception);
    }

    public static ServiceException generateException(Integer code, String exception) {
        return new ServiceException(code, exception);
    }
}