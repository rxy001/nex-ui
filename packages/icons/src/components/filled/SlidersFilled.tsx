import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sliders from '../../svg/filled/sliders.svg'
import type { IconProps } from '../../types'

export const SlidersFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Sliders, { className: 'sliders-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SlidersFilled.displayName = 'SlidersFilled'
