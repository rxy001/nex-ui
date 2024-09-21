import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import OrderedList from '../../svg/outlined/ordered-list.svg'
import type { IconProps } from '../../types'

export const OrderedListOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(OrderedList)
    return <Icon {...props} ref={ref} />
  },
)
