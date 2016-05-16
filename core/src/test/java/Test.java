/**
 * 宝龙电商
 * PACKAGE_NAME
 * Test.java
 * <p/>
 * 2016-03-04
 * 2016宝龙公司-版权所有
 */

import com.srcskyframework.core.support.FileHelper;
import com.srcskyframework.core.support.RandomHelper;
import com.srcskyframework.core.support.StringHelper;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import java.util.HashMap;
import java.util.Map;

/**
 * Test
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:02
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@EnableAutoConfiguration
public class Test {
    public static void main(String[] args) {
        Map<String, Integer> files = new HashMap();
        for (int i = 0; i < 100; i++) {
            String uuid = RandomHelper.getUUID();
            System.out.println(FileHelper.generateDirectoryAbsolute(uuid));
        }
    }
}
