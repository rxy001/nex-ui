'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DownCircle from '../../svg/filled/down-circle.svg'
import type { IconProps } from '../../types'

export const DownCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DownCircle, { className: 'down-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DownCircleFilled.displayName = 'DownCircleFilled'
