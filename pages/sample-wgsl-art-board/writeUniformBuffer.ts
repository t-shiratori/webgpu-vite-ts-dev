import { timeUniformOffset, uniformValues, screenSizeUniformOffset } from './uniform'

const startTime = Date.now()

type TArgs = {
  uniformBuffer: GPUBuffer
  GPU_DEVICE: GPUDevice
  GPU_CANVAS_CONTEXT: GPUCanvasContext
}

export const writeUniformBuffer = ({ uniformBuffer, GPU_DEVICE, GPU_CANVAS_CONTEXT }: TArgs) => {
  /**
   * Set time into uniformValues
   * --------------------------------------*/

  const millis = (Date.now() - startTime) / 1000
  uniformValues.set([millis], timeUniformOffset)

  /**
   * Set Screen Size into the uniformValues
   * --------------------------------------*/
  const width = GPU_CANVAS_CONTEXT.canvas.width
  const height = GPU_CANVAS_CONTEXT.canvas.height
  uniformValues.set([width, height], screenSizeUniformOffset)

  // Write data into the buffer
  GPU_DEVICE.queue.writeBuffer(uniformBuffer, 0, uniformValues)
}
