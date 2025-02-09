'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Thunderbolt from '../../svg/filled/thunderbolt.svg'
import type { IconProps } from '../../types'

export const ThunderboltFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Thunderbolt, { className: 'thunderbolt-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

ThunderboltFilled.displayName = 'ThunderboltFilled'
