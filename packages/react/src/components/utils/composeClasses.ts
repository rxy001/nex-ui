import { forEach, reduce } from '@nex-ui/utils'
import clsx from 'clsx'
import type { ClassArray, ClassValue } from 'clsx'

export function composeClasses<ClassKey extends string, K extends ClassKey>(
  slots: Record<ClassKey, ClassArray>,
  getUtilityClass: (slotClass: string) => string,
  classes?: Partial<Record<K, ClassValue>>,
) {
  const output = {} as Record<ClassKey, ClassValue>

  // @ts-expect-error
  forEach(slots, (slotClasses: ClassArray, slot: ClassKey) => {
    let className = undefined

    if (classes && slot in classes) {
      className = classes?.[slot]
    }

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

    output[slot] = clsx([className, result])
  })

  return output
}
