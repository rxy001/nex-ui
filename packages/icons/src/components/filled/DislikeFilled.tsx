'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Dislike from '../../svg/filled/dislike.svg'
import type { IconProps } from '../../types'

export const DislikeFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Dislike, { className: 'dislike-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DislikeFilled.displayName = 'DislikeFilled'
