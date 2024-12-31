import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import SketchCircle from '../../svg/filled/sketch-circle.svg'
import type { IconProps } from '../../types'

export const SketchCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(SketchCircle, { className: 'sketch-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SketchCircleFilled.displayName = 'SketchCircleFilled'
