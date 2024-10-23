import { generateUtilityClass } from './generateUtilityClass'

export const getUtilityClass = (prefix: string) => (slot: string) => {
  return generateUtilityClass(prefix, slot)
}
