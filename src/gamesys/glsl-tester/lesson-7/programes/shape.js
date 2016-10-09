var glBuffer = require('gl-buffer');
var createTexture = require('gl-texture2d');
var mat4     = require('gl-mat4');
var vec2 = require('gl-vec2');
var vec3 = require('gl-vec3');
var vec4 = require('gl-vec4');
var _frag = require('./fragments');
var _vertex = require('./vertex');
var _points = require('./umbrela/generate-points');
var glShader = require('gl-shader');
var utils = require("./../../utils/utils");
var index = 0;

function Shape (gl,z,viewSize) {
  var _fragResolution = vec2.create();
  var _viewResolution = vec2.create();
  var _shape = {};
  var _video = null;
  vec2.set(_viewResolution,viewSize.width,viewSize.height);
  vec2.set(_fragResolution,1,1);
  index+=1;
  var model = mat4.create();
  var tex ;
  var lastPoint = vec3.create();
  var point = {};
  if(index==3){
    utils.loadVideo('resources/video3.mp4',function(img){
      /*
      img.loop = true;
      _video = img;
      tex = createTexture(gl, img);
      tex.bind(0);
      //tex.generateMipmap();
      //tex.minFilter = gl.LINEAR_MIPMAP_LINEAR;
      //tex.magFilter = gl.LINEAR;
      //and repeat wrapping
      //tex.wrap = gl.REPEAT;
      _shape.ready = true;
      */
    });
    utils.loadImg('resources/wood.jpg',function(img){
      tex = createTexture(gl, img);
      //tex.bind(0);
      tex.generateMipmap();
      tex.minFilter = gl.LINEAR_MIPMAP_LINEAR;
      tex.magFilter = gl.LINEAR;
      //and repeat wrapping
      tex.wrap = gl.REPEAT;
      _shape.ready = true;
    });
    gl.canvas.addEventListener("mousemove",function () {
      var x = event.clientX/gl.canvas.width;
      var y = event.clientY/gl.canvas.height;
      x =-1+x*2;
      y =-1+ y*2;
      vec3.set(lastPoint,x,-1*y,0);
    });
  } else {
    _shape.ready = true;
  }

  var circle = 2*Math.PI;
  var circlePoints = 16;
  var angle = circle/circlePoints;
  var ball = new _points(0,0,z,angle,circlePoints,index);

  //glBuffer(gl,data,type,usage);
  //type = gl.ARRAY_BUFFER || ELEMENT_ARRAY_BUFFER
  //usage = gl.DYNAMIC_DRAW || gl.STREAM_DRAW || gl.STATIC_DRAW
  var _vertices = glBuffer(gl,new Float32Array(ball.vertices));
  var _colors = glBuffer(gl,new Float32Array(ball.color));
  var _length = ball.vertices.length/3;
  var _shader = glShader(gl,_vertex[index-1],_frag[index-1]);

  _shader.attributes.aPosition.location = 0;
  _shader.attributes.aColor.location = 1;
  var _rotation = 180;
  var _zIndex=-1;
  var _initialZ = 0;
  var _z = _initialZ+_zIndex;
  var distance = 2;
  _z = 0;
  mat4.rotate(model, model, _rotation, [0, 0, 0]);
  vec3.set(lastPoint,ball.center.x,ball.center.y,ball.center.z);


  _shape.render = function(camera,time,settings){
      _rotation += (360 * time.elapsed) * (settings.timeScale*0.000001);
      _z = _initialZ+_zIndex*Math.cos(_rotation);
      mat4.identity(model, model);
      mat4.translate(model, model, [-1, 1, -distance]);
      mat4.rotate(model, model, _rotation, [0, 0, 0]);

      //vec3.set(lastPoint,x,-1*y,0);

      _shader.bind();
      _shader.uniforms.uProjection = camera.projView;
      _shader.uniforms.uModelView = model;
      _shader.uniforms.view = camera.view
      _shader.uniforms.resolution = _viewResolution;
      _shader.uniforms.frequency = settings.frequency;
      _shader.uniforms.centro = lastPoint;

      if(tex && _video){
        //tex.setPixels(_video);
      }

      var _time = time.lastTime-time.initTime;
      _shader.uniforms.time = parseFloat(_time);
      _vertices.bind();
      _shader.attributes.aPosition.pointer();
      _colors.bind();
      _shader.attributes.aColor.pointer();
      gl.drawArrays(gl.TRIANGLE_FAN, 0, _length);
      _vertices.unbind();
      _colors.unbind();
  };

  return _shape;
}
module.exports = Shape;
