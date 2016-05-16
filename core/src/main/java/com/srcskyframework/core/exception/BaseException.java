/**
 * 宝龙电商
 * com.srcsky.framework.entity
 * BaseException.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.exception;

import com.srcskyframework.core.support.Model;

import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.Serializable;
import java.io.StringWriter;

/**
 * DemoEntity
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description 异常 基类
 */
public class BaseException extends RuntimeException implements Serializable {
    private Boolean isFirst=false;
    private Throwable rootCause;
    private Model input = new Model();

    /*异常代码*/
    private Integer code = 0;

    public BaseException() {
        isFirst = true;
    }

    public BaseException(String message) {
        this(0, message, null);
    }

    public BaseException(Integer code, String message) {
        this(code, message, null);
    }

    public BaseException(String message, Throwable rootCause) {
        this(0, message, rootCause);
    }

    public BaseException(Integer code, Throwable rootCause) {
        this(code, rootCause.getMessage(), rootCause);
    }

    public BaseException(Integer code, String message, Throwable rootCause) {
        super(message);
        this.code = code;
        this.rootCause = rootCause;
        if (null != this.rootCause)
            isFirst = false;
    }

    public BaseException(Throwable rootCause) {
        super(rootCause);
    }

    public Model getInput() {
        return input;
    }

    public void setInput(Model input) {
        this.input = input;
    }

    public Throwable getRootCause() {
        return rootCause;
    }

    public String getStackTraceString() {
        StringWriter s = new StringWriter();
        printStackTrace(new PrintWriter(s));
        return s.toString();
    }

    public void printStackTrace() {
        printStackTrace(System.err);
    }

    public void printStackTrace(PrintStream s) {
        synchronized (s) {
            super.printStackTrace(s);
            if (rootCause != null)
                rootCause.printStackTrace(s);
            if (isFirst || !(rootCause instanceof Exception))
                s.println("-----------------------------");
        }
    }

    public void printStackTrace(PrintWriter s) {
        synchronized (s) {
            super.printStackTrace(s);
            if (rootCause != null)
                rootCause.printStackTrace(s);
            if (isFirst || !(rootCause instanceof Exception))
                s.println("-----------------------------");
        }
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}