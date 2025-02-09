'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import LeftCircle from '../../svg/filled/left-circle.svg'
import type { IconProps } from '../../types'

export const LeftCircleFilled = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(LeftCircle, { className: 'left-circle-filled' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LeftCircleFilled.displayName = 'LeftCircleFilled'
