import { vertWGSL, fragWGSL } from './shader.ts'

const initialize = async () => {
  const GPU_ADAPTER = await navigator.gpu.requestAdapter()
  const GPU_DEVICE = await GPU_ADAPTER!.requestDevice()
  const canvas: HTMLCanvasElement | null = document.querySelector('#world')
  const context = canvas?.getContext('webgpu')

  if (!GPU_ADAPTER) {
    return Promise.reject(new Error('Could not find GPU adapter'))
  }

  if (!GPU_DEVICE) {
    return Promise.reject(new Error('Could not find GPU device'))
  }

  if (!context) {
    return Promise.reject(new Error('Could not find context'))
  }

  return {
    GPU_ADAPTER,
    GPU_DEVICE,
    context,
  }
}

type TRenderArgs = {
  context: GPUCanvasContext
  pipeline: GPURenderPipeline
  GPU_DEVICE: GPUDevice
}

const render = ({ context, pipeline, GPU_DEVICE }: TRenderArgs) => {
  const commandEncoder = GPU_DEVICE.createCommandEncoder()
  const textureView = context.getCurrentTexture().createView()

  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  }

  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
  passEncoder.setPipeline(pipeline)
  passEncoder.draw(3, 1, 0, 0)
  passEncoder.end()
  GPU_DEVICE.queue.submit([commandEncoder.finish()])
}

type TGetPipelineArgs = {
  GPU_DEVICE: GPUDevice
  presentationFormat: GPUTextureFormat
}

const getPipeline = ({ GPU_DEVICE, presentationFormat }: TGetPipelineArgs) => {
  return GPU_DEVICE.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module: GPU_DEVICE.createShaderModule({
        code: vertWGSL,
      }),
      entryPoint: 'main',
    },
    fragment: {
      module: GPU_DEVICE.createShaderModule({
        code: fragWGSL,
      }),
      entryPoint: 'main',
      targets: [
        {
          format: presentationFormat,
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
    },
  })
}

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

    requestAnimationFrame(() => render({ context, pipeline, GPU_DEVICE }))
  })
  .catch((error) => {
    console.error(error)
  })
