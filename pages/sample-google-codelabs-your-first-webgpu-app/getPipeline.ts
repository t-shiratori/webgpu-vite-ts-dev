import { squareVertexSkipSize, squareVertexPositionSlotOffset } from './geometry.ts'
import vertexWGSL from './shader/vertex.wgsl?raw'
import fragmentWGSL from './shader/fragment.wgsl?raw'
import { WORKGROUP_SIZE } from './const.ts'

type TGetPipelineArgs = {
  GPU_DEVICE: GPUDevice
  CANVAS_FORMAT: GPUTextureFormat
  bindGroupLayout: GPUBindGroupLayout
}

export const getPipeline = ({ GPU_DEVICE, CANVAS_FORMAT, bindGroupLayout }: TGetPipelineArgs) => {
  const pipelineLayout = GPU_DEVICE.createPipelineLayout({
    label: 'Cell Pipeline Layout',
    bindGroupLayouts: [bindGroupLayout],
  })

  const cellRenderPipeline = GPU_DEVICE.createRenderPipeline({
    label: 'Cell pipline',
    layout: pipelineLayout,
    vertex: {
      module: GPU_DEVICE.createShaderModule({
        label: 'vertex shader',
        code: vertexWGSL,
      }),
      entryPoint: 'vertexMain',
      buffers: [
        {
          arrayStride: squareVertexSkipSize,
          attributes: [
            {
              shaderLocation: 0, // vertex.wgslのmain関数の@location(0)に対応
              offset: squareVertexPositionSlotOffset,
              format: 'float32x2', // 各頂点の座標データの容量に合わせたフォーマット。ここでは4byteが２つで一つの座標なので'float32x2'を指定。
            },
          ],
        },
      ],
    },
    fragment: {
      module: GPU_DEVICE.createShaderModule({
        label: 'fragment shader',
        code: fragmentWGSL,
      }),
      entryPoint: 'fragmentMain',
      targets: [
        {
          format: CANVAS_FORMAT,
        },
      ],
    },
  })

  // Create a compute pipeline that updates the game state.
  const simulationPipeline = GPU_DEVICE.createComputePipeline({
    label: 'Simulation pipeline',
    layout: pipelineLayout,
    compute: {
      module: GPU_DEVICE.createShaderModule({
        label: 'Game of Life simulation shader',
        code: `
          @group(0) @binding(0) var<uniform> grid: vec2f;

          @group(0) @binding(1) var<storage> cellStateIn: array<u32>;
          @group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;

          fn cellIndex(cell: vec2u) -> u32 {
            return (cell.y % u32(grid.y)) * u32(grid.x) + (cell.x % u32(grid.x));
          }

          fn cellActive(x: u32, y: u32) -> u32 {
            return cellStateIn[cellIndex(vec2(x, y))];
          }

          @compute @workgroup_size(${WORKGROUP_SIZE}, ${WORKGROUP_SIZE})
          fn computeMain(@builtin(global_invocation_id) cell: vec3u) {
            // Determine how many active neighbors this cell has.
            let activeNeighbors = cellActive(cell.x+1, cell.y+1) +
                                  cellActive(cell.x+1, cell.y) +
                                  cellActive(cell.x+1, cell.y-1) +
                                  cellActive(cell.x, cell.y-1) +
                                  cellActive(cell.x-1, cell.y-1) +
                                  cellActive(cell.x-1, cell.y) +
                                  cellActive(cell.x-1, cell.y+1) +
                                  cellActive(cell.x, cell.y+1);

            let i = cellIndex(cell.xy);

            // Conway's game of life rules:
            switch activeNeighbors {
              case 2: { // Active cells with 2 neighbors stay active.
                cellStateOut[i] = cellStateIn[i];
              }
              case 3: { // Cells with 3 neighbors become or stay active.
                cellStateOut[i] = 1;
              }
              default: { // Cells with < 2 or > 3 neighbors become inactive.
                cellStateOut[i] = 0;
              }
            }
          }
        `,
      }),
      entryPoint: 'computeMain',
    },
  })

  return {
    simulationPipeline,
    cellRenderPipeline,
  }
}
