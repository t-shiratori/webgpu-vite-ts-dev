const byteSize = 4 // 1つの値の容量
export const squareVertexSize = byteSize * 8 // squareVertexArray内の各頂点ごとのスキップサイズ、頂点座標とカラー値を合わせて8個
export const squarePositionOffset = byteSize * 0 // squareVertexArray内の頂点座標のオフセット位置
export const squareColorOffset = byteSize * 4 // squareVertexArray内のカラー値のオフセット位置

// prettier-ignore
export const squareVertexArray = new Float32Array([
    // float4 position[x, y], float4 color(r,g,b,a)
    -1,  1, 0, 1,  0, 1, 0, 1,
    -1, -1, 0, 1,  0, 0, 0, 1,
     1, -1, 0, 1,  1, 0, 0, 1,
     1,  1, 0, 1,  1, 1, 0, 1,
  ]);

export const squareIndexArray = new Uint16Array([0, 1, 2, 0, 2, 3])
