import { squareVertexArray } from './geometry.ts'
import { getPipeline } from './getPipeline.ts'
import { initialize } from './initialize.ts'
import { render } from './render.ts'

initialize()
  .then((result) => {
    const { GPU_DEVICE, context } = result

    const canvasFormat = navigator.gpu.getPreferredCanvasFormat()

    context.configure({
      device: GPU_DEVICE,
      format: canvasFormat,
      alphaMode: 'opaque',
    })

    /**
     * Setting Vertex Buffer
     * --------------------------------------*/

    const verticesBuffer = GPU_DEVICE.createBuffer({
      size: squareVertexArray.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    })

    new Float32Array(verticesBuffer.getMappedRange()).set(squareVertexArray)
    verticesBuffer.unmap()

    /**
     * Create Pipeline
     * --------------------------------------*/

    const pipeline = getPipeline({ GPU_DEVICE, canvasFormat })

    /**
     * Start Animation
     * --------------------------------------*/
    const loop = () => {
      render({ context, pipeline, GPU_DEVICE, verticesBuffer })
      requestAnimationFrame(loop)
    }
    loop()
  })
  .catch((error) => {
    console.error(error)
  })
