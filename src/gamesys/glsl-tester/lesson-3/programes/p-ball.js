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
  return {
    gl:null,
    shader:null,
    init:function (gl,gameProperties) {
        this.gl = gl;
        _ball = new Ball(this.gl);
        _nVect = vec2.create();
        vec2.set(_nVect,0.1,0.5);

        return _ball;
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
      this.z = -15+this.zIndex*Math.cos(this.rTri);
    },
    render:function(width, height,shader){
      this.update();
      mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100);
      mat4.identity(ballMatrix, ballMatrix);
      mat4.translate(ballMatrix, ballMatrix, [0, 0, this.z]);
      mat4.rotate(ballMatrix, ballMatrix, this.rTri, [.1, .1, .1]);
      _ball.render(projectionMatrix,ballMatrix,this.lastTime,_nVect);
    }
  };
}
