'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import VerticalAlignBottom from '../../svg/outlined/vertical-align-bottom.svg'
import type { IconProps } from '../../types'

export const VerticalAlignBottomOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(VerticalAlignBottom, {
          className: 'vertical-align-bottom-outlined',
        }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

VerticalAlignBottomOutlined.displayName = 'VerticalAlignBottomOutlined'
