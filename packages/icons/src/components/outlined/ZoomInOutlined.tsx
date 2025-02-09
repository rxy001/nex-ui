'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ZoomIn from '../../svg/outlined/zoom-in.svg'
import type { IconProps } from '../../types'

export const ZoomInOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ZoomIn, { className: 'zoom-in-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ZoomInOutlined.displayName = 'ZoomInOutlined'
