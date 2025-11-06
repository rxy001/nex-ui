import { generateSlotClass } from './generateSlotClass'

export function generateSlotClasses<T extends string>(
  componentName: string,
  classNames: T[],
): Record<T, string> {
  const result: Record<string, string> = {}

  classNames.forEach((className: T) => {
    result[className] = generateSlotClass(componentName, className)
  })

  return result
}
