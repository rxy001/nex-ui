import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FormatPainter from '../../svg/outlined/format-painter.svg'
import type { IconProps } from '../../types'

export const FormatPainterOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FormatPainter, { className: 'format-painter-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)
