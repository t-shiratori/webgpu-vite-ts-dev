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
  /** Update uniform buffer */
  writeUniformBuffer({ uniformBuffer, GPU_DEVICE, GPU_CANVAS_CONTEXT })

  /** GPUに発行されるコマンドをエンコードするためのエンコーダーを作成 */
  const commandEncoder = GPU_DEVICE.createCommandEncoder()

  /**
   * レンダリングパスを作成し、レンダリングに関する処理の実行コマンドを記録しレンダリングパスを終了する
   */
  const renderPassEncoder = commandEncoder.beginRenderPass({
    colorAttachments: [
      // fragment.wgsl　fragmentMain関数の戻り値の @location(0) に対応
      {
        view: GPU_CANVAS_CONTEXT.getCurrentTexture().createView(),
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  })
  renderPassEncoder.setPipeline(pipeline)
  renderPassEncoder.setBindGroup(0, uniformBindGroup) // fragment.wgsl の @group(0) に対応
  renderPassEncoder.setVertexBuffer(0, verticesBuffer) // vertex.wgsl vertexMain関数の @location(0) に対応
  renderPassEncoder.setIndexBuffer(indicesBuffer, 'uint16')
  renderPassEncoder.drawIndexed(squareIndexArray.length)
  renderPassEncoder.end()

  /**
   * レンダリングパスによって記録されたコマンドをコマンドバッファでラップしてGPUに送信する
   */
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
