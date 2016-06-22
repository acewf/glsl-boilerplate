var Build = require("./automation/gulp-build");
var Dev = require("./automation/gulp-dev");
var settings = require("./settings");

Build(settings);
Dev(settings);
