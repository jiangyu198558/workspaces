// Generated by CoffeeScript 1.12.7
(function() {
  var del, developServer, gulp, notify, runSequence;

  gulp = require('gulp');

  del = require('del');

  runSequence = require('run-sequence');

  developServer = require('gulp-develop-server');

  notify = require('gulp-notify');

  gulp.task('default', function(callback) {
    return runSequence(['clean'], ['copyFiles'], ['serve', 'watch'], callback);
  });

  gulp.task('clean', function(callback) {
    return del('./dist/', callback);
  });

  gulp.task('copyFiles', function() {
    return gulp.src('./src/**/*.js').pipe(gulp.dest('./dist/'));
  });

  gulp.task('serve', function() {
    return developServer.listen({
      path: './dist/index.js'
    });
  });

  gulp.task('watch', function() {
    return gulp.watch('./src/**/*.js', ['reload']);
  });

  gulp.task('reload', function(callback) {
    return runSequence(['copyFilese'], ['reload-node'], callback);
  });

  gulp.task('reload-node', function() {
    developServer.restart();
    return gulp.src('./dist/index.js').pipe(notify('Server restarted...'));
  });

}).call(this);
