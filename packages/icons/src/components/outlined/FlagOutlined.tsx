'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Flag from '../../svg/outlined/flag.svg'
import type { IconProps } from '../../types'

export const FlagOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Flag, { className: 'flag-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FlagOutlined.displayName = 'FlagOutlined'
