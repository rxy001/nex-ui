import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sliders from '../../svg/filled/sliders.svg'
import type { IconProps } from '../../types'

export const SlidersFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Sliders)
    return <Icon {...props} ref={ref} />
  },
)
