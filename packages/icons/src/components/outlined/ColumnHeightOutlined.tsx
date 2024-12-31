import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ColumnHeight from '../../svg/outlined/column-height.svg'
import type { IconProps } from '../../types'

export const ColumnHeightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ColumnHeight, { className: 'column-height-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ColumnHeightOutlined.displayName = 'ColumnHeightOutlined'
