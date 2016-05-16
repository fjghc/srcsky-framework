/**
 * 宝龙电商
 * com.srcskyframework.core.spring.service
 * BaseService.java
 * <p>
 * 2016-03-30
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.spring.service;

import com.querydsl.core.types.Predicate;
import com.srcskyframework.core.support.Constants;
import com.srcskyframework.core.support.Model;
import org.springframework.data.domain.Page;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

/**
 * BaseService
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:15
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public abstract class BaseService<T> {
    /**
     * QueryDSL 查询条件拼装
     *
     * @param input
     * @return
     */
    public abstract Predicate getConditions(Model input);

    public Page findPage(QueryDslPredicateExecutor queryDslPredicateExecutor, Model input) {
        QPageRequest pageable = new QPageRequest(input.getInt(Constants.PAGE_INDEX_KEY), input.getInt(Constants.PAGE_SIZE_KEY));
        //, QUser.user.createDate.desc()
        if (!input.isNotEmpty(Constants.WEB_PARAMS_ORDER_BY_FIELD)) {
            // pageable = new QPageRequestDeserializer(index, size, QUser.user.createDate.desc());
        }
        //Page page = userRepository.findAll(getPredicate(input), pageable);
        //return new PageImpl(page.getContent(), new PageRequest(page.getNumber(), page.getSize()), page.getTotalElements());
        return null;
    }
}