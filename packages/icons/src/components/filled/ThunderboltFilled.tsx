import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Thunderbolt from '../../svg/filled/thunderbolt.svg'
import type { IconProps } from '../../types'

export const ThunderboltFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Thunderbolt)
    return <Icon {...props} ref={ref} />
  },
)
