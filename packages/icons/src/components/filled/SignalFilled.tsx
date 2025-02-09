'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Signal from '../../svg/filled/signal.svg'
import type { IconProps } from '../../types'

export const SignalFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Signal, { className: 'signal-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

SignalFilled.displayName = 'SignalFilled'
