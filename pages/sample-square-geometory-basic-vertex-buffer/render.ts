import { squareVertexArray } from './geometry'

type TRenderArgs = {
  GPU_CANVAS_CONTEXT: GPUCanvasContext
  pipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
  verticesBuffer: GPUBuffer
}

export const render = ({ GPU_CANVAS_CONTEXT, pipeline, GPU_DEVICE, verticesBuffer }: TRenderArgs) => {
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

  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
  passEncoder.setPipeline(pipeline)
  passEncoder.setVertexBuffer(0, verticesBuffer) // vertex.wgsl vertexMain関数の @location(0)　に対応
  passEncoder.draw(squareVertexArray.length / 2)
  passEncoder.end()
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
