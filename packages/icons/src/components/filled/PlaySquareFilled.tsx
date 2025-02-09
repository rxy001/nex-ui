'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlaySquare from '../../svg/filled/play-square.svg'
import type { IconProps } from '../../types'

export const PlaySquareFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PlaySquare, { className: 'play-square-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PlaySquareFilled.displayName = 'PlaySquareFilled'
