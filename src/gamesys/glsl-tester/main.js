var _program = require("./lesson-4/programes/p-ball");
var utils = require("./utils/utils");
var glContext       = require('gl-context');
var glClear    = require('gl-clear');
module.exports = function () {
  var gl,shader;
  var clear    = glClear({ color: [0.0, 0.0, 0.0, 1] })
  var viewSize = {width:700,height:500};
  var program = _program(viewSize);
  function initApp(gameProperties){
    gameProperties.canvas = utils.createElement(window,window.document.body,"canvas");
    utils.setSize(gameProperties.canvas,viewSize);
    gl = glContext(gameProperties.canvas, render);
    program.init(gl,gameProperties);
  }
  function render(){
    clear(gl);
    var width = gl.drawingBufferWidth;
    var height = gl.drawingBufferHeight;
    gl.viewport(0, 0, width, height);
    program.render(width, height,shader);
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
