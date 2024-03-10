import { squareIndexArray, squareVertexArray } from './geometry.ts'
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
     * Setting Index Buffer
     * --------------------------------------*/

    const indicesBuffer = GPU_DEVICE.createBuffer({
      size: squareIndexArray.byteLength,
      usage: GPUBufferUsage.INDEX,
      mappedAtCreation: true,
    })

    new Uint16Array(indicesBuffer.getMappedRange()).set(squareIndexArray)
    indicesBuffer.unmap()

    /**
     * Create Pipeline
     * --------------------------------------*/

    const pipeline = getPipeline({ GPU_DEVICE, presentationFormat })

    /**
     * Start Animation
     * --------------------------------------*/
    const loop = () => {
      renderer({ context, pipeline, GPU_DEVICE, verticesBuffer, indicesBuffer })
      requestAnimationFrame(loop)
    }
    loop()
  })
  .catch((error) => {
    console.error(error)
  })
