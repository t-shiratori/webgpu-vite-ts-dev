import vertexWGSL from './shader/vertex.wgsl?raw'
import fragmentWGSL from './shader/fragment.wgsl?raw'
import { squarePositionOffset, squareVertexSize } from './geometry'

type TGetPipelineArgs = {
  GPU_DEVICE: GPUDevice
  contextFormat: GPUTextureFormat
}

export const getPipeline = ({ GPU_DEVICE, contextFormat }: TGetPipelineArgs) => {
  return GPU_DEVICE.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module: GPU_DEVICE.createShaderModule({
        label: 'vertex shader',
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
              format: 'float32x2',
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
      entryPoint: 'main',
      targets: [
        {
          format: contextFormat,
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
    },
  })
}
