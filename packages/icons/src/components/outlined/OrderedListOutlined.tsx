import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import OrderedList from '../../svg/outlined/ordered-list.svg'
import type { IconProps } from '../../types'

export const OrderedListOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(OrderedList, { className: 'ordered-list-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
