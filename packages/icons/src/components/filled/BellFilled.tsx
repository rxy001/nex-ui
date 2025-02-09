'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bell from '../../svg/filled/bell.svg'
import type { IconProps } from '../../types'

export const BellFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Bell, { className: 'bell-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

BellFilled.displayName = 'BellFilled'
