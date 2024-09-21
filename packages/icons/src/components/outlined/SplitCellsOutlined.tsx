import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SplitCells from '../../svg/outlined/split-cells.svg'
import type { IconProps } from '../../types'

export const SplitCellsOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SplitCells)
    return <Icon {...props} ref={ref} />
  },
)
