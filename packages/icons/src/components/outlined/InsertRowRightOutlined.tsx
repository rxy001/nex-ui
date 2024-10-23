import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import InsertRowRight from '../../svg/outlined/insert-row-right.svg'
import type { IconProps } from '../../types'

export const InsertRowRightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(InsertRowRight, {
      className: 'insert-row-right-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
