'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import FullscreenExit from '../../svg/outlined/fullscreen-exit.svg'
import type { IconProps } from '../../types'

export const FullscreenExitOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () =>
        createIcon(FullscreenExit, { className: 'fullscreen-exit-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

FullscreenExitOutlined.displayName = 'FullscreenExitOutlined'
