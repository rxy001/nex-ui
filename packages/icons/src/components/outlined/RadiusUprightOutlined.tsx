import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadiusUpright from '../../svg/outlined/radius-upright.svg'
import type { IconProps } from '../../types'

export const RadiusUprightOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RadiusUpright, { className: 'radius-upright-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RadiusUprightOutlined.displayName = 'RadiusUprightOutlined'
