/** 1つの値の容量 */
const bytes = 4

/** ユニフォームバッファのサイズ */
export const uniformBufferSize =
  bytes * 1 /** time */ + bytes * 1 /** スロット調整用 */ + bytes * 2 /** window_size（x,y） */

/** ユニフォームバッファのデータ */
export const uniformValues = new Float32Array(uniformBufferSize / 4)

/** uniformValues内の time データのオフセットの位置を指定 */
export const timeUniformOffset = 0

/** uniformValues内の screen_size データのオフセットの位置を指定 */
export const screenSizeUniformOffset = 2 // 1にするとwgslで受け取るときに位置がずれて意図した通りにならない
