'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Expand from '../../svg/outlined/expand.svg'
import type { IconProps } from '../../types'

export const ExpandOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Expand, { className: 'expand-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ExpandOutlined.displayName = 'ExpandOutlined'
