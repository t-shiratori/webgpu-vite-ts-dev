/** 1つの値の容量 */
const bytes = 4

/** squareVertexArray内の各頂点ごとのスキップサイズ */
export const squareVertexSize = bytes * 2

/** squareVertexArray内の各頂点ごとのスキップサイズ */
export const squarePositionOffset = bytes * 0

/**
 * 座標データ
 */
// prettier-ignore
export const squareVertexArray = new Float32Array([
    // float4 position
    -1,  1,
    -1, -1,
     1, -1,
     1,  1,
  ]);

/** 頂点インデックス用のデータ */
export const squareIndexArray = new Uint16Array([0, 1, 2, 0, 2, 3]) // 4つの頂点のインデックス順を指定
