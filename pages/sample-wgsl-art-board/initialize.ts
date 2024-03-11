export const initialize = async () => {
  const GPU_ADAPTER = await navigator.gpu.requestAdapter()
  const GPU_DEVICE = await GPU_ADAPTER!.requestDevice()
  const canvas: HTMLCanvasElement | null = document.querySelector('#world')
  const GPU_CANVAS_CONTEXT = canvas?.getContext('webgpu')

  if (!GPU_ADAPTER) {
    return Promise.reject(new Error('Could not find GPU adapter'))
  }

  if (!GPU_DEVICE) {
    return Promise.reject(new Error('Could not find GPU device'))
  }

  if (!GPU_CANVAS_CONTEXT) {
    return Promise.reject(new Error('Could not find GPU_CANVAS_CONTEXT'))
  }

  const reportWindowSize = () => {
    if (!canvas) return
    canvas.width = window.innerHeight
    canvas.height = window.innerWidth
  }
  window.onresize = reportWindowSize
  window.dispatchEvent(new Event('resize'))

  return {
    GPU_ADAPTER,
    GPU_DEVICE,
    GPU_CANVAS_CONTEXT,
  }
}
