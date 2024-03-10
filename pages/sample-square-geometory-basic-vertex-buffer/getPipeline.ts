import { squareVertexSkipSize, squareVertexPositionSlotOffset } from './geometry.ts'
import vertexWGSL from './shader/vertex.wgsl?raw'
import fragmentWGSL from './shader/fragment.wgsl?raw'

type TGetPipelineArgs = {
  GPU_DEVICE: GPUDevice
  canvasFormat: GPUTextureFormat
}

export const getPipeline = ({ GPU_DEVICE, canvasFormat }: TGetPipelineArgs) => {
  return GPU_DEVICE.createRenderPipeline({
    layout: 'auto',
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
          format: canvasFormat,
        },
      ],
    },
  })
}
