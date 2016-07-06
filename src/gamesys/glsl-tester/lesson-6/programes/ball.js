var glBuffer = require('gl-buffer');
var mat4     = require('gl-mat4');
var vec2 = require('gl-vec2');
var _frag = [];
_frag[0] = require("raw!./../shaders/ball.frag");
_frag[1] = require("raw!./../shaders/ball2.frag");
_frag[2] = require("raw!./../shaders/ball3.frag");

var _vertex = require("raw!./../shaders/ball.vs");
var glShader = require('gl-shader');
var utils = require("./../../utils/utils");
var white = {r:1.0,g:1.0,b:1.0};
var index = 0;
var colorArr = [{r:1.0,g:0.0,b:0.0}];
colorArr.push({r:0.0,g:1.0,b:0.0});
colorArr.push({r:0.0,g:0.0,b:1.0});

function Shape (gl,z,viewSize) {
  var _color = colorArr[index];
  var _fragResolution = vec2.create();
  var _viewResolution = vec2.create();
  vec2.set(_viewResolution,viewSize.width,viewSize.height);
  vec2.set(_fragResolution,1,1);
  index+=1
  var xRand = 0;//-2+6*Math.random();
  var yRand = 4+z;
  var circle = 2*Math.PI;
  var circlePoints = 10;
  var angle = circle/circlePoints;
  var position = {x:0.0,y:0.0,z:z+0.0,angle:0.0};
  var ball = {vertices:[],color:[]};
  var bcolor = false;
  var color = white;
  var zHigh = 0.1;
  var model = mat4.create()
  ball.vertices.push(xRand+position.x,yRand+position.y,z+zHigh+1);
  ball.color.push(color.r, color.g, color.b);
  for(var i=0;i<circlePoints;i++){
    position.x = xRand+Math.cos(position.angle);
    position.y = yRand+Math.sin(position.angle);
    ball.vertices.push(position.x,position.y,position.z);
    if(bcolor){
      color = white;
      bcolor = false;
      position.z = z+zHigh;
    } else {
      position.z = z+0.0;
      color = _color;
      bcolor = true;
    }
    ball.color.push(color.r, color.g, color.b);
    position.angle += angle;
  }
  position.x = xRand+Math.cos(0.0);
  position.y = Math.sin(0.0);
  /// CLOSE FIGURE
  ball.vertices.push(position.x,yRand+position.y,z+0.0);
  ball.color.push(_color.r, _color.g, _color.b);

  //glBuffer(gl,data,type,usage);
  //type = gl.ARRAY_BUFFER || ELEMENT_ARRAY_BUFFER
  //usage = gl.DYNAMIC_DRAW || gl.STREAM_DRAW || gl.STATIC_DRAW
  var _vertices = glBuffer(gl,new Float32Array(ball.vertices));
  var _colors = glBuffer(gl,new Float32Array(ball.color));
  var _length = ball.vertices.length/3;
  var _shader = glShader(gl,_vertex,_frag[index-1]);


  _shader.attributes.aPosition.location = 0;
  _shader.attributes.aColor.location = 1;
  var _rotation = 180;
  var _xRotation = z/5;
  var _zIndex=-5;
  var _initialZ = 0;
  var _z = _initialZ+_zIndex;

  mat4.rotate(model, model, _rotation, [0, 0, 0]);

  var renderOnce = false;

  return {
    render:function(camera,time){
      _rotation += (360 * time.elapsed) * 0.000001;
      _z = _initialZ+_zIndex*Math.cos(_rotation);
      mat4.identity(model, model);
      mat4.translate(model, model, [_z, 0, -7]);
      //mat4.translate(model, model, [0, 0, 0]);
      //mat4.rotate(model, model, _rotation, [0, 1, 0]);

      _shader.bind();
      _shader.uniforms.uProjection = camera.projection;
      _shader.uniforms.uModelView = model;
      _shader.uniforms.view = camera.view
      _shader.uniforms.resolution = _viewResolution;
      var _time = time.lastTime-time.initTime;
      _shader.uniforms.time = parseFloat(_time);
      _vertices.bind();
      _shader.attributes.aPosition.pointer();
      _colors.bind();
      _shader.attributes.aColor.pointer();
      gl.drawArrays(gl.TRIANGLE_FAN, 0, _length);
    }
  };
}
module.exports = Shape;
