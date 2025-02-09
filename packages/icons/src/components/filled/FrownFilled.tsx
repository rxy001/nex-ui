'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Frown from '../../svg/filled/frown.svg'
import type { IconProps } from '../../types'

export const FrownFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Frown, { className: 'frown-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FrownFilled.displayName = 'FrownFilled'
