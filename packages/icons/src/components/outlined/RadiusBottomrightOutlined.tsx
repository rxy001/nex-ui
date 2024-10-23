import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadiusBottomright from '../../svg/outlined/radius-bottomright.svg'
import type { IconProps } from '../../types'

export const RadiusBottomrightOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(RadiusBottomright, {
      className: 'radius-bottomright-outlined',
    })
    return <Icon {...props} ref={ref} />
  },
)
