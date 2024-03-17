/** 1つの値のメモリサイズ */
const byteSize = 4

/** squareVertexArray内の各頂点ごとのスキップサイズ */
export const squareVertexSize = byteSize * 2

/** squareVertexArray内の各頂点データのオフセットの位置 */
export const squarePositionOffset = 0

/**
 * 座標データ
 */
// prettier-ignore
export const squareVertexArray = new Float32Array([
    // position[x, y]
    -1,  1,
    -1, -1,
     1, -1,
     1,  1,
  ]);

/**
 * 頂点インデックス用のデータ
 * 4つの頂点のインデックス順を指定
 */
export const squareIndexArray = new Uint16Array([0, 1, 2, 0, 2, 3])
