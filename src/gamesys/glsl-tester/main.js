var _program = require("./lesson-1/programes/p-triangle");
var utils = require("./utils/utils");
var glContext       = require('gl-context');
var glClear    = require('gl-clear');
module.exports = function () {
  var gl;
  var clear    = glClear({ color: [0.0, 0.0, 0.0, 1] })
  var viewSize = {width:700,height:500};
  var program = _program(viewSize);

  /*https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext*/
  var attributes = {
      depth: true,
      antialias: true
  };

  function initApp(gameProperties){
    gameProperties.canvas = utils.createElement(window,window.document.body,"canvas");
    utils.setSize(gameProperties.canvas,viewSize);
    gl = glContext(gameProperties.canvas,attributes, render);
    program.init(gl,gameProperties);
  }
  function render(){
      clear(gl);
      var width = gl.drawingBufferWidth;
      var height = gl.drawingBufferHeight;
      gl.viewport(0, 0, width, height);
      program.render(width, height);
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
