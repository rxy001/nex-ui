'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pinterest from '../../svg/outlined/pinterest.svg'
import type { IconProps } from '../../types'

export const PinterestOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Pinterest, { className: 'pinterest-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PinterestOutlined.displayName = 'PinterestOutlined'
