/**
 * 宝龙电商
 * com.srcsky.framework.support
 * ServerHelper.java
 * <p/>
 * 2016-02-20
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

/**
 * ServerHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 18:27
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class ServerHelper {
    public static final String SERVER_ID = Md5Helper.encrypt(NetHelper.getMacAddress());
}
