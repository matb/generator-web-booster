'use strict';

var merge = require('merge2');
var plugins = require('gulp-load-plugins')();

module.exports = function (gulp, config) {
    /**
     * Delete all compiled outputs that are related to typescript
     **/
    gulp.task('ts:clear', function () {
        return gulp.src(['release/js/', 'release/definitions/'], {read: false}) // much faster
            .pipe(plugins.rimraf());
    });

    gulp.task('ts:lint', function () {
        // ignore typings because we do not change them.
        config.customTypeScript.push('!typings/**/*.d.ts');

        // ignore our generated typings
        config.customTypeScript.push('!release/definitions/**/*.d.ts');

        return gulp.src(config.customTypeScript).pipe(plugins.tslint()).pipe(plugins.tslint.report('prose', {
            emitError: false
        }));
    });

    gulp.task('ts:compile', ['ts:lint', 'ts:clear'], function () {
        var tsFiles = gulp.src(config.customTypeScript, {base: config.basePath})

        // if typescript annotate is defined, we execute it (should be the case in angular projects)
        if (config.isAngular) {
            tsFiles = tsFiles.pipe(plugins.typescriptAnnotate({typesafe: false}))
        }
        var tsResult = tsFiles.pipe(plugins.typescript({
            declarationFiles: true,
            noExternalResolve: false,
            module: "commonjs"
        }));

        var jsPipe = tsResult.js;
        // reload fires only when connect server is running, connect won't be defined in a non-angular project
        if (config.isAngular) {
            jsPipe = jsPipe.pipe(plugins.connect.reload());
        }

        return merge([
            tsResult.dts.pipe(gulp.dest('release/definitions')),
            jsPipe.pipe(gulp.dest('release/js'))]);
    });
}