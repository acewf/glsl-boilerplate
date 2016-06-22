var Ball = require("./ball");
var mat4     = require('gl-mat4');
var vec2 = require('gl-vec2');
var _nVect = null;

var utils = {
  now:function(){
    return Date.now();
  }
};
module.exports = function(viewSize){
  var ballMatrix   = mat4.create();
  var projectionMatrix   = mat4.create();
  var _ball;
  var _zPos = [-2,-3.5,-5];
  var _balls = [];
  return {
    init:function (gl,gameProperties) {
        this.gl = gl;
        for (var i = 0; i < _zPos.length; i++) {
          _balls[i] = new Ball(gl,_zPos[i]);
        }
        _nVect = vec2.create();
        vec2.set(_nVect,0.1,0.5);
    },
    currTime:utils.now(),
    lastTime:utils.now(),
    rTri:0,
    elapsed:0,
    zIndex:-10,
    z:-5,
    x:0,
    update:function(){
      this.currTime = utils.now();
      this.elapsed  = this.currTime - this.lastTime;
      this.lastTime = this.currTime;
      this.rTri += (360 * this.elapsed) / 500000;
      this.z = -20+this.zIndex*Math.cos(this.rTri);
    },
    render:function(width, height,shader){
      var scope = this;
      scope.update();
      scope.gl.enable(scope.gl.DEPTH_TEST);
      scope.gl.clear(scope.gl.COLOR_BUFFER_BIT | scope.gl.DEPTH_BUFFER_BIT);
      //scope.gl.enable(scope.gl.CULL_FACE);
      mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100);
      mat4.identity(ballMatrix, ballMatrix);
      mat4.translate(ballMatrix, ballMatrix, [0, 0, this.z]);
      mat4.rotate(ballMatrix, ballMatrix, this.rTri, [0, 1, .1]);
      for (var i = 0; i < _balls.length; i++) {
        _balls[i].render(projectionMatrix,ballMatrix,this.lastTime,_nVect);
      }
    }
  };
}
