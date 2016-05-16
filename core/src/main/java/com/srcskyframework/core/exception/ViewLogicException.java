/**
 * 宝龙电商
 * com.srcsky.framework.entity
 * BaseException.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.exception;

/**
 * LogicException
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description 视图 异常
 */
public class ViewLogicException extends BaseException {

    //非法请求
    public final static ViewLogicException ILLEGAL_REQUEST = new ViewLogicException("非法请求");
    public final static ViewLogicException RECORD_DOES_NOT_EXIST = new ViewLogicException("记录不存在");

    public ViewLogicException() {
    }

    public ViewLogicException(String message) {
        super(message);
    }

    public ViewLogicException(Integer code, String message) {
        super(code, message);
    }

    public ViewLogicException(String message, Throwable rootCause) {
        super(message, rootCause);
    }

    public ViewLogicException(Integer code, Throwable rootCause) {
        super(code, rootCause);
    }

    public ViewLogicException(Integer code, String message, Throwable rootCause) {
        super(code, message, rootCause);
    }

    public ViewLogicException(Throwable rootCause) {
        super(rootCause);
    }
}
