'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var bowerFiles = require('main-bower-files');


// exclude typescript core d.ts files because they will give us a compile error.
var config = {customTypeScript: ['**/*.ts', '!node_modules/**/*.ts'], isAngular: true, basePath: 'app/'}

require('../../util/development/gulp_tasks/ts')(gulp, config);
require('../../util/development/gulp_tasks/less')(gulp, plugins, config);

gulp.task('dist:clear', function () {
    return gulp.src(['dist/'], {read: false}) // much faster
        .pipe(plugins.rimraf());
});

gulp.task('inject', ['ts:compile', 'less:compile'], function () {
    var bowerDependencies = bowerFiles();
    //exclusions
    bowerDependencies.push('!bower_components/es5-shim/es5-shim.js');
    bowerDependencies.push('!bower_components/json3/lib/json3.min.js');

    return gulp.src('app/index.html')
        .pipe(plugins.inject(gulp.src(bowerDependencies, {read: false}), {name: 'bower', relative: false}))
        .pipe(plugins.inject(gulp.src(['**/module.js', '**/*.js'], {
            read: false,
            cwd: 'release/js/'
        }), {relative: false}))
        .pipe(plugins.inject(gulp.src(['**/*.css'], {
            read: false,
            cwd: 'release/css/'
        }), {relative: false}))
        .pipe(gulp.dest('app/'));
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.less', ['less:compile']);
    gulp.watch('app/**/*.ts', ['ts:compile']);
});

gulp.task('serve', ['inject', 'ts:compile', 'less:compile', 'watch'], function () {
    plugins.connect.server({
        root: "app",
        port: 8001,
        livereload: true,
        middleware: function (connect, opt) {
            return [
                connect().use('/bower_components', connect.static('./bower_components')),
                connect().use('/', connect.static('./release/js')),
                connect().use('/', connect.static('./release/css')),
            ]
        }
    });
});

gulp.task('dist:serve', ['usemin'], function () {
    plugins.connect.server({
        root: "dist",
        port: 8002
    });
});

// ==================== Release Build Task ====================
/**
 * Copies html files to dist
 */
gulp.task('copy:templates', ['dist:clear'], function () {
    return gulp.src(['app/**/*.html', '!app/index.html'])
        .pipe(plugins.minifyHtml({empty: true}))
        .pipe(gulp.dest('./dist/'));
});

/**
 * Copies assets to dist
 */
gulp.task('copy:assets', ['dist:clear'], function () {
    return gulp.src(['app/commonAssets/images/*'], {base: 'app/'})
        .pipe(gulp.dest('./dist'));
});

/**
 * Copies Fonts to dist
 */
gulp.task('copy:fonts', ['dist:clear'], function () {
    return gulp.src(['bower_components/font-awesome/fonts/*', 'bower_components/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('usemin', ['inject', 'ts:compile', 'less:compile', 'dist:clear'], function () {
    // even if both pipelines are the same, "usemin" produces unexpected results, if we use the same pipeline reference for both "jsscripts" and "jsvendor"
    var jsPipeline = [plugins.ngAnnotate(), plugins.uglify(), plugins.rev()];
    var vendorJsPipeline = [plugins.uglify(), plugins.rev()];

    return gulp.src('app/index.html')
        .pipe(plugins.usemin({
            vendorCss: [plugins.minifyCss(), plugins.rev()],
            appCss: [plugins.minifyCss(), plugins.rev()],
            html: [plugins.minifyHtml({empty: true})],
            appJs: jsPipeline,
            vendorJs: vendorJsPipeline
            //in case of angularjs indection (dependency) problems temporarily use this for debugging.
            //jsscripts: [ngAnnotate(), uglify({
            //  preserveComments: 'all',
            //  compress: false,
            //  output: {
            //    beautify: true
            //  }
            //}), rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['usemin', 'copy:templates', 'copy:assets', 'copy:fonts']);