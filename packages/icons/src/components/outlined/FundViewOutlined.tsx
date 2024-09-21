import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FundView from '../../svg/outlined/fund-view.svg'
import type { IconProps } from '../../types'

export const FundViewOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FundView)
    return <Icon {...props} ref={ref} />
  },
)
