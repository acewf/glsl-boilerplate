precision mediump float;

attribute vec3 aPosition;
attribute vec3 aColor;

uniform mat4 uModelView;
uniform mat4 uProjection;
uniform mat4 view;

uniform vec2 resolution;
uniform vec2 fResolution;
varying vec2 vResolution;
varying vec2 vfResolution;

varying vec3 vColor;

uniform float time;
varying float vTime;

void main() {
  vResolution = resolution;
  vColor = aColor;
  vTime = time;
  vfResolution=fResolution;


  gl_Position = uProjection * view * uModelView * vec4(aPosition, 1.0);
}
