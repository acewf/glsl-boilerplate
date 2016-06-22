precision mediump float;
varying vec3 vColor;
varying vec2 vResolution;

void main () {
  vec2 p = gl_PointCoord.xy / vResolution.xy;
  //gl_FragCoord.xy
  float x = 0.5+0.5*smoothstep(-1.0, 1.0, cos(gl_PointCoord.x));
  float y = 0.5+0.5*smoothstep(-1.0, 1.0, sin(gl_PointCoord.y));
  vec3 blue = vec3(x, y, 1.0);

  //gl_FragColor = vec4(vColor, 1.0);
  gl_FragColor = vec4(mix(vColor,blue,x),1.0);
}
