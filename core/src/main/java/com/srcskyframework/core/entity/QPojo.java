package com.srcskyframework.core.entity;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.PathMetadataFactory;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;

import javax.annotation.Generated;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;


/**
 * QPojo is a Querydsl query type for Pojo
 */
@Generated("com.querydsl.codegen.SupertypeSerializer")
public class QPojo extends EntityPathBase<Pojo> {


    private static final long serialVersionUID = -1258664294L;

    public static final QPojo pojo = new QPojo("pojo");

    public final DateTimePath<java.util.Date> createDate = createDateTime("createDate", java.util.Date.class);

    public final NumberPath<Long> creator = createNumber("creator", Long.class);

    public final StringPath id = createString("id");

    public final NumberPath<Integer> isDrop = createNumber("isDrop", Integer.class);

    public final StringPath remarks = createString("remarks");

    public final NumberPath<Integer> status = createNumber("status", Integer.class);

    public final DateTimePath<java.util.Date> updateDate = createDateTime("updateDate", java.util.Date.class);

    public final NumberPath<Long> updator = createNumber("updator", Long.class);

    public final DateTimePath<java.util.Date> version = createDateTime("version", java.util.Date.class);

    public QPojo(String variable) {
        super(Pojo.class, forVariable(variable));
    }

    public QPojo(Path<? extends Pojo> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPojo(PathMetadata metadata) {
        super(Pojo.class, metadata);
    }


}

