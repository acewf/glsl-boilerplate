var packageFile = require('./package.json');

module.exports = {
    APP_NAME: "glsl-boilerplate",
    APP_VERSION: packageFile.version,
    APP_SOURCES: "src",
    APP_RESOURCES: "resources",
    BUILD_FOLDER: "output",
    PROD_ENTRY_POINT: "./src/gamesys/index.js",
    DEV_ENTRY_POINT: "./src/gamesys/index-dev.js",
    STAGING_FOLDER: "/localhost/static-assets/",
    SONAR_SERVER: 'http://localhost:9000'
};