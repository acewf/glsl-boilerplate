precision mediump float;
varying vec3 vColor;
varying vec2 vResolution;
varying float vTime;

void main () {
  vec2 p = gl_FragCoord.xy / vResolution.xy;
  vec2 uv = p;
  //gl_PointCoord.xy
  ////gl_FragCoord.xy
  float z = 0.5+0.5*smoothstep(-1.0, 1.0, cos(vTime * 0.0005));
  vec3 blendColor = vec3(p.x, p.y, z);

  gl_FragColor = vec4(blendColor, 1.0);
}
