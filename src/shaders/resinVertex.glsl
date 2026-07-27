varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormalWorld;

uniform float uTime;

void main() {
  vUv = uv;

  vec3 transformed = position;

  float slowWave = sin((position.y * 9.0) + (uTime * 1.35)) * 0.012;
  float lateralPull = sin((position.x * 7.0) - (uTime * 0.8)) * 0.006;

  transformed.x += slowWave;
  transformed.z += lateralPull;

  vec4 world = modelMatrix * vec4(transformed, 1.0);
  vWorldPosition = world.xyz;
  vNormalWorld = normalize(mat3(modelMatrix) * normal);

  gl_Position = projectionMatrix * viewMatrix * world;
}
