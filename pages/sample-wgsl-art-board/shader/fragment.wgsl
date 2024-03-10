struct Uniforms {
    time: f32,
    window_size: vec2<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;



struct FragmentInputs {
    @builtin(position) position : vec4<f32>,
};

fn palette1(t: f32, a: f32, b: f32, c: f32, d: f32) -> f32 { 
    return a + b * cos(6.28318*(c*t+d)); 
}

fn palette2(t: f32) -> vec3<f32> { 
    let a = vec3(0.5, 0.5, 0.5);
    let b = vec3(0.5, 0.5, 0.5);
    let c = vec3(1.0, 1.0, 1.0);
    let d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318*(c*t+d)); 
}


@fragment
fn main(input: FragmentInputs) -> @location(0) vec4<f32> {

    //let uv0 = (input.position.xy * 2.0 - uniforms.window_size.xy) / max(uniforms.window_size.x, uniforms.window_size.y);
    let uv0 = input.position.xy / uniforms.window_size.xy * 2.0 - 1.0 ;
    //let uv1 = vec2(uv0.x, uv0.y * uniforms.window_size.x / uniforms.window_size.y);
    let uv1 = vec2(uv0.x * uniforms.window_size.y / uniforms.window_size.x, uv0.y);

    let d0 = length(uv1);

    return vec4<f32>(0, d0, 0 , 1.0);
}