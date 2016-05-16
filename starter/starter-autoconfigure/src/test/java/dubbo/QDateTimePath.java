/**
 * 宝龙电商
 * dubbo
 * QDateTimePath.java
 * <p>
 * 2016-03-30
 * 2016宝龙公司-版权所有
 */
package dubbo;

import com.querydsl.core.types.PathImpl;
import com.querydsl.core.types.PathMetadataFactory;
import com.querydsl.core.types.dsl.DateTimePath;

/**
 * QDateTimePath
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 19:11
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class QDateTimePath extends DateTimePath {
    protected QDateTimePath(PathImpl mixin) {
        // PathMetadataFactory.forProperty(, "createDate")
        super((PathImpl) new SQPojo().getRoot());
    }
}