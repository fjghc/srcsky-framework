/**
 * 宝龙电商
 * PACKAGE_NAME
 * HessionSerializerTest.java
 * <p>
 * 2016-03-28
 * 2016宝龙公司-版权所有
 */

import com.alibaba.com.caucho.hessian.io.*;
import com.alibaba.dubbo.common.serialize.support.hessian.Hessian2SerializerFactory;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.*;
import com.querydsl.core.types.dsl.BooleanOperation;
import com.querydsl.core.types.dsl.Expressions;
import com.srcskyserver.user.entity.QUser;
import com.srcskyserver.user.entity.User;
import org.hibernate.collection.internal.PersistentBag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;

/**
 * HessionSerializerTest
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 15:46
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class HessionSerializerTest {


    public static void main2(String[] args) {
        BooleanBuilder builder = new BooleanBuilder();
        QUser qUser = QUser.user;
        builder.and(qUser.username.likeIgnoreCase("1").
                or(qUser.email.likeIgnoreCase("2"))
                .or(qUser.mobile.likeIgnoreCase("3"))
        );
        System.out.println(builder.getValue());


    }

    public static void main(String[] args) {


        Path<User> person = Expressions.path(User.class, "user");
        Path<String> username = Expressions.path(String.class, person, "username");
        Expression<String> constant = Expressions.constant("xj");
        Predicate predicate=Expressions.predicate(Ops.EQ, username,constant);
        System.out.println(predicate);

    }
}