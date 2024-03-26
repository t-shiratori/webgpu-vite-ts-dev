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
    return Promise.reject(new Error('Could not find GPU canvas context'))
  }

  /**
   * コンテキストの設定
   */

  const CANVAS_FORMAT = navigator.gpu.getPreferredCanvasFormat()

  GPU_CANVAS_CONTEXT.configure({
    device: GPU_DEVICE,
    format: CANVAS_FORMAT,
    alphaMode: 'opaque',
  })

  /**
   * リサイズ処理
   */

  const scale = window.devicePixelRatio

  const reportWindowSize = () => {
    if (!canvas) return
    canvas.width = Math.floor(window.innerHeight * scale)
    canvas.height = Math.floor(window.innerWidth * scale)
  }

  window.onresize = reportWindowSize
  window.dispatchEvent(new Event('resize'))

  return {
    GPU_ADAPTER,
    GPU_DEVICE,
    GPU_CANVAS_CONTEXT,
    CANVAS_FORMAT,
  }
}
