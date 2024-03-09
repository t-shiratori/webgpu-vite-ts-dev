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

    //let uv = (input.position.xy * 2.0 - uniforms.window_size.xy) / min(uniforms.window_size.x, uniforms.window_size.y);
    let uv0 = input.position.xy / uniforms.window_size.xy * 2.0 - 1.0 ;
    let uv1 = vec2(uv0.x, uv0.y * uniforms.window_size.x / uniforms.window_size.y);

    let d = length(uv1);

    return vec4<f32>(d, d, d, 1.0);
}