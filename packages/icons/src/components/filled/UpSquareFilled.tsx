'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import UpSquare from '../../svg/filled/up-square.svg'
import type { IconProps } from '../../types'

export const UpSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(UpSquare, { className: 'up-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

UpSquareFilled.displayName = 'UpSquareFilled'
