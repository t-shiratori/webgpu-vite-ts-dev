import { vertWGSL, fragWGSL } from './shader.ts'

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
