import { squareIndexArray, squareVertexArray } from './geometry.ts'
import { getPipeline } from './getPipeline.ts'
import { initialize } from './initialize.ts'
import { render } from './render.ts'
import { uniformBufferSize } from './uniform.ts'

initialize()
  .then((result) => {
    const { GPU_DEVICE, GPU_CANVAS_CONTEXT, CANVAS_FORMAT } = result

    /**
     * Setting Vertex Buffer
     * --------------------------------------*/

    const verticesBuffer = GPU_DEVICE.createBuffer({
      label: 'verticesBuffer',
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
      label: 'indicesBuffer',
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
     * Setting Uniform Buffer
     * --------------------------------------*/

    const uniformBuffer = GPU_DEVICE.createBuffer({
      label: 'uniformBuffer',
      size: uniformBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })

    /**
     * Uniform Bind Group
     * --------------------------------------*/

    const uniformBindGroup = GPU_DEVICE.createBindGroup({
      layout: pipeline.getBindGroupLayout(0), // fragment.wgsl の @group(0) に対応
      entries: [
        {
          binding: 0, // fragment.wgslの @group(0) @binding(0) に対応
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
      render({
        GPU_CANVAS_CONTEXT,
        pipeline,
        GPU_DEVICE,
        verticesBuffer,
        uniformBuffer,
        uniformBindGroup,
        indicesBuffer,
      })
      requestAnimationFrame(loop)
    }
    loop()
  })
  .catch((error) => {
    console.error(error)
  })
