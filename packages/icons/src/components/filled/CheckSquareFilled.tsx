'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import CheckSquare from '../../svg/filled/check-square.svg'
import type { IconProps } from '../../types'

export const CheckSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(CheckSquare, { className: 'check-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

CheckSquareFilled.displayName = 'CheckSquareFilled'
