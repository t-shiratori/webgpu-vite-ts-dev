const byteSize = 4
export const squareVertexSkipSize = byteSize * 2 // 各頂点ごとのスキップサイズ
export const squareVertexPositionSlotOffset = 0

// prettier-ignore
export const squareVertexArray = new Float32Array([
    //   X,    Y,
    -0.8, -0.8, // Triangle 1 (Blue)
     0.8, -0.8,
     0.8,  0.8,

    -0.8, -0.8, // Triangle 2 (Red)
     0.8,  0.8,
    -0.8,  0.8,
]);
