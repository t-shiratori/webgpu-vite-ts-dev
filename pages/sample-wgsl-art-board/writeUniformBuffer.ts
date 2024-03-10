import { timeUniformOffset, uniformValues, windowSizeUniformOffset } from './uniform'

type TArgs = {
  uniformBuffer: GPUBuffer
  GPU_DEVICE: GPUDevice
  context: GPUCanvasContext
}

const start = Date.now()

export const writeUniformBuffer = ({ uniformBuffer, GPU_DEVICE, context }: TArgs) => {
  /**
   * Time
   * --------------------------------------*/

  const millis = (Date.now() - start) / 1000
  uniformValues.set([millis], timeUniformOffset)

  /**
   * Window Size
   * --------------------------------------*/
  const width = context.canvas.width
  const height = context.canvas.height
  uniformValues.set([width, height], windowSizeUniformOffset)

  //console.log(uniformValues)

  // copy the values from JavaScript to the GPU
  GPU_DEVICE.queue.writeBuffer(uniformBuffer, 0, uniformValues)
}
