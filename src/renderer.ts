import { quadIndexArray } from './geometry'

type TRenderArgs = {
  context: GPUCanvasContext
  pipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
  verticesBuffer: GPUBuffer
  indicesBuffer: GPUBuffer
}

export const renderer = ({ context, pipeline, GPU_DEVICE, verticesBuffer, indicesBuffer }: TRenderArgs) => {
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

  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
  passEncoder.setPipeline(pipeline)
  passEncoder.setVertexBuffer(0, verticesBuffer)
  passEncoder.setIndexBuffer(indicesBuffer, 'uint16')
  passEncoder.drawIndexed(quadIndexArray.length)
  passEncoder.end()
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
