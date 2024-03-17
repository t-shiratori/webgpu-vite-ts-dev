struct Uniforms {
    time: f32,
    screen_size: vec2<f32>,
};

@group(0) @binding(0) var<uniform> uniforms : Uniforms; // uniformBindGroup の layout と binding に対応


fn colorPalette(t: f32) -> vec3<f32> { 
    let a = vec3(0.5, 0.5, 0.5);
    let b = vec3(0.5, 0.5, 0.5);
    let c = vec3(1.0, 1.0, 1.0);
    let d = vec3(0.00, 0.10, 0.20);
    return a + b * cos(6.28318*(c*t+d)); 
}

struct FragmentInputs {
    @builtin(position) position : vec4<f32>, // GLSL の gl_FragCoord に相当
};

@fragment
fn fragmentMain(input: FragmentInputs) -> @location(0) vec4<f32> {

    // 座標の正規化
    // var uv = (2.0 * input.position.xy - uniforms.screen_size.xy) / min(uniforms.screen_size.x, uniforms.screen_size.y);
    var uv = input.position.xy / uniforms.screen_size.xy * 2.0 - 1.0 ;
    let aspectRatio = uniforms.screen_size.y / uniforms.screen_size.x;
    uv = vec2(uv.x * aspectRatio , uv.y);
    
    let d = length(uv);

    return vec4<f32>(d, 0, 0, 1.0);
}