var dat = require('dat-gui');
var settings = require('./../settings');
var Shape = require("./programes/shape");
var mat4     = require('gl-mat4');
var vec2 = require('gl-vec2');
var createCamera = require('perspective-camera');
var _nVect = null;

var utils = {
  now:function(){
    return Date.now();
  }
};
module.exports = function(viewSize){
  var _gui;
  _gui = new dat.GUI();
  var _zPos = [-2,-3.5,0];
  var _shapes = [];
  var camera = createCamera({
    fov: Math.PI / 4,
    near: 0.01,
    far: 100
  });
  if(!(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)){
    var simulatorGui = _gui.addFolder('Simulator');
    simulatorGui.add(settings, 'cameraDistance', 1, 10).listen();
    simulatorGui.add(settings, 'timeScale', 1, 10).listen();
    simulatorGui.add(settings, 'frequency', 1.0, 10.0).listen();
  }
  return {
    init:function (gl,gameProperties) {
        this.gl = gl;
        for (var i = 0; i < _zPos.length; i++) {
          _shapes[i] = new Shape(gl,_zPos[i],viewSize);
        }
        _nVect = vec2.create();
        vec2.set(_nVect,viewSize.width,viewSize.height);
    },
    time:{
      initTime:utils.now(),
      currTime:utils.now(),
      lastTime:utils.now(),
      rTri:0,
      elapsed:0
    },
    update:function(){
      this.time.currTime = utils.now();
      this.time.elapsed  = this.time.currTime - this.time.lastTime;
      this.time.lastTime = this.time.currTime;
    },
    render:function(width, height,shader){
      var scope = this;
      scope.update();
      scope.gl.enable(scope.gl.DEPTH_TEST);
      scope.gl.clear(scope.gl.COLOR_BUFFER_BIT | scope.gl.DEPTH_BUFFER_BIT);
      //scope.gl.enable(scope.gl.CULL_FACE);
      camera.identity();
      camera.translate([ 0, 0, settings.cameraDistance ])
      camera.lookAt([ 0, 0, 0 ]);
      camera.viewport = [ 0, 0, width, height ];
      camera.update();
      for (var i = 0; i < _shapes.length; i++) {
        if(_shapes[i].ready){
            _shapes[i].render(camera,this.time,settings);
        }
      }
    }
  };
}
