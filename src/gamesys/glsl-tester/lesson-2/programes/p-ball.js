var Ball = require("./ball");
var mat4     = require('gl-mat4');
var ballMatrix   = mat4.create();
var projectionMatrix   = mat4.create();
var _ball;
var utils = {
  now:function(){
    return Date.now();
  }
};
module.exports = function(){
  return {
    gl:null,
    init:function (gl,shader) {
        _ball = new Ball(gl);
        return _ball;
    },
    currTime:utils.now(),
    lastTime:utils.now(),
    rTri:0,
    elapsed:0,
    zIndex:-10,
    z:-5,
    update:function(){
      this.currTime = utils.now();
      this.elapsed  = this.currTime - this.lastTime;
      this.lastTime = this.currTime;
      this.rTri += (180 * this.elapsed) / (5*20000);
      this.z = -15+this.zIndex*Math.cos(this.rTri);
    },
    render:function(width, height,shader){
      this.update();
      mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100);
      mat4.identity(ballMatrix, ballMatrix);
      mat4.translate(ballMatrix, ballMatrix, [-0.5, 0, this.z]);
      mat4.rotate(ballMatrix, ballMatrix, this.rTri, [.5, 1, 0]);
      _ball.render(projectionMatrix,ballMatrix,this.lastTime);
    }
  };
}
