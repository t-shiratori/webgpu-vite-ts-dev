export const cubeVertexSize = 4 * 8 // Byte size of one vertex.
export const cubePositionOffset = 4 * 0
export const cubeColorOffset = 4 * 4 // Byte offset of cube vertex color attribute.
export const cubeVertexCount = 36

export const uniformBufferSize = 4 /* bytes */ * 16 * 3 // 4x4 matrix * 3

// prettier-ignore
export const cubeVertexArray = new Float32Array([
  // float4 position, float4 color
  1, -1, 1, 1,   1, 0, 1, 1,
  -1, -1, 1, 1,  0, 0, 1, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,
  1, -1, -1, 1,  1, 0, 0, 1,
	1, -1, 1, 1,   1, 0, 1, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,

  1, 1, 1, 1,    1, 1, 1, 1,
  1, -1, 1, 1,   1, 0, 1, 1,
  1, -1, -1, 1,  1, 0, 0, 1,
  1, 1, -1, 1,   1, 1, 0, 1,
  1, 1, 1, 1,    1, 1, 1, 1,
  1, -1, -1, 1,  1, 0, 0, 1,

  -1, 1, 1, 1,   0, 1, 1, 1,
  1, 1, 1, 1,    1, 1, 1, 1,
  1, 1, -1, 1,   1, 1, 0, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,
  -1, 1, 1, 1,   0, 1, 1, 1,
  1, 1, -1, 1,   1, 1, 0, 1,

  -1, -1, 1, 1,  0, 0, 1, 1,
  -1, 1, 1, 1,   0, 1, 1, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,
  -1, -1, 1, 1,  0, 0, 1, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,

  1, 1, 1, 1,    1, 1, 1, 1,
  -1, 1, 1, 1,   0, 1, 1, 1,
  -1, -1, 1, 1,  0, 0, 1, 1,
  -1, -1, 1, 1,  0, 0, 1, 1,
  1, -1, 1, 1,   1, 0, 1, 1,
  1, 1, 1, 1,    1, 1, 1, 1,

  1, -1, -1, 1,  1, 0, 0, 1,
  -1, -1, -1, 1, 0, 0, 0, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,
  1, 1, -1, 1,   1, 1, 0, 1,
  1, -1, -1, 1,  1, 0, 0, 1,
  -1, 1, -1, 1,  0, 1, 0, 1,
]);