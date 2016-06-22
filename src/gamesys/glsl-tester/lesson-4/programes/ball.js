var glBuffer = require('gl-buffer');
var _frag = require("raw!./../shaders/ball.frag");
var _vertex = require("raw!./../shaders/ball.vs");
var glShader = require('gl-shader');
var white = {r:1.0,g:1.0,b:1.0};
function random(max,min){
  var value = Math.random()*(max-min);
  var final = min+value;
  return final;
}
var blue = {r:random(.9,0),g:random(0.9,0),b:random(0.9,0)};

function Shape (gl,z) {
  var circle = 2*Math.PI;
  var radius = 10;
  var circlePoints = 20;
  var angle = circle/circlePoints;
  var position = {x:0.0,y:0.0,z:z+0.0,angle:0.0};
  var ball = {vertices:[],color:[]};
  var bcolor = false;
  var color = white;
  var zHigh = 0.1;
  ball.vertices.push(position.x,position.y,z+zHigh+1);
  ball.color.push(color.r, color.g, color.b);
  for(var i=0;i<circlePoints;i++){
    position.x = Math.cos(position.angle);
    position.y = Math.sin(position.angle);
    ball.vertices.push(position.x,position.y,position.z);
    if(bcolor){
      color = white;
      bcolor = false;
      position.z = z+zHigh;
    } else {
      position.z = z+0.0;
      color = blue;
      bcolor = true;
    }
    ball.color.push(color.r, color.g, color.b);
    position.angle += angle;
  }
  position.x = Math.cos(0.0);
  position.y = Math.sin(0.0);
  /// CLOSE FIGURE
  ball.vertices.push(position.x,position.y,z+0.0);
  ball.color.push(blue.r, blue.g, blue.b);

  var _vertices = glBuffer(gl,new Float32Array(ball.vertices));
  var _colors = glBuffer(gl,new Float32Array(ball.color));
  var _length = ball.vertices.length/3;
  var _shader = glShader(gl,_vertex,_frag);

  _shader.attributes.aPosition.location = 0;
  _shader.attributes.aColor.location = 1;
  _shader.uniforms.time = 0.9337512581542471;

  return {
    render:function(projectionMatrix,tMatrix,lastTime,_nVect){
      _shader.bind();
      _shader.uniforms.uProjection = projectionMatrix;
      _shader.uniforms.uModelView = tMatrix;
      _shader.uniforms.resolution = _nVect;
      _shader.uniforms.time = parseFloat(Math.cos(lastTime/1000));
      _vertices.bind();
      _shader.attributes.aPosition.pointer();
      _colors.bind();
      _shader.attributes.aColor.pointer();
      gl.drawArrays(gl.TRIANGLE_FAN, 0, _length);
    }
  };
}
module.exports = Shape;
