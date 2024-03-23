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
    const vertexBuferPositions = new Float32Array(verticesBuffer.getMappedRange())
    vertexBuferPositions.set(squareVertexArray)
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
    const indexBuferPositions = new Uint16Array(indicesBuffer.getMappedRange())
    indexBuferPositions.set(squareIndexArray)
    indicesBuffer.unmap()

    /**
     * Create BindGroupLayout
     */
    const bindGroupLayout = GPU_DEVICE.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.FRAGMENT,
          buffer: {},
        },
      ],
    })

    /**
     * Create Pipeline
     * --------------------------------------*/

    const pipeline = getPipeline({ GPU_DEVICE, CANVAS_FORMAT, bindGroupLayout })

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
      layout: bindGroupLayout,
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
