import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import InsertRowAbove from '../../svg/outlined/insert-row-above.svg'
import type { IconProps } from '../../types'

export const InsertRowAboveOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(InsertRowAbove, {
      className: 'insert-row-above-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
