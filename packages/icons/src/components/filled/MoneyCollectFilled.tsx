import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MoneyCollect from '../../svg/filled/money-collect.svg'
import type { IconProps } from '../../types'

export const MoneyCollectFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MoneyCollect, { className: 'money-collect-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
