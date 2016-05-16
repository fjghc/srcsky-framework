/**
 * 宝龙电商
 * com.srcsky.framework.support
 * StringHelper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;

import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.List;

/**
 * StringHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description String工具类
 */
public class StringHelper {
    private static HanyuPinyinOutputFormat hanyuPinyinOutputFormat = new HanyuPinyinOutputFormat();

    static {
        hanyuPinyinOutputFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
    }

    public static String substring(String string, int length, String symbol) {
        if (!ValidHelper.isEmpty(string)) {
            try {
                byte[] bytes = string.getBytes("Unicode");
                int n = 0;// 表示当前的字节数
                int i = 2; // 要截取的字节数，从第3个字节开始
                for (; i < bytes.length && n < length; i++) {// 奇数位置，如3、5、7等，为UCS2编码中两个字节的第二个字节
                    if (i % 2 == 1) {
                        n++;// 在UCS2第二个字节时n加1
                    } else {// 当UCS2编码的第一个字节不等于0时，该UCS2字符为汉字，一个汉字算两个字节
                        if (bytes[i] != 0) {
                            n++;
                        }
                    }
                }
                if (i % 2 == 1) {// 如果i为奇数时，处理成偶数
                    if (bytes[i - 1] != 0) {// 该UCS2字符是汉字时，去掉这个截一半的汉字
                        i = i - 1;// 该UCS2字符是字母或数字，则保留该字符
                    } else {
                        i = i + 1;
                    }
                }
                return new String(bytes, 0, i, "Unicode") + ((bytes.length - i) > 0 ? symbol : "");
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return "";
    }

    public static String substring(String string, int length) {
        return substring(string, length, "");
    }


    public static String replaceHtml(String strBuffer) {
        return strBuffer.replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll(" ", "&nbsp;").replaceAll("\n", "<br>");
    }

    public static String filterHtml(String strBuffer) {
        return replaceHtml(strBuffer);
    }

    public static String clearHtml(String strBuffer) {
        return replaceHtml(strBuffer.replaceAll("</?[^<>]*>", "").replaceAll("\n", "").replaceAll("\r", "").replaceAll(" ", "").replaceAll("&nbsp;", "").replaceAll("　", ""));
    }

    /**
     * 转换首字母 大写
     *
     * @param name
     * @return name
     */
    public static String upperCaseFirstCase(String name) {
        return name.substring(0, 1).toUpperCase() + name.substring(1);
    }

    /**
     * 获取 混合字符长途
     *
     * @return
     */
    public static int getLength(String string) {
        try {
            if (null == string) {
                return 0;
            }
            return new String(string.getBytes("GBK"), "ISO8859_1").length();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        return string.length();
    }

    /**
     * 获取提示语
     *
     * @param hour
     * @return
     */
    public static String getGreeting(int hour) {
        if (hour >= 6 && hour < 8) {
            return "早上";
        } else if (hour >= 8 && hour < 11) {
            return "上午";
        } else if (hour >= 11 && hour < 13) {
            return "中午";
        } else if (hour >= 13 && hour < 18) {
            return "下午";
        } else {
            return "晚上";
        }
    }

    public static String getGreeting() {
        return getGreeting(Calendar.getInstance().get(Calendar.HOUR_OF_DAY));
    }

    /**
     * 由日期(格式MMDD)算出星座并返回字符串
     *
     * @param mmdd
     * @return
     */
    public static String getConstellation(Integer mmdd) {
        if (mmdd <= 119 || mmdd >= 1222) return "摩羯";
        else if (mmdd <= 218 && mmdd >= 120) return "水瓶";
        else if (mmdd <= 320 && mmdd >= 219) return "双鱼";
        else if (mmdd <= 420 && mmdd >= 321) return "牧羊";
        else if (mmdd <= 520 && mmdd >= 421) return "金牛";
        else if (mmdd <= 621 && mmdd >= 521) return "双子";
        else if (mmdd <= 722 && mmdd >= 622) return "巨蟹";
        else if (mmdd <= 822 && mmdd >= 723) return "狮子";
        else if (mmdd <= 922 && mmdd >= 823) return "处女";
        else if (mmdd <= 1022 && mmdd >= 923) return "天秤";
        else if (mmdd < 1121 && mmdd >= 1023) return "天蝎";
        else if (mmdd < 1221 && mmdd >= 1122) return "射手";

        return "";
    }


    public static String replace(String content, String regex, String value) {
        return content.replaceAll(regex, value);
    }

    public static boolean equalsIgnoreCase(String str1, String str2) {
        return str1 == null ? str2 == null : str1.equalsIgnoreCase(str2);
    }

    public static boolean startWitch(String source, String target) {
        return null == source ? null : source.startsWith(target);
    }

    public static String trim(String value) {
        return null == value ? null : value.trim();
    }

    public static void trimList(List<String> values) {
        for (int i = 0; i < values.size(); i++) {
            values.set(i, trim(values.get(i)));
        }
    }

    public static String getDefault(String value, String defaultValue) {
        return ValidHelper.isEmpty(value) ? defaultValue : value;
    }

    public static int getHashCode(String value) {
        return value.hashCode();
    }

    public static String toPinyin(String string) {

        StringBuilder resultBuffer = new StringBuilder();
        char[] chars = string.toCharArray();
        String pinyin[] = null;
        for (int i = 0; i < chars.length; ++i) {
            try {
                pinyin = PinyinHelper.toHanyuPinyinStringArray(chars[i], hanyuPinyinOutputFormat);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            if (pinyin == null) {
                if (chars[i] >= 48 && chars[i] <= 57 || (chars[i] >= 65 && chars[i] <= 90) || (chars[i] >= 97 && chars[i] <= 122)) {
                    resultBuffer.append(chars[i]);
                }
            } else {
                resultBuffer.append(pinyin[0]);
            }
        }
        return resultBuffer.toString().toLowerCase();
    }
}
