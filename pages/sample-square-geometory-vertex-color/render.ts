import { squareIndexArray } from './geometry'

type TRenderArgs = {
  GPU_CANVAS_CONTEXT: GPUCanvasContext
  pipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
  verticesBuffer: GPUBuffer
  indicesBuffer: GPUBuffer
}

export const render = ({ GPU_CANVAS_CONTEXT, pipeline, GPU_DEVICE, verticesBuffer, indicesBuffer }: TRenderArgs) => {
  const commandEncoder = GPU_DEVICE.createCommandEncoder()
  const textureView = GPU_CANVAS_CONTEXT.getCurrentTexture().createView()

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
  passEncoder.drawIndexed(squareIndexArray.length)
  passEncoder.end()
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
