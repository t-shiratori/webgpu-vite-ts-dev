struct VertexOutput {
    @builtin(position) vertexPosition : vec4<f32>, // GLSL の gl_Position に相当
    @location(0) fragColor : vec4<f32>, // fragment.wgsl の @location(0) に対応
}
  
@vertex
fn main(
    @location(0) position: vec4<f32>, // Pipeline の shaderLocation: 0 に対応
    @location(1) color: vec4<f32> // Pipeline の shaderLocation: 1 に対応
) -> VertexOutput {

  var output : VertexOutput;
  output.vertexPosition = position;
  output.fragColor = color;
  
  return output;
}
