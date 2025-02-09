'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Flag from '../../svg/filled/flag.svg'
import type { IconProps } from '../../types'

export const FlagFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Flag, { className: 'flag-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

FlagFilled.displayName = 'FlagFilled'
