'use strict';
var gulp = require('gulp');

var apps = [{name: 'api', path: '../../src/api'}, {name: 'web', path: '../../src/webapp'}];

gulp.task('serve', function () {
    // Use `spawn` to execute shell command using Node
    var spawn = require('child_process').spawn;

    // Gulp tasks that need to be run.
    var tasks = ['serve']

    apps.forEach(function (app) {
        // `cd` into Gulpfile directory
        process.chdir(app.path);

        // Run `gulp` command
        var child = spawn('gulp', tasks);

        // Print output from Gulpfile
        child.stdout.on('data', function (data) {
            if (data) {
                process.stdout.write(app.name + ' ' + data.toString())
            }
        });
    });
});