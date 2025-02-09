'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RadiusBottomleft from '../../svg/outlined/radius-bottomleft.svg'
import type { IconProps } from '../../types'

export const RadiusBottomleftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(RadiusBottomleft, {
          className: 'radius-bottomleft-outlined',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RadiusBottomleftOutlined.displayName = 'RadiusBottomleftOutlined'
