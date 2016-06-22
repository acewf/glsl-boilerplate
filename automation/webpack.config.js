var path = require("path");
var webpack = require("webpack");


function WebpackConfig(options) {
    return {
        entry: {
            app: options.PROD_ENTRY_POINT
        },
        plugins: [],
        output: {
            path: path.join(__dirname, "../" + options.BUILD_FOLDER + "/js/"),
            publicPath: "../" + options.BUILD_FOLDER + "/",
            developPath:  options.BUILD_FOLDER,
            filename: "[name].js",
            chunkFilename: "[chunkhash].js"
        },
        module: {
            preLoaders: [],
            loaders: [
                {test: /\.json$/, loader: "json-loader"},
                {test: /\.coffee$/, loader: "coffee-loader"}
            ]
        },
        dev: {
            server: {
                domain: "localhost",
                port: 3000
            }
        },
        resolve: {
            extensions: ['', '.js', '.json', '.coffee'],
            modulesDirectories: ["node_modules", "src/gamesys"]
        },
        node: {fs: "empty"},
        cache: true,
    };
}
module.exports = WebpackConfig;


