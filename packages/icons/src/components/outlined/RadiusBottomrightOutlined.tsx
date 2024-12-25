import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadiusBottomright from '../../svg/outlined/radius-bottomright.svg'
import type { IconProps } from '../../types'

export const RadiusBottomrightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(RadiusBottomright, {
          className: 'radius-bottomright-outlined',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
