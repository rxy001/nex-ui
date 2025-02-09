'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DollarCircle from '../../svg/filled/dollar-circle.svg'
import type { IconProps } from '../../types'

export const DollarCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DollarCircle, { className: 'dollar-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DollarCircleFilled.displayName = 'DollarCircleFilled'
