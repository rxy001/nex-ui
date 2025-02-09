'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FastForward from '../../svg/filled/fast-forward.svg'
import type { IconProps } from '../../types'

export const FastForwardFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(FastForward, { className: 'fast-forward-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FastForwardFilled.displayName = 'FastForwardFilled'
