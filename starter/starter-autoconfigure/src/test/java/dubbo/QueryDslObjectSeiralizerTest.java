package dubbo; /**
 * 宝龙电商
 * PACKAGE_NAME
 * dubbo.QueryDslObjectSeiralizerTest.java
 * <p>
 * 2016-03-30
 * 2016宝龙公司-版权所有
 */

import com.alibaba.com.caucho.hessian.io.AbstractHessianInput;
import com.alibaba.com.caucho.hessian.io.ExtSerializerFactory;
import com.alibaba.com.caucho.hessian.io.Hessian2Input;
import com.alibaba.com.caucho.hessian.io.Hessian2Output;
import com.alibaba.dubbo.common.serialize.support.hessian.Hessian2SerializerFactory;
import com.google.common.collect.ImmutableList;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.*;
import com.querydsl.core.types.dsl.BooleanOperation;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.srcskyframework.core.entity.QPojo;
import com.srcskyframework.core.support.BeanHelper;
import com.srcskyserver.user.entity.QUser;
import com.srcskyserver.user.entity.User;
import org.junit.Before;
import org.springframework.data.domain.*;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.data.querydsl.QSort;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

/**
 * dubbo.QueryDslObjectSeiralizerTest
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:51
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class QueryDslObjectSeiralizerTest {
    @Before
    public void before() {
        ExtSerializerFactory factory = new ExtSerializerFactory();
        factory.addDeserializer(QPojo.class, new JavaDeserializer(QPojo.class) {
            protected Object instantiate() throws Exception {
                return QPojo.pojo;
            }
        });
        factory.addDeserializer(PathImpl.class, new JavaDeserializer(PathImpl.class) {
            protected Object instantiate() throws Exception {
                return ExpressionUtils.path(QPojo.class, new PathMetadata(null, "user", PathType.VARIABLE));
            }
        });
        factory.addDeserializer(PathMetadata.class, new JavaDeserializer(PathMetadata.class) {
            protected Object instantiate() throws Exception {
                return new PathMetadata(null, "user", PathType.VARIABLE);
            }
        });
        factory.addDeserializer(DateTimePath.class, new JavaDeserializer(DateTimePath.class) {
            protected Object instantiate() throws Exception {
                return QPojo.pojo.createDate;
            }
        });
        factory.addDeserializer(NumberPath.class, new JavaDeserializer(NumberPath.class) {
            protected Object instantiate() throws Exception {
                return QPojo.pojo.creator;
            }
        });
        factory.addDeserializer(ConstantImpl.class, new JavaDeserializer(ConstantImpl.class) {
            protected Object instantiate() throws Exception {
                return ConstantImpl.create("");
            }
        });
        factory.addDeserializer(StringPath.class, new JavaDeserializer(StringPath.class) {
            protected Object instantiate() throws Exception {
                return QPojo.pojo.id;
            }
        });
        factory.addDeserializer(BooleanOperation.class, new JavaDeserializer(BooleanOperation.class) {
            protected Object instantiate() throws Exception {
                return new BooleanBuilder().and(QPojo.pojo.id.eq("")).getValue();
            }
        });
        factory.addDeserializer(PredicateOperation.class, new JavaDeserializer(PredicateOperation.class) {
            protected Object instantiate() throws Exception {
                return new PredicateOperation(Ops.EQ, new ArrayList<Expression<?>>());
            }
        });
        factory.addDeserializer(PageRequest.class, new JavaDeserializer(PageRequest.class) {
            protected Object instantiate() throws Exception {
                return new PageRequest(1, 10);
            }
        });
        factory.addDeserializer(QPageRequest.class, new JavaDeserializer(QPageRequest.class) {
            protected Object instantiate() throws Exception {
                return new QPageRequest(1, 10, QPojo.pojo.createDate.desc());
            }
        });
        factory.addDeserializer(QSort.class, new JavaDeserializer(QSort.class) {
            protected Object instantiate() throws Exception {
                return new QSort(QPojo.pojo.createDate.desc());
            }
        });
        factory.addDeserializer(Sort.Order.class, new JavaDeserializer(Sort.Order.class) {
            protected Object instantiate() throws Exception {
                return new Sort.Order("id");
            }
        });
        factory.addDeserializer(PageImpl.class, new com.alibaba.com.caucho.hessian.io.JavaDeserializer(PageImpl.class) {
            protected Object instantiate() throws Exception {
                return new PageImpl(Collections.emptyList());
            }

            public Object readObject(AbstractHessianInput in, String[] fieldNames) throws IOException {
                Object value = super.readObject(in, fieldNames);
                if (value instanceof PageImpl) {
                    PageImpl page = (PageImpl) value;
                    return new PageImpl(page.getContent(), (Pageable) BeanHelper.get(value, "pageable"), page.getTotalElements());
                }
                return value;
            }
        });
        Hessian2SerializerFactory.SERIALIZER_FACTORY.addFactory(factory);
        /*factory.addDeserializer(ImmutableList.class, new JavaDeserializer(ImmutableList.class) {
            @Override
            protected Object instantiate() throws Exception {
                return new ArrayList();
            }
        });*/
    }

    @org.junit.Test
    public void test() {
        final BooleanBuilder builder = new BooleanBuilder();
        builder.and(QUser.user.mobile.eq("15901909729").and(QUser.user.updator.eq(12l)).and(QUser.user.remarks.like("xxx")));
        byte[] data = encode(builder.getValue());
        Object obj = decode(data, BooleanOperation.class);
        System.out.println(obj);
        //====================================
        Pageable pageable = new QPageRequest(1, 10, QUser.user.createDate.desc());
        data = encode(pageable);
        obj = decode(data, Pageable.class);
        System.out.println(obj);
        //===================================
        pageable = new PageRequest(1, 2);
        data = encode(pageable);
        obj = decode(data, Pageable.class);
        System.out.println(obj);

    }

    // 对象编码
    public static byte[] encode(Object o) {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        Hessian2Output out = new Hessian2Output(bos);
        out.setSerializerFactory(Hessian2SerializerFactory.SERIALIZER_FACTORY);
        try {
            out.writeObject(o);
            out.flush();
            byte[] bytes = bos.toByteArray();
            return bytes;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // 对象解码
    public static Object decode(byte[] bArr, Class claz) {
        try {
            ByteArrayInputStream bin = new ByteArrayInputStream(bArr);
            Hessian2Input in = new Hessian2Input(bin);
            in.setSerializerFactory(Hessian2SerializerFactory.SERIALIZER_FACTORY);
            return in.readObject(claz);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}