import { squareIndexArray, squareVertexArray } from './geometry.ts'
import { getPipeline } from './getPipeline.ts'
import { initialize } from './initialize.ts'
import { render } from './render.ts'

initialize()
  .then((result) => {
    const { GPU_DEVICE, GPU_CANVAS_CONTEXT, CANVAS_FORMAT } = result

    /**
     * Setting Vertex Buffer
     * --------------------------------------*/

    const verticesBuffer = GPU_DEVICE.createBuffer({
      size: squareVertexArray.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    })

    // Set data into buffer

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

    // Set data into buffer

    new Uint16Array(indicesBuffer.getMappedRange()).set(squareIndexArray)
    indicesBuffer.unmap()

    /**
     * Create Pipeline
     * --------------------------------------*/

    const pipeline = getPipeline({ GPU_DEVICE, CANVAS_FORMAT })

    /**
     * Start Animation
     * --------------------------------------*/
    const loop = () => {
      render({ GPU_CANVAS_CONTEXT, pipeline, GPU_DEVICE, verticesBuffer, indicesBuffer })
      requestAnimationFrame(loop)
    }
    loop()
  })
  .catch((error) => {
    console.error(error)
  })
