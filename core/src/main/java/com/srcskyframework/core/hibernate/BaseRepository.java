/**
 * 宝龙电商
 * com.srcsky.framework.support.hibernate
 * BaseRepository.java
 * <p/>
 * 2016-03-03
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.hibernate;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.io.Serializable;

/**
 * BaseRepository
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 14:34
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public interface BaseRepository<T, ID extends Serializable> extends PagingAndSortingRepository<T, ID>, QueryDslPredicateExecutor<T> {
}
