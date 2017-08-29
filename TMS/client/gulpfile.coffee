# 引入package
gulp = require('gulp')
del = require("del")
uglify = require('gulp-uglify')
minifyCss = require('gulp-minify-css')
#unCss = require('gulp-uncss')
browserSync = require('browser-sync').create()
runSequence = require('run-sequence')

# 获取参数


# 构建任务部分
gulp.task('default', (callback)->
  runSequence(['clean'], ['build'], ['serve', 'watch'], callback)
)

gulp.task('clean', (callback)->
  del(['./dist/'], callback)
)

gulp.task('build', (callback)->
  runSequence(['copy', 'miniJs', 'miniCss'], callback)
)

gulp.task('copy', ->
  gulp.src('./src/**/*.*')
  .pipe(gulp.dest('./dist/'))
)

gulp.task('miniJs', ->
  gulp.src('./src/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'))
)

gulp.task('miniCss', ->
  gulp.src('./src/**/*.css')
  .pipe(minifyCss())
  .pipe(gulp.dest('./dist/'))
)

gulp.task('concat', ->
  gulp.src('./src/*.js')
  .pipe(concat('all.js', {newLine: '\n'}))
  .pipe(gulp.dest('./dist/'))
)

gulp.task('serve', ->
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
    port: 8888
  })
)

gulp.task('watch', ->
  gulp.watch('./src/**/*.*', ['reload'])
)

gulp.task('reload', (callback)->
  runSequence(['build'], ['reload-browser'], callback)
)

gulp.task('reload-browser', ->
  browserSync.reload()
)