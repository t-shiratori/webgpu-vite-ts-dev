import { cubeVertexCount } from './geometry'
import { writeUniformBufferMatrix } from './writeUniformBufferMatrix'

type TRenderArgs = {
  GPU_CANVAS_CONTEXT: GPUCanvasContext
  pipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
  verticesBuffer: GPUBuffer
  uniformBuffer: GPUBuffer
  uniformBindGroup: GPUBindGroup
  depthTexture: GPUTexture
}

export const render = ({
  GPU_CANVAS_CONTEXT,
  pipeline,
  GPU_DEVICE,
  verticesBuffer,
  uniformBuffer,
  uniformBindGroup,
  depthTexture,
}: TRenderArgs) => {
  const commandEncoder = GPU_DEVICE.createCommandEncoder()
  const textureView = GPU_CANVAS_CONTEXT.getCurrentTexture().createView()

  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
      // fragment.wgsl　main関数の戻り値の @location(0) に対応
      {
        view: textureView,
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
    depthStencilAttachment: {
      view: depthTexture.createView(),
      depthClearValue: 1.0,
      depthLoadOp: 'clear',
      depthStoreOp: 'store',
    },
  }

  writeUniformBufferMatrix({ uniformBuffer, GPU_DEVICE, GPU_CANVAS_CONTEXT })

  const renderPassEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
  renderPassEncoder.setPipeline(pipeline)
  renderPassEncoder.setBindGroup(0, uniformBindGroup) // vertex.wgsl の @group(0) に対応
  renderPassEncoder.setVertexBuffer(0, verticesBuffer) // vertex.wgsl main関数の @location(0) に対応
  renderPassEncoder.draw(cubeVertexCount)
  renderPassEncoder.end()
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
