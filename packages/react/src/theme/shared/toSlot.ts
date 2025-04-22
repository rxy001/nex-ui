type Result<T, K extends string[]> = {
  [P in keyof T]: {
    [L in K[number]]: T[P]
  }
}

export function toSlot<T extends Record<string, any>, K extends string[]>(
  object: T,
  ...slotNames: K
) {
  const result = {} as Result<T, K>

  for (const key in object) {
    // @ts-ignore
    result[key] = {}
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      slotNames.forEach((slot) => {
        // @ts-ignore
        result[key][slot] = object[key]
      })
    }
  }
  return result
}
