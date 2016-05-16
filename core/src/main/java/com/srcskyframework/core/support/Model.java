/**
 * 宝龙电商
 * com.srcsky.framework.entity
 * Model.java
 * <p/>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;


import com.sun.org.apache.xpath.internal.operations.Mod;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

/**
 * Model
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class Model<K, V> extends LinkedHashMap<K, V> implements Serializable {

    private final static Logger logger = LoggerFactory.getLogger(Model.class);

    private final static StringBuffer template = new StringBuffer("\n\t----------------[ Model Result ]----------------\n\t\t    KEY\t\t|\t VALUE\n\t-----------------------------------------------------");

    protected String modelName;

    public Model() {
    }

    public Model(String modelName) {
        this.modelName = modelName;
    }

    public Model(Map model) {
        super(model);
    }

    public Model(Model model) {
        super(model);
    }

    public Model(String moduleName, Model model) {
        this.modelName = moduleName;
        super.putAll(model);
    }

    /**
     * 设置主键
     *
     * @return
     */
    public Model setPrimary() {
        set("primary", getLastKey());
        return this;
    }

    /**
     * 设置不需要需要验证字段
     *
     * @param fileds
     * @return
     */
    public Model addNotValidField(String... fileds) {
        for (String filed : fileds) {
            set(Constants.VALIDATION_BY_DAO_UPDATE + filed, true);
        }
        return this;
    }

    public boolean isNeedValidField(String filed) {
        return !containsKey(Constants.VALIDATION_BY_DAO_UPDATE + filed);
    }

    public void setErrorField(Model errorField) {
        if (null != errorField && !errorField.isEmpty()) {
            setSuccess(false);
            set("errorField", errorField);
        }
    }

    public Model getModel(String key) {
        Object value = get(key);
        if (null == value) {
            return null;
        } else if (value instanceof Model) {
            return (Model) value;
        } else if (value instanceof Map) {
            Model model = new Model();
            model.putAll((Map) value);
            set(key, model);
            return model;
        } else {
            return null;
        }
    }

    public Model getModel(String key, boolean create) {
        Model model = getModel(key);
        if (null != model) {
            return model;
        } else if (create) {
            set(key, model = new Model());
        }
        return model;
    }

    public Model setMessage(String message) {
        set("message", message);
        return this;
    }

    public String getMessage() {
        return getString("message");
    }

    public Boolean getSuccess() {
        return getBoolean("success");
    }

    public void setSuccess(Boolean success) {
        set("success", success);
    }

    public String getModelName() {
        return modelName;
    }

    public Model setModelName(String modelName) {
        this.modelName = modelName;
        return this;
    }

    //==================================================================================================================
    //GET SET方法   Start
    public Model set(Object key, Object value) {
        super.put((K) key, (V) value);
        return this;
    }

    public String getStringId() {
        return getString("id");
    }

    public Long getLongId() {
        return getLong("id");
    }


    public Integer getIntId() {
        return getInt("id");
    }


    public Integer getInteger(Object key) {
        return getInt(key);
    }


    public Integer getGreaterid() {
        return getInt("greaterid");
    }

    public void setGreaterid(Integer greaterid) {
        set("greaterid", greaterid);
    }


    public Long getLessid() {
        return getLong("lessid");
    }

    public void setLessid(Long lessid) {
        set("lessid", lessid);
    }

    public Integer getInt(Object key) {
        Object value = get(key);
        return DataHelper.getInt(value);
    }

    public Long getLong(Object key) {
        Object value = get(key);
        return DataHelper.getLong(value);
    }

    public boolean getBoolean(Object key) {
        Object value = get(key);
        return DataHelper.getBoolean(value);
    }


    public String getString(Object key) {
        Object value = get(key);
        return DataHelper.getString(value);
    }

    // key为空时返回 defaultValue
    public String getString(Object key, String defaultValue) {
        String value = getString(key);
        return null == value || value.trim().length() == 0 ? defaultValue : value;
    }

    public String getStringByTrim(String key) {
        String value = getString(key);
        return value == null ? "" : value.trim();
    }


    public BigDecimal getBigDecimal(Object key) {
        Object value = get(key);
        return DataHelper.getBigDecimal(value);
    }


    public Date getDate(String key) {
        Object value = get(key);
        return DataHelper.getDate(value);
    }

    public Set getSet(Object key) {
        Object value = get(key);
        if (ValidHelper.isNull(value)) {
            return null;
        }
        if (value instanceof Set) {
            return ((Set) value);
        }
        return null;

    }

    public List getList(String key) {
        Object value = get(key);
        if (ValidHelper.isNull(value)) {
            return null;
        }
        if (value instanceof List) {
            return ((List) value);
        } else {
            List values = new ArrayList();
            values.add(value);
            return values;
        }
    }

    // 获取不到 list 就设置默认结果
    public List getList(String key, boolean create) {
        List result = getList(key);
        if (null == result && create) {
            set(key, result = new ArrayList());
        }
        return result;
    }

    public Map getMap(String key) {
        Object value = get(key);
        if (ValidHelper.isNull(value)) {
            return null;
        }
        return value instanceof Map ? (Map) value : null;
    }

    public Date getStartDate() {
        Date startDate = DateHelper.parse(DateHelper.FORMAT_SIMPLE, getString("startDate"));
        return DateHelper.getStartDate(startDate);
    }

    public Date getEndDate() {
        Date endDate = DateHelper.parse(DateHelper.FORMAT_SIMPLE, getString("endDate"));
        return DateHelper.getStartDate(endDate);
    }

    //GET SET方法   End
    //==================================================================================================================


    // Tools Utility 方法
    //==================================================================================================================

    public List<String> getIds() {
        Object value = get("id");
        if (ValidHelper.isNull(value)) {
            return null;
        }
        if (value instanceof List) {
            return ((List) value);
        } else {
            List values = new ArrayList();
            values.add(value);
            return getList("id");
        }
    }

    // 获取最后一次 set 的键(Key)
    private String getLastKey() {
        Iterator iterator = this.keySet().iterator();
        String key = null;
        while (iterator.hasNext()) {
            key = iterator.next().toString();
        }
        return key;
    }

    public String getReplaceHtml(String key) {
        return isEmpty(key) ? "" : StringHelper.replaceHtml(getString(key));
    }

    public String getFilterHtml(String key) {
        return getReplaceHtml(key);
    }

    public String getClearHtml(String key) {
        return isEmpty(key) ? "" : StringHelper.clearHtml(getString(key));
    }

    public String getSqlLike(String key) {
        return isEmpty(key) ? "" : "%" + getString(key) + "%";
    }

    //属性 操作 辅助方法   End
    public String getStringByUtf8(String key) {
        try {
            return (isEmpty(key)) ? getString(key) : new String(getString(key).getBytes("ISO-8859-1"), "utf-8");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getString(key);
    }

    public String getStringByGbk(String key) {
        try {
            return (isEmpty(key)) ? getString(key) : new String(getString(key).getBytes("ISO-8859-1"), "gbk");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return getString(key);
    }

    public String substring(String key, int length, String symbol) {
        String value = getString(key);
        return null == value ? "" : StringHelper.substring(value, length, symbol);
    }

    public void remove(String... keys) {
        for (String key : keys) {
            remove(key);
        }
    }

    public boolean isEmpty(String field) {
        return ValidHelper.isEmpty(get(field));
    }

    public boolean isNotEmpty(String field) {
        return !isEmpty(field);
    }

    public boolean isEmpty(String field, String eq) {
        return ValidHelper.isEmpty(get(field), eq);
    }

    public boolean isNumber(String field) {
        return ValidHelper.isNumber(getString(field));
    }

    public boolean isList(String field) {
        return get(field) instanceof List;
    }

    public boolean isMap(String field) {
        return get(field) instanceof Map;
    }

    public boolean isMobile(String field) {
        return ValidHelper.isMobile(getString(field));
    }

    /**
     * 是否大于0
     *
     * @return
     */
    public boolean isGreaterThanZero(String field) {
        return getLong(field) > 0;
    }

    public boolean equals(String key, Object value) {
        String stringValue = getString(key);
        if (stringValue == value) {
            return true;
        } else if (null == stringValue || null == value) {
            return false;
        } else {
            return stringValue.equalsIgnoreCase(value.toString());
        }
    }

    public boolean matches(String key, String regex) {
        String value = getString(key);
        if (null == value) {
            return false;
        }
        return ValidHelper.matches(get(key), regex);
    }

    public String getURLEncoder(String key) {
        return UrlHelper.encoder(getString(key));
    }

    public boolean isEmail(String key) {
        return ValidHelper.isEmail(getString(key));
    }

    public boolean isUrl(String key) {
        return ValidHelper.isUrl(getString(key));
    }

    public boolean isDate(String key) {
        return ValidHelper.isDate(get(key));
    }

    public String getURLDecoder(String key) {
        return UrlHelper.decoder(getString("key"));
    }

    public void putAll(Map map) {
        if (null != map && !map.isEmpty()) {
            super.putAll(map);
        }
    }

    // 属性 操作 辅助方法   End
    //==================================================================================================================
    public boolean equals(Object target) {
        return target instanceof Model && equals("id", ((Model) target).get("id"));
        /*String targetClass = target.getClass().getName();
        String selfClass = getClass().getName();
        if (targetClass.indexOf(selfClass) == -1 && getClass() != target.getClass()) {
            return false;
        }
        String selfId = getStringId();
        String targetId = ((Model) target).getStringId();
        if (selfId == targetId) {
            return true;
        } else if (null == selfId || null == targetId) {
            return false;
        } else {
            return selfId.equalsIgnoreCase(targetId);
        }*/
    }

    public int hashCode() {
        if (containsKey("id")) {
            return getString("id").hashCode();
        } else {
            int result = 0;
            for (Map.Entry<String, Object> entry : ((Map<String, Object>) this).entrySet()) {
                if (!(null == entry.getKey() || null == entry.getValue() || entry.getValue() instanceof Model || entry.getValue() instanceof Collection)) {
                    result = 31 * result + entry.getValue().hashCode();
                }
            }
            return result;
        }
    }

    public String toString() {
        StringBuffer buffer = new StringBuffer(template);
        Set<Map.Entry<String, Object>> entrySets = ((Map<String, Object>) this).entrySet();
        String key = null;
        int keyLength = 0;
        Object value = null;
        for (Map.Entry<String, Object> entry : entrySets) {
            key = entry.getKey();
            value = entry.getValue();
            if (null == key) {
                continue;
            }
            keyLength = key.length();
            buffer.append("\n\t" + key);
            for (int t = 0; t < 4 - (Math.max(1, (keyLength / 4) + ((keyLength % 4) > 2 ? 1 : 0))); t++) {
                buffer.append("\t");
            }
            if (value instanceof Model) {
                buffer.append("|        Model -> " + entry.getClass());
            } else if (value instanceof Collection) {
                buffer.append("|        Collection	-> Collection" /*+ ((Collection) entry.getValue()).size()*/);
            } else if (value instanceof Set) {
                buffer.append("|        Set        -> Set"/* + ((Set) entry.getValue()).size()*/);
            } else {
                buffer.append("|        " + value);
            }
        }
        return buffer.append("\n\t-----------------------------------------------------").toString();
    }
}
