const bytes = 4 // 1つの値の容量

export const squareVertexSize = bytes * 2 // squareVertexArray内の各頂点ごとのスキップサイズ
export const squarePositionOffset = bytes * 0 // squareVertexArray内の各頂点ごとのスキップサイズ

// prettier-ignore
export const squareVertexArray = new Float32Array([
    // float4 position
    -1,  1,
    -1, -1,
     1, -1,
     1,  1,
  ]);

export const squareIndexArray = new Uint16Array([0, 1, 2, 0, 2, 3]) // 4つの頂点のインデックス順を指定
