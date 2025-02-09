'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FastForward from '../../svg/outlined/fast-forward.svg'
import type { IconProps } from '../../types'

export const FastForwardOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FastForward, { className: 'fast-forward-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FastForwardOutlined.displayName = 'FastForwardOutlined'
