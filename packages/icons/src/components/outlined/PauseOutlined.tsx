'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import Pause from '../../svg/outlined/pause.svg'
import type { IconProps } from '../../types'

export const PauseOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(Pause, { className: 'pause-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PauseOutlined.displayName = 'PauseOutlined'
