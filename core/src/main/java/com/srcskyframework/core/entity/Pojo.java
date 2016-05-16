/**
 * 宝龙电商
 * com.srcsky.framework.entity
 * Pojo.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.entity;

import com.srcskyframework.core.support.Model;
import com.srcskyframework.core.support.RandomHelper;

import javax.persistence.*;
import java.util.Date;
import java.util.Map;

/**
 * Pojo
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@MappedSuperclass
public class Pojo extends Model {
    // id
    private String id;
    // 创建人 creator
    private Long creator;
    // 创建时间
    private Date createDate;
    // 修改人
    private Long updator;
    // 修改时间
    private Date updateDate;
    // 状态
    private String status;
    // 备注
    private String remarks;
    ;
    // 删除状态
    private Integer isDrop;
    // 乐观素，版本控制
    private Date version;


    public Pojo() {
    }

    public Pojo(Map entity) {
        super(entity);
    }

    @PrePersist
    public void initializeUUID() {
        if (isEmpty("id")) {
            set("id", RandomHelper.getUUID());
        }
    }

    @Id
    @Column(length = 64)
    public String getId() {
        return getString("id");
    }

    public void setId(String id) {
        set("id", id);
    }

    @Column(updatable = false)
    public Long getCreator() {
        return getLong("creator");
    }

    public void setCreator(Long creator) {
        set("creator", creator);
    }

    @Column(updatable = false)
    public Date getCreateDate() {
        return getDate("createDate");
    }

    public void setCreateDate(Date create_date) {
        set("createDate", create_date);
    }

    @Column(name = "updator")
    public Long getUpdator() {
        return getLong("updator");
    }

    public void setUpdator(Long updator) {
        set("updator", updator);
    }

    public Date getUpdateDate() {
        return getDate("updateDate");
    }

    public void setUpdateDate(Date updateDate) {
        set("updateDate", updateDate);
    }

    public int getStatus() {
        return getInt("status");
    }

    public void setStatus(int status) {
        set("status", status);
    }

    public String getRemarks() {
        return getString("remarks");
    }

    public void setRemarks(String remarks) {
        set("remarks", remarks);
    }

    public Integer getIsDrop() {
        return getInt("isDrop");
    }

    public void setIsDrop(Integer isDrop) {
        set("isDrop", isDrop);
    }

    @Version
    @Column(name = "version")
    public Date getVersion() {
        return getDate("version");
    }

    public void setVersion(Date version) {
        set("version", version);
    }
}
