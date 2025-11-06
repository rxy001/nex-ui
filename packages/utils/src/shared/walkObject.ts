import { isPlainObject } from '../shared/is'

type Callback<R = any> = (value: any, path: string[]) => R

export type MappedObject<T, K> = {
  [Prop in keyof T]: T[Prop] extends Array<any>
    ? MappedObject<T[Prop][number], K>[]
    : T[Prop] extends Record<string, unknown>
      ? MappedObject<T[Prop], K>
      : K
}

export type PredicateFn = (value: any, path: string[]) => boolean

export interface WalkObjectOptions {
  predicate?: PredicateFn
  getKey?(prop: string, value: any): string | undefined
}

type Nullable<T> = T | null | undefined

const isNotNullish = <T>(element: Nullable<T>): element is T => element != null

export function walkObject<T, K>(
  target: T,
  fn: Callback<K>,
  options: WalkObjectOptions = {},
): MappedObject<T, ReturnType<Callback<K>>> {
  const { predicate, getKey } = options

  function inner(value: any, path: string[] = []): any {
    if (isPlainObject(value) || Array.isArray(value)) {
      const result: Record<string, string> = {}
      for (const [prop, child] of Object.entries(value)) {
        const key = getKey?.(prop, child) ?? prop
        const childPath = [...path, key]
        if (predicate?.(value, childPath)) {
          return fn(value, path)
        }

        const next = inner(child, childPath)
        if (isNotNullish(next)) {
          result[key] = next
        }
      }
      return result
    }

    return fn(value, path)
  }

  return inner(target)
}
