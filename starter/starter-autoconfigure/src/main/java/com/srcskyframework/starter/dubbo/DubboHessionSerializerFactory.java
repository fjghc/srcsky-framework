/**
 * 宝龙电商
 * com.srcskyframework.starter.dubbo
 * DubboHessionSerializerFactory.java
 * <p>
 * 2016-04-05
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.dubbo;

import com.alibaba.com.caucho.hessian.io.*;
import com.alibaba.dubbo.common.serialize.support.hessian.Hessian2SerializerFactory;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.*;
import com.querydsl.core.types.dsl.BooleanOperation;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.srcskyframework.core.entity.QPojo;
import com.srcskyframework.core.support.BeanHelper;
import com.srcskyframework.core.support.ClassHelper;
import org.hibernate.collection.internal.PersistentBag;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.data.querydsl.QSort;
import org.springframework.util.ClassUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

/**
 * DubboHessionSerializerFactory
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 14:33
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class DubboHessionSerializerFactory {

    public static void init() {
        // 解决 Hibernate 对象 序列化时异常
        ExtSerializerFactory factory = new ExtSerializerFactory();

        if (ClassHelper.exists("org.hibernate.collection.internal.PersistentBag")) {
            factory.addDeserializer(PersistentBag.class, new CollectionDeserializer(null));
        }

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
        com.alibaba.dubbo.common.serialize.support.hessian.Hessian2SerializerFactory.SERIALIZER_FACTORY.addFactory(factory);
    }
}