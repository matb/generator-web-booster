'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// exclude typescript core d.ts files because they will give us a compile error.
var config = {customTypeScript: ['**/*.ts', '!node_modules/**/*.ts']};

require('../../util/development/gulp_tasks/ts')(gulp, config);

gulp.task('serve', ['ts:compile'], function () {
    plugins.nodemon({
        script: 'release/js/app.js', ext: 'ts', ignore: [], tasks: ['ts:compile']
    });
});