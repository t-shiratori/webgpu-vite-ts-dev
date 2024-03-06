import { getPipeline } from './getPipeline.ts'
import { initialize } from './initialize.ts'
import { renderer } from './renderer.ts'

initialize()
  .then((result) => {
    const { GPU_DEVICE, context } = result

    const presentationFormat = navigator.gpu.getPreferredCanvasFormat()

    context.configure({
      device: GPU_DEVICE,
      format: presentationFormat,
      alphaMode: 'opaque',
    })

    const pipeline = getPipeline({ GPU_DEVICE, presentationFormat })

    requestAnimationFrame(() => renderer({ context, pipeline, GPU_DEVICE }))
  })
  .catch((error) => {
    console.error(error)
  })
