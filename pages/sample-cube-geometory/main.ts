import { cubeVertexArray, uniformBufferSize } from './geometry.ts'
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
      size: cubeVertexArray.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    })

    // バッファにデータをセットする
    new Float32Array(verticesBuffer.getMappedRange()).set(cubeVertexArray)
    verticesBuffer.unmap()

    /**
     * Setting Uniform Buffer
     * --------------------------------------*/

    const uniformBuffer = GPU_DEVICE.createBuffer({
      size: uniformBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })

    /**
     * Create Pipeline
     * --------------------------------------*/

    const pipeline = getPipeline({ GPU_DEVICE, CANVAS_FORMAT })

    /**
     * Uniform Bind Group
     * --------------------------------------*/

    const uniformBindGroup = GPU_DEVICE.createBindGroup({
      layout: pipeline.getBindGroupLayout(0), // vertex.wgsl の @group(0) に対応
      entries: [
        {
          binding: 0, // vertex.wgsl の @binding(0) に対応
          resource: {
            buffer: uniformBuffer,
          },
        },
      ],
    })

    /**
     * 深度バッファ
     */
    const depthTexture = GPU_DEVICE.createTexture({
      size: [GPU_CANVAS_CONTEXT.canvas.width, GPU_CANVAS_CONTEXT.canvas.height],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
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
        depthTexture,
      })
      requestAnimationFrame(loop)
    }
    loop()
  })
  .catch((error) => {
    console.error(error)
  })
