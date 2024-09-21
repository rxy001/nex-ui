import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import ColumnHeight from '../../svg/outlined/column-height.svg'
import type { IconProps } from '../../types'

export const ColumnHeightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(ColumnHeight)
    return <Icon {...props} ref={ref} />
  },
)
