/** 1つの値のメモリサイズ （Float32 = 32ビットデータ型　、 1btyte = 8bit、　32bit / 8 bit = 4btyte） */
const byteSize = 4
export const squareVertexSkipSize = byteSize * 2 // squareVertexArray内の各頂点ごとのスキップサイズ
export const squareVertexPositionSlotOffset = 0 // squareVertexArray内の頂点座標のオフセット位置

// prettier-ignore
export const squareVertexArray = new Float32Array([
    //   X,    Y,
    -0.8, -0.8, // Triangle 1
     0.8, -0.8,
     0.8,  0.8,

    -0.8, -0.8, // Triangle 2
     0.8,  0.8,
    -0.8,  0.8,
]);
