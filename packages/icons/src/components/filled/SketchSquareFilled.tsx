import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import SketchSquare from '../../svg/filled/sketch-square.svg'
import type { IconProps } from '../../types'

export const SketchSquareFilled = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(SketchSquare)
    return <Icon {...props} ref={ref} />
  },
)
