import { forwardRef } from 'react'
import { useNexIcons } from '../../utils/Context'
import FormatPainter from '../../svg/outlined/format-painter.svg'
import type { IconProps } from '../../types'

export const FormatPainterOutlined = forwardRef<SVGAElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = createIcon(FormatPainter)
    return <Icon {...props} ref={ref} />
  },
)
