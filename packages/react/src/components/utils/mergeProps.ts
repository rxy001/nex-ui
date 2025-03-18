import { mergeWith } from '@nex-ui/utils'
import clsx from 'clsx'

export const mergeProps = <T extends Record<string, any>>(...args: T[]) => {
  const result = {} as T

  mergeWith(result, ...args, (obj: any, src: any, key: string) => {
    if (key === 'className') {
      return clsx(obj, src)
    }

    if (key === 'style') {
      return {
        ...obj,
        ...src,
      }
    }

    if (key === 'classes') {
      return mergeWith({}, obj, src, (classObj, classSrc) =>
        clsx(classObj, classSrc),
      )
    }

    return src
  })

  return result
}
