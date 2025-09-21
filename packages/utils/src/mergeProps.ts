import clsx from 'clsx'
import mergeWith from 'lodash.mergewith'
import { chain } from './chain'
import type { ClassValue } from 'clsx'

interface Props {
  [key: string]: any
}

type PropsArg = Props | null | undefined

export function mergeProps<T extends PropsArg[]>(...args: T) {
  const result: Props = { ...args[0] }

  for (let i = 1; i < args.length; i += 1) {
    const props = args[i]
    for (const key in props) {
      const a = result[key]
      const b = props[key]

      if (
        typeof a === 'function' &&
        typeof b === 'function' &&
        key[0] === 'o' &&
        key[1] === 'n' &&
        key.charCodeAt(2) >= /* 'A' */ 65 &&
        key.charCodeAt(2) <= /* 'Z' */ 90
      ) {
        result[key] = chain(a, b)
      } else if (key === 'className') {
        result[key] = clsx(a, b)
      } else if (key === 'style') {
        result[key] = {
          ...a,
          ...b,
        }
      } else if (key === 'classNames') {
        result[key] = mergeWith(
          {},
          a,
          b,
          (classObj: ClassValue, classSrc: ClassValue) =>
            clsx(classObj, classSrc),
        )
      } else if (key === 'sx' && a && b) {
        result[key] = [a, b].flat(1)
      } else {
        result[key] = b !== undefined ? b : a
      }
    }
  }

  return result
}
