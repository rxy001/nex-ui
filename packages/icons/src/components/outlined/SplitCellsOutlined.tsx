'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SplitCells from '../../svg/outlined/split-cells.svg'
import type { IconProps } from '../../types'

export const SplitCellsOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SplitCells, { className: 'split-cells-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SplitCellsOutlined.displayName = 'SplitCellsOutlined'
