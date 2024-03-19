struct FragInput {
  @location(0) cell: vec2f,
};

@fragment
fn fragmentMain(input: FragInput) -> @location(0) vec4f {
  return vec4f(input.cell, 1.0 - input.cell.x, 1);
}