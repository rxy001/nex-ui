import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Fund from '../../svg/outlined/fund.svg'
import type { IconProps } from '../../types'

export const FundOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Fund, { className: 'fund-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
