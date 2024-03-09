struct Uniforms {
    time: f32,
    window_size: vec2<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;



struct FragmentInputs {
    @location(0) fragColor: vec4<f32>,
    @builtin(position) position : vec4<f32>,
};

@fragment
fn main(input: FragmentInputs) -> @location(0) vec4<f32> {

    let uv = (input.position.xy / uniforms.window_size.xy) ;

    return vec4<f32>(uv.x, uv.y, 0.0, 1.0);
}