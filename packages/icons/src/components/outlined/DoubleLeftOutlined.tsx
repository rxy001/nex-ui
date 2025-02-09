'use client'

import { forwardRef, useMemo } from 'react'
import { useNexIcons } from '../../utils/Context'
import DoubleLeft from '../../svg/outlined/double-left.svg'
import type { IconProps } from '../../types'

export const DoubleLeftOutlined = forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { createIcon } = useNexIcons()
    const Icon = useMemo(
      () => createIcon(DoubleLeft, { className: 'double-left-outlined' }),
      [createIcon],
    )
    return <Icon {...props} ref={ref} />
  },
)

DoubleLeftOutlined.displayName = 'DoubleLeftOutlined'
