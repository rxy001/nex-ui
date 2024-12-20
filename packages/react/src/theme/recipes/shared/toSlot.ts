type Result<T, K extends string> = {
  [P in keyof T]: {
    [L in K]: T[P]
  }
}

export function toSlot<T extends Record<string, any>, K extends string>(
  object: T,
  keyName: K,
) {
  const result = {} as Result<T, K>

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      // @ts-ignore
      result[key] = {
        [keyName]: object[key],
      }
    }
  }
  return result
}
