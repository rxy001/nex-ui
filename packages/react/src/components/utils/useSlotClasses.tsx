import { useMemo } from 'react'
import { kebabCase } from '@nex-ui/utils'
import { generateSlotClass } from './generateSlotClass'
import { useNexUI } from '../provider'
import type { ClassValue } from 'clsx'

interface UseSlotClassesProps<S extends string> {
  name: string
  slots: S[] | readonly S[]
  classNames?: Partial<Record<string, ClassValue>>
}

export function useSlotClasses<S extends string>({
  name,
  slots,
  classNames,
}: UseSlotClassesProps<S>): Record<S, ClassValue> {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const root = `${prefix}-${kebabCase(name)}`

    return composeClasses(slots, root, classNames)
  }, [classNames, name, prefix, slots])
}

function composeClasses(
  slots: string[] | readonly string[],
  prefix: string,
  classes?: Partial<Record<string, ClassValue>>,
) {
  const output = {} as Record<string, ClassValue>

  slots.forEach((slot: string) => {
    const className = classes?.[slot]

    output[slot] = [className, generateSlotClass(prefix, kebabCase(slot))]
  })

  return output
}
