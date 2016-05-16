/**
 * 宝龙电商
 * com.srcskyframework.starter.dubbo.deserializer
 * SPathImp.java
 * <p>
 * 2016-03-28
 * 2016宝龙公司-版权所有
 */
package dubbo;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathImpl;
import com.querydsl.core.types.PathMetadata;
import com.srcskyserver.user.entity.QUser;
import com.srcskyserver.user.entity.User;

/**
 * SPathImp
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 20:05
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class SPathImp extends PathImpl {
    protected SPathImp() {
        super(User.class, "user");
    }

    protected SPathImp(Class type, String variable) {
        super(type, variable);
    }

    protected SPathImp(Class type, PathMetadata metadata) {
        super(type, metadata);
    }

    protected SPathImp(Class type, Path parent, String property) {
        super(type, parent, property);
    }
}