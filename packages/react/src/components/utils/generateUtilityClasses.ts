import { forEach } from '@nex-ui/utils'
import { generateUtilityClass } from './generateUtilityClass'

export function generateUtilityClasses<T extends string>(
  componentName: string,
  classNames: T[],
): Record<T, string> {
  const result: Record<string, string> = {}

  forEach(classNames, (className) => {
    result[className] = generateUtilityClass(componentName, className)
  })

  return result
}
