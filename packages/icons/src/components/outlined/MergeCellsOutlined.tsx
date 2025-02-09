'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MergeCells from '../../svg/outlined/merge-cells.svg'
import type { IconProps } from '../../types'

export const MergeCellsOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MergeCells, { className: 'merge-cells-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MergeCellsOutlined.displayName = 'MergeCellsOutlined'
