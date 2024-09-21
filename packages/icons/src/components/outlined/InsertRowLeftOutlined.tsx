import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import InsertRowLeft from '../../svg/outlined/insert-row-left.svg'
import type { IconProps } from '../../types'

export const InsertRowLeftOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(InsertRowLeft)
    return <Icon {...props} ref={ref} />
  },
)
