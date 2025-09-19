import { forEach } from '@nex-ui/utils'
import clsx from 'clsx'
import { generateUtilityClass } from './generateUtilityClass'
import type { ClassValue } from 'clsx'

export function composeClasses<ClassKey extends string, K extends ClassKey>(
  slots: Record<ClassKey, ClassValue>,
  prefix: string,
  classes?: Partial<Record<K, ClassValue>>,
) {
  const output = {} as Record<ClassKey, ClassValue>

  // @ts-expect-error
  forEach(slots, (slotClasses: ClassArray, slot: ClassKey) => {
    let className = undefined

    if (classes && slot in classes) {
      className = classes?.[slot]
    }

    output[slot] = clsx([className, generateUtilityClass(prefix, slotClasses)])
  })

  return output
}
