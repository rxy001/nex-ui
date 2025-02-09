'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import InsertRowAbove from '../../svg/outlined/insert-row-above.svg'
import type { IconProps } from '../../types'

export const InsertRowAboveOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(InsertRowAbove, { className: 'insert-row-above-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

InsertRowAboveOutlined.displayName = 'InsertRowAboveOutlined'
