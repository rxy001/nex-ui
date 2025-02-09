'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sun from '../../svg/filled/sun.svg'
import type { IconProps } from '../../types'

export const SunFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Sun, { className: 'sun-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

SunFilled.displayName = 'SunFilled'
