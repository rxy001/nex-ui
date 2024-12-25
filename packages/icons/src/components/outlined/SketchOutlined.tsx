import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Sketch from '../../svg/outlined/sketch.svg'
import type { IconProps } from '../../types'

export const SketchOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Sketch, { className: 'sketch-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
