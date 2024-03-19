import { squareVertexArray } from './geometry.ts'
import { getPipeline } from './getPipeline.ts'
import { initialize } from './initialize.ts'
import { render } from './render.ts'
import { cellStateArray } from './storage.ts'
import { uniformArray } from './uniform.ts'

const UPDATE_INTERVAL = 200 // Update every 200ms (5 times/sec)

initialize()
  .then((result) => {
    const { GPU_DEVICE, GPU_CANVAS_CONTEXT, CANVAS_FORMAT } = result

    /**
     * Setting Vertex Buffer
     * --------------------------------------*/

    const verticesBuffer = GPU_DEVICE.createBuffer({
      size: squareVertexArray.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    })

    GPU_DEVICE.queue.writeBuffer(verticesBuffer, 0, squareVertexArray)

    /**
     * Setting Uniform Buffer
     * --------------------------------------*/

    const uniformBuffer = GPU_DEVICE.createBuffer({
      label: 'Grid Uniforms',
      size: uniformArray.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    GPU_DEVICE.queue.writeBuffer(uniformBuffer, 0, uniformArray)

    /**
     * Setting Storage Buffer
     */
    // Create two storage buffers to hold the cell state.
    const cellStateStorage = [
      GPU_DEVICE.createBuffer({
        label: 'Cell State A',
        size: cellStateArray.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      }),
      GPU_DEVICE.createBuffer({
        label: 'Cell State B',
        size: cellStateArray.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      }),
    ]

    // Set each cell to a random state, then copy the JavaScript array into
    // the storage buffer.
    for (let i = 0; i < cellStateArray.length; ++i) {
      cellStateArray[i] = Math.random() > 0.6 ? 1 : 0
    }
    GPU_DEVICE.queue.writeBuffer(cellStateStorage[0], 0, cellStateArray)

    /**
     * Create BindGroupLayout
     */

    // Create the bind group layout and pipeline layout.
    const bindGroupLayout = GPU_DEVICE.createBindGroupLayout({
      label: 'Cell Bind Group Layout',
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE,
          buffer: {}, // Grid uniform buffer
        },
        {
          binding: 1,
          visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE,
          buffer: { type: 'read-only-storage' }, // Cell state input buffer
        },
        {
          binding: 2,
          visibility: GPUShaderStage.COMPUTE,
          buffer: { type: 'storage' }, // Cell state output buffer
        },
      ],
    })

    /**
     * Setting BindGroup (for uniform and storage)
     * --------------------------------------*/
    const bindGroups = [
      GPU_DEVICE.createBindGroup({
        label: 'Cell renderer bind group A',
        layout: bindGroupLayout,
        entries: [
          {
            binding: 0,
            resource: { buffer: uniformBuffer },
          },
          {
            binding: 1,
            resource: { buffer: cellStateStorage[0] },
          },
          {
            binding: 2,
            resource: { buffer: cellStateStorage[1] },
          },
        ],
      }),
      GPU_DEVICE.createBindGroup({
        label: 'Cell renderer bind group B',
        layout: bindGroupLayout,
        entries: [
          {
            binding: 0,
            resource: { buffer: uniformBuffer },
          },
          {
            binding: 1,
            resource: { buffer: cellStateStorage[1] },
          },
          {
            binding: 2,
            resource: { buffer: cellStateStorage[0] },
          },
        ],
      }),
    ]

    /**
     * Create Pipeline
     * --------------------------------------*/

    const { simulationPipeline, cellRenderPipeline } = getPipeline({ GPU_DEVICE, CANVAS_FORMAT, bindGroupLayout })

    /**
     * Start Animation
     * --------------------------------------*/
    const loop = () => {
      render({ GPU_CANVAS_CONTEXT, simulationPipeline, cellRenderPipeline, GPU_DEVICE, verticesBuffer, bindGroups })
    }
    setInterval(loop, UPDATE_INTERVAL)
  })
  .catch((error) => {
    console.error(error)
  })
