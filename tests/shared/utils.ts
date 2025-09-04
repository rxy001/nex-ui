export type CamelToKebab<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${CamelToKebab<S2>}`
    : `${Uncapitalize<S1>}-${CamelToKebab<S2>}`
  : S

export function camelToKebab(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '')
    .toLowerCase()
}
