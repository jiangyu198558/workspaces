// Generated by CoffeeScript 1.12.7
(function() {
  var assets, browserSync, concat, del, fs, gulp, minifyCss, runSequence, uglify;

  gulp = require('gulp');

  del = require("del");

  uglify = require('gulp-uglify');

  concat = require('gulp-concat');

  minifyCss = require('gulp-minify-css');

  browserSync = require('browser-sync').create();

  runSequence = require('run-sequence');

  fs = require('fs');

  assets = JSON.parse(fs.readFileSync('assets.json'));

  gulp.task('default', function(callback) {
    return runSequence(['clean'], ['build'], ['serve', 'watch'], callback);
  });

  gulp.task('clean', function(callback) {
    return del(['./dist/'], callback);
  });

  gulp.task('build', function(callback) {
    return runSequence(['assetsJs', 'assetsCss', 'assetsFonts'], ['appJs', 'appCss', 'copyHtml', 'configJs'], callback);
  });

  gulp.task('assetsJs', function() {
    return gulp.src(assets.assetsJs).pipe(concat('assets.js', {
      newLine: '\n\n'
    })).pipe(gulp.dest('./dist/assets/js/'));
  });

  gulp.task('assetsCss', function() {
    return gulp.src(assets.assetsCss).pipe(concat('assets.css', {
      newLine: '\n'
    })).pipe(gulp.dest('./dist/assets/css/'));
  });

  gulp.task('assetsFonts', function() {
    return gulp.src(assets.assetsFonts).pipe(gulp.dest('./dist/assets/fonts/'));
  });

  gulp.task('copyHtml', function() {
    return gulp.src(['./src/**/*.html']).pipe(gulp.dest('./dist/'));
  });

  gulp.task('appJs', function() {
    return gulp.src(assets.appJs).pipe(concat('app.js', {
      newLine: '\n'
    })).pipe(gulp.dest('./dist/assets/js/'));
  });

  gulp.task('configJs', function() {
    return gulp.src(assets.configJs).pipe(gulp.dest('./dist/assets/js/'));
  });

  gulp.task('appCss', function() {
    return gulp.src(assets.appCss).pipe(concat('app.css', {
      newLine: '\n'
    })).pipe(gulp.dest('./dist/assets/css/'));
  });

  gulp.task('serve', function() {
    return browserSync.init({
      server: {
        baseDir: './dist/'
      },
      port: 8008
    });
  });

  gulp.task('watch', function() {
    return gulp.watch('./src/**/*.*', ['reload']);
  });

  gulp.task('reload', function(callback) {
    return runSequence(['build'], ['reload-browser'], callback);
  });

  gulp.task('reload-browser', function() {
    return browserSync.reload();
  });

}).call(this);
