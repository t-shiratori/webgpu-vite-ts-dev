const byteSize = 4
export const squareVertexSize = byteSize * 8 // Byte size of a vertex.
export const squarePositionOffset = byteSize * 0 // Byte offset of square vertex position attribute.
export const squareColorOffset = byteSize * 4 // Byte offset of square vertex color attribute.
export const squareVertexCount = 4 // Number of vertices in the square.

// prettier-ignore
export const squareVertexArray = new Float32Array([
    // float4 position, float4 color
    -1,  1, 0, 1,  0, 1, 0, 1,
    -1, -1, 0, 1,  0, 0, 0, 1,
     1, -1, 0, 1,  1, 0, 0, 1,
     1,  1, 0, 1,  1, 1, 0, 1,
  ]);

export const squareIndexArray = new Uint16Array([0, 1, 2, 0, 2, 3])
