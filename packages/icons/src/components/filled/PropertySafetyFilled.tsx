import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PropertySafety from '../../svg/filled/property-safety.svg'
import type { IconProps } from '../../types'

export const PropertySafetyFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PropertySafety, { className: 'property-safety-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
