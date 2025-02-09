'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import ExpandAlt from '../../svg/outlined/expand-alt.svg'
import type { IconProps } from '../../types'

export const ExpandAltOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(ExpandAlt, { className: 'expand-alt-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ExpandAltOutlined.displayName = 'ExpandAltOutlined'
