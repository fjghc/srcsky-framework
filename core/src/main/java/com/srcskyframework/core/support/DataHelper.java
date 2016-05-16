/**
 * 宝龙电商
 * com.srcsky.framework.support
 * DataHelper.java
 * <p/>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.*;

/**
 * DataHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description Cookie
 */
public class DataHelper {
    private final static Logger logger = LoggerFactory.getLogger(DataHelper.class);

    /**
     * 强制将String类型转换为Long类型;
     *
     * @param size
     * @return
     */
    public static Long getByteSize(String size) {
        String nuit = size.substring(size.length() - 1, size.length()).toUpperCase();
        if (nuit.equalsIgnoreCase("K")) {
            String num = size.substring(0, size.length() - 1);
            return Long.parseLong(num) * 1024;
        } else if (nuit.equalsIgnoreCase("M")) {
            String num = size.substring(0, size.length() - 1);
            return Long.parseLong(num) * 1024 * 1024;
        } else {
            return Long.parseLong(size);
        }
    }

    /**
     * 强制将String类型转换为Long类型;
     *
     * @param size
     * @return
     */
    public static String getByteCNM(Long size) {
        if (size == 0 || size < 1024) {
            return "1K";
        } else if (size / (1024) < 1024) {
            return (size / 1024) + "K";
        } else if (size / (1024 * 1024) < 1024) {
            return (size / (1024 * 1024)) + "M";
        } else {
            return (size / (1024 * 1024 * 1024)) + "G";
        }
    }

    public static List coverList(Collection collection) {
        return new ArrayList(collection);
    }

    public static Integer getInt(Object value) {
        if (ValidHelper.isNull(value)) {
            return 0;
        }
        if (value instanceof Integer) {
            return ((Integer) value);
        } else if (value instanceof Short) {
            return ((Short) value).intValue();
        } else if (value instanceof Long) {
            return ((Long) value).intValue();
        } else if (value instanceof BigDecimal) {
            return ((BigDecimal) value).intValue();
        } else {
            String stringValue = value.toString().trim();
            try {
                if (stringValue.isEmpty() || stringValue.equalsIgnoreCase("null")) {
                    return 0;
                } else {
                    return Integer.parseInt(stringValue);
                }
            } catch (Exception ex) {
                logger.error("参数：" + value + "，在转换为 Integer 型时异常", ex);
            }
        }
        return 0;
    }

    public static Long getLong(Object value) {
        if (ValidHelper.isNull(value)) {
            return 0l;
        }
        if (value instanceof Long) {
            return ((Long) value);
        } else if (value instanceof Integer) {
            return ((Integer) value).longValue();
        } else if (value instanceof Short) {
            return ((Short) value).longValue();
        } else if (value instanceof BigDecimal) {
            return ((BigDecimal) value).longValue();
        } else {
            String stringValue = value.toString().trim();
            try {
                if (stringValue.isEmpty() || stringValue.equalsIgnoreCase("null")) {
                    return 0l;
                } else {
                    return Long.parseLong(stringValue);
                }
            } catch (Exception ex) {
                logger.error("参数：" + value + "，在转换为 Long 型时异常", ex);
            }
        }
        return 0l;
    }

    public static boolean getBoolean(Object value) {
        if (ValidHelper.isNull(value)) {
            return false;
        }
        if (value instanceof Boolean) {
            return ((Boolean) value);
        } else {
            String stringValue = value.toString().trim();
            try {
                if (stringValue.isEmpty() || stringValue.equalsIgnoreCase("false") || stringValue.equalsIgnoreCase(Constants.NO.toString()) || stringValue.equalsIgnoreCase("null")) {
                    return false;
                } else {
                    return true;
                }
            } catch (Exception ex) {
                logger.error("参数：" + value + "，在转换为 Boolean 型时异常", ex);
            }
        }
        return false;
    }

    public static String getString(Object value) {
        if (ValidHelper.isNull(value)) {
            return null;
        }
        if (value instanceof String) {
            return ((String) value);
        } else {
            try {
                return value.toString();
            } catch (Exception ex) {
                logger.error("参数：" + value + "，在转换为 String 型时异常", ex);
                return null;
            }
        }
    }

    public static BigDecimal getBigDecimal(Object value) {
        if (ValidHelper.isNull(value)) {
            return BigDecimal.ZERO;
        }
        if (value instanceof BigDecimal) {
            return ((BigDecimal) value);
        } else {
            try {
                return new BigDecimal(value.toString());
            } catch (Exception ex) {
                logger.error("参数：" + value + "，在转换为 BigDecimal 型时异常", ex);
                return BigDecimal.ZERO;
            }
        }
    }

    public static Date getDate(Object value) {
        if (ValidHelper.isNull(value)) {
            return null;
        }
        if (value instanceof Date) {
            return ((Date) value);
        } else {
            String stringValue = value.toString().trim();
            try {
                if (stringValue.isEmpty() || stringValue.equalsIgnoreCase("null")) {
                    return null;
                } else {
                    return DateHelper.parse((String) value);
                }
            } catch (Exception ex) {
                logger.error("参数：" + value + "，在转换为 Date 型时异常", ex);
            }
        }
        return null;
    }


    /**
     * 返回 value 在 values中出现的次数
     *
     * @param values
     * @param value
     * @return
     */
    public static int frequency(List values, Object value) {
        return Collections.frequency(values, value);
    }

    /**
     * 返回 value 在 values中出现的次数
     *
     * @param values
     * @param key
     * @param value
     * @return
     */
    public static int frequency(List<? extends Model> values, String key, Object value, String uniqueId) {
        List merges = new ArrayList();
        for (Model result : values) {
            if (result.equals("id", uniqueId)) {
                merges.add(value);
            } else {
                merges.add(result.get(key));
            }
        }
        return Collections.frequency(merges, value);
    }
}
