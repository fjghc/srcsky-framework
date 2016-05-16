/**
 * 宝龙电商
 * dubbo
 * QNumberPathDeserializer.java
 * <p>
 * 2016-03-30
 * 2016宝龙公司-版权所有
 */
package dubbo;

import com.alibaba.com.caucho.hessian.io.JavaDeserializer;

/**
 * QNumberPathDeserializer
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 19:38
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class QNumberPathDeserializer extends JavaDeserializer {
    public QNumberPathDeserializer(Class cl) {
        super(cl);
    }

    protected Object instantiate() throws Exception {
        return SQPojo.pojo.creator;
    }
}