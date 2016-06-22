var glBuffer = require('gl-buffer')
var vec3 = require('gl-vec3');
var _frag = require("raw!./../shaders/triangle.frag");
var _vertex = require("raw!./../shaders/triangle.vs");
var glShader = require('gl-shader');
function Triangle (gl) {
  var triangleVertices = [
    +0.0, +1.0, +0.0,
    -1.0, -1.0, +0.0,
    +1.0, -1.0, +0.0
  ];
  var triangleColors = [
    +1.0, +0.5, +1.0,
    +0.5, +0.5, +0.0,
    +0.0, +0.0, +1.0
  ];

  var _vertices = glBuffer(gl,new Float32Array(triangleVertices));
  var _colors = glBuffer(gl,new Float32Array(triangleColors));
  var _length = triangleVertices.length/3;
  var _shader = glShader(gl,_vertex,_frag);

  _shader.attributes.aPosition.location = 0;
  _shader.attributes.aColor.location = 1;

  return {
    render:function(projectionMatrix,tMatrix,lastTime){
      // Bind the shader
     _shader.bind();
     _shader.uniforms.uProjection = projectionMatrix;
     // Draw the triangle
     _shader.uniforms.uModelView = tMatrix;
     _vertices.bind();
     _shader.attributes.aPosition.pointer();
     _colors.bind();
     _shader.attributes.aColor.pointer();
     gl.drawArrays(gl.TRIANGLES, 0, _length);
    }
  };
}
module.exports = Triangle;
