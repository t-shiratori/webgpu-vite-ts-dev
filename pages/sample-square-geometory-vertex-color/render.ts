import { squareIndexArray } from './geometry'

type TRenderArgs = {
  GPU_CANVAS_CONTEXT: GPUCanvasContext
  pipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
  verticesBuffer: GPUBuffer
  indicesBuffer: GPUBuffer
}

export const render = ({ GPU_CANVAS_CONTEXT, pipeline, GPU_DEVICE, verticesBuffer, indicesBuffer }: TRenderArgs) => {
  /**
   * レンダリングパスを作成し、レンダリングに関する処理の実行コマンドを記録しレンダリングパスを終了
   */
  const commandEncoder = GPU_DEVICE.createCommandEncoder()
  const renderPassEncoder = commandEncoder.beginRenderPass({
    colorAttachments: [
      // fragment.wgsl　main関数の戻り値の @location(0) に対応
      {
        view: GPU_CANVAS_CONTEXT.getCurrentTexture().createView(),
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  })
  renderPassEncoder.setPipeline(pipeline)
  renderPassEncoder.setVertexBuffer(0, verticesBuffer) // vertex.wgsl main関数の @location(0) に対応
  renderPassEncoder.setIndexBuffer(indicesBuffer, 'uint16')
  renderPassEncoder.drawIndexed(squareIndexArray.length)
  renderPassEncoder.end()

  /**
   * レンダリングパスによって記録されたコマンドをコマンドバッファでラップしてGPUに送信
   */
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
