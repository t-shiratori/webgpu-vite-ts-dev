import { squareIndexArray } from './geometry'
import { writeUniformBuffer } from './writeUniformBuffer'

type TRenderArgs = {
  context: GPUCanvasContext
  pipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
  verticesBuffer: GPUBuffer
  uniformBuffer: GPUBuffer
  uniformBindGroup: GPUBindGroup
  indicesBuffer: GPUBuffer
}

export const renderer = ({
  context,
  pipeline,
  GPU_DEVICE,
  verticesBuffer,
  uniformBuffer,
  uniformBindGroup,
  indicesBuffer,
}: TRenderArgs) => {
  const commandEncoder = GPU_DEVICE.createCommandEncoder()
  const textureView = context.getCurrentTexture().createView()

  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  }

  writeUniformBuffer({ uniformBuffer, GPU_DEVICE, context })

  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
  passEncoder.setPipeline(pipeline)
  passEncoder.setBindGroup(0, uniformBindGroup)
  passEncoder.setVertexBuffer(0, verticesBuffer)
  passEncoder.setIndexBuffer(indicesBuffer, 'uint16')
  passEncoder.drawIndexed(squareIndexArray.length)
  passEncoder.end()
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
