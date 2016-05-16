/**
 * 宝龙电商
 * com.srcskyframework.core.exception
 * RepositoryException.java
 * <p>
 * 2016-04-10
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.exception;

import com.srcskyframework.core.support.ValidHelper;

/**
 * RepositoryException
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 21:29
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class RepositoryException extends BaseException {

    public RepositoryException() {
    }

    public RepositoryException(String message) {
        super(message);
    }

    public RepositoryException(Integer code, String message) {
        super(code, message);
    }

    public RepositoryException(String message, Throwable rootCause) {
        super(message, rootCause);
    }

    public RepositoryException(Integer code, Throwable rootCause) {
        super(code, rootCause);
    }

    public RepositoryException(Integer code, String key, String message) {
        super(code, message);
        getInput().set(key, message);
    }

    public RepositoryException(Integer code, String message, Throwable rootCause) {
        super(code, message, rootCause);
    }

    public RepositoryException(Throwable rootCause) {
        super(rootCause);
    }

    /**
     * 生成异常消息
     *
     * @param exception
     * @return
     */
    public static RepositoryException generateException(String exception) {
        return new RepositoryException(exception);
    }

    public static RepositoryException generateException(Integer code, String exception) {
        return new RepositoryException(code, exception);
    }
}