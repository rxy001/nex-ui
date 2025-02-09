'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import LeftCircle from '../../svg/outlined/left-circle.svg'
import type { IconProps } from '../../types'

export const LeftCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(LeftCircle, { className: 'left-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

LeftCircleOutlined.displayName = 'LeftCircleOutlined'
