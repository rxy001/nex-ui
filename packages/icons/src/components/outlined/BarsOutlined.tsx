'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Bars from '../../svg/outlined/bars.svg'
import type { IconProps } from '../../types'

export const BarsOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Bars, { className: 'bars-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

BarsOutlined.displayName = 'BarsOutlined'
