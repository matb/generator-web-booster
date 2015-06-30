'use strict';

var plugins = require('gulp-load-plugins')();

module.exports = function (gulp, config) {
    /**
     * Delete all compiled outputs that are related to less
     **/
    gulp.task('less:clear', function () {
        return gulp.src(['release/css/'], {read: false}) // much faster
            .pipe(plugins.rimraf());
    });

    gulp.task('less:compile', ['less:clear'], function () {
        return gulp.src('app/**/*.less', {base: config.basePath})
            .pipe(plugins.less())
            .pipe(gulp.dest('./release/css/'))
            // reload fires only if connect server is running
            .pipe(plugins.connect.reload());
    });
}