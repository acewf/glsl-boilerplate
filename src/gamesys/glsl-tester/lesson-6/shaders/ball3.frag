precision mediump float;
varying vec3 vColor;
varying vec2 vResolution;
varying float vTime;
uniform sampler2D texNormal;

void main () {
  //vec2 p = gl_FragCoord.xy / vResolution.xy;
  //vec2 uv = p;
  //gl_PointCoord.xy
  ////gl_FragCoord.xy
  //float z = 0.5+0.5*smoothstep(-1.0, 1.0, cos(vTime * 0.0005));
  //vec3 blendColor = vec3(p.x, p.y, z);
  vec2 mresolution = vec2(50,50);

  float time=vTime;
  float intensity=0.005;
	vec2 p =-1.+0.2*gl_FragCoord.xy / mresolution.xy;
  float cLength=length(p);
  vec2 uv=(gl_PointCoord.xy / mresolution.xy)/-0.5+(p/cLength)*cos(cLength*15.0-(time/100.0))*intensity;

  gl_FragColor = vec4(texture2D(texNormal,uv).xyz, 1.0);
}
