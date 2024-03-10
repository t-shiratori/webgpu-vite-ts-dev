import { squareVertexSize, squarePositionOffset, squareColorOffset } from './geometry.ts'
import vertexWGSL from './shader/vertex.wgsl?raw'
import fragmentWGSL from './shader/fragment.wgsl?raw'

type TGetPipelineArgs = {
  GPU_DEVICE: GPUDevice
  presentationFormat: GPUTextureFormat
}

export const getPipeline = ({ GPU_DEVICE, presentationFormat }: TGetPipelineArgs) => {
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
              shaderLocation: 0,
              offset: squarePositionOffset,
              format: 'float32x4',
            },
            {
              // color
              shaderLocation: 1,
              offset: squareColorOffset,
              format: 'float32x4',
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
          format: presentationFormat,
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
    },
  })
}
