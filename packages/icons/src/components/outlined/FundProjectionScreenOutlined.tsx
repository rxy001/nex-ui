import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FundProjectionScreen from '../../svg/outlined/fund-projection-screen.svg'
import type { IconProps } from '../../types'

export const FundProjectionScreenOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FundProjectionScreen, {
      className: 'fund-projection-screen-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
