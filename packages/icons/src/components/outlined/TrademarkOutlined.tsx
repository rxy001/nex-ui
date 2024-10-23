import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Trademark from '../../svg/outlined/trademark.svg'
import type { IconProps } from '../../types'

export const TrademarkOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Trademark, { className: 'trademark-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
