import { forEach, reduce, isFunction, isString } from '@nex-ui/utils'
import type { Noop } from '@nex-ui/utils'

export function composeClasses<ClassKey extends string>(
  slots: Record<ClassKey, ReadonlyArray<string | false | undefined | null>>,
  getUtilityClass: (slot: string) => string,
  ownerState: Record<string, any>,
  classes: Record<string, string | string[] | Noop> | undefined = undefined,
) {
  const output: Record<ClassKey, string> = {} as any

  // @ts-expect-error
  forEach(slots, (value: string[], slot: ClassKey) => {
    let className = classes?.[slot] ?? []

    if (isFunction(className)) {
      className = className(ownerState)
    }

    className = (isString(className) ? [className] : className) as string[]

    const result = reduce(
      value,
      (acc, key) => {
        if (key) {
          const utilityClass = getUtilityClass(key)
          if (utilityClass !== '') {
            acc.push(utilityClass)
          }
        }
        return acc
      },
      [] as string[],
    )

    output[slot] = [...className, ...result].join(' ')
  })

  return output
}
