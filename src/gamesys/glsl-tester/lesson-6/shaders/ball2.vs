precision highp float;
attribute vec3 aPosition;
attribute vec3 aColor;

uniform mat4 uModelView;
uniform mat4 uProjection;
uniform mat4 view;
uniform vec2 resolution;
varying vec2 vResolution;

varying vec3 vColor;
uniform float time;
varying float vTime;

highp float random(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

void main() {
  vResolution = resolution;
  vColor = aColor;
  vTime = time;
  gl_Position = uProjection * view * uModelView * vec4(aPosition, 1.0);
}
