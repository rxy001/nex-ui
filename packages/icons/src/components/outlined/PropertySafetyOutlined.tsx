import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PropertySafety from '../../svg/outlined/property-safety.svg'
import type { IconProps } from '../../types'

export const PropertySafetyOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PropertySafety)
    return <Icon {...props} ref={ref} />
  },
)
