precision mediump float;
varying vec3 vColor;
varying vec2 vResolution;
varying float vTime;

void main () {
  vec2 p = gl_PointCoord.xy / vResolution.xy;
  float x = 0.3+0.5*smoothstep(-1.0, 1.0, (gl_PointCoord.x));
  float y = 0.2+0.5*smoothstep(-1.0, 1.0, (gl_PointCoord.y));
  vec3 blue = vec3(x, y, 1.0);

  if((vColor.r>0.6) && (vColor.g>0.6) && (vColor.b>0.6)){
    gl_FragColor = vec4(vColor, 1.0);
  } else {
    gl_FragColor = vec4(mix(vColor,blue,x),1.0);
  }
}
