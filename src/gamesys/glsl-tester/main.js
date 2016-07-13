var utils = require("./utils/utils");
var glContext       = require('gl-context');
var glClear    = require('gl-clear');
module.exports = function () {
  var viewSize = {width:700,height:500};

  /*https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext*/
  var attributes = {
      depth: true,
      antialias: true
  };

  function initApp(gameProperties){
    gameProperties.canvas = utils.createElement(window,window.document.body,"canvas");
    utils.setSize(gameProperties.canvas,viewSize);
  }
  return {
      initialise: function () {
        var gameProperties = {
          variables: {}
        }
        initApp(gameProperties);
      }
  };
};
