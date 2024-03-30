/** 1つの値のメモリサイズ */
const perByteSize = Float32Array.BYTES_PER_ELEMENT // 4

/** ユニフォームバッファのサイズ */
export const uniformBufferSize =
  perByteSize * 1 /** time */ +
  perByteSize * 1 /** バッファサイズ調整用（最小サイズが16バイトのため） */ +
  perByteSize * 2 /** window_size（x,y） */

/** ユニフォームバッファのデータ */
export const uniformValues = new Float32Array(uniformBufferSize / perByteSize)

/** uniformValues内の time データのオフセットの位置を指定 */
export const timeUniformOffset = 0

/** uniformValues内の screen_size データのオフセットの位置を指定 */
export const screenSizeUniformOffset = 2
