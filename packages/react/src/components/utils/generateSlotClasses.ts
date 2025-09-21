import { forEach } from '@nex-ui/utils'
import { generateSlotClass } from './generateSlotClass'

export function generateSlotClasses<T extends string>(
  componentName: string,
  classNames: T[],
): Record<T, string> {
  const result: Record<string, string> = {}

  forEach(classNames, (className) => {
    result[className] = generateSlotClass(componentName, className)
  })

  return result
}
