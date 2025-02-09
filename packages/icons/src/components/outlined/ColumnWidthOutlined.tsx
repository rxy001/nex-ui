'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ColumnWidth from '../../svg/outlined/column-width.svg'
import type { IconProps } from '../../types'

export const ColumnWidthOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ColumnWidth, { className: 'column-width-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ColumnWidthOutlined.displayName = 'ColumnWidthOutlined'
