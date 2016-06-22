var glBuffer = require('gl-buffer')
var vec3 = require('gl-vec3');
var _frag = require("raw!./../shaders/ball.frag");
var _vertex = require("raw!./../shaders/ball.vs");
var glShader = require('gl-shader');

function Triangle (gl) {
  var circle = 2*Math.PI;
  var radius = 10;
  var circlePoints = 50;
  var angle = circle/circlePoints;
  var x = 0.0;
  var y = 0.0;
  var z = 0.0;
  var _angle = 0.0;
  var ballVerticesT = [];
  var ballVerticesC = [];
  function randomColor(max,min){
    return -max+Math.random() * ((max*2) - min) + min;
  }

  for(var i=0;i<circlePoints;i++){
    x = Math.cos(_angle);
    y = Math.sin(_angle);
    ballVerticesT.push(x,y,z);
    ballVerticesC.push(randomColor(1,0), randomColor(.5,0.2), randomColor(1,0.8));
    _angle += angle;
  }

  var _vertices = glBuffer(gl,new Float32Array(ballVerticesT));
  var _colors = glBuffer(gl,new Float32Array(ballVerticesC));
  var _length = ballVerticesT.length/3;
  var _shader = glShader(gl,_vertex,_frag);

  return {
    render:function(projectionMatrix,tMatrix,lastTime){
      _shader.bind();
      _shader.uniforms.uProjection = projectionMatrix;
      _shader.uniforms.uModelView = tMatrix;
      _shader.uniforms.time = parseFloat(Math.cos(lastTime/1000));
      _vertices.bind();
      _shader.attributes.aPosition.pointer();
      _colors.bind();
      _shader.attributes.aColor.pointer();
      gl.drawArrays(gl.TRIANGLE_FAN, 0, _length);
    }
  };
}
module.exports = Triangle;
