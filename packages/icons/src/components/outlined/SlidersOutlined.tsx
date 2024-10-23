import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sliders from '../../svg/outlined/sliders.svg'
import type { IconProps } from '../../types'

export const SlidersOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Sliders, { className: 'sliders-outlined' })
    return <Icon {...props} ref={ref} />
  },
)
