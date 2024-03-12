import vertexWGSL from './shader/vertex.wgsl?raw'
import fragmentWGSL from './shader/fragment.wgsl?raw'
import { squarePositionOffset, squareVertexSize } from './geometry'

type TGetPipelineArgs = {
  GPU_DEVICE: GPUDevice
  CANVAS_FORMAT: GPUTextureFormat
}

export const getPipeline = ({ GPU_DEVICE, CANVAS_FORMAT }: TGetPipelineArgs) => {
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
          arrayStride: squareVertexSize,
          attributes: [
            {
              // position
              shaderLocation: 0, // vertex.wgsl vertexMain関数の @location(0) に対応
              offset: squarePositionOffset,
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
}
