import { cubeVertexCount } from './geometry'
import { getTransformationMatrix } from './getTransformationMatrix'

type TRenderArgs = {
  context: GPUCanvasContext
  pipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
  verticesBuffer: GPUBuffer
  uniformBuffer: GPUBuffer
  uniformBindGroup: GPUBindGroup
}

export const renderer = ({
  context,
  pipeline,
  GPU_DEVICE,
  verticesBuffer,
  uniformBuffer,
  uniformBindGroup,
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

  getTransformationMatrix({ uniformBuffer, GPU_DEVICE })

  //console.log({ uniformBuffer })

  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
  passEncoder.setPipeline(pipeline)
  passEncoder.setBindGroup(0, uniformBindGroup)
  passEncoder.setVertexBuffer(0, verticesBuffer)
  passEncoder.draw(cubeVertexCount)
  passEncoder.end()
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
