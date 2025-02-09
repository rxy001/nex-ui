'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CarryOut from '../../svg/filled/carry-out.svg'
import type { IconProps } from '../../types'

export const CarryOutFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CarryOut, { className: 'carry-out-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CarryOutFilled.displayName = 'CarryOutFilled'
