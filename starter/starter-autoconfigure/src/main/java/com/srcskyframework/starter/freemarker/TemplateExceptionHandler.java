package com.srcskyframework.starter.freemarker;

import freemarker.core.Environment;
import freemarker.template.TemplateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.Writer;

/**
 * Created by IntelliJ IDEA.
 * User: Zhanggaojiang
 * Date: 11-1-19
 * Time: 上午10:07
 * Email: z82422@gmail.com
 * 重写 Freemarker 的异常呈现方式， 去除  黄黄的 页面
 */
public class TemplateExceptionHandler implements freemarker.template.TemplateExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(TemplateExceptionHandler.class);

    public void handleTemplateException(TemplateException ex, Environment env, Writer out) throws TemplateException {
        try {
            out.write("[<font color=\"red\">ERROR</font>: " + ex.getMessage() + "]");
        } catch (Exception exp) {
            logger.error("Failed to print error message. Cause:{}", exp.getMessage());
        }
    }
}