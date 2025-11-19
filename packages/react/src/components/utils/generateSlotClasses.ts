import { kebabCase } from '@nex-ui/utils'
import { generateSlotClass } from './generateSlotClass'

export function generateSlotClasses<T extends string>(
  componentName: string,
  slots: T[],
): Record<T, string> {
  const result: Record<string, string> = {}

  slots.forEach((slot: T) => {
    result[slot] = generateSlotClass(componentName, kebabCase(slot))
  })

  return result
}
