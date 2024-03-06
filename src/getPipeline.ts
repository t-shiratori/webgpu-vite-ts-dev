import { vertWGSL, fragWGSL } from './shader.ts'
import { quadVertexSize, quadPositionOffset, quadColorOffset } from './geometry.ts'

type TGetPipelineArgs = {
  GPU_DEVICE: GPUDevice
  presentationFormat: GPUTextureFormat
}

export const getPipeline = ({ GPU_DEVICE, presentationFormat }: TGetPipelineArgs) => {
  return GPU_DEVICE.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module: GPU_DEVICE.createShaderModule({
        code: vertWGSL,
      }),
      entryPoint: 'main',
      buffers: [
        {
          arrayStride: quadVertexSize,
          attributes: [
            {
              // position
              shaderLocation: 0,
              offset: quadPositionOffset,
              format: 'float32x4',
            },
            {
              // color
              shaderLocation: 1,
              offset: quadColorOffset,
              format: 'float32x4',
            },
          ],
        },
      ],
    },
    fragment: {
      module: GPU_DEVICE.createShaderModule({
        code: fragWGSL,
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
