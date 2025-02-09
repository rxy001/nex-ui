'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalAlignTop from '../../svg/outlined/vertical-align-top.svg'
import type { IconProps } from '../../types'

export const VerticalAlignTopOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(VerticalAlignTop, {
          className: 'vertical-align-top-outlined',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

VerticalAlignTopOutlined.displayName = 'VerticalAlignTopOutlined'
