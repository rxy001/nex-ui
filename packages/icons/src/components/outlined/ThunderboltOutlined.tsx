import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Thunderbolt from '../../svg/outlined/thunderbolt.svg'
import type { IconProps } from '../../types'

export const ThunderboltOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Thunderbolt, { className: 'thunderbolt-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ThunderboltOutlined.displayName = 'ThunderboltOutlined'
