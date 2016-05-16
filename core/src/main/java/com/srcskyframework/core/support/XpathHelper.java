/**
 * 宝龙电商
 * com.srcsky.framework.entity
 * XpathHelper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import org.w3c.dom.Document;
import org.xml.sax.helpers.DefaultHandler;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;
import java.io.ByteArrayInputStream;

/**
 * XpathHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description 文件管理 辅助对象
 */
public class XpathHelper {

    private static DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    private static XPath xpath = XPathFactory.newInstance().newXPath();

    public static Document parseDocumentByString(String result) {
        try {
            factory.setValidating(false);
            DocumentBuilder builder = factory.newDocumentBuilder();
            return builder.parse(new ByteArrayInputStream(result.getBytes("UTF-8")));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static void parseDocumentByString(String result, DefaultHandler defaultHandler) {
        try {
            SAXParserFactory sf = SAXParserFactory.newInstance();
            SAXParser sp = sf.newSAXParser();
            sp.parse(new ByteArrayInputStream(result.getBytes("UTF-8")), defaultHandler);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }


    public static String xpath(String expression, String result) {
        try {
            return xpath.evaluate(expression, parseDocumentByString(result)).toString();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return "";
    }

    public static String xpath(String expression, Document document) {
        try {
            return xpath.evaluate(expression, document).toString();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return "";
    }

}
