'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Golden from '../../svg/filled/golden.svg'
import type { IconProps } from '../../types'

export const GoldenFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Golden, { className: 'golden-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

GoldenFilled.displayName = 'GoldenFilled'
