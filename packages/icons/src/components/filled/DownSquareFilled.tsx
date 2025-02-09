'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DownSquare from '../../svg/filled/down-square.svg'
import type { IconProps } from '../../types'

export const DownSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DownSquare, { className: 'down-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DownSquareFilled.displayName = 'DownSquareFilled'
