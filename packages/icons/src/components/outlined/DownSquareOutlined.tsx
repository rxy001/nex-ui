'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DownSquare from '../../svg/outlined/down-square.svg'
import type { IconProps } from '../../types'

export const DownSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DownSquare, { className: 'down-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DownSquareOutlined.displayName = 'DownSquareOutlined'
