struct VertexInput {
  @location(0) position: vec2f,
  @builtin(instance_index) instance: u32,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) cell: vec2f
};

@group(0) @binding(0) var<uniform> grid: vec2f;
@group(0) @binding(1) var<storage> cellState: array<u32>;

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {

  let i = f32(input.instance);
  let cell = vec2f(i % grid.x, floor(i / grid.x));
  let scale = f32(cellState[input.instance]); 
  let cellOffset = cell / grid * 2; // Updated
  let gridPos = (input.position * scale + 1) / grid - 1 + cellOffset;

  var output: VertexOutput;
  output.position = vec4f(gridPos, 0, 1);
  output.cell = cell / grid;
  return output;
}