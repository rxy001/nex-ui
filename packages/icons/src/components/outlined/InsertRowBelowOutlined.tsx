import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import InsertRowBelow from '../../svg/outlined/insert-row-below.svg'
import type { IconProps } from '../../types'

export const InsertRowBelowOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(InsertRowBelow)
    return <Icon {...props} ref={ref} />
  },
)
