/**
 * 宝龙电商
 * PACKAGE_NAME
 * TestDate.java
 * <p>
 * 2016-03-30
 * 2016宝龙公司-版权所有
 */

import com.srcskyframework.core.support.DateHelper;
import sun.misc.Cleaner;

import java.util.Calendar;
import java.util.TimeZone;

/**
 * TestDate
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 22:34
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class TestDate {
    public static void main(String[] args) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, 2016);
        cal.set(Calendar.MONTH,1);
        cal.set(Calendar.DATE, 29);
        System.out.println(cal.get(Calendar.MONTH));
        System.out.println(DateHelper.format("yyyy-MM-dd HH:mm:ss", cal.getTime()));
        //  System.out.println(DateUtils.format(cal.getTime(), DateUtils.YYYY_MM_DD_HH_MM_SS));

    }
}