import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PropertySafety from '../../svg/outlined/property-safety.svg'
import type { IconProps } from '../../types'

export const PropertySafetyOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(PropertySafety, { className: 'property-safety-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PropertySafetyOutlined.displayName = 'PropertySafetyOutlined'
