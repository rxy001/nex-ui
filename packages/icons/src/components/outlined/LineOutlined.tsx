'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Line from '../../svg/outlined/line.svg'
import type { IconProps } from '../../types'

export const LineOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Line, { className: 'line-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LineOutlined.displayName = 'LineOutlined'
