
struct VertexOutput {
  @builtin(position) Position : vec4<f32>, // GLSL の gl_Position に相当
}

@vertex
fn vertexMain(
  @location(0) position: vec4<f32>, // Pipeline の shaderLocation: 0 に対応
) -> VertexOutput {

  var output : VertexOutput;
  output.Position = position;
  
  return output;
}