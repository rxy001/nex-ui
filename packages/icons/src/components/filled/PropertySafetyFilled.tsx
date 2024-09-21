import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import PropertySafety from '../../svg/filled/property-safety.svg'
import type { IconProps } from '../../types'

export const PropertySafetyFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(PropertySafety)
    return <Icon {...props} ref={ref} />
  },
)
