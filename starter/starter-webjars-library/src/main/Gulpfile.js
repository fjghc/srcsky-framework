(function () {
    /**
     * 组件安装
     * npm install --save-dev gulp  gulp-clean gulp-minify-html gulp-minify-css gulp-uglify gulp-imagemin imagemin-pngquant gulp-angular-templatecache gulp-sequence gulp-replace
     * gulp-filter gulp-concat gulp-rev gulp-rev-collector gulp-inject-string gulp-useref gulp-if gulp-file browser-sync
     */
    var gulp = require("gulp"), clean = require('gulp-clean'),
        minifyHtml = require('gulp-minify-html'), minifyCss = require('gulp-minify-css'),
        uglify = require('gulp-uglify'),
        imagemin = require('gulp-imagemin'),
        pngquant = require('imagemin-pngquant'),
        template = require('gulp-angular-templatecache'),
        sequence = require('gulp-sequence'),
        replace = require('gulp-replace'),
        filter = require('gulp-filter'),
        concat = require('gulp-concat'),
        inject = require('gulp-inject-string'),
        useref = require('gulp-useref'),
        gulpIf = require('gulp-if'),
        file = require('gulp-file'),
        del = require('del'),
        n2a = require('gulp-native2ascii'),
        express = require('express'),
        browserSync = require('browser-sync').create(),
        httpProxyMiddleware = require('http-proxy-middleware'),
        url = require('url'),
        commonJsExpr = "webapp/scripts*/**/*.js", commonJsFilter = filter(commonJsExpr.replace(/webapp\//ig, "").split(",").concat("!scripts*/library.js"), {restore: true}),
        commonCssExpr = "webapp/style*/**/*.css", commonCssFilter = filter(commonCssExpr.replace(/webapp\//ig, "").split(","), {restore: true}),
        commonTplExpr = "webapp/scripts*/**/*.html", commonTplFilter = filter(commonTplExpr.replace(/webapp\//ig, "").split(","), {restore: true}),
        commonImgExpr = "webapp/styles*/img/**", commonImgFilter = filter(commonImgExpr.replace(/webapp\/styles/ig, "").split(","), {restore: true}),
        commonFontExpr = "webapp/styles*/font/**", commonFontFilter = filter(commonFontExpr.replace(/webapp\/styles/ig, "").split(","), {restore: true}),
        commonBootstrapHtmlExpr = "webapp/*.html", commonBootstrapHtmlFilter = filter(commonBootstrapHtmlExpr.replace(/webapp\//ig, "").split(","), {restore: true}),
        commonFilesExpr = commonJsExpr.split(",").concat(commonCssExpr.split(",")).concat(commonTplExpr.split(",")).concat(commonImgExpr.split(",")).concat(commonFontExpr.split(",")).concat(commonBootstrapHtmlExpr.split(","));
    // 清理目录
    gulp.task("clean:dist", function () {
        return gulp.src(['dist'], {read: false}).pipe(clean({force: true}));
    });
    // stp2
    gulp.task("compile:steps2", function () {
        // 匹配需要处理的文件
        return gulp.src(commonFilesExpr)
            // js合并压缩
            .pipe(commonJsFilter).pipe(concat('scripts/common.js')).pipe(commonJsFilter.restore)
            // css合并压缩
            .pipe(commonCssFilter)
            .pipe(replace("../../img/", "../styles/img/"))
            .pipe(replace("../img/", "../styles/img/"))
            .pipe(replace("../../font/", "../styles/font/")).pipe(replace("../font/", "../styles/font/"))
            .pipe(commonCssFilter.restore)
            // Template 模板合并压缩
            .pipe(commonTplFilter)
            .pipe(minifyHtml())
            .pipe(template({
                templateHeader: 'require(["$app"],function(app) { \n app.run(["$templateCache", function($templateCache) {',
                transformUrl: function (url) {
                    return url;
                },
                filename: "scripts/tpl.js",
                templateFooter: "}]);\n});"
            }))
            .pipe(commonTplFilter.restore)
            // 图片压缩
            .pipe(commonImgFilter).pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            })).pipe(commonImgFilter.restore)
            // 文件重命名
            .pipe(commonFontFilter).pipe(commonFontFilter.restore)
            // webapp/*.html 插入公共类型库
            .pipe(commonBootstrapHtmlFilter)
            .pipe(inject.replace('<!-- inject_js-->', '<script src="scripts/tpl.js"></script>\n<script src="scripts/common.js"></script>'))
            .pipe(inject.replace('<script src="scripts/bootstrap.js"></script>', ''))
            .pipe(commonBootstrapHtmlFilter.restore)
            // 输出结果
            .pipe(gulp.dest('dist'));
    });
    // stp4
    gulp.task("compile:steps4", function () {
        return gulp.src("dist/*.html")
            .pipe(useref({
                transformPath: function (file) {
                    //file = file.replace("dist\\styles/css/", "webapp\\styles/css/");
                    file = file.replace("dist\\bower_", "webapp\\bower_");
                    file = file.replace("dist/bower_", "webapp/bower_");
                    // console.log(file);
                    return file;
                }
            }))
            .pipe(gulpIf("*.css", minifyCss()))
            .pipe(gulpIf("*.js", uglify())).pipe(gulpIf("*.js", n2a({reverse: false})))
            .pipe(gulpIf("*.html", minifyHtml({
                empty: true,
                spare: true
            }))).pipe(gulp.dest('dist'))
    });
    // stp5
    gulp.task("compile:steps5", function () {
        gulp.src("webapp/styles*/mp3/*").pipe(gulp.dest('dist'));
        gulp.src("webapp/html*/*.html").pipe(gulp.dest('dist'));
        // 清理临时文件
        del(["dist/scripts/*.js", "!dist/scripts/library*"]);
        del(["dist/styles/css/"]);
        del(["dist/styles/*.css", "!dist/styles/library*"]);
        del(["dist/rev-manifest.json"]);
    });
    // stp6
    gulp.task("compile:steps6", function () {
        console.log("执行完成～～～～～～～～～");
    });
    // 启动 WebServer
    gulp.task("server", function () {
        browserSync.init("webapp/**", {
            port: 3000,
            startPath: "/",
            server: {
                baseDir: 'webapp',
                routes: {
                    "/": "webapp"
                }
            }
        });
    });

    // 开始编译
    gulp.task("compile", sequence("clean:dist", "compile:steps2", "compile:steps4", "compile:steps5", "compile:steps6"));

})();
