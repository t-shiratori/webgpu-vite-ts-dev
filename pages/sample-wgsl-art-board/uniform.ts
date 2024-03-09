const bytes = 4

/** 16の倍数じゃないとエラーになる？ */
export const uniformBufferSize =
  1 * bytes /** time */ + 1 * bytes /** スロット調整用 */ + 2 * bytes /** window_size（x,y） */

export const uniformValues = new Float32Array(uniformBufferSize / 4)

// uniformValuesのスロットの位置を指定
export const timeUniformOffset = 0

// uniformValuesのスロットの位置を指定
export const windowSizeUniformOffset = 2 // 1にするとwgslで受け取るときに位置がずれて意図した通りにならない
