import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import MoneyCollect from '../../svg/filled/money-collect.svg'
import type { IconProps } from '../../types'

export const MoneyCollectFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(MoneyCollect, { className: 'money-collect-filled' })
    return <Icon {...props} ref={ref} />
  },
)
