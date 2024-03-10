import { quadIndexArray, quadVertexArray } from './geometry.ts'
import { getPipeline } from './getPipeline.ts'
import { initialize } from './initialize.ts'
import { renderer } from './renderer.ts'
import { uniformBufferSize } from './uniform.ts'

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
      size: quadVertexArray.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    })

    new Float32Array(verticesBuffer.getMappedRange()).set(quadVertexArray)
    verticesBuffer.unmap()

    /**
     * Setting Index Buffer
     * --------------------------------------*/

    const indicesBuffer = GPU_DEVICE.createBuffer({
      size: quadIndexArray.byteLength,
      usage: GPUBufferUsage.INDEX,
      mappedAtCreation: true,
    })

    new Uint16Array(indicesBuffer.getMappedRange()).set(quadIndexArray)
    indicesBuffer.unmap()

    /**
     * Create Pipeline
     * --------------------------------------*/

    const pipeline = getPipeline({ GPU_DEVICE, presentationFormat })

    /**
     * Setting Uniform Buffer
     * --------------------------------------*/

    const uniformBuffer = GPU_DEVICE.createBuffer({
      size: uniformBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })

    /**
     * Uniform Bind Group
     * --------------------------------------*/

    const uniformBindGroup = GPU_DEVICE.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0, // @binding(0) in shader
          resource: {
            buffer: uniformBuffer,
          },
        },
      ],
    })

    /**
     * Start Animation
     * --------------------------------------*/

    const loop = () => {
      renderer({ context, pipeline, GPU_DEVICE, verticesBuffer, uniformBuffer, uniformBindGroup, indicesBuffer })
      requestAnimationFrame(loop)
    }
    loop()
  })
  .catch((error) => {
    console.error(error)
  })