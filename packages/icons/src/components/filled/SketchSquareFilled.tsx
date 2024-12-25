import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SketchSquare from '../../svg/filled/sketch-square.svg'
import type { IconProps } from '../../types'

export const SketchSquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SketchSquare, { className: 'sketch-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
