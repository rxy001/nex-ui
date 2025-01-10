import { generateUtilityClass } from './generateUtilityClass'

export const getUtilityClass = (prefix: string) => (slotClass: string) => {
  return generateUtilityClass(prefix, slotClass)
}
