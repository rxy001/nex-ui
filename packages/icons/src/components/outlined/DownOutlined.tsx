'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Down from '../../svg/outlined/down.svg'
import type { IconProps } from '../../types'

export const DownOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Down, { className: 'down-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DownOutlined.displayName = 'DownOutlined'
