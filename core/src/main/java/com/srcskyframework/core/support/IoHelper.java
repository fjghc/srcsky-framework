/**
 * 宝龙电商
 * com.srcsky.framework.support
 * IoHelper.java
 * <p/>
 * 2016-02-20
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import java.io.*;

/**
 * IoHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 14:13
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class IoHelper {

    private static final int DEFAULT_BUFFER_SIZE = 1024 * 4;

    public static void closeQuietly(Closeable closeable) {
        try {
            if (closeable != null) {
                closeable.close();
            }
        } catch (IOException ioe) {
            // ignore
        }
    }

    public static long copyLarge(InputStream input, OutputStream output)
            throws IOException {
        byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
        long count = 0;
        int n = 0;
        while (-1 != (n = input.read(buffer))) {
            output.write(buffer, 0, n);
            count += n;
        }
        return count;
    }

    public static int copy(InputStream input, OutputStream output) throws IOException {
        long count = copyLarge(input, output);
        if (count > Integer.MAX_VALUE) {
            return -1;
        }
        return (int) count;
    }

    public static final byte[] read(InputStream input) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        byte[] buff = new byte[100];
        int rc = 0;
        while ((rc = input.read(buff, 0, 100)) > 0) {
            output.write(buff, 0, rc);
        }
        input.close();
        output.close();
        return output.toByteArray();
    }

}
