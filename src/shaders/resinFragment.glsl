varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormalWorld;

uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;
uniform vec3 uAccent;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x)
    + (c - a) * u.y * (1.0 - u.x)
    + (d - b) * u.x * u.y;
}

void main() {
  float flow = noise(vUv * 7.0 + vec2(uTime * 0.14, -uTime * 0.07));
  float micro = noise(vUv * 42.0 + uTime * 0.2);

  float bubbleMask = smoothstep(0.84, 1.0, micro) * 0.45;
  float champagneThread = smoothstep(0.55, 0.92, flow) * 0.33;

  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormalWorld)), 0.0), 2.3);

  vec3 resin = mix(uColor, uAccent, champagneThread);
  resin += bubbleMask * vec3(0.95, 0.98, 1.0);
  resin += fresnel * vec3(0.85, 0.72, 0.46);

  float alpha = uAlpha * (0.48 + fresnel * 0.24 + bubbleMask * 0.24);

  gl_FragColor = vec4(resin, alpha);
}
