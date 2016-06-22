var Triangle = require("./triangle");
var mat4     = require('gl-mat4');
var triangleMatrix   = mat4.create();
var projectionMatrix   = mat4.create();
var _triangle;
var _shader;
var utils = {
  now:function(){
    return Date.now();
  }
};
module.exports = function(viewSize){
  return {
    gl:null,
    shader:null,
    init:function (gl,gameProperties) {
        this.gl = gl;
        _triangle = new Triangle(this.gl);
        return _triangle;
    },
    currTime:utils.now(),
    lastTime:utils.now(),
    rTri:0.5,
    elapsed:0,
    zIndex:-10,
    z:0,
    update:function(){
      this.currTime = utils.now();
      this.elapsed  = this.currTime - this.lastTime;
      this.lastTime = this.currTime;
      this.rTri += (90 * this.elapsed) / 50000;
      this.z = -15+this.zIndex*Math.cos(this.rTri);
    },
    render:function(width, height,shader){
      this.update();
      mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100);
      mat4.identity(triangleMatrix, triangleMatrix);
      mat4.translate(triangleMatrix, triangleMatrix, [-0.5, 0, this.z]);
      mat4.rotate(triangleMatrix, triangleMatrix, this.rTri, [.5, 1, 0]);
      _triangle.render(projectionMatrix,triangleMatrix,this.lastTime);
    }
  };
}
