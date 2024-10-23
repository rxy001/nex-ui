import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MergeCells from '../../svg/outlined/merge-cells.svg'
import type { IconProps } from '../../types'

export const MergeCellsOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MergeCells, { className: 'merge-cells-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
