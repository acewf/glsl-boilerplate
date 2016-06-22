var glBuffer = require('gl-buffer');
var mat4     = require('gl-mat4');
var _frag = require("raw!./../shaders/ball.frag");
var _vertex = require("raw!./../shaders/ball.vs");
var glShader = require('gl-shader');
var white = {r:1.0,g:1.0,b:1.0};
function random(max,min){
  var value = Math.random()*(max-min);
  var final = min+value;
  return final;
}
//var blue = {r:random(.9,0),g:random(0.9,0),b:random(0.9,0)};
var blue = {r:0,g:0,b:1};

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
  var model = mat4.create()
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
  var _rotation = 0;
  var _xRotation = z/5;
  var _zIndex=-10;
  var _initialZ = -20;
  var _z = _initialZ+_zIndex;

  return {
    render:function(camera,time,_nVect){
      _rotation += (360 * time.elapsed) / 500000;
      _z = _initialZ+_zIndex*Math.cos(_rotation);
      mat4.identity(model, model);
      mat4.translate(model, model, [0, 0, _z]);
      mat4.rotate(model, model, _rotation, [0, 1, 0]);

      _shader.bind();
      _shader.uniforms.uProjection = camera.projection;
      _shader.uniforms.uModelView = model;
      _shader.uniforms.view = camera.view
      _shader.uniforms.resolution = _nVect;
      _shader.uniforms.time = 0;
      _vertices.bind();
      _shader.attributes.aPosition.pointer();
      _colors.bind();
      _shader.attributes.aColor.pointer();
      gl.drawArrays(gl.TRIANGLE_FAN, 0, _length);
    }
  };
}
module.exports = Shape;
