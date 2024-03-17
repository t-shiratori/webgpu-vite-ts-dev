@vertex
fn vertexMain(
  @location(0) pos: vec2f // Pipeline の shaderLocation: 0 に対応
) -> @builtin(position) vec4f { // @builtin(position) は GLSL の gl_Position に相当
  return vec4f(pos, 0, 1);
}