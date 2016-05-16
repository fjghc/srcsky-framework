/**
 * 宝龙电商
 * com.srcsky.framework.support
 * Md5Helper.java
 * <p>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


/**
 * Md5Helper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description MD5加密 支持大文件
 */
public class Md5Helper {
    /**
     * 默认的密码字符串组合，apache校验下载的文件的正确性用的就是默认的这个组合
     */
    protected static char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
    protected static MessageDigest messagedigest = null;

    static {
        try {
            messagedigest = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException nsaex) {
            System.err.println(Md5Helper.class.getName() + "初始化失败，MessageDigest不支持Md5Utility。");
            nsaex.printStackTrace();
        }
    }

    /**
     * 适用于上G大的文件
     *
     * @param file
     * @return
     * @throws IOException
     */
    public static String encrypt(File file) throws IOException {
        String value = "";
        FileInputStream in = new FileInputStream(file);
        ByteArrayOutputStream out = new ByteArrayOutputStream(1024);
        byte[] cache = new byte[1048576];
        for (int i = in.read(cache); i != -1; i = in.read(cache)) {
            out.write(cache, 0, i);
        }
        in.close();
        out.close();
        messagedigest.update(out.toByteArray());
        value = bufferToHex(messagedigest.digest());
        return value;
    }

    public static String encrypt(String s) {
        return encrypt(s.getBytes());
    }

    public static String encrypt(byte[] bytes) {
        messagedigest.update(bytes);
        return bufferToHex(messagedigest.digest());
    }

    private static String bufferToHex(byte bytes[]) {
        return bufferToHex(bytes, 0, bytes.length);
    }

    private static String bufferToHex(byte bytes[], int m, int n) {
        StringBuffer stringbuffer = new StringBuffer(2 * n);
        int k = m + n;
        for (int l = m; l < k; l++) {
            appendHexPair(bytes[l], stringbuffer);
        }
        return stringbuffer.toString();
    }


    private static void appendHexPair(byte bt, StringBuffer stringbuffer) {
        char c0 = hexDigits[(bt & 0xf0) >> 4];
        char c1 = hexDigits[bt & 0xf];
        stringbuffer.append(c0);
        stringbuffer.append(c1);
    }

    public static boolean checkPassword(String password, String md5PwdStr) {
        return encrypt(password).equals(md5PwdStr);
    }


}
