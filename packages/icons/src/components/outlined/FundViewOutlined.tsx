import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FundView from '../../svg/outlined/fund-view.svg'
import type { IconProps } from '../../types'

export const FundViewOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FundView, { className: 'fund-view-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FundViewOutlined.displayName = 'FundViewOutlined'
