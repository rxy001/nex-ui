'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import PoundCircle from '../../svg/outlined/pound-circle.svg'
import type { IconProps } from '../../types'

export const PoundCircleOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(PoundCircle, { className: 'pound-circle-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

PoundCircleOutlined.displayName = 'PoundCircleOutlined'
