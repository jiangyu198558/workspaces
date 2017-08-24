/*
* create by bl.jiang 2017/7/24
* 知果果pc网站重构项目
*/

var gulp = require('gulp'),
    path = require('path'),

    argv = require('yargs').argv;
    del  = require('del'),

    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),          // 任务列表
    through = require('through2'),
    gulpif = require('gulp-if'),
    minimatch = require('minimatch'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass');
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),                // 压缩js文件
    minifycss = require('gulp-minify-css'),         // 压缩css文件
    rename = require('gulp-rename'),                // 更改路径
    rev = require('gulp-rev'),                      // 生成md5戳
    revCollector = require('gulp-rev-collector'),   // 路径替换
    zip = require('gulp-zip'),                      // 打成zip包

    gulpConfig = require('./gulp.config'),
    srcPath = gulpConfig.sourcePath,
    destPath = gulpConfig.destPath,
    devServer = gulpConfig.devServer,
    version = gulpConfig.version,

    platform = gulpConfig.platforms[argv.p];          // 平台

/******************* 配置本地服务器开始 ******************************/
gulp.task("dev-clean", function(cb){
    del([devServer]).then(function(){
        cb();
    });
});

// 编译sass文件到本地服务器
gulp.task("dev-sass", function(){
    return gulp.src(srcPath+"/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(srcPath+'/css/'));
});

// 监视sass文件
gulp.task("watch-sass", function(){
    gulp.watch(srcPath+"/sass/**/*.scss", ["dev-sass"]);
});

// copy src to devserver
gulp.task("dev-copy-src-to-devserver", ["dev-clean", "dev-sass", "watch-sass"], function(){
    return gulp.src(srcPath+"/**/*")
        .pipe(gulp.dest(devServer));
});

// 资源文件拷贝
gulp.task('dev-copy-res', function(done){
    var path = platform || "resources/localhost";

    return gulp.src(path+"/**/*")
        .pipe(gulp.dest(devServer+"/"));
});

// 启动本地服务器
gulp.task("dev-start-server", ["dev-copy-src-to-devserver", "dev-copy-res"], function(){
    browserSync.init({
        server: {
            baseDir: devServer
        }
    });

    // 监视输出目录
    gulp.watch(["*.html"], {
        cwd: devServer
    }, reload);
    gulp.watch(["./css/**/*", "./js/**/*", "./images/**/*", "./lib/**/*", "./fonts/**/*"], {
        cwd: devServer
    }, reload);

    // 监视原目录，若有改动，执行copy任务
    gulp.watch(srcPath+"/css/**/*", ["dev-copy-css"]);
    gulp.watch(srcPath+"/js/**/*", ["dev-copy-js"]);
    gulp.watch(srcPath+"/images/**/*", ["dev-copy-images"]);
    gulp.watch(srcPath+"/fonts/**/*", ["dev-copy-fonts"]);
    gulp.watch(srcPath+"/lib/**/*", ["dev-copy-lib"]);
    gulp.watch(srcPath+"/*.html", ["dev-copy-html"]);

    gulp.task("dev-copy-css", function(){
        return gulp.src(srcPath+"/css/**/*")
            .pipe(gulp.dest(devServer+"/css/"));
    });

    gulp.task("dev-copy-js", function(){
        return gulp.src(srcPath+"/js/**/*")
            .pipe(gulp.dest(devServer+"/js/"));
    });

    gulp.task("dev-copy-images", function(){
        return gulp.src(srcPath+"/images/**/*")
            .pipe(gulp.dest(devServer+"/images/"));
    });

    gulp.task("dev-copy-fonts", function(){
        return gulp.src(srcPath+"/fonts/**/*")
            .pipe(gulp.dest(devServer));
    });

    gulp.task("dev-copy-lib", function(){
        return gulp.src(srcPath+"/lib/**/*")
            .pipe(gulp.dest(devServer));
    });

    gulp.task("dev-copy-html", function(){
        return gulp.src(srcPath+"/*.html")
            .pipe(gulp.dest(devServer));
    });
});

gulp.task("default", function(){
});
/******************* 配置本地服务器结束 ******************************/

/******************* 构建任务开始 ******************************/
gulp.task("build-clean", function(cb){
    del([destPath+"/zgg-"+argv.p+"-v"+version]).then(function(){
        cb();
    });
});

gulp.task("build-copy-src-js", function(){
    return gulp.src([srcPath+"/js/**/*.js", "!"+srcPath+"/lib/**/*"])
        .pipe( uglify() )
        .pipe( rev() )
        .pipe( gulp.dest(destPath+"/zgg-"+argv.p+"-v"+version+"/js/") )
        .pipe( rev.manifest({
            merge: true
        }) )
        //.pipe( rev.manifest() )
        .pipe(gulp.dest(destPath+"/zgg-"+argv.p+"-v"+version+"/rev/js"));
});

gulp.task("build-sass", function(){
    return gulp.src(srcPath+"/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destPath+'/css/*'));
});

gulp.task("build-copy-src-css", function(){
    return gulp.src([srcPath+"/css/**/*.css", "!"+srcPath+"/lib/**/*"])
        .pipe( minifycss() )
        .pipe( rev() )
        .pipe( gulp.dest(destPath+"/zgg-"+argv.p+"-v"+version+"/css/") )
        // .pipe(rev.manifest({
        //     merge: true
        // }))
        .pipe( rev.manifest() )
        .pipe(gulp.dest(destPath+"/zgg-"+argv.p+"-v"+version+"/rev/css"));
});

gulp.task("build-copy-src-other", function(){
    return gulp.src([srcPath+"/**/*", "!"+srcPath+"/js/**/*.js", "!"+srcPath+"/css/**/*.css"])
        .pipe(gulp.dest(destPath+"/zgg-"+argv.p+"-v"+version+""));
});

gulp.task("build-copy-res", function(){
    return gulp.src("./"+platform.path+"/**/*")
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(destPath+"/zgg-"+argv.p+"-v"+version))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest(destPath+"/zgg-"+argv.p+"-v"+version+"/rev/res"));
});

gulp.task("build-rev-replace", function(){
    return gulp.src([destPath+"/zgg-"+argv.p+"-v"+version+"/rev/**/*.json", destPath+"/zgg-"+argv.p+"-v"+version+"/index.html"])
        .pipe(revCollector({
            replaceReved: true,
            // dirReplacements: {
            //     "../resources": "/"
            // }
        }))
        .pipe(gulp.dest(destPath+"/zgg-"+argv.p+"-v"+version));
});

gulp.task("build-clean-rev", function(cb){
    del([destPath+"/zgg-"+argv.p+"-v"+version+"/rev"]).then(function(){
        cb();
    });
});

gulp.task("build-zip", function(){
    return gulp.src(destPath+"/zgg-"+argv.p+"-v"+version+"/**/*")
        .pipe(zip("/zgg-"+argv.p+"-v"+version+".zip"))
        .pipe(gulp.dest(destPath+"/zgg-"+argv.p+"-v"+version));
});

gulp.task("build", function(cb){
    if(!platform){
        throw new Error("制定的平台不存在！");
    }

    runSequence(
        "build-clean",
        //"build-sass",
        ["build-copy-src-js", "build-copy-src-css", "build-copy-src-other"],
        "build-copy-res",
        "build-rev-replace",
        //"build-clean-rev",
        "build-zip",
        cb
    );
});
/******************* 构建任务结束 ******************************/