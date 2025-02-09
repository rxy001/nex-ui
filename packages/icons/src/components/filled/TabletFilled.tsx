'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Tablet from '../../svg/filled/tablet.svg'
import type { IconProps } from '../../types'

export const TabletFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Tablet, { className: 'tablet-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

TabletFilled.displayName = 'TabletFilled'
