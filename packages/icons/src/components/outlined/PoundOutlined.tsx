'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pound from '../../svg/outlined/pound.svg'
import type { IconProps } from '../../types'

export const PoundOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Pound, { className: 'pound-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PoundOutlined.displayName = 'PoundOutlined'
