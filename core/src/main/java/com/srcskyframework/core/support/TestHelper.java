/**
 * 宝龙电商
 * com.srcsky.framework.support
 * TestHelper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

/**
 * TestHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description 测试 辅助工具类
 */
public class TestHelper {

    /**
     * 测试方法, 执行 count次   Runnable.run
     *
     * @param run   执行逻辑
     * @param count 执行次数
     */
    public static void test(Runnable run, int count) {
        long apptime = System.currentTimeMillis();
        for (int i = 0; i < count; i++) {
            long start = System.currentTimeMillis();
            run.run();
            System.out.println("第" + i + "次执行耗时:" + (System.currentTimeMillis() - start));
        }
        apptime = (System.currentTimeMillis() - apptime);
        System.out.println("执行" + count + "次总耗时:" + apptime + ",平均耗时:" + (apptime / count));
    }

}
