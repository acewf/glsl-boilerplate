precision mediump float;
varying vec3 vColor;
varying vec2 vResolution;
varying float vTime;

void main () {
  vec2 p = gl_FragCoord.xy / vResolution.xy;
  vec2 uv = p;
  //gl_PointCoord.xy
  ////gl_FragCoord.xy
  float x = 0.5+0.5*smoothstep(-1.0, 1.0, (p.x));
  float y = 0.5+0.5*smoothstep(-1.0, 1.0, (p.y));
  float z = 0.5+0.5*smoothstep(-1.0, 1.0, cos(vTime * 0.0005));
  vec3 blendColor = vec3(p.x, p.y, z);


  /// Create Vector for matching colors that not be replaced
  vec3 compare = vec3(0.9, 0.9, 0.9);
  /// Create Boolean to check all values are greater then vector
  bool isBig = all(greaterThan(vColor,compare));

  if(isBig){
    gl_FragColor = vec4(mix(vColor,blendColor,0.5), 1.0);
  } else {
    gl_FragColor = vec4(blendColor,1.0);
  }
}
