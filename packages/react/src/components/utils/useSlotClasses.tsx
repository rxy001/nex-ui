import clsx from 'clsx'
import { useMemo } from 'react'
import { camelToKebab, forEach } from '@nex-ui/utils'
import { generateSlotClass } from './generateSlotClass'
import { useNexUI } from '../provider'
import type { ClassValue } from 'clsx'

type UseSlotClassesArgs = {
  name: string
  slots: string[]
  classNames?: Record<string, ClassValue>
}

export const useSlotClasses = ({
  name,
  slots,
  classNames,
}: UseSlotClassesArgs) => {
  const { prefix } = useNexUI()

  return useMemo(() => {
    const root = `${prefix}-${camelToKebab(name)}`

    return composeClasses(slots, root, classNames)
  }, [classNames, name, prefix, slots])
}

function composeClasses<K extends string>(
  slots: K[],
  prefix: string,
  classes?: Partial<Record<K, ClassValue>>,
) {
  const output = {} as Record<K, ClassValue>

  forEach(slots, (slot: K) => {
    const className = classes?.[slot]

    output[slot] = clsx([
      className,
      generateSlotClass(prefix, camelToKebab(slot)),
    ])
  })

  return output
}
