import { forEach, reduce } from '@nex-ui/utils'
import type { ClassArray, ClassValue } from 'clsx'

export function composeClasses<ClassKey extends string>(
  slots: Record<ClassKey, ClassArray>,
  getUtilityClass: (slotClass: string) => string,
  classes?: Partial<Record<string, ClassValue>>,
) {
  const output = {} as Record<ClassKey, ClassArray>

  // @ts-expect-error
  forEach(slots, (slotClasses: ClassArray, slot: ClassKey) => {
    const className = classes?.[slot]

    const result = reduce<ClassValue, ClassValue[]>(
      slotClasses,
      (acc, slotClass: ClassValue) => {
        if (slotClass && typeof slotClass === 'string') {
          const utilityClass = getUtilityClass(slotClass)
          if (utilityClass !== '') {
            acc.push(utilityClass)
          }
        }
        return acc
      },
      [],
    )

    output[slot] = [className, result]
  })

  return output
}
