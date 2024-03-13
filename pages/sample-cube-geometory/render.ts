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
  /** ユニフォームバッファのデータを更新 */
  writeUniformBufferMatrix({ uniformBuffer, GPU_DEVICE, GPU_CANVAS_CONTEXT })

  /** GPUに発行されるコマンドをエンコードするためのエンコーダーを作成 */
  const commandEncoder = GPU_DEVICE.createCommandEncoder()

  /**
   * レンダリングパスを作成し、レンダリングに関する処理の実行コマンドを記録しレンダリングパスを終了する
   */
  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
      // fragment.wgsl　main関数の戻り値の @location(0) に対応
      {
        view: GPU_CANVAS_CONTEXT.getCurrentTexture().createView(),
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
  const renderPassEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
  renderPassEncoder.setPipeline(pipeline)
  renderPassEncoder.setBindGroup(0, uniformBindGroup) // vertex.wgsl の @group(0) に対応
  renderPassEncoder.setVertexBuffer(0, verticesBuffer) // vertex.wgsl main関数の @location(0) に対応
  renderPassEncoder.draw(cubeVertexCount)
  renderPassEncoder.end()

  /**
   * レンダリングパスによって記録されたコマンドをコマンドバッファでラップしてGPUに送信する
   */
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
