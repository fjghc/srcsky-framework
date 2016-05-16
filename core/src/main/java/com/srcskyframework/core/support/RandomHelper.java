/**
 * 宝龙电商
 * com.srcsky.framework.support
 * RandomHelper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * RandomHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description
 */
public class RandomHelper {

    /**
     * <b>功能：</b>返回一个List中随机项组成的List
     *
     * @param list   原始List
     * @param number 新List的大小
     * @return randomlist            随机生成的List
     */
    public static List getRandomList(List list, int number) {
        if (number < list.size()) {
            if (number < list.size() / 2) {
                List randomList = new ArrayList();
                int index;
                for (int i = 0; i < number; i++) {
                    index = (int) (Math.random() * (list.size() - 1));
                    randomList.add(list.get(index));
                    list.remove(index);
                }
                return randomList;
            } else {
                while (list.size() > number) {
                    int index = (int) (Math.random() * (list.size() - 1));
                    list.remove(index);
                }
                return list;
            }
        }
        return list;
    }


    /**
     * 32位UUID
     *
     * @return
     */
    public static String getUUID() {
        return UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
    }


    /**
     * 获得随即生成的字符串
     *
     * @param value
     * @return
     */
    public static String randomByScope(int value) {
        if (value == 0) return "1";
        value = (int) (Math.random() * value);
        return String.valueOf((value == 0) ? 1 : value);
    }

    public static String randomByLength(int length) {
        String result = new String();
        for (int i = 0; i < length; i++) {
            result += (int) (Math.random() * 10);
        }
        return result;
    }

    public static Integer getInt(int value) {
        if (value == 0) return 1;
        value = (int) (Math.random() * value);
        return value;
    }

    public static Long getLong(long value) {
        if (value == 0) return 1l;
        value = (long) (Math.random() * value);
        return value;
    }

    public static String getString(int value) {
        if (value == 0) return "1";
        value = (int) (Math.random() * value);
        return String.valueOf(value);
    }
}
