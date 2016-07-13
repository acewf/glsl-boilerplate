var Triangle = require("./triangle");
var mat4     = require('gl-mat4');
var triangleMatrix   = mat4.create();
var projectionMatrix   = mat4.create();
var _triangle;
var timeUtils = {
  now:function(){
    return Date.now();
  }
};
module.exports = function(viewSize){
  return {
    gl:null,
    init:function (gl,gameProperties) {
        this.gl = gl;
        _triangle = new Triangle(this.gl);
        return _triangle;
    },
    currTime:timeUtils.now(),
    lastTime:timeUtils.now(),
    angleRad:0.0,
    elapsed:0,
    zIndex:-10,
    z:0,
    update:function(){
      this.currTime = timeUtils.now();
      this.elapsed  = this.currTime - this.lastTime;
      this.lastTime = this.currTime;
      this.angleRad += (90 * this.elapsed) / 50000;
      this.z = -15+this.zIndex*Math.cos(this.angleRad);
    },
    render:function(width, height){
      this.update();
      mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100);
      mat4.identity(triangleMatrix, triangleMatrix);
      mat4.translate(triangleMatrix, triangleMatrix, [-0.5, 0, this.z]);
      mat4.rotate(triangleMatrix, triangleMatrix, this.angleRad, [.5, 1, 0]);
      _triangle.render(projectionMatrix,triangleMatrix,this.lastTime);
    }
  };
}
