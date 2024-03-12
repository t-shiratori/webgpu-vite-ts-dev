import { squareVertexSize, squarePositionOffset, squareColorOffset } from './geometry.ts'
import vertexWGSL from './shader/vertex.wgsl?raw'
import fragmentWGSL from './shader/fragment.wgsl?raw'

type TGetPipelineArgs = {
  GPU_DEVICE: GPUDevice
  CANVAS_FORMAT: GPUTextureFormat
}

export const getPipeline = ({ GPU_DEVICE, CANVAS_FORMAT }: TGetPipelineArgs) => {
  return GPU_DEVICE.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module: GPU_DEVICE.createShaderModule({
        code: vertexWGSL,
      }),
      entryPoint: 'main',
      buffers: [
        {
          arrayStride: squareVertexSize,
          attributes: [
            {
              // position
              shaderLocation: 0, // vertex.wgslのmain関数の@location(0)に対応
              offset: squarePositionOffset,
              format: 'float32x4', // 各頂点の座標データの容量に合わせたフォーマット。ここでは4byteが4つで一つの座標なので'float32x4'を指定。
            },
            {
              // color
              shaderLocation: 1, // vertex.wgslのmain関数の@location(1)に対応
              offset: squareColorOffset,
              format: 'float32x4', // 各頂点のカラーデータの容量に合わせたフォーマット。ここでは4byteが4つで一つのカラー値なので'float32x4'を指定。
            },
          ],
        },
      ],
    },
    fragment: {
      module: GPU_DEVICE.createShaderModule({
        code: fragmentWGSL,
      }),
      entryPoint: 'main',
      targets: [
        {
          format: CANVAS_FORMAT,
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
    },
  })
}
