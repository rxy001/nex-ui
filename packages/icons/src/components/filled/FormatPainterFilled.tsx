'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FormatPainter from '../../svg/filled/format-painter.svg'
import type { IconProps } from '../../types'

export const FormatPainterFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FormatPainter, { className: 'format-painter-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FormatPainterFilled.displayName = 'FormatPainterFilled'
