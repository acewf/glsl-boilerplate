var gulp = require("gulp");
var gutil = require("gulp-util");
var runSequence = require('run-sequence');
var webpack = require("webpack");
var ignore = require("gulp-ignore");
var WebpackDevServer = require("webpack-dev-server");
var Config = require("./webpack.config.js");

module.exports = function (options) {
    var webpackConfig = new Config(options);

    // Set webpack entry point to the dev version.
    webpackConfig.entry.app = options.DEV_ENTRY_POINT;

    gulp.task("build-dev", function (done) {
        runSequence("build-resources", "build-dev-webpack", "package-dev", done);
    });

    gulp.task("package-dev", function (done) {
        var include = [
            options.BUILD_FOLDER + '/index.html',
            options.BUILD_FOLDER + '/manifest.json',
            options.BUILD_FOLDER + '/metadata.json',
            options.BUILD_FOLDER + '/resources/**/*.*',
            options.BUILD_FOLDER + '/js/**/*.*'
        ];

        gulp.src(include, {base: options.BUILD_FOLDER + '/'})
            .pipe(gulp.dest(options.BUILD_FOLDER))
            .on('end', done);
    });

    // The development server (the recommended option for development)
    gulp.task("default", function (done) {
        runSequence("build-resources","build-dev-webpack", "build-dev-webpack-watch", "build-dev-webpack-server", done);
    });

    gulp.task("build-dev-webpack", function (done) {
        var myDevConfig = Object.create(webpackConfig);
        myDevConfig.devtool = "sourcemap";
        myDevConfig.debug = true;

        // create a single instance of the compiler to allow caching
        var devCompiler = webpack(myDevConfig);

        // run webpack
        devCompiler.run(function (err, stats) {
            if (err) throw new gutil.PluginError("build-dev-webpack", err);
            gutil.log("[build-dev-webpack]", stats.toString({colors: true}));
            done();
        });
    });

    gulp.task("build-dev-webpack-watch", function () {
        return gulp.watch(["src/**/*"], ["build-dev-webpack"]);
    });

    gulp.task("build-dev-webpack-server", function () {

        var myDevServerConfig = Object.create(webpackConfig);
        myDevServerConfig.entry = {
            app: "./" + options.BUILD_FOLDER + "/js/app.js"
        };
        myDevServerConfig.devtool = "eval";
        myDevServerConfig.debug = true;

        new WebpackDevServer(webpack(myDevServerConfig), {
            publicPath: "/" + myDevServerConfig.output.publicPath,
            stats: {colors: true}
        }).listen(myDevServerConfig.dev.server.port, myDevServerConfig.dev.server.domain, function (err) {
                if (err) throw new gutil.PluginError("webpack-dev-server", err);
                //
                gutil.log("[webpack-dev-server]", "http://localhost:3000/webpack-dev-server/"+myDevServerConfig.output.developPath+"/index.html");
            });
    });

    gulp.task('deploy', function (done) {
        runSequence('deploy-resources', 'deploy-code', done);
    });

    gulp.task('deploy-resources', function (done) {
        runSequence('build-resources', 'deploy-resources-move', done);
    });

    gulp.task('deploy-resources-move', function (done) {
        gulp.src(options.BUILD_FOLDER + '/resources/**/*.*')
            .pipe(gulp.dest(options.STAGING_FOLDER + options.APP_NAME + '/resources'))
            .on('end', done);
    });

    gulp.task('deploy-code', function (done) {
        -runSequence('deploy-libs', done);
    });
    
    gulp.task('deploy-libs', function (done) {
        runSequence('build-dev-webpack', 'deploy-libs-move', done);
    });

    gulp.task('deploy-libs-move', function (done) {
        gulp.src([options.BUILD_FOLDER + '/js/**/*.*', options.BUILD_FOLDER + '/*.*'], {base: options.BUILD_FOLDER + '/'})
            .pipe(gulp.dest(options.STAGING_FOLDER + options.APP_NAME + '/'))
            .on('end', done);
    });

};
