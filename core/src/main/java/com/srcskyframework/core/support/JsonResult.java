/**
 * 宝龙电商
 * com.srcsky.framework.entity
 * Jsonp.java
 * <p/>
 * 2016-01-29
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Jsonp
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 18:53
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class JsonResult {
    private boolean success = true;
    private String message;
    private int code = 200;
    private Object data;

    private Config config = new Config();

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getData() {
        return data;
    }

    public JsonResult setData(Object data) {
        this.data = data;
        return this;
    }

    @JsonInclude(value = JsonInclude.Include.NON_EMPTY)
    public Config getConfig() {
        return config;
    }

    @JsonInclude(value = JsonInclude.Include.NON_EMPTY)
    public static class Config extends Model {
        private String successMessage;
        private String errorMessage;

        public String getSuccessMessage() {
            return getString("successMessage");
        }

        public void setSuccessMessage(String successMessage) {
            set("successMessage", successMessage);
        }

        public String getErrorMessage() {
            return getString("errorMessage");
        }

        public void setErrorMessage(String errorMessage) {
            set("errorMessage", errorMessage);
        }
    }
}
