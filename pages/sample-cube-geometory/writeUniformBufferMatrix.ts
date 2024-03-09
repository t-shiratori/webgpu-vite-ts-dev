import { mat4 } from 'wgpu-matrix'

type TArgs = {
  uniformBuffer: GPUBuffer
  GPU_DEVICE: GPUDevice
  context: GPUCanvasContext
}

export const writeUniformBufferMatrix = ({ uniformBuffer, GPU_DEVICE, context }: TArgs) => {
  /**
   * Perspective
   * --------------------------------------*/
  const width = context.canvas.width
  const height = context.canvas.height
  const fov = (60 * Math.PI) / 180
  const aspect = width / height
  const near = 0.1
  const far = 1000
  const perspective = mat4.perspective(fov, aspect, near, far) as Float32Array
  GPU_DEVICE.queue.writeBuffer(
    uniformBuffer,
    4 * 16 * 0,
    perspective.buffer,
    perspective.byteOffset,
    perspective.byteLength,
  )

  /**
   * View
   * --------------------------------------*/
  const eye = [0, 0, -5]
  const target = [0, 0, 0]
  const up = [0, 1, 0]
  const view = mat4.lookAt(eye, target, up) as Float32Array
  GPU_DEVICE.queue.writeBuffer(uniformBuffer, 4 * 16 * 1, view.buffer, view.byteOffset, view.byteLength)

  /**
   * Model
   * --------------------------------------*/
  const now = Date.now() / 1000
  const model = mat4.identity() as Float32Array
  mat4.rotateX(model, Math.sin(now), model)
  mat4.rotateY(model, Math.cos(now), model)
  GPU_DEVICE.queue.writeBuffer(uniformBuffer, 4 * 16 * 2, model.buffer, model.byteOffset, model.byteLength)
}
