/**
 * 宝龙电商
 * com.srcsky.framework.entity
 * BaseException.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.exception;

import com.srcskyframework.core.support.ValidHelper;

/**
 * LogicException
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description 逻辑 异常
 */
public class LogicException extends BaseException {

    public LogicException() {
    }

    public LogicException(String message) {
        super(message);
    }

    public LogicException(Integer code, String message) {
        super(code, message);
    }

    public LogicException(String message, Throwable rootCause) {
        super(message, rootCause);
    }

    public LogicException(Integer code, Throwable rootCause) {
        super(code, rootCause);
    }

    public LogicException(Integer code, String key, String message) {
        super(code, message);
        getInput().set(key, message);
    }

    public LogicException(Integer code, String message, Throwable rootCause) {
        super(code, message, rootCause);
    }

    public LogicException(Throwable rootCause) {
        super(rootCause);
    }

    /**
     * 用户不能为空
     *
     * @return
     */
    public static LogicException generateExceptionByCannotForEmpty(String... use) {
        return generateException((ValidHelper.isEmpty(use) ? "" : use[0]) + "不能为空");
    }

    /**
     * 没有权限
     *
     * @return
     */
    public static LogicException generateExceptionByPermissionDenied() {
        return generateException("没有权限");
    }

    /**
     * 生成异常消息
     *
     * @param exception
     * @return
     */
    public static LogicException generateException(String exception) {
        return new LogicException(exception);
    }

    public static LogicException generateException(Integer code, String exception) {
        return new LogicException(code, exception);
    }
}
