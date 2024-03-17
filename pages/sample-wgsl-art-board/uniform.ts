/** 1つの値のメモリサイズ */
const bytesSize = 4

/** ユニフォームバッファのサイズ */
export const uniformBufferSize =
  bytesSize * 1 /** time */ + bytesSize * 1 /** スロット調整用 */ + bytesSize * 2 /** window_size（x,y） */

/** ユニフォームバッファのデータ */
export const uniformValues = new Float32Array(uniformBufferSize / 4)

/** uniformValues内の time データのオフセットの位置を指定 */
export const timeUniformOffset = 0

/** uniformValues内の screen_size データのオフセットの位置を指定 */
export const screenSizeUniformOffset = 2 // 1にするとwgslで受け取るときに位置がずれて意図した通りにならない
