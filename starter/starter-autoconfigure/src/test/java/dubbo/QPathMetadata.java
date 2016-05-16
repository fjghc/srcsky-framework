/**
 * 宝龙电商
 * dubbo
 * QPathMetadata.java
 * <p>
 * 2016-03-30
 * 2016宝龙公司-版权所有
 */
package dubbo;

import com.alibaba.com.caucho.hessian.io.Deserializer;
import com.alibaba.com.caucho.hessian.io.HessianProtocolException;
import com.alibaba.com.caucho.hessian.io.JavaDeserializer;
import com.alibaba.com.caucho.hessian.io.JavaSerializer;
import com.alibaba.dubbo.common.serialize.support.java.JavaSerialization;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.PathType;

import javax.annotation.Nullable;

/**
 * QPathMetadata
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 19:32
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class QPathMetadata extends JavaDeserializer {
    public QPathMetadata(Class cl) {
        super(cl);
    }

    protected Object instantiate() throws Exception {
        return new PathMetadata(new SQPojo(), "createDate", PathType.PROPERTY);
    }
}