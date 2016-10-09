precision highp float;
attribute vec3 aPosition;
attribute vec3 aColor;

uniform mat4 uModelView;
uniform mat4 uProjection;
uniform mat4 view;
uniform vec2 resolution;
uniform vec3 centro;
uniform float frequency;
varying float vFrequency;
varying vec2 vResolution;


uniform float pos;
varying float vPosition;

varying vec3 vColor;
uniform float time;
varying float vTime;

varying vec2 vUv;
varying float noise;

varying vec4 vCentro;

void main() {
  vResolution = resolution;
  vFrequency = frequency;
  vColor = aColor;
  vTime = time;

  mat4 modelView = view * uModelView;
  vCentro = uProjection * modelView * vec4(centro, 1.0);
  gl_Position = uProjection * modelView * vec4(aPosition, 1.0);
}
