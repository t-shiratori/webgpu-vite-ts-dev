import { squareIndexArray } from './geometry'
import { writeUniformBuffer } from './writeUniformBuffer'

type TRenderArgs = {
  GPU_CANVAS_CONTEXT: GPUCanvasContext
  pipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
  verticesBuffer: GPUBuffer
  uniformBuffer: GPUBuffer
  uniformBindGroup: GPUBindGroup
  indicesBuffer: GPUBuffer
}

export const render = ({
  GPU_CANVAS_CONTEXT,
  pipeline,
  GPU_DEVICE,
  verticesBuffer,
  uniformBuffer,
  uniformBindGroup,
  indicesBuffer,
}: TRenderArgs) => {
  const commandEncoder = GPU_DEVICE.createCommandEncoder()
  const textureView = GPU_CANVAS_CONTEXT.getCurrentTexture().createView()

  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
      // fragment.wgsl　fragmentMain関数の戻り値の @location(0) に対応
      {
        view: textureView,
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  }

  writeUniformBuffer({ uniformBuffer, GPU_DEVICE, GPU_CANVAS_CONTEXT })

  const renderPassEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
  renderPassEncoder.setPipeline(pipeline)
  renderPassEncoder.setBindGroup(0, uniformBindGroup) // fragment.wgsl の @group(0) に対応
  renderPassEncoder.setVertexBuffer(0, verticesBuffer) // vertex.wgsl vertexMain関数の @location(0) に対応
  renderPassEncoder.setIndexBuffer(indicesBuffer, 'uint16')
  renderPassEncoder.drawIndexed(squareIndexArray.length)
  renderPassEncoder.end()
  /**
   *
   */
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
