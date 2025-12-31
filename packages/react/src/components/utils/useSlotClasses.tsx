import clsx from 'clsx'
import { useMemo } from 'react'
import { kebabCase } from '@nex-ui/utils'
import { generateSlotClass } from './generateSlotClass'
import { useNexUI } from '../provider'
import type { ClassValue } from 'clsx'

type UseSlotClassesProps = {
  name: string
  slots: string[]
  classNames?: Record<string, ClassValue>
}

export const useSlotClasses = ({
  name,
  slots,
  classNames,
}: UseSlotClassesProps) => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const root = `${prefix}-${kebabCase(name)}`

    return composeClasses(slots, root, classNames)
  }, [classNames, name, prefix, slots])
}

function composeClasses<K extends string>(
  slots: K[],
  prefix: string,
  classes?: Partial<Record<K, ClassValue>>,
) {
  const output = {} as Record<K, ClassValue>

  slots.forEach((slot: K) => {
    const className = classes?.[slot]

    output[slot] = clsx([className, generateSlotClass(prefix, kebabCase(slot))])
  })

  return output
}
