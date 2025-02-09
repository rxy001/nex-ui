'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Gold from '../../svg/filled/gold.svg'
import type { IconProps } from '../../types'

export const GoldFilled = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { createIcon } = useNexIcons()
  const Icon = useMemo(
    () => createIcon(Gold, { className: 'gold-filled' }),
    [createIcon],
  )
  return <Icon {...props} ref={ref} />
})

GoldFilled.displayName = 'GoldFilled'
