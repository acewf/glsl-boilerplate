precision mediump float;
varying vec3 vColor;
varying vec2 vResolution;
varying float vFrequency;
varying float vTime;
uniform sampler2D texNormal;

varying float vPosition;
varying vec4 vCentro;

void main () {
  vec2 fragresolution = vec2(12,12);

  float time=vTime;
  float intensity=0.05;
  float frequency = vFrequency;
  float wSize = 0.1;
  vec2 p =wSize* (gl_FragCoord.xy/ fragresolution.xy);
  p.x -=2.5+(vCentro.x/2.0);
  p.y -=2.2+(vCentro.y/2.0);
  float cLength=length(p);
  float range = cos(cLength*frequency-(time/100.0));
  vec2 uvOne = (gl_PointCoord.xy / fragresolution.xy);
  vec2 uv=uvOne/.15+(p/cLength)*range*intensity;

  /// Create Vector for matching colors that not be replaced
  vec3 compare = vec3(0.95, 0.95, 0.95);
  /// Create Boolean to check all values are greater then vector
  bool isBig = all(greaterThan(vColor,compare));
  gl_FragColor = vec4(texture2D(texNormal,uv).xyz, 1.0);

  if(isBig){
    gl_FragColor = vec4(mix(vColor,gl_FragColor.xyz,0.8), 1.0);
  }

}
