/**
 * 宝龙电商
 * com.srcsky.framework.support
 * HtmlHelper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import org.htmlcleaner.CleanerProperties;
import org.htmlcleaner.HtmlCleaner;

/**
 * HtmlHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description
 */
public class HtmlHelper {

    public static HtmlCleaner getHtmlCleaner() {
        HtmlCleaner cleaner = new HtmlCleaner();
        CleanerProperties props = cleaner.getProperties();
        props.setRecognizeUnicodeChars(true);
        props.setUseEmptyElementTags(true);
        props.setAdvancedXmlEscape(true);
        props.setTranslateSpecialEntities(true);
        props.setOmitComments(true);
        props.setBooleanAttributeValues("empty");
        props.setAllowMultiWordAttributes(true);
        return cleaner;
    }
}
