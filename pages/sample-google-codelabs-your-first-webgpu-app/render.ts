import { GRID_SIZE, WORKGROUP_SIZE } from './const'
import { squareVertexArray } from './geometry'

let step = 0 // Track how many simulation steps have been run

type TRenderArgs = {
  GPU_CANVAS_CONTEXT: GPUCanvasContext
  simulationPipeline: GPUComputePipeline
  cellRenderPipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
  verticesBuffer: GPUBuffer
  bindGroups: GPUBindGroup[]
}

export const render = ({
  GPU_CANVAS_CONTEXT,
  simulationPipeline,
  cellRenderPipeline,
  GPU_DEVICE,
  verticesBuffer,
  bindGroups,
}: TRenderArgs) => {
  // In updateGrid()
  // Move the encoder creation to the top of the function.

  /** GPUに発行されるコマンドをエンコードするためのエンコーダーを作成 */
  const commandEncoder = GPU_DEVICE.createCommandEncoder()

  /**
   * コンピューティング用のパスを作成し、実行コマンドを記録しレンダリングパスを終了します。
   */
  const computePass = commandEncoder.beginComputePass()
  // Compute work will go here...
  computePass.setPipeline(simulationPipeline)
  computePass.setBindGroup(0, bindGroups[step % 2])
  const workgroupCount = Math.ceil(GRID_SIZE / WORKGROUP_SIZE)
  computePass.dispatchWorkgroups(workgroupCount, workgroupCount)
  computePass.end()

  step += 1 // Increment the step count

  // Start a render pass...

  /**
   * レンダリングパスを作成し、レンダリングに関する処理の実行コマンドを記録しレンダリングパスを終了します。
   *
   * {@link https://codelabs.developers.google.com/your-first-webgpu-app?hl=ja#2}
   * WebGPU APIのGPURenderPassEncoderインターフェイスは、
   * GPURenderPipelineによって発行された、頂点とフラグメントシェーダステージの制御に関連するコマンドをエンコードします。
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
  renderPassEncoder.setPipeline(cellRenderPipeline)
  renderPassEncoder.setBindGroup(0, bindGroups[step % 2])
  renderPassEncoder.setVertexBuffer(0, verticesBuffer) // vertex.wgsl vertexMain関数の @location(0)　に対応
  renderPassEncoder.draw(squareVertexArray.length / 2, GRID_SIZE * GRID_SIZE)
  renderPassEncoder.end()

  /**
   * レンダリングパスによって記録されたコマンドをコマンドバッファでラップしてGPUに送信します。
   *
   * {@link https://codelabs.developers.google.com/your-first-webgpu-app?hl=ja#2}
   * コマンドエンコーダに対して finish() を呼び出して、GPUCommandBuffer を作成します。
   * コマンドバッファは、記録されたコマンドをラップして詳細を隠すためのハンドルです。
   * GPUDevice の queue を使用して、GPU にコマンドバッファを送信します。
   * キューにより、すべてのGPUコマンドが順番どおり、かつ適切に同期をとりながら実行されます。
   * キューの submit() メソッドはコマンドバッファの配列を受け取りますが、
   * ここでは1つのコマンドバッファのみを渡します。
   */
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}
