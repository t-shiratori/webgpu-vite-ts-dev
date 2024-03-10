struct Uniforms {
    time: f32,
    window_size: vec2<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;



struct FragmentInputs {
    @location(0) fragColor: vec4<f32>,
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

    //let uv = (input.position.xy * 2.0 - uniforms.window_size.xy) / min(uniforms.window_size.x, uniforms.window_size.y);
    let uv0 = input.position.xy / uniforms.window_size.xy * 2.0 - 1.0 ;
    let uv1 = vec2(uv0.x, uv0.y * uniforms.window_size.x / uniforms.window_size.y);

    let uv2 = fract(uv1);

    

    let d0 = length(uv2);


    let col0 = palette2(d0 + uniforms.time);


    let d1 = sin(d0 * 8 + uniforms.time) / 8;
    let d2 = abs(d1);
    let d3 = 0.02 / d2;

    let col1 = col0 * d3;


    return vec4<f32>(col1, 1.0);
}