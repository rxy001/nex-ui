import clsx from 'clsx'
import { forEach, reduce } from '@nex-ui/utils'

export function composeClasses<ClassKey extends string>(
  slots: Record<ClassKey, ReadonlyArray<string | false | undefined | null>>,
  classes: Partial<Record<ClassKey, string[]>>,
  getUtilityClass: (slotClass: string) => string,
) {
  const output = {} as Record<ClassKey, string>

  // @ts-ignore
  forEach(slots, (slotClasses: string[], slot: ClassKey) => {
    const className = classes?.[slot]

    const result = reduce<string, string[]>(
      slotClasses,
      (acc, slotClass: string) => {
        if (slotClass) {
          const utilityClass = getUtilityClass(slotClass)
          if (utilityClass !== '') {
            acc.push(utilityClass)
          }
        }
        return acc
      },
      [],
    )

    output[slot] = clsx(className, result)
  })

  return output
}
