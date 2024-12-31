import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import MoneyCollect from '../../svg/outlined/money-collect.svg'
import type { IconProps } from '../../types'

export const MoneyCollectOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(MoneyCollect, { className: 'money-collect-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

MoneyCollectOutlined.displayName = 'MoneyCollectOutlined'
