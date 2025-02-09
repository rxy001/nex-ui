'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RightSquare from '../../svg/filled/right-square.svg'
import type { IconProps } from '../../types'

export const RightSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RightSquare, { className: 'right-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RightSquareFilled.displayName = 'RightSquareFilled'
