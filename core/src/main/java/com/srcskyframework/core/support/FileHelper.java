/**
 * 宝龙电商
 * com.srcsky.framework.support
 * DataHelper.java
 * <p/>
 * 2016-01-04
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.core.support;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.util.Streams;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.channels.FileChannel;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;


/**
 * FileHelper
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 16:19
 * @email zhanggj@powerlong.com
 * @description 文件管理 辅助对象
 */
public class FileHelper {
    /**
     * The number of bytes in a kilobyte.
     */
    public static final long ONE_KB = 1024;
    /**
     * The number of bytes in a megabyte.
     */
    public static final long ONE_MB = ONE_KB * ONE_KB;
    /**
     * The file copy buffer size (30 MB)
     */
    private static final long FILE_COPY_BUFFER_SIZE = ONE_MB * 30;

    private final static Logger logger = LoggerFactory.getLogger(FileHelper.class);

    public static final File DIRECTORY = ConfigHelper.isEmpty("file.directory") ? new File("/") : new File(ConfigHelper.getString("file.directory"));
    public static final File DIRECTORY_TEMP = ConfigHelper.isEmpty("file.directory.temp") ? new File("/") : new File(ConfigHelper.getString("file.directory.temp"));
    public static final String FILE_VIEW_URL = ConfigHelper.isEmpty("file.view.url") ? "/file/view" : ConfigHelper.getString("file.view.url");
    public static final String FILE_UPLOADER_URL = ConfigHelper.isEmpty("file.uploader.url") ? "/file/uploader" : ConfigHelper.getString("file.uploader.url");
    public static final Map<String, String> ALLOW_RESIZE_LIST = new HashMap<String, String>();

    public static final Pattern dosSeperator = Pattern.compile("\\\\");
    public static final Pattern lastSeperator = Pattern.compile("/$");

    public static String getFileNameChop(String fullpath) {
        if (fullpath == null) return null;
        fullpath = dosSeperator.matcher(fullpath).replaceAll("/");
        int pos = fullpath.lastIndexOf("/");
        if (pos > -1) return fullpath.substring(pos + 1);
        else return fullpath;
    }

    public static String getFilePathChop(String fullpath) {
        if (fullpath == null) return null;
        fullpath = dosSeperator.matcher(fullpath).replaceAll("/");
        int pos = fullpath.lastIndexOf("/");
        if (pos > -1) return fullpath.substring(0, pos + 1);
        else return "./";
    }


    public static String getCompleteLeadingSeperator(String fullpath) {
        if (fullpath == null) return null;
        fullpath = dosSeperator.matcher(fullpath).replaceAll("/");
        if (!fullpath.endsWith(File.separator)) fullpath = fullpath + "/";
        return fullpath;
    }

    public static String getRemoveLeadingSeperator(String fileName) {
        if (fileName == null) {
            return null;
        } else {
            fileName = dosSeperator.matcher(fileName).replaceAll("/");
            fileName = lastSeperator.matcher(fileName).replaceAll("");
            return fileName;
        }
    }

    public static String getFilesizeString(long size) {
        DecimalFormat df = new DecimalFormat("#.00");
        String fileSizeString = "";
        if (size < 1024) {
            fileSizeString = df.format((double) size) + "B";
        } else if (size < 1048576) {
            fileSizeString = df.format((double) size / 1024) + "K";
        } else if (size < 1073741824) {
            fileSizeString = df.format((double) size / 1048576) + "M";
        } else {
            fileSizeString = df.format((double) size / 1073741824) + "G";
        }
        return fileSizeString;
    }

    public static String readStream(InputStream stream, String... charset) {
        StringBuffer strBuffer = new StringBuffer();
        try {

            List<String> lines = readLines(stream, ValidHelper.isEmpty(charset) ? "UTF-8" : charset[0]);
            for (int i = 0; i < lines.size(); i++) {
                strBuffer.append(lines.get(i));
                if (i < lines.size()) {
                    strBuffer.append("\n");
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return strBuffer.toString();
    }

    public static List<String> readLines(InputStream input, String encoding) throws IOException {
        if (encoding == null) {
            return readLines(input);
        } else {
            InputStreamReader reader = new InputStreamReader(input, encoding);
            return readLines(reader);
        }
    }

    public static List<String> readLines(InputStream input) throws IOException {
        InputStreamReader reader = new InputStreamReader(input);
        return readLines(reader);
    }

    public static List<String> readLines(Reader input) throws IOException {
        BufferedReader reader = new BufferedReader(input);
        List<String> list = new ArrayList<String>();
        String line = reader.readLine();
        while (line != null) {
            list.add(line);
            line = reader.readLine();
        }
        return list;
    }

    /**
     * <b>功能:</b>彻底删除一个文件（如果是目录，则目录下的内容也将被删除）
     *
     * @param file:一个文件（或目录）
     */
    public static final void delFile(File file) {
        if (file.isDirectory()) {
            File[] files = file.listFiles();
            for (int i = 0; i < files.length; i++) {
                delFile(files[i]);
            }
        }
        file.delete();
    }

    public static final void delFile(File[] files) {
        for (File file : files) {
            delFile(file);
        }
    }

    public static void copyFile(File srcFile, File destFile) throws IOException {
        copyFile(srcFile, destFile, true);
    }

    public static void copyFile(File srcFile, File destFile,
                                boolean preserveFileDate) throws IOException {
        if (srcFile == null) {
            throw new NullPointerException("Source must not be null");
        }
        if (destFile == null) {
            throw new NullPointerException("Destination must not be null");
        }
        if (srcFile.exists() == false) {
            throw new FileNotFoundException("Source '" + srcFile + "' does not exist");
        }
        if (srcFile.isDirectory()) {
            throw new IOException("Source '" + srcFile + "' exists but is a directory");
        }
        if (srcFile.getCanonicalPath().equals(destFile.getCanonicalPath())) {
            throw new IOException("Source '" + srcFile + "' and destination '" + destFile + "' are the same");
        }
        File parentFile = destFile.getParentFile();
        if (parentFile != null) {
            if (!parentFile.mkdirs() && !parentFile.isDirectory()) {
                throw new IOException("Destination '" + parentFile + "' directory cannot be created");
            }
        }
        if (destFile.exists() && destFile.canWrite() == false) {
            throw new IOException("Destination '" + destFile + "' exists but is read-only");
        }
        doCopyFile(srcFile, destFile, preserveFileDate);
    }

    public static boolean moveFile(File srcFile, File destFile) {
        try {
            if (srcFile == null) {
                throw new NullPointerException("Source must not be null");
            }
            if (destFile == null) {
                throw new NullPointerException("Destination must not be null");
            }
            if (!srcFile.exists()) {
                throw new FileNotFoundException("Source '" + srcFile + "' does not exist");
            }
            if (srcFile.isDirectory()) {
                throw new IOException("Source '" + srcFile + "' is a directory");
            }
            if (destFile.exists()) {
                throw new Exception("Destination '" + destFile + "' already exists");
            }
            if (destFile.isDirectory()) {
                throw new IOException("Destination '" + destFile + "' is a directory");
            }
            boolean rename = srcFile.renameTo(destFile);
            if (!rename) {
                copyFile(srcFile, destFile);
                if (!srcFile.delete()) {
                    delFile(destFile);
                    throw new IOException("Failed to delete original file '" + srcFile +
                            "' after copy to '" + destFile + "'");
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }


    /**
     * <b>功能： </b>获得文件的扩展名（不带.)
     *
     * @param fileName
     * @return ext（不带.)
     */
    private static String[] postfixs = new String[]{"JPG", "PNG", "JPEG", "GIF", "DOC", "DOCX", "XLS", "XLSX", "TXT", "ZIP", "RAR", "ISO"};

    public static String getPostfix(String fileName) {
        if (ValidHelper.isEmpty(fileName)) throw new RuntimeException("获得文件名称的后缀失败,参数为空:" + fileName + ".");
        try {
            if (fileName.indexOf("?") != -1) {
                fileName = fileName.substring(0, fileName.lastIndexOf("?"));
            }
            if (fileName.lastIndexOf(".") != -1) {
                return fileName.substring(fileName.lastIndexOf(".") + 1).toUpperCase();
            } else if (fileName.lastIndexOf("?") != -1) {
                return fileName.substring(fileName.lastIndexOf("?") + 1).toUpperCase();
            } else {
                for (String postfix : postfixs) {
                    if (fileName.toUpperCase().endsWith(postfix)) {
                        return postfix;
                    }
                }
                return "TEMP";
            }
        } catch (Exception ex) {
            throw new RuntimeException("获得文件名称的后缀失败,名称不存在后缀:" + fileName + ".");
        }
    }

    // 创建文件夹
    public static File mkdirs(String file1, String file2) {
        File file = new File(file1, file2);
        if (!file.exists()) file.mkdirs();
        return file;
    }

    public static void writeFile(String filepath, InputStream stream) throws Exception {
        writeFile(new File(filepath), stream);
    }

    public static void writeFile(File file, InputStream stream) throws Exception {
        if (file.exists()) file.delete();
        try {
            FileOutputStream output = new FileOutputStream(file);
            try {
                IoHelper.copy(stream, output);
            } finally {
                IoHelper.closeQuietly(output);
            }
        } finally {
            IoHelper.closeQuietly(stream);
        }
    }

    private static void doCopyFile(File srcFile, File destFile, boolean preserveFileDate) throws IOException {
        if (destFile.exists() && destFile.isDirectory()) {
            throw new IOException("Destination '" + destFile + "' exists but is a directory");
        }

        FileInputStream fis = null;
        FileOutputStream fos = null;
        FileChannel input = null;
        FileChannel output = null;
        try {
            fis = new FileInputStream(srcFile);
            fos = new FileOutputStream(destFile);
            input = fis.getChannel();
            output = fos.getChannel();
            long size = input.size();
            long pos = 0;
            long count = 0;
            while (pos < size) {
                count = (size - pos) > FILE_COPY_BUFFER_SIZE ? FILE_COPY_BUFFER_SIZE : (size - pos);
                pos += output.transferFrom(input, pos, count);
            }
        } finally {
            IoHelper.closeQuietly(output);
            IoHelper.closeQuietly(fos);
            IoHelper.closeQuietly(input);
            IoHelper.closeQuietly(fis);
        }

        if (srcFile.length() != destFile.length()) {
            throw new IOException("Failed to copy full contents from '" +
                    srcFile + "' to '" + destFile + "'");
        }
        if (preserveFileDate) {
            destFile.setLastModified(srcFile.lastModified());
        }
    }
    //=======================FileUploader======================================================================Start

    /**
     * 生成临时文件
     *
     * @param postfix
     * @return
     */
    private static File getTemp(String postfix) {
        File tempFile = new File(DIRECTORY_TEMP, RandomHelper.getUUID() + "." + FileHelper.getPostfix(postfix));
        return tempFile;
    }

    /**
     * 生成 相对的 文件存放路径
     *
     * @param hash
     * @return
     */
    public static String generateDirectory(String hash) {
        StringBuffer directoryBuffer = new StringBuffer();
        directoryBuffer.append(hash.substring(0, 1)).append("/");
        directoryBuffer.append(hash.substring(8, 9)).append("/");
        directoryBuffer.append(hash.substring(16, 17)).append("/");
        directoryBuffer.append(hash.substring(24, 25)).append("/");
        return directoryBuffer.toString();
    }

    /**
     * 生成 绝对的 文件存放路径
     *
     * @param hash
     * @return
     */
    public static String generateDirectoryAbsolute(String hash) {
        String directoryPath = generateDirectory(hash);
        File directory = new File(DIRECTORY, directoryPath);
        if (!directory.exists()) directory.mkdirs();
        return directory.getPath();
    }

    public static File generateDirectoryAbsoluteFull(String hash, String postfix) {
        File file = new File(generateDirectoryAbsolute(hash), null == postfix ? String.valueOf(hash) : (hash + "." + postfix.toUpperCase()));
        return file;
    }

    public static File generateDirectoryAbsoluteFull(String hash) {
        return generateDirectoryAbsoluteFull(hash, null);
    }

    public static void deleteByResourceId(String id) {
        deleteByResourceId(id, true);
    }

    public static void deleteByResourceId(final String hash, final boolean delSrcFile) {
        File directory = new File(generateDirectoryAbsolute(hash));
        File[] files = directory.listFiles(new FilenameFilter() {
            public boolean accept(File dir, String name) {
                if ((delSrcFile && name.equals(hash)) || name.startsWith(hash + "_")) {
                    return true;
                }
                return false;
            }
        });
        for (File file : files) {
            file.delete();
            logger.debug("完成文件删除:" + file.getAbsolutePath());
        }
    }

    public static byte[] readInputStreamToByteArray(InputStream inputStream) {
        try {
            return FileCopyUtils.copyToByteArray(inputStream);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    // 保存下载文件到临时目录
    public static <T> T downloader(String url, Callback<T> callback) {
        HttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(UrlHelper.encodeChineseParams(url, "UTF-8"));
        //设置请求和传输超时时间
        RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(5000).setConnectTimeout(5000).build();

        httpGet.setConfig(requestConfig);
        InputStream inputStream = null;
        try {
            int index = url.indexOf("/", 7);
            httpGet.setHeader("Referer", url);
            httpGet.setHeader("Connection", "close");
            //执行请求
            HttpResponse response = httpClient.execute(httpGet);
            inputStream = response.getEntity().getContent();
            return callback.execute(inputStream);
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (null != inputStream) {
                    IoHelper.closeQuietly(inputStream);
                }
                httpGet.releaseConnection();
            } catch (Exception ex) {
            }
        }
        return null;
    }

    public static File writeFileDownloader(String input) {
        return writeFileDownloader(input, null);
    }

    public static File writeFileDownloader(String input, String savepath) {
        final File saveFile = null != savepath ? new File(savepath) : getTemp(input);
        try {
            return downloader(input, new Callback<File>() {
                public File execute(Object stream) {
                    try {
                        FileHelper.writeFile(saveFile, (InputStream) stream);
                        return saveFile;
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                    return null;
                }
            });
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }


    // 保存上传文件 到临时目录
    public static File writeFileUploader(FileItem input) {
        try {
            File saveFile = getTemp(input.getName());
            input.write(saveFile);
            return saveFile;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public static File writeFileUploader(FileItemStream input) {
        try {
            File saveFile = getTemp(input.getName());
            // 开始把文件写到你指定的上传文件夹
            Streams.copy(input.openStream(), new FileOutputStream(saveFile), true);
            return saveFile;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }


    public static File[] getUploaderFiles(String path) {
        String filename = getFileNameChop(path).replace("." + getPostfix(path), "");
        String postfix = getPostfix(path);
        final File source = new File(path);
        final String regex = "(?i)" + filename + "(\\_[0-9]+x[0-9]+)?\\." + postfix;
        return source.getParentFile().listFiles(new FileFilter() {
            public boolean accept(File file) {
                return (file.isFile() && file.getName().matches(regex));
            }
        });
    }

    // 从input里面读取数据然后写入output，读完后自动关闭流
    public static void write(InputStream input, OutputStream output) throws IOException {
        write(input, output, true);
    }

    // 自动从input里面读数据，然后写到output里面去
    public static void write(InputStream input, OutputStream output, boolean close) throws IOException {
        byte[] b = new byte[1024];
        int len = input.read(b);
        while (len != -1) {
            output.write(b, 0, len);
            len = input.read(b);
        }
        output.flush();
        if (close) {
            input.close();
            output.close();
        }
    }

    public static String readHttp(String address, String charset, Map<String, String> propertys) {
        URL url = null;
        HttpURLConnection conn = null;
        try {
            url = new URL(address);
            conn = (HttpURLConnection) url.openConnection();
            if (null != propertys) {
                for (Map.Entry<String, String> property : propertys.entrySet()) {
                    conn.setRequestProperty(property.getKey(), property.getValue());
                }
            }
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Connection", "close");
            conn.setUseCaches(false);
            conn.setDoOutput(true);
            conn.setReadTimeout(10000);
            conn.setConnectTimeout(10000);
            conn.setRequestProperty("Accept-Charset", charset);
            conn.setRequestProperty("contentType", charset);
            if (conn.getResponseCode() == conn.HTTP_OK) {
                InputStream inputStream = conn.getInputStream();
                if (StringHelper.equalsIgnoreCase(conn.getHeaderField("Content-Encoding"), "gzip")) {
                    inputStream = new GZIPInputStream(inputStream);
                }
                String result = readStream(inputStream, charset);
                inputStream.close();
                return result;
            } else {
                return "error";
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (null != conn) {
                conn.disconnect();
            }
        }
        return null;
    }

    public static String readHttp(String address, String charset) {
        return readHttp(address, charset, null);
    }

    public static List<File> recursion(List<File> files, File parent, FileFilter filter) {
        if (null == files) {
            files = new ArrayList<File>();
        }
        if (parent.isDirectory()) {
            File[] cFile = null == filter ? parent.listFiles() : parent.listFiles(filter);
            for (File file : cFile) {
                recursion(files, file, filter);
            }
        } else {
            files.add(parent);
        }
        return files;
    }

    public static String getUrl(String hash, int width, int height) {
        String filepath = hash;
        if (0 != width && 0 != height) {
            filepath = filepath + "!" + width + "x" + height;
        } else if (0 != width) {
            filepath = filepath + "!" + width;
        } else if (0 != height) {
            filepath = filepath + "!h" + height;
        }
        return filepath;
    }

    public static String getFullUrl(String hash, int width, int height) {
        return FILE_VIEW_URL + "/" + getUrl(hash, width, height);
    }


    public interface Callback<T> {
        public T execute(Object object);
    }

    public static void main(String[] args) throws IOException {
        System.out.println(FileHelper.readHttp("http://www.realtor.com/realestateandhomes-search/Washington_DC/pg-50", "utf-8"));
    }
}
