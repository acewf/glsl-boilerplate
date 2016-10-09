var gulp = require("gulp");
var gutil = require("gulp-util");
var ignore = require('gulp-ignore');
var webpack = require("webpack");
var spawn = require('child_process').spawn;
var runSequence = require('run-sequence');
var del = require('del');
var sonar = require('gulp-sonar');
var WebpackConfig = require("./webpack.config.js");

module.exports = function (options) {
    var allowedExtensions = ['json', 'png', 'wav', 'mp3', 'm4a', "mp4", "atlas", "jpg"];
    var webpackConfig = new WebpackConfig(options);

    // Production build
    gulp.task("build", function (done) {
        runSequence("build-resources", "build-webpack", function () {
            del(['!' + options.BUILD_FOLDER + '/**/*.map']);
            done();
        });
    });

    gulp.task('build-resources', function (done) {
        runSequence('build-resources-clean', 'build-resources-move', done);
    });

    gulp.task('build-resources-clean', function (done) {
        del([options.BUILD_FOLDER + '/' + options.APP_RESOURCES + '/**/*']).then(function () {
            done();
        });
    });

    gulp.task('build-resources-move', function (done) {
        runSequence('build-resources-move-assets', 'build-resources-move-index', done);
    });

    gulp.task('build-resources-move-assets', function (done) {

        gulp.src(allowedExtensions.map(function (item) {
            return options.APP_RESOURCES + '/**/*.' + item;
        }))
            .pipe(ignore.exclude('**/source/**/*.*'))
            .pipe(gulp.dest(options.BUILD_FOLDER + '/resources'))
            .on('end', done);

    });

    gulp.task('build-resources-move-index', function (done) {
        gulp.src('index.html')
            .pipe(gulp.dest(options.BUILD_FOLDER + '/'))
            .on('end', done);
    });

    gulp.task("build-webpack", function (done) {
        // modify some webpack config options
        var myConfig = Object.create(webpackConfig);
        myConfig.plugins = myConfig.plugins.concat(
            new webpack.DefinePlugin({
                "process.env": {
                    // This has effect on the react lib size
                    "NODE_ENV": JSON.stringify("production")
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        );

        // run webpack
        webpack(myConfig, function (err, stats) {
            if (err) throw new gutil.PluginError("build-webpack", err);
            gutil.log("[build-webpack]", stats.toString({colors: true}));
            done();
        });
    });
};
