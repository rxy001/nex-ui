'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CheckSquare from '../../svg/outlined/check-square.svg'
import type { IconProps } from '../../types'

export const CheckSquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CheckSquare, { className: 'check-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CheckSquareOutlined.displayName = 'CheckSquareOutlined'
