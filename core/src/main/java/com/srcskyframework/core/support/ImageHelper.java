/**
 * 宝龙电商
 * com.srcskyframework.helper
 * ImageHelper.java
 * <p>
 * 2013-9-10-下午1:49
 * 2013宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * ImageHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @date 2013-9-10-下午1:49
 * @email zhanggj-hws@powerlong.com
 * @description 职责描述
 */
public class ImageHelper {

    public static boolean isImage(File file) {
        return null != getImage(file);
    }

    /**
     * 获取图片对象
     *
     * @param file
     * @return
     */
    public static BufferedImage getImage(File file) {
        FileInputStream fileInputStream = null;
        try {
            fileInputStream = new FileInputStream(file);
            return getImage(fileInputStream);
        } catch (Exception ex) {
        } finally {
            try {
                fileInputStream.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }

    /**
     * 获取图片对象
     *
     * @param inputStream
     * @return
     */
    public static BufferedImage getImage(InputStream inputStream) {
        try {
            BufferedImage bufferedImage = ImageIO.read(inputStream);
            return bufferedImage;
        } catch (Exception ex) {
        }
        return null;
    }


    /**
     * 是否图片
     *
     * @param inputStream
     * @return
     */
    public static boolean isImage(InputStream inputStream) {
        BufferedImage bufferedImage = getImage(inputStream);
        if (null == bufferedImage) {
            return false;
        }
        return bufferedImage.getWidth() <= 0 || bufferedImage.getHeight() <= 0 ? false : true;
    }

    public static void main(String[] args) {
    }
}
