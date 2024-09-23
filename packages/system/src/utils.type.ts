type ConcatValue<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never

type ExtractValues<T, H> = {
  [K in keyof T]: T[K] extends object
    ? ConcatValue<K, keyof T[K]>
    : K extends string | number
      ? H extends 'spacing'
        ? `${K}` | `-${K}`
        : `${K}`
      : never
}[keyof T]

type ExtraPropertyValue<T> = {
  [K in keyof T]: ExtractValues<T[K], K>
}
type FilterdString<T> = T extends string
  ? string extends T
    ? T & { __type?: never }
    : T
  : T

export type ExtraCSSProperties<T, Y> = T extends { scales: infer Scales }
  ? {
      [K in keyof Scales]?:
        | (Scales[K] extends keyof ExtraPropertyValue<T>
            ? ExtraPropertyValue<T>[Scales[K]]
            : never)
        | (K extends keyof Y ? FilterdString<Y[K]> : never)
    }
  : NonNullable<unknown>
