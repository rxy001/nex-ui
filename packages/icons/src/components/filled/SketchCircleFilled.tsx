import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SketchCircle from '../../svg/filled/sketch-circle.svg'
import type { IconProps } from '../../types'

export const SketchCircleFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SketchCircle)
    return <Icon {...props} ref={ref} />
  },
)
