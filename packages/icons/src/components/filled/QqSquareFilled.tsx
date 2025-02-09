'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import QqSquare from '../../svg/filled/qq-square.svg'
import type { IconProps } from '../../types'

export const QqSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(QqSquare, { className: 'qq-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

QqSquareFilled.displayName = 'QqSquareFilled'
