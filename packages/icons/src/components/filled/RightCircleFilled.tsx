'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import RightCircle from '../../svg/filled/right-circle.svg'
import type { IconProps } from '../../types'

export const RightCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(RightCircle, { className: 'right-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

RightCircleFilled.displayName = 'RightCircleFilled'
