const gulp = require("gulp");
const webpack = require("webpack");
const del = require("del");
const $ = require("gulp-load-plugins")();
let basePath = process.env.BASE_PATH;

module.exports = () => {
    /************************** LESS ******************************/
    // Less公用文件
    gulp.task("less-common", () => {
        let commonSource = [
            basePath + "/src/styles/common.less",
            basePath + "/src/styles/common/**/*"
        ];
        gulp.src(commonSource)
            .pipe($.plumber())
            .pipe($.concat("common.css"))
            .pipe($.less())
            .pipe($.autoprefixer())
            .pipe($.cleanCss())
            .pipe(gulp.dest(basePath + "/dist/styles"));
    });
    // Less模块文件-开发模式
    gulp.task("less-dev-module", () => {
        gulp.src([
                basePath + "/src/styles/**/*.less",
                "!" + basePath + "/src/styles/common.less",
                "!" + basePath + "/src/styles/common/**/*.less"
            ])
            .pipe($.plumber())
            .pipe($.less())
            .pipe($.autoprefixer())
            .pipe(gulp.dest(basePath + "/dist/styles"));
    });
    // Less-开发模式
    gulp.task("less-dev", ["less-common", "less-dev-module"]);

    // Less模块文件-线上模式
    gulp.task("less-build-module", () => {
        gulp.src([
                basePath + "/src/styles/**/*.less",
                "!" + basePath + "/src/styles/common.less",
                "!" + basePath + "/src/styles/common/**/*.less"
            ])
            .pipe($.plumber())
            .pipe($.less())
            .pipe($.autoprefixer())
            .pipe($.cleanCss())
            .pipe(gulp.dest(basePath + "/dist/styles"));
    });
    // Less-线上模式
    gulp.task("less-build", ["less-common", "less-build-module"]);

    /************************** Scripts ******************************/

    // script-公用模块-开发模式
    gulp.task("script-bundle", () => {
        const webpackConfig = require(basePath + '/bin/webpack/webpack.conf.dev.js');
        webpack(webpackConfig, function (err, stats) {
            if (err) {
                console.error(err);
            }
            console.info(stats.toString());
        });
    });

    // script-公用模块-开发模式
    gulp.task("script-common-dev", () => {
        gulp.src([
                basePath + "/src/scripts/common/**/*.js"
            ])
            .pipe($.plumber())
            .pipe($.concat("common.js"))
            .pipe($.babel())
            .pipe(gulp.dest(basePath + "/dist/scripts"));

    });
    // script-功能模块-开发模式
    gulp.task("script-fn-dev", () => {
        gulp.src([
                basePath + "/src/scripts/**/*.js",
                "!" + basePath + "/src/scripts/common/**/*.js"
            ])
            .pipe($.plumber())
            .pipe($.babel())
            .pipe(gulp.dest(basePath + "/dist/scripts"));
    });
    // script-开发模式打包
    gulp.task("script-dev", ["script-bundle", "script-common-dev", "script-fn-dev"]);

    // pages-打包
    gulp.task('pages', () => {
        gulp.src([
                basePath + "/src/**/*.html",
                "!" + basePath + "/src/templates/**/*.html",
                "!" + basePath + "/plugins/**/*.html"
            ])
            .pipe($.plumber())
            .pipe($.fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest(basePath + "/dist"));
    });

    /************************** Other ******************************/
    // 资源拷贝
    gulp.task("copy-assets", () => {
        gulp.src(basePath + "/src/assets/**/*").pipe($.plumber()).pipe(gulp.dest(basePath + "/dist/assets"));
    });
    gulp.task("copy-mocks", () => {
        gulp.src(basePath + "/src/mocks/**/*").pipe($.plumber()).pipe(gulp.dest(basePath + "/dist/mocks"));
    });

    // 清理文件夹
    gulp.task("clean", () => {
        del.sync(basePath + "/dist");
    });

    // 监听任务
    gulp.task("watch", done => {
        $.livereload.listen();
        gulp.watch([basePath + "/src/plugins/**/*"], ["script-bundle", "less-common"]); // 插件监听
        gulp.watch([basePath + "/src/styles/**/*"], ["less-dev"]); // 样式监听
        gulp.watch([basePath + "/src/scripts/**/*"], ["script-dev"]); // 样式监听
        gulp.watch([basePath + "/src/assets/**/*"], ["copy-assets"]); // 资源监听
        gulp.watch([basePath + "/src/mocks/**/*"], ["copy-mocks"]); // 资源监听
        gulp.watch([basePath + "/src/**/*.html"], ["pages"]); // 页面监听
        // 输出监听

        gulp.watch([basePath + "/dist/**/*"], file => {
            setTimeout(() => {
                $.livereload.changed(file.path);
            }, 600);
        });
    });

    gulp.task("common", ["copy-assets", "copy-mocks", "pages"]);
    // 主任务
    gulp.task("build", ["common", "less-build"]);
    gulp.task("dev", ["common", "less-dev", "script-dev", "watch"]);
    gulp.task("default", ["dev"]);
}