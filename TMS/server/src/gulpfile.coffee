gulp = require('gulp')
del = require('del')
runSequence = require('run-sequence')
developServer = require('gulp-develop-server')

gulp.task('default', (callback)->
    runSequence(['clean'], ['copyFiles'], ['serve', 'watch'] callback)
)

gulp.task('clean', (callback)->
    del('./dist/', callback)
)

gulp.task('copyFiles', ->
    gulp.src('./src/**/*.js')
    .pipe(gulp.dest('./dist/'))
)

gulp.task('serve', ->
    developServer.listen({
        path: './dist/index.js'
    })
)

gulp.task('watch', ->
    gulp.watch('./src/**/*.js', ['reload'])
)

gulp.task('reload', (callback)->
    runSequnce(['copyFilese'], ['reload-node'], callback)
)

gulp.task('reload-node', ->
    developServer.restart()
)