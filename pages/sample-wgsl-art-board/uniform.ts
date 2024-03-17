/** 1つの値のメモリサイズ */
const bytesSize = 4

/** ユニフォームバッファのサイズ */
export const uniformBufferSize =
  bytesSize * 1 /** time */ +
  bytesSize * 1 /** バッファサイズ調整用（最小サイズが16バイトのため） */ +
  bytesSize * 2 /** window_size（x,y） */

/** ユニフォームバッファのデータ */
export const uniformValues = new Float32Array(uniformBufferSize / 4)

/** uniformValues内の time データのオフセットの位置を指定 */
export const timeUniformOffset = 0

/** uniformValues内の screen_size データのオフセットの位置を指定 */
export const screenSizeUniformOffset = 2
