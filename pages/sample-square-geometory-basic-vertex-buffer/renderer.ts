import { squareVertexArray } from './geometry'

type TRenderArgs = {
  context: GPUCanvasContext
  pipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
  verticesBuffer: GPUBuffer
}

export const renderer = ({ context, pipeline, GPU_DEVICE, verticesBuffer }: TRenderArgs) => {
  const commandEncoder = GPU_DEVICE.createCommandEncoder()
  const textureView = context.getCurrentTexture().createView()

  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
      /**
       * fragment.wgsl　@location(0) に対応
       */
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
  passEncoder.draw(squareVertexArray.length / 2)
  passEncoder.end()
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
