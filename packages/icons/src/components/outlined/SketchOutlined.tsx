import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sketch from '../../svg/outlined/sketch.svg'
import type { IconProps } from '../../types'

export const SketchOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(Sketch)
    return <Icon {...props} ref={ref} />
  },
)
