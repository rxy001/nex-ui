'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RightSquare from '../../svg/outlined/right-square.svg'
import type { IconProps } from '../../types'

export const RightSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RightSquare, { className: 'right-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RightSquareOutlined.displayName = 'RightSquareOutlined'
