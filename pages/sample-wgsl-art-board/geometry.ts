const bytes = 4

export const quadVertexSize = bytes * 8 // Byte size of a vertex.
export const quadPositionOffset = bytes * 0 // Byte offset of quad vertex position attribute.
export const quadColorOffset = bytes * 4 // Byte offset of quad vertex color attribute.
export const quadVertexCount = 4 // Number of vertices in the quad.

// prettier-ignore
export const quadVertexArray = new Float32Array([
    // float4 position, float4 color
    -1,  1, 0, 1,  0, 1, 0, 1,
    -1, -1, 0, 1,  0, 0, 0, 1,
     1, -1, 0, 1,  1, 0, 0, 1,
     1,  1, 0, 1,  1, 1, 0, 1,
  ]);

export const quadIndexArray = new Uint16Array([0, 1, 2, 0, 2, 3])