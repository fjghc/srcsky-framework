package com.srcskyframework.core.web;

import com.srcskyframework.core.support.JsonResult;
import com.srcskyframework.core.support.JsonHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by xiaojiang on 2016-01-04.
 */
public abstract class BaseController {
    protected Logger logger = LoggerFactory.getLogger(getClass());

    protected JsonResult getJsonResult() {
        return JsonHelper.build();
    }
}
