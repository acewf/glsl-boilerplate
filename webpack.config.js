var path = require("path");
var webpack = require("webpack");
module.exports = {
    entry: {
        app: "./src/gamesys/index.js"
    },
    output: {
        path: path.join(__dirname, "public/js/"),
        publicPath: "public/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    module: {
        loaders: [
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.coffee$/, loader: "coffee-loader"},
            //
            // required to write "require('./style.css')"
            {test: /\.css$/, loader: "style-loader!css-loader"}
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
        modulesDirectories: ["node_modules", "src/gamesys/guardiansApplication"]
    },
    node: {fs: "empty"},
    cache: true,
    plugins: []
};
