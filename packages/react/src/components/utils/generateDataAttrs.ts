import { camelToKebab } from '@nex-ui/utils'

export type DataAttrs = Record<string, string | number | boolean | undefined>

export const generateDataAttrs = (dataAttrs: DataAttrs) => {
  return Object.entries(dataAttrs).reduce((acc, [key, value]) => {
    acc[`data-${camelToKebab(key)}`] = value
    return acc
  }, {} as DataAttrs)
}
