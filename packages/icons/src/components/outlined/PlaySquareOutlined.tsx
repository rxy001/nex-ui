'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PlaySquare from '../../svg/outlined/play-square.svg'
import type { IconProps } from '../../types'

export const PlaySquareOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PlaySquare, { className: 'play-square-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PlaySquareOutlined.displayName = 'PlaySquareOutlined'
