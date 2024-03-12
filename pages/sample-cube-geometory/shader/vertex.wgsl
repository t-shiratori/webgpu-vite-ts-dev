struct Uniforms {
  persepective : mat4x4<f32>,
  camera : mat4x4<f32>,
  model : mat4x4<f32>
}
@group(0) @binding(0) var<uniform> uniforms : Uniforms; // uniformBindGroup の layout と binding に対応

struct VertexOutput {
  @builtin(position) Position : vec4<f32>, // GLSL の gl_Position に相当
  @location(0) fragColor : vec4<f32>, // fragment.wgsl の @location(0) に対応
}

@vertex
fn main(
  @location(0) position: vec4<f32>, // Pipeline の shaderLocation: 0 に対応
  @location(1) color: vec4<f32> // Pipeline の shaderLocation: 1 に対応
) -> VertexOutput {

  var output : VertexOutput;
  output.Position = uniforms.persepective * uniforms.camera * uniforms.model * position;
  output.fragColor = color;
  
  return output;
}