'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FastBackward from '../../svg/outlined/fast-backward.svg'
import type { IconProps } from '../../types'

export const FastBackwardOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FastBackward, { className: 'fast-backward-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FastBackwardOutlined.displayName = 'FastBackwardOutlined'
