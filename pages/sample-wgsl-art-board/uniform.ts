/** 1つの値の容量 */
const bytes = 4

/** ユニフォームバッファのサイズ */
export const uniformBufferSize =
  1 * bytes /** time */ + 1 * bytes /** スロット調整用 */ + 2 * bytes /** window_size（x,y） */

/** ユニフォームバッファのデータ */
export const uniformValues = new Float32Array(uniformBufferSize / 4)

/** uniformValues内のtimeデータのオフセットの位置を指定 */
export const timeUniformOffset = 0

/** uniformValues内のwindowSizeデータのオフセットの位置を指定 */
export const windowSizeUniformOffset = 2 // 1にするとwgslで受け取るときに位置がずれて意図した通りにならない
